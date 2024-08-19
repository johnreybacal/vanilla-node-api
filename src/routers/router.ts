import { Method, RequestHandler, Route } from "./route";
import { getParameters, getUrlSegments } from "./urlHelpers";

export class Router {
    routes: Route[];
    baseUrl: string;

    constructor(baseUrl = "") {
        this.baseUrl = baseUrl;
        this.routes = [];
    }

    /**
     * Listen for a `method` on `url`, then execute `callback`
     * @param method
     * @param url
     * @param callback
     */
    on(method: Method, url: string, callback: RequestHandler) {
        url = `${this.baseUrl}${url}`;
        const urlSegments = getUrlSegments(url);
        const params = getParameters(urlSegments);
        this.routes.push({
            method,
            url,
            params,
            callback,
        });
    }

    /**
     * Listen for a `GET` on `url`, then execute `callback`
     * @param method
     * @param url
     * @param callback
     */
    get(url: string, callback: RequestHandler) {
        this.on("GET", url, callback);
    }
    /**
     * Listen for a `POST` on `url`, then execute `callback`
     * @param method
     * @param url
     * @param callback
     */
    post(url: string, callback: RequestHandler) {
        this.on("POST", url, callback);
    }
    /**
     * Listen for a `PUT` on `url`, then execute `callback`
     * @param method
     * @param url
     * @param callback
     */
    put(url: string, callback: RequestHandler) {
        this.on("PUT", url, callback);
    }
    /**
     * Listen for a `PATCH` on `url`, then execute `callback`
     * @param method
     * @param url
     * @param callback
     */
    patch(url: string, callback: RequestHandler) {
        this.on("PATCH", url, callback);
    }
    /**
     * Listen for a `DELETE` on `url`, then execute `callback`
     * @param method
     * @param url
     * @param callback
     */
    delete(url: string, callback: RequestHandler) {
        this.on("DELETE", url, callback);
    }
}
