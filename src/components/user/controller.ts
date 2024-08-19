import { Request } from "@/streams/request";
import { Response } from "@/streams/response";
import { RestController } from "../../rest/controller.abstract";
import { userService } from "./service";
import { User } from "./type";

class Controller extends RestController<User> {
    constructor() {
        super(userService);
    }

    longDelay = async (_req: Request, res: Response) => {
        const start = new Date();
        setTimeout(() => {
            const current = new Date();
            res.success({
                start,
                current,
                ms_elapsed: current.getTime() - start.getTime(),
            });
        }, 2000);
    };

    streaming = async (_req: Request, res: Response) => {
        res.write('{"streamData": [');
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                res.write(`"${String.fromCharCode(i + 97)}"`);
                if (i < 99) {
                    res.write(",");
                } else {
                    res.write("]}");
                    res.end();
                }
            }, i * 50);
        }
    };
}

export const userController = new Controller();
