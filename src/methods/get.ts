import { userController } from "@/components/user";
import { baseUrl } from "@/config/server";
import { IncomingMessage, ServerResponse } from "http";
import { URL } from "url";

export function get(req: IncomingMessage, res: ServerResponse) {
    const url = new URL(req.url!, baseUrl);
    const urlSegments = url.pathname.split("/");

    res.setHeader("Content-Type", "application/json");
    if (!url) {
        res.end();
        return;
    }

    const result = {};
    let model;
    let id;
    if (urlSegments[1]) {
        model = urlSegments[1];
        Object.assign(result, {
            model,
        });
        if (urlSegments[2]) {
            id = urlSegments[2];
            Object.assign(result, {
                id,
            });
        }
    }

    if (model === "users") {
        if (id) {
            userController.get(req, res);
        } else {
            userController.list(req, res);
        }
    } else {
        res.write(JSON.stringify(result));
        res.end();
    }
}
