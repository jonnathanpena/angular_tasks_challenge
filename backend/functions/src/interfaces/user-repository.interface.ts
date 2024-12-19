import {User} from "../models/user.model";

export interface IUserRepository {
  findByEmail(email: string): Promise<User|undefined>;
}
