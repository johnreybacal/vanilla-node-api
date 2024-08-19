import { ServerResponse } from "http";

export interface Response extends ServerResponse {
    success: (data: any, status?: number) => Response;
    created: (data: any) => Response;
    clientError: (error: any, status?: number) => Response;
    notFound: (error?: any) => Response;
}

function success(this: Response, data: any, status = 200) {
    this.statusCode = status;
    this.write(JSON.stringify(data));
    return this.end();
}
function created(this: Response, data: any) {
    this.statusCode = 201;
    this.write(JSON.stringify(data));
    return this.end();
}
function clientError(this: Response, error: any, status = 400) {
    this.statusCode = status;
    this.write(JSON.stringify(error));
    return this.end();
}
function notFound(
    this: Response,
    error: any = { message: "Resource not found" }
) {
    this.statusCode = 404;
    this.write(JSON.stringify(error));
    return this.end();
}

export function decorateResponse(serverResponse: ServerResponse): Response {
    const res: Response = serverResponse as Response;

    res.setHeader("Content-Type", "application/json");

    res.success = success;
    res.created = created;
    res.clientError = clientError;
    res.notFound = notFound;

    res.on("finish", () => {
        const req = res.req;
        console.log(`${req.method} ${req.url} - ${res.statusCode}`);
    });

    return res;
}
