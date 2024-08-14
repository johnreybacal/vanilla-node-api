import { IncomingMessage } from "http";

export class Request extends IncomingMessage {
    body?: any;
    resource?: string;
    resourceId?: string;
}
