import { LocalStorageRepository } from "@/repository/ls.repository";
import { model } from "./model";
import { User } from "./type";

export class Service extends LocalStorageRepository<User> {
    constructor() {
        super(model);
    }
}
