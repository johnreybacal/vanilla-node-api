import { Model } from "localstorage-orm";
import { User } from "./type";

export const model = new Model<User>("users");
