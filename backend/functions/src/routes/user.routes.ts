import {Router} from "express";
import {UserController} from "../controllers/user.controller";
import {validateUserEmail} from "../middleware/validation.middleware";

/**
 * All user routes declarations
 */
export class UserRoutes {
  private router: Router;
  private controller: UserController;

  /**
   * UserRoutes constructor
   */
  constructor() {
    this.router = Router();
    this.controller = new UserController();
    this.initializeRoutes();
  }

  /**
   * Initialize user routes
   */
  private initializeRoutes(): void {
    this.router.get(
      "/:email",
      validateUserEmail,
      this.controller.getUserByEmail,
    );
    this.router.post(
      "/",
      this.controller.createUser,
    );
  }

  /**
   * Used by application class to get all user routes
   * @return {Router} all user routers returned
   */
  getRouter(): Router {
    return this.router;
  }
}
