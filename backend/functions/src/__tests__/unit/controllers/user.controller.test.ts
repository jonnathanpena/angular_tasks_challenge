/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  max-len */
import {Response} from "express";
import {UserController} from "../../../controllers/user.controller";
import {StatusCodeEnum} from "../../../interfaces/status-code-enum.interface";

describe("UserController", () => {
  let userController: UserController;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    userController = new UserController();
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("getUser", () => {
    it("should return internal server error", async () => {
      const mockUser = {
        // eslint-disable-next-line max-len
        response: "Service account object must contain a string \"project_id\" property.",
        status: false,
      };
      const mockRequest = {
        params: {userId: "1"},
      };

      await userController
        .getUserByEmail(
          mockRequest as any,
          mockResponse as Response,
        );

      expect(mockResponse.status).toHaveBeenCalledWith(StatusCodeEnum.InternalServerError);
      expect(mockResponse.json).toHaveBeenCalledWith(mockUser);
    });
  });
});
