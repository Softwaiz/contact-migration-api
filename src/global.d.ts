import { BaseContext } from "@apollo/server";
import EventEmitter from "events";
import { User } from "./db/schema";

declare global {
    /// je mettrai les extensions necessaires
}

interface ApplicationContext extends BaseContext {
    db: DatabaseClient;
}

declare module "express-serve-static-core" {
    export interface Request {
        /// je mettrai les extensions express necessaires
    }
}