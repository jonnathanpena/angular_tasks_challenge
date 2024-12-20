import {Response} from "express";
import {ICustomRequest} from "./custom-request.interface";

export interface ITaskController {
  getTasks(req: ICustomRequest, res: Response): Promise<void>;
  createTask(req: ICustomRequest, res: Response): Promise<void>;
  updateTask(req: ICustomRequest, res: Response): Promise<void>;
  deleteTask(req: ICustomRequest, res: Response): Promise<void>;
}
