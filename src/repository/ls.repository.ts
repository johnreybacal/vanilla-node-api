import { Model, Schema } from "localstorage-orm";
import { LocalStorage } from "node-localstorage";
import { Repository } from "./repository";

if (typeof window === "undefined") {
    global.localStorage = new LocalStorage("./data");
}

export abstract class LocalStorageRepository<T extends Schema>
    implements Repository<T>
{
    readonly model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }
    all(): Promise<T[]> {
        return new Promise((resolve, reject) => {
            try {
                const result = this.model.list();

                resolve(result);
            } catch (e) {
                reject(e);
            }
        });
    }
    get(id: any): Promise<T> {
        return new Promise((resolve, reject) => {
            try {
                const result = this.model.get(id);

                resolve(result);
            } catch (e) {
                reject(e);
            }
        });
    }
    insert(record: T): Promise<T> {
        return new Promise((resolve, reject) => {
            try {
                const result = this.model.create(record);

                resolve(result);
            } catch (e) {
                reject(e);
            }
        });
    }
}
