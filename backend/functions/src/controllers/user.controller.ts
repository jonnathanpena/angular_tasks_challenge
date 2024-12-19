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
import {emailValidationPattern} from "../utils/input-validation-patterns.utils";

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

  /**
   * Create an user
   * @param {Request} req Express request object
   * @param {Response} res Express response object
   */
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const {email} = req.body;
      const isAnValidEmail = emailValidationPattern(email);

      if (!isAnValidEmail) {
        response(
          res,
          StatusCodeEnum.BadRequest,
          "Email value is not valid"
        );
        return;
      }

      const userRepository = new UserRepository();
      const user = await userRepository.findByEmail(email);

      if (user) {
        response(
          res,
          StatusCodeEnum.Conflict,
          "User already exists"
        );
        return;
      }

      const newUser = await userRepository.create(email);

      response(
        res,
        StatusCodeEnum.Created, {
          id: newUser.id,
          email: newUser.email,
        });
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    } catch (error: any) {
      log(
        ControllersEnum.User,
        "createUser",
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
