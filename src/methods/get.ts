import { IncomingMessage, ServerResponse } from "http";

export function get(req: IncomingMessage, res: ServerResponse) {
    const url = req.url?.split("/");

    res.setHeader("Content-Type", "application/json");
    if (!url) {
        res.end();
        return;
    }

    const result = {};
    if (url[1]) {
        const model = url[1];
        Object.assign(result, {
            model,
        });
        if (url[2]) {
            const id = url[2];
            Object.assign(result, {
                id,
            });
        }
    }

    res.write(JSON.stringify(result));
    res.end();
}
