import { createServer, IncomingMessage, ServerResponse } from "node:http";
import { registerComponents } from "./components/register";
import { baseUrl } from "./config/server";
import { ControllerManager } from "./controllerManager";
import { events } from "./events";
import { log } from "./listeners/log";
import { parseBody, Request } from "./types/request";
import {
    clientError,
    created,
    Response,
    send,
    success,
} from "./types/response";

function decorateRequest(incomingMessage: IncomingMessage) {
    const request: Request = incomingMessage as Request;

    request.parseBody = parseBody;

    return request;
}

function decorateResponse(serverResponse: ServerResponse) {
    const response: Response = serverResponse as Response;

    response.send = send;
    response.success = success;
    response.created = created;
    response.clientError = clientError;

    return response;
}

export const server = createServer(async (incomingMessage, serverResponse) => {
    registerComponents();
    events.on("log", log);

    const req = decorateRequest(incomingMessage);
    const res = decorateResponse(serverResponse);

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
        res.send();
    }
});
