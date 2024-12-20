import * as jwt from "jsonwebtoken";
import {IEnvironmentVars} from "../interfaces/environment-vars.interface";
import {getEnvironmentsVars} from "../utils/environment.utils";
import {User} from "../models/user.model";
import {IJWTService} from "../interfaces/jwt-service.interface";

/**
 * JWT Services class
 */
export class JWTService implements IJWTService {
  private env: IEnvironmentVars;

  /**
   * JWT Services constructor class
   */
  constructor() {
    this.env = getEnvironmentsVars();
  }

  /**
   * Generate a JWT token
   * @param {User} payload User payload param
   * @return {string} jwt token
   */
  sign({email}: User): string {
    return jwt.sign(
      {
        email,
      },
      this.env.jwt.secret,
      {
        expiresIn: this.env.jwt.expiresIn,
      },
    );
  }

  /**
   * Verify a JWT token
   * @param {string} token Token string param
   * @return {User|string}
   * User object if token is valid,
   * otherwise returns an error message
   */
  verify(token: string): User|string {
    try {
      const decoded = jwt.verify(
        token,
        this.env.jwt.secret,
      );
      return decoded as User;
    } catch (error) {
      return "Invalid token";
    }
  }
}
