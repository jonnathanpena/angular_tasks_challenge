/**
 * User model class
 */
export class User {
  email: string;

  /**
   * User model class constructor
   * @param {string} email User email param
   */
  constructor(email: string) {
    this.email = email;
  }
}
