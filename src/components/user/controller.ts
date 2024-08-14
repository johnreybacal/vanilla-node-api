import { RestController } from "../../rest/controller.abstract";
import { Service } from "./service";
import { User } from "./type";

export class UserController extends RestController<User> {
    constructor() {
        super(new Service());
    }
}
