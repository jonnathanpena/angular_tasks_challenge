import {Router} from "express";
import {TaskController} from "../controllers/task.controller";
import {authMiddleware} from "../middleware/auth.middleware";
import {
  createTaskValidation,
  updateTaskValidation,
} from "../middleware/validation.middleware";

/**
 * All task routes declarations
 */
export class TaskRoutes {
  private router: Router;
  private controller: TaskController;

  /**
   * TaskRoutes constructor
   */
  constructor() {
    this.router = Router();
    this.controller = new TaskController();
    this.initializeRoutes();
  }

  /**
   * Initialize task routes
   */
  private initializeRoutes(): void {
    this.router.get(
      "/",
      authMiddleware,
      this.controller.getTasks,
    );
    this.router.post(
      "/",
      authMiddleware,
      createTaskValidation,
      this.controller.createTask
    );
    this.router.put(
      "/:taskId",
      authMiddleware,
      updateTaskValidation,
      this.controller.updateTask
    );
    this.router.delete(
      "/:taskId",
      authMiddleware,
      this.controller.deleteTask
    );
  }

  /**
   * Used by application class to get all tasks routes
   * @return {Router} all tasks routers returned
   */
  getRouter(): Router {
    return this.router;
  }
}
