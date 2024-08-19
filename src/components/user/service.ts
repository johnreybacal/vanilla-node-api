import { LocalStorageRepository } from "../../repository/ls.repository";
import { model } from "./model";
import { User } from "./type";

class Service extends LocalStorageRepository<User> {
    constructor() {
        super(model);
    }
}

export const userService = new Service();
