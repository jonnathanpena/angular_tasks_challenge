import {User} from "../models/user.model";
import {Request} from "express";

export interface ICustomRequest extends Request {
  user?: User;
}
