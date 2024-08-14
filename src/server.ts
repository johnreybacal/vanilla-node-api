import { createServer } from "node:http";
import { userController } from "./components/user";
import { baseUrl } from "./config.ts/server";
import { Request } from "./types/request";

export const server = createServer((req: Request, res) => {
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
    } else if (method === "GET") {
        if (req.resourceId) {
            userController.get(req, res);
        } else {
            userController.list(req, res);
        }
    } else {
        const chunks: any[] = [];
        req.on("data", (chunk) => {
            chunks.push(chunk);
        }).on("end", async () => {
            const bodyStr = Buffer.concat(chunks).toString();
            req.body = JSON.parse(bodyStr);

            userController.insert(req, res);
        });
    }
});
