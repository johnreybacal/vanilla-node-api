import { Repository } from "@/repository/repository";
import { Request } from "@/types/request";
import { ServerResponse } from "http";
import { RestControllerInterface } from "./controller.interface";

export abstract class RestController implements RestControllerInterface {
    service: Repository<any>;
    protected async handle({
        res,
        cb,
        status,
    }: {
        res: ServerResponse;
        cb: Function;
        status: number;
    }) {
        try {
            const result = await cb();

            res.statusCode = status;
            res.write(JSON.stringify(result));
        } catch (e) {
            console.log(e);
            res.statusCode = 500;
            res.write(JSON.stringify(e));
        } finally {
            res.end();
        }
    }
    async list(req: Request, res: ServerResponse) {
        const cb = async () => {
            return await this.service.all();
        };
        this.handle({
            res,
            cb,
            status: 200,
        });
    }
    async get(req: Request, res: ServerResponse) {
        const cb = async () => {
            return await this.service.get(req.resourceId);
        };
        this.handle({
            res,
            cb,
            status: 200,
        });
    }
    async insert(req: Request, res: ServerResponse) {
        const cb = async () => {
            return await this.service.insert(req.body);
        };
        this.handle({
            res,
            cb,
            status: 201,
        });
    }
}
