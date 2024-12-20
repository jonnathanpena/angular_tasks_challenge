import { TaskStatusEnum } from "./task-status-enum";

export interface ITask {
  id: string;
  title: string;
  description: string;
  owner: String;
  status: TaskStatusEnum;
  cratedAt: Date;
  updatedAt: Date;
}
