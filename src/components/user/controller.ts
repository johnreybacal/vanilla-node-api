import { IncomingMessage, ServerResponse } from "http";
import { Service } from "./service";
import { User } from "./type";

export class Controller {
    service: Repository<User>;

    constructor() {
        this.service = new Service();
    }

    async list(_req: IncomingMessage, res: ServerResponse) {
        res.setHeader("Content-Type", "application/json");
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

    async insert(req: IncomingMessage, res: ServerResponse) {
        res.setHeader("Content-Type", "application/json");
        try {
            const chunks: any[] = [];

            req.on("data", (chunk) => {
                chunks.push(chunk);
            }).on("end", async () => {
                const bodyStr = Buffer.concat(chunks).toString();
                const body = JSON.parse(bodyStr);
                console.log(body);

                const result = await this.service.insert(body);

                res.statusCode = 200;
                res.write(JSON.stringify(result));
            });
        } catch (e) {
            res.statusCode = 500;
            res.write(JSON.stringify(e));
        } finally {
            res.end();
        }
    }
}
