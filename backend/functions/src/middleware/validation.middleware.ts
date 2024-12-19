import {
  Request,
  Response,
  NextFunction,
} from "express";
import {emailValidationPattern} from "../utils/input-validation-patterns.utils";
import {response} from "../utils/base-controller.utils";
import {StatusCodeEnum} from "../interfaces/status-code-enum.interface";

/**
 * Validation User Email
 * @param {Request} req Request parameters
 * @param {Response} res Response parameters
 * @param {NextFunction} next Next function
 */
export const validateUserEmail = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const {email} = req.params;
  const isValidEmail = emailValidationPattern(email);

  if (!isValidEmail) {
    response(
      res, StatusCodeEnum.BadRequest, {
        message: "Email value is not valid",
      });

    return;
  }
  next();
};
