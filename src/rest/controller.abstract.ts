import { Repository } from "../repository/repository";
import { Request } from "../types/request";
import { Response } from "../types/response";
import { RestControllerInterface } from "./controller.interface";

export abstract class RestController<T> implements RestControllerInterface {
    service: Repository<T>;

    constructor(service: Repository<T>) {
        this.service = service;
    }

    async index(_req: Request, res: Response) {
        const result = await this.service.all();
        res.success(result);
    }
    async show(req: Request, res: Response) {
        const result = await this.service.get(req.resourceId);
        res.success(result);
    }
    async create(req: Request, res: Response) {
        await req.parseBody();
        const result = await this.service.insert(req.body);
        res.created(result);
    }
    async update(req: Request, res: Response): Promise<void> {
        await req.parseBody();
        const result = await this.service.update(req.resourceId, req.body);
        res.success(result);
    }
    async destroy(req: Request, res: Response) {
        const result = await this.service.delete(req.resourceId);
        res.success(result);
    }
}
