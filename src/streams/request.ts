import { IncomingMessage } from "http";
import { baseUrl } from "../config/server";

export interface Request extends IncomingMessage {
    /**
     * Request body
     */
    body: any;
    /**
     * Identifies the REST resource
     */
    resource: string;
    /**
     * Identifies the record of a REST resource
     */
    resourceId: string;
    /**
     * Parses the stream into the body property
     *
     * This function also returns the parsed body
     * @returns parsed body
     */
    parseBody: () => Promise<any>;
}

function parseBody(this: Request) {
    return new Promise((resolve, reject) => {
        try {
            const chunks: any[] = [];
            this.on("data", (chunk) => {
                chunks.push(chunk);
            }).on("end", async () => {
                const bodyStr = Buffer.concat(chunks).toString();
                this.body = JSON.parse(bodyStr);

                resolve(this.body);
            });
        } catch (e) {
            reject(e);
        }
    });
}

export function decorateRequest(incomingMessage: IncomingMessage): Request {
    const req: Request = incomingMessage as Request;

    const url = new URL(req.url!, baseUrl);
    const urlSegments = url.pathname.split("/").filter((seg) => seg);

    if (urlSegments[0]) {
        req.resource = urlSegments[0];

        if (urlSegments[1]) {
            req.resourceId = urlSegments[1];
        }
    }

    req.parseBody = parseBody;

    return req;
}
