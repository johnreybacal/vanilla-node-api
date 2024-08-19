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
        setTimeout(() => {
            res.success("hehe");
        }, 5000);
    };
}

export const userController = new Controller();
