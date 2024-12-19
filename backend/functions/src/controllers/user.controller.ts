import {Request, Response} from "express";
import {StatusCodeEnum} from "../interfaces/status-code-enum.interface";
import {
  LogLevelsEnum,
} from "../interfaces/log-levels-enum.interface";
import {response} from "../utils/base-controller.utils";
import {log} from "../utils/log.utils";
import {IUserController} from "../interfaces/user-controller.interface";
import {UserRepository} from "../dao/user.repository";
import {ControllersEnum} from "../interfaces/controllers.interface";

/**
 * Controller for user routes
 */
export class UserController implements IUserController {
  /**
   * Get users by email method
   * @param {Request} req Express request param
   * @param {Response} res Express response param
   */
  async getUserByEmail(req: Request, res: Response): Promise<void> {
    try {
      const {email} = req.params;
      const userRepository = new UserRepository();
      const user = await userRepository.findByEmail(email);

      if (!user) {
        response(
          res,
          StatusCodeEnum.NotFound,
          "User not found"
        );
        return;
      }

      response(res, StatusCodeEnum.OK, {
        email,
      });
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    } catch (error: any) {
      log(
        ControllersEnum.User,
        "getUserByEmail",
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
