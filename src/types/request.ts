import { IncomingMessage } from "http";

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
