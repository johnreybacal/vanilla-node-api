import { ServerResponse } from "http";

export interface Response extends ServerResponse {
    success: (data: any, status?: number) => Response;
    created: (data: any) => Response;
    clientError: (error: any, status?: number) => Response;
}

export function success(this: Response, data: any, status = 200) {
    this.statusCode = status;
    this.write(JSON.stringify(data));
    return this.end();
}
export function created(this: Response, data: any) {
    this.statusCode = 201;
    this.write(JSON.stringify(data));
    return this.end();
}
export function clientError(this: Response, error: any, status = 400) {
    this.statusCode = status;
    this.write(JSON.stringify(error));
    return this.end();
}
