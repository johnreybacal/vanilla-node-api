import { events } from "@/events";
import { ServerResponse } from "http";

export interface Response extends ServerResponse {
    success: (data: any, status?: number) => Response;
    created: (data: any) => Response;
    clientError: (error: any, status?: number) => Response;
    send: () => Response;
}

export function success(this: Response, data: any, status = 200) {
    this.statusCode = status;
    this.write(JSON.stringify(data));
    this.send();
    return this;
}
export function created(this: Response, data: any) {
    this.statusCode = 201;
    this.write(JSON.stringify(data));
    this.send();
    return this;
}
export function clientError(this: Response, error: any, status = 400) {
    this.statusCode = status;
    this.write(JSON.stringify(error));
    this.send();
    return this;
}
export function send(this: Response) {
    const req = this.req;
    events.emit("log", this);
    this.end();
    return this;
}