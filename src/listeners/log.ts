import { Response } from "../types/response";

export function log(res: Response) {
    const req = res.req;
    console.log(`${req.method} ${req.url} - ${res.statusCode}`);
}
