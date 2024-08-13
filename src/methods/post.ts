import { IncomingMessage, ServerResponse } from "http";
import { userController } from "../components/user";

export function post(req: IncomingMessage, res: ServerResponse) {
    const url = req.url?.split("/");

    res.setHeader("Content-Type", "application/json");
    if (!url) {
        res.end();
        return;
    }

    if (url[1]) {
        const model = url[1];

        if (model === "users") {
            userController.insert(req, res);
        }
    }
}
