import { ControllerManager } from "../controllerManager";
import { UserController } from "./user/controller";

export function registerComponents() {
    ControllerManager.instance.register("users", new UserController());
}
