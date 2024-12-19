/* eslint-disable  @typescript-eslint/no-explicit-any */
import {Response} from "express";
import {StatusCodeEnum} from "../interfaces/status-code-enum.interface";

/**
 * All basic controller methods are in here
 */
export class BaseController {
  public StatusCodes = StatusCodeEnum;

  /**
   * Method to return the response JSON and application status code
   * @param {Response} response Response express object
   * @param {StatusCodeEnum} status is the status transaction's code
   * @param {any} data Information to want to print from the API
   */
  response(response: Response, status: StatusCodeEnum, data: any): void {
    if (status == this.StatusCodes.OK || status == this.StatusCodes.NoContent) {
      response.status(status).json(data);
    } else {
      response.status(status).json({
        status: false,
        response: data,
      });
    }
  }
}
