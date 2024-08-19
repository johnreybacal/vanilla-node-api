import { Request } from "@/streams/request";
import { Response } from "@/streams/response";
import { Parameters, Route } from "./route";
import { Router } from "./router";
import { getUrlSegments } from "./urlHelpers";

function urlMatch(route: Route, url: string) {
    const target = getUrlSegments(route.url);
    const current = getUrlSegments(url);

    if (target.length !== current.length) {
        return false;
    }

    const paramKeys = Object.keys(route.params)
        .map(Number)
        .sort((a, b) => b - a);

    for (const key of paramKeys) {
        target.splice(key, 1);
        current.splice(key, 1);
    }
    return current.join() === target.join();
}

function setParams(req: Request, params: Parameters) {
    const urlSegments = getUrlSegments(req.url!);

    const paramKeys = Object.keys(params).map(Number);
    for (const index of paramKeys) {
        req.params[params[index]] = urlSegments[index];
    }
}

export class RouteResolver {
    routes: Route[];

    static #instance: RouteResolver;

    private constructor() {
        this.routes = [];
    }

    public static get instance() {
        if (!RouteResolver.#instance) {
            RouteResolver.#instance = new RouteResolver();
        }

        return RouteResolver.#instance;
    }

    register(routers: Router[]) {
        routers.forEach(({ routes }) => this.routes.push(...routes));
    }

    resolve(req: Request, res: Response) {
        try {
            for (const route of this.routes) {
                if (route.method === req.method) {
                    if (urlMatch(route, req.url!)) {
                        setParams(req, route.params);
                        return route.callback(req, res);
                    }
                }
            }
            res.statusCode = 404;
            res.end();
        } catch (e) {
            console.log(e);
            res.statusCode = 500;
            res.write(JSON.stringify(e));
            res.end();
        }
    }
}
