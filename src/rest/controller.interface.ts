import { Repository } from "../repository/repository";
import { Request } from "../streams/request";
import { Response } from "../streams/response";

export interface RestControllerInterface {
    service: Repository<any>;

    //GET

    /**
     * Get resouces
     * @param req
     * @param res
     */
    index(req: Request, res: Response): Promise<void>;
    /**
     * Get a specific resource
     */
    show(req: Request, res: Response): Promise<void>;

    //POST
    /**
     * Create a new resource
     * @param req
     * @param res
     */
    create(req: Request, res: Response): Promise<void>;

    //PATCH/PUT
    /**
     * Update a resource
     * @param req
     * @param res
     */
    update(req: Request, res: Response): Promise<void>;

    //DELETE
    /**
     * Delete a resource
     * @param req
     * @param res
     */
    destroy(req: Request, res: Response): Promise<void>;
}
