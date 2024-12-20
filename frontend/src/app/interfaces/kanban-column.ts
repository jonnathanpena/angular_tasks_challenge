import { ITask } from "./task";

export interface KanbanColumn {
  id: string;
  title: string;
  tasks: ITask[];
}
