import { createServer } from "node:http";
import { get } from "./methods/get";
import { post } from "./methods/post";
import { Request } from "./types/request";

export const server = createServer((req, res) => {
    const method = req.method;

    if (method === "GET") {
        get(req, res);
    } else {
        const chunks: any[] = [];
        req.on("data", (chunk) => {
            chunks.push(chunk);
        }).on("end", async () => {
            const bodyStr = Buffer.concat(chunks).toString();
            const body = JSON.parse(bodyStr);

            const request: Request = req;
            request.body = body;
            post(request, res);
        });
    }
});
