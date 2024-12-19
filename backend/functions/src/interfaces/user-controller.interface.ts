import {
  Request,
  Response,
} from "express";

export interface IUserController {
  getUserByEmail(req: Request, res: Response): Promise<void>;
  createUser(req: Request, res: Response): Promise<void>;
}
