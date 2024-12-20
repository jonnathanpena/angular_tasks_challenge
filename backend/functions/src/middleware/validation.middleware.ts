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

/**
 * Validation body for create a task
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param {NextFunction} next Express nextfunction object
 */
export const createTaskValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const {title, description} = req.body;

  if (!title || !description) {
    response(
      res,
      StatusCodeEnum.BadRequest, {
        message: "Title and description task are required.",
      }
    );

    return;
  }
  next();
};

/**
 * Validation body for update a task
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 *
 * @param {NextFunction} next Express nextfunction object
 */
export const updateTaskValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const {title, description, status} = req.body;

  if (!title || !description || !status) {
    response(
      res,
      StatusCodeEnum.BadRequest, {
        message: "Title, description and status task are required.",
      }
    );

    return;
  }
  next();
};
