import {Task} from "../models/task.model";

export interface ITaskRepository {
  getAll: (email: string) => Promise<Task[]>;
  create: (task: Task) => Promise<Task|string>;
  update: (task: Task) => Promise<Task|string>;
  delete: (id: string) => Promise<void>;
}
