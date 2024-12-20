import {User} from "../models/user.model";

export interface IJWTService {
  sign: (payload: User) => string;
  verify: (token: string) => User|string;
}
