import { Request } from "@/streams/request";
import { Response } from "@/streams/response";

export type RequestHandler = (req: Request, res: Response) => Promise<void>;
export type Parameters = Record<number, string>;
export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface Route {
    url: string;
    method: Method;
    params: Parameters;
    callback: RequestHandler;
}
