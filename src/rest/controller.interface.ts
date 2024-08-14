import { Repository } from "@/repository/repository";
import { IncomingMessage, ServerResponse } from "http";

interface RestControllerInterface {
    service: Repository<any>;

    //GET

    /**
     * Get resouces
     * @param req
     * @param res
     */
    list(req: IncomingMessage, res: ServerResponse);
    /**
     * Get a specific resource
     */
    get(req: IncomingMessage, res: ServerResponse);

    //POST
    /**
     * Creates a new resource
     * @param req
     * @param res
     */
    insert(req: IncomingMessage, res: ServerResponse);
}
