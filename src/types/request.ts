import { IncomingMessage } from "http";

export interface Request extends IncomingMessage {
    body?: any;
    resource?: string;
    resourceId?: string;

    parseBody?: Function;
}
