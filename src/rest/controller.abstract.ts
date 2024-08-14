import { baseUrl } from "@/config.ts/server";
import { Repository } from "@/repository/repository";
import { Request } from "@/types/request";
import { ServerResponse } from "http";
import { RestControllerInterface } from "./controller.interface";

export abstract class RestController implements RestControllerInterface {
    service: Repository<any>;
    async list(req: Request, res: ServerResponse) {
        try {
            const result = await this.service.all();

            res.statusCode = 200;
            res.write(JSON.stringify(result));
        } catch (e) {
            res.statusCode = 500;
            res.write(JSON.stringify(e));
        } finally {
            res.end();
        }
    }
    async get(req: Request, res: ServerResponse) {
        const url = new URL(req.url!, baseUrl);
        const urlSegments = url.pathname.split("/");
        try {
            const result = await this.service.get(urlSegments[2]);

            res.statusCode = 200;
            res.write(JSON.stringify(result));
        } catch (e) {
            res.statusCode = 500;
            res.write(JSON.stringify(e));
        } finally {
            res.end();
        }
    }
    async insert(req: Request, res: ServerResponse) {
        try {
            const result = await this.service.insert(req.body);

            res.statusCode = 200;
            res.write(JSON.stringify(result));
        } catch (e) {
            res.statusCode = 500;
            res.write(JSON.stringify(e));
        } finally {
            res.end();
        }
    }
}
