import { ITask } from "./task";
import { TaskStatusEnum } from "./task-status-enum";

export interface IKanbanColumn {
  id: TaskStatusEnum;
  title: string;
  tasks: ITask[];
}
