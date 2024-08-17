import { ServerResponse } from "http";
import { Repository } from "../repository/repository";
import { Request } from "../types/request";
import { RestControllerInterface } from "./controller.interface";

export abstract class RestController<T> implements RestControllerInterface {
    service: Repository<T>;

    constructor(service: Repository<T>) {
        this.service = service;
    }

    protected async handle({
        res,
        cb,
        status,
    }: {
        res: ServerResponse;
        cb: Function;
        status: number;
    }) {
        const result = await cb();

        res.statusCode = status;
        res.write(JSON.stringify(result));
    }
    async list(req: Request, res: ServerResponse) {
        const cb = async () => {
            return await this.service.all();
        };
        await this.handle({
            res,
            cb,
            status: 200,
        });
    }
    async get(req: Request, res: ServerResponse) {
        const cb = async () => {
            return await this.service.get(req.resourceId);
        };
        await this.handle({
            res,
            cb,
            status: 200,
        });
    }
    async insert(req: Request, res: ServerResponse) {
        const cb = async () => {
            return await this.service.insert(await req.parseBody());
        };
        await this.handle({
            res,
            cb,
            status: 201,
        });
    }
    async update(req: Request, res: ServerResponse): Promise<void> {
        const cb = async () => {
            await req.parseBody();
            return await this.service.update(req.resourceId, req.body);
        };
        await this.handle({
            res,
            cb,
            status: 201,
        });
    }
    async delete(req: Request, res: ServerResponse) {
        const cb = async () => {
            return await this.service.delete(req.resourceId);
        };
        await this.handle({
            res,
            cb,
            status: 200,
        });
    }
}
