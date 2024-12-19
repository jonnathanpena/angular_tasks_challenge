/* eslint-disable  @typescript-eslint/no-explicit-any */
import {Response} from "express";
import {StatusCodeEnum} from "../interfaces/status-code-enum.interface";

/**
 * Method to return the response JSON and application status code
 * @param {Response} response Response express object
 * @param {StatusCodeEnum} status is the status transaction's code
 * @param {any} data Information to want to print from the API
 */
export const response = (
  response: Response,
  status: StatusCodeEnum,
  data: any,
): void => {
  if (status == StatusCodeEnum.OK || status == StatusCodeEnum.NoContent) {
    response.status(status).json(data);
  } else {
    response.status(status).json({
      status: false,
      response: data,
    });
  }
};
