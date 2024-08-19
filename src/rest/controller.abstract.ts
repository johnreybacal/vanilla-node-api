import { Repository } from "../repository/repository";
import { Request } from "../streams/request";
import { Response } from "../streams/response";
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
        if (result) {
            res.success(result);
        } else {
            res.notFound();
        }
    }
    async create(req: Request, res: Response) {
        await req.parseBody();
        const result = await this.service.insert(req.body);
        res.created(result);
    }
    async update(req: Request, res: Response): Promise<void> {
        await req.parseBody();
        const result = await this.service.update(req.resourceId, req.body);
        if (result) {
            res.success(result);
        } else {
            res.notFound();
        }
    }
    async destroy(req: Request, res: Response) {
        const result = await this.service.delete(req.resourceId);
        if (result) {
            res.success(result);
        } else {
            res.notFound();
        }
    }
}
