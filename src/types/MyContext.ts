import { Request } from "express";
import { User } from "src/entity/User";

interface MyRequest extends Request {
    user?: User;
}

export interface MyContext {
    req: MyRequest;
}
