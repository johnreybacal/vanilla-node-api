import { createServer } from "node:http";
import { get } from "./methods/get";

export const server = createServer((req, res) => {
    switch (req.method) {
        case "GET":
            get(req, res);
            break;
    }
});
