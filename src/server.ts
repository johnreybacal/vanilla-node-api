import { createServer } from "node:http";
import { registerComponents } from "./components/register";
import { ControllerManager } from "./controllerManager";
import { decorateRequest } from "./streams/request";
import { decorateResponse } from "./streams/response";

export const server = createServer(async (incomingMessage, serverResponse) => {
    registerComponents();

    const req = decorateRequest(incomingMessage);
    const res = decorateResponse(serverResponse);

    const method = req.method;

    if (!req.resource) {
        res.statusCode = 404;
        res.end();
    }

    const controller = ControllerManager.instance.getController(req.resource!);

    try {
        if (method === "GET") {
            if (req.resourceId) {
                controller.show(req, res);
            } else {
                controller.index(req, res);
            }
        } else if (method === "DELETE") {
            controller.destroy(req, res);
        } else if (method === "POST") {
            controller.create(req, res);
        } else if (method === "PATCH" || method === "PUT") {
            controller.update(req, res);
        }
    } catch (e) {
        console.log(e);
        res.statusCode = 500;
        res.write(JSON.stringify(e));
        res.end();
    }
});
