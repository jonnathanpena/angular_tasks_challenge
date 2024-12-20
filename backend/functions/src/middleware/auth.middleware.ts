import {
  Response,
  NextFunction,
} from "express";
import {response} from "../utils/base-controller.utils";
import {StatusCodeEnum} from "../interfaces/status-code-enum.interface";
import {JWTService} from "../services/jwt.service";
import {ICustomRequest} from "../interfaces/custom-request.interface";

/**
 * Auth middleware method
 * @param {ICustomRequest} req Express request object
 * @param {Response} res Express response object
 * @param {NextFunction} next Express nextfunction
 */
export const authMiddleware = (
  req: ICustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const unauthorizedErrorMessage = "Unauthorized";
  const {authorization} = req.headers;
  const token = authorization?.split(" ")[1];

  if (!token) {
    response(
      res,
      StatusCodeEnum.Unauthorized,
      unauthorizedErrorMessage,
    );
    return;
  }

  const user = new JWTService().verify(token);
  if (typeof user === "string") {
    response(
      res,
      StatusCodeEnum.Unauthorized,
      unauthorizedErrorMessage,
    );
    return;
  }
  req.user = user;

  next();
};
