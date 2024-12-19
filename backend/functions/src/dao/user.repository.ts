import {firestore} from "firebase-admin";
import {IUserRepository} from "../interfaces/user-repository.interface";
import {User} from "../models/user.model";
import {Database} from "../config/database";

/**
 * User repository class
 */
export class UserRepository implements IUserRepository {
  private db: firestore.Firestore;

  /**
   * UserRepository constructor
   */
  constructor() {
    this.db = Database.getInstance();
  }

  /**
   * Return user by email
   * @param {string} email User email param
   * @return {Promise<User>} Return user by email
   */
  async findByEmail(email: string): Promise<User|undefined> {
    const snapshot = await this.db
      .collection("users")
      .where("email", "==", email)
      .get()
      .then((querySnapshot) => {
        const users: User[] = [];
        querySnapshot.forEach((doc) => {
          users.push(doc.data() as User);
        });
        return users;
      });

    return snapshot.values().next().value;
  }
}
