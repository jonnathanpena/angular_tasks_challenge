import {firestore} from "firebase-admin";
import {Request, Response} from "express";
import {StatusCodeEnum} from "../interfaces/status-code-enum.interface";
import {
  ControllersEnum,
  LogLevelsEnum,
} from "../interfaces/log-levels-enum.interface";
import {response} from "../utils/base-controller.utils";
import {log} from "../utils/log.utils";
import {IUserController} from "../interfaces/user-controller.interface";
import {Database} from "../config/database";

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
      const db: firestore.Firestore = Database.getInstance();
      const snapshot = await db
        .collection("users")
        .get()
        .then((querySnapshot) => {
          const users: any[] = [];
          querySnapshot.forEach((doc) => {
            users.push(doc.data());
          });
          return users;
        });

      response(res, StatusCodeEnum.OK, {
        email,
        snapshot,
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
