import {Request, Response} from "express";

/**
 * Controller for user routes
 */
export class UserController {
  /**
   * Get users by email method
   * @param {Request} req Express request param
   * @param {Response} res Express response param
   */
  async getUserByEmail(req: Request, res: Response): Promise<void> {
    const {email} = req.params;

    res.status(200).send(email);
  }
}
