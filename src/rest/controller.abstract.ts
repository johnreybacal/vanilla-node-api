import { Repository } from "../repository/repository";
import { Request } from "../streams/request";
import { Response } from "../streams/response";
import { RestControllerInterface } from "./controller.interface";

export abstract class RestController<T> implements RestControllerInterface {
    service: Repository<T>;

    constructor(service: Repository<T>) {
        this.service = service;
    }

    index = async (_req: Request, res: Response) => {
        const result = await this.service.all();
        res.success(result);
    };
    show = async (req: Request, res: Response) => {
        const result = await this.service.get(req.params.id);
        if (result) {
            res.success(result);
        } else {
            res.notFound();
        }
    };
    create = async (req: Request, res: Response) => {
        await req.parseBody();
        const result = await this.service.insert(req.body);
        res.created(result);
    };
    update = async (req: Request, res: Response) => {
        await req.parseBody();
        const result = await this.service.update(req.params.id, req.body);
        if (result) {
            res.success(result);
        } else {
            res.notFound();
        }
    };
    destroy = async (req: Request, res: Response) => {
        const result = await this.service.delete(req.params.id);
        if (result) {
            res.success(result);
        } else {
            res.notFound();
        }
    };
}
