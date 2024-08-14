import { RestController } from "@/rest/controller.abstract";
import { Service } from "./service";

export class Controller extends RestController {
    constructor() {
        super();
        this.service = new Service();
    }
}
