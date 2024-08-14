import { createServer } from "node:http";
import { registerComponents } from "./components/register";
import { baseUrl } from "./config/server";
import { ControllerManager } from "./controllerManager";
import { Request } from "./types/request";

export const server = createServer((req: Request, res) => {
    registerComponents();

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
    if (method === "GET") {
        if (req.resourceId) {
            controller.get(req, res);
        } else {
            controller.list(req, res);
        }
    } else if (method === "DELETE") {
        controller.delete(req, res);
    } else {
        const chunks: any[] = [];
        req.on("data", (chunk) => {
            chunks.push(chunk);
        }).on("end", async () => {
            const bodyStr = Buffer.concat(chunks).toString();
            req.body = JSON.parse(bodyStr);

            if (method === "POST") {
                controller.insert(req, res);
            }
        });
    }
});
