import { createServer } from "node:http";
import { get } from "./methods/get";
import { post } from "./methods/post";

export const server = createServer((req, res) => {
    switch (req.method) {
        case "GET":
            get(req, res);
            break;
        case "POST":
            post(req, res);
            break;
    }
});
