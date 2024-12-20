import {Response} from "express";
import {ControllersEnum} from "../interfaces/controllers.interface";
import {LogLevelsEnum} from "../interfaces/log-levels-enum.interface";
import {Task} from "../models/task.model";
import {response} from "../utils/base-controller.utils";
import {log} from "../utils/log.utils";
import {TaskRepository} from "../dao/task.repository";
import {ICustomRequest} from "../interfaces/custom-request.interface";
import {StatusCodeEnum} from "../interfaces/status-code-enum.interface";
import {ITaskController} from "../interfaces/task-controller.interface";

/**
 * TaskController class
 */
export class TaskController implements ITaskController {
  /** Get tasks by email owner
   * @param {ICustomRequest} req Custom request object
   * @param {Response} res Express response object
   * @return {Promise<void>} Promise void
   */
  async getTasks(req: ICustomRequest, res: Response): Promise<void> {
    try {
      const {user} = req;
      const taskRepository = new TaskRepository();
      const tasks = await taskRepository.getAll(user?.email ?? "");

      response(res, StatusCodeEnum.OK, tasks);
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    } catch (error: any) {
      log(
        ControllersEnum.Task,
        "getTasks",
        error?.message ?? "",
        LogLevelsEnum.Error,
      );
      response(
        res,
        StatusCodeEnum.InternalServerError,
        error?.message ?? "",
      );
    }
  }

  /**
   * Create a task
   * @param {ICustomRequest} req ICustomRequest request param
   * @param {Response} res Express response param
   */
  async createTask(req: ICustomRequest, res: Response): Promise<void> {
    try {
      const {user} = req;
      const {title, description} = req.body;
      const taskRepository = new TaskRepository();
      const task = new Task(title, description, user?.email ?? "");

      await taskRepository.create(task);

      response(res, StatusCodeEnum.OK, task);
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    } catch (error: any) {
      log(
        ControllersEnum.Task,
        "createTask",
        error?.message ?? "",
        LogLevelsEnum.Error,
      );
      response(
        res,
        StatusCodeEnum.InternalServerError,
        error?.message ?? "",
      );
    }
  }

  /**
   * Update a task
   * @param {ICustomRequest} req ICustomRequest request param
   * @param {Response} res Express response param
   */
  async updateTask(req: ICustomRequest, res: Response): Promise<void> {
    try {
      const {user} = req;
      const {taskId} = req.params;
      const {title, description, status} = req.body;
      const taskRepository = new TaskRepository();
      const task = new Task(title, description, user?.email ?? "", status);
      task.id = taskId;

      await taskRepository.update(task);

      response(res, StatusCodeEnum.OK, task);
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    } catch (error: any) {
      log(
        ControllersEnum.Task,
        "updateTask",
        error?.message ?? "",
        LogLevelsEnum.Error,
      );
      response(
        res,
        StatusCodeEnum.InternalServerError,
        error?.message ?? "",
      );
    }
  }

  /**
   * Delete a task
   * @param {ICustomRequest} req Custom request
   * @param {Response} res Express response objecto
   */
  async deleteTask(req: ICustomRequest, res: Response): Promise<void> {
    try {
      const {taskId} = req.params;
      const taskRepository = new TaskRepository();

      await taskRepository.delete(taskId);

      response(res, StatusCodeEnum.OK, null);
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    } catch (error: any) {
      log(
        ControllersEnum.Task,
        "deleteTask",
        error?.message ?? "",
        LogLevelsEnum.Error,
      );
      response(
        res,
        StatusCodeEnum.InternalServerError,
        error?.message ?? "",
      );
    }
  }
}
