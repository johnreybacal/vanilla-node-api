import { Repository } from "@/repository/repository";
import { Request } from "@/types/request";
import { ServerResponse } from "http";

export interface RestControllerInterface {
    service: Repository<any>;

    //GET

    /**
     * Get resouces
     * @param req
     * @param res
     */
    list(req: Request, res: ServerResponse);
    /**
     * Get a specific resource
     */
    get(req: Request, res: ServerResponse);

    //POST
    /**
     * Creates a new resource
     * @param req
     * @param res
     */
    insert(req: Request, res: ServerResponse);
}
