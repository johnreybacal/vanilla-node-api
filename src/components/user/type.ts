import { Schema } from "localstorage-orm";

export interface User extends Schema {
    name: string;
    age: number;
}
