import { Model, Schema } from "localstorage-orm";
import { LocalStorage } from "node-localstorage";

if (typeof window === "undefined") {
    global.localStorage = new LocalStorage("./data");
}

export class LocalStorageRepository<T extends Schema> implements Repository<T> {
    readonly model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    all(): Promise<T[]> {
        return new Promise((resolve, reject) => {
            try {
                const records = this.model.list();

                resolve(records);
            } catch (e) {
                reject(e);
            }
        });
    }
    get(id: any): Promise<T> {
        return new Promise((resolve, reject) => {
            try {
                const record = this.model.get(id);

                resolve(record);
            } catch (e) {
                reject(e);
            }
        });
    }
}
