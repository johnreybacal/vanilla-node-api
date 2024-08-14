import { RestControllerInterface } from "./rest/controller.interface";

export class ControllerManager {
    static #instance: ControllerManager;

    private constructor() {}

    public static get instance() {
        if (!ControllerManager.#instance) {
            ControllerManager.#instance = new ControllerManager();
            ControllerManager.#instance.resouceMapping = {};
        }

        return ControllerManager.#instance;
    }

    resouceMapping: Record<string, RestControllerInterface>;

    register(resource: string, controller: RestControllerInterface) {
        this.resouceMapping[resource] = controller;
    }

    getController(resource: string) {
        return this.resouceMapping[resource];
    }
}
