import {TaskStatusEnum} from "../interfaces/task-status-enum.interface";

/**
 * Task model class
 */
export class Task {
  id?: string;
  title: string;
  description: string;
  owner: string;
  status: TaskStatusEnum;
  cratedAt: Date;
  updatedAt: Date;

  /**
   * Task model constructor
   * @param {string} title Task title
   * @param {string} description Task description
   * @param {string} owner Task owner email
   * @param {TaskStatusEnum} status Task status
   */
  constructor(
    title: string,
    description: string,
    owner: string,
    status?: TaskStatusEnum,
  ) {
    this.title = title;
    this.description = description;
    this.owner = owner;
    this.status = status ?? TaskStatusEnum.Backlog;
    this.cratedAt = new Date();
    this.updatedAt = new Date();
  }
}
