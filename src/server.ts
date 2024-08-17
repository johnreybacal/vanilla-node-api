import { createServer } from "node:http";
import { registerComponents } from "./components/register";
import { baseUrl } from "./config/server";
import { ControllerManager } from "./controllerManager";
import { parseBody, Request } from "./types/request";

export const server = createServer(async (incomingMessage, res) => {
    registerComponents();

    const req: Request = incomingMessage as Request;

    req.parseBody = parseBody;

    const method = req.method;
    const url = new URL(req.url!, baseUrl);
    const urlSegments = url.pathname.split("/");

    if (urlSegments[1]) {
        req.resource = urlSegments[1];

        if (urlSegments[2]) {
            req.resourceId = urlSegments[2];
        }
    }

    res.setHeader("Content-Type", "application/json");

    if (!req.resource) {
        res.statusCode = 404;
        res.end();
    }

    const controller = ControllerManager.instance.getController(req.resource!);

    try {
        if (method === "GET") {
            if (req.resourceId) {
                await controller.get(req, res);
            } else {
                await controller.list(req, res);
            }
        } else if (method === "DELETE") {
            await controller.delete(req, res);
        } else if (method === "POST") {
            await controller.insert(req, res);
        } else if (method === "PATCH" || method === "PUT") {
            await controller.update(req, res);
        }
    } catch (e) {
        console.log(e);
        res.statusCode = 500;
        res.write(JSON.stringify(e));
    }

    console.log(`${method} ${url.pathname} - ${res.statusCode}`);
    res.end();
});
