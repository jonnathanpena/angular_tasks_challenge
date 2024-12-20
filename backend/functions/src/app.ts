import * as express from "express";
import {Express} from "express";
import {setupCors} from "./middleware/cors.middleware";
import {UserRoutes} from "./routes/user.routes";
import {TaskRoutes} from "./routes/task.routes";

/**
 * Principal app class
 */
export class App {
  private app: Express;

  /**
   * App class constructor
   */
  constructor() {
    this.app = express();
    this.initializeMiddleware();
    this.initializeRoutes();
  }

  /**
   * Initialize cors middleware
   */
  private initializeMiddleware(): void {
    setupCors(this.app);
  }

  /**
   * Initialize routes
   */
  private initializeRoutes(): void {
    const useRoutes = new UserRoutes();
    const taskRoutes = new TaskRoutes();
    this.app.use("/users", useRoutes.getRouter());
    this.app.use("/tasks", taskRoutes.getRouter());
  }

  /**
   * Singleton to get application object
   * @return {Express} application
   */
  public getApp(): Express {
    return this.app;
  }
}
