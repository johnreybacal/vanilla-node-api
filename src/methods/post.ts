import { IncomingMessage, ServerResponse } from "http";

export function post(req: IncomingMessage, res: ServerResponse) {
    const url = req.url?.split("/");

    res.setHeader("Content-Type", "application/json");
    if (!url) {
        res.end();
        return;
    }

    const result = {};
    if (url[1]) {
        const model = url[1];
    }

    res.write(JSON.stringify(result));
    res.end();
}
