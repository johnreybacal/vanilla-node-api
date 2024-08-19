import { RestController } from "../../rest/controller.abstract";
import { userService } from "./service";
import { User } from "./type";

class Controller extends RestController<User> {
    constructor() {
        super(userService);
    }
}

export const userController = new Controller();
