import { ServerResponse } from "http";

export interface Response extends ServerResponse {
    /**
     * Returns a successful response
     * @param data
     * @param status defaults to 200
     * @returns
     */
    success: (data: any, status?: number) => Response;
    /**
     * Returns a successful response for create operations (201)
     * @param data
     * @returns
     */
    created: (data: any) => Response;
    /**
     * Returns a client error
     * @param error
     * @param status defaults to 400
     * @returns
     */
    clientError: (error: any, status?: number) => Response;
    /**
     * Returns a not found error (404)
     */
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
    const startDate = new Date();
    const res: Response = serverResponse as Response;

    res.setHeader("Content-Type", "application/json");

    res.success = success;
    res.created = created;
    res.clientError = clientError;
    res.notFound = notFound;

    res.on("finish", () => {
        const req = res.req;
        const timeElapsed = new Date().getTime() - startDate.getTime();
        console.log(
            `${req.method} ${req.url} ${res.statusCode} ${timeElapsed}ms`
        );
    });

    return res;
}
