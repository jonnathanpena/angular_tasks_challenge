/**
 * User model class
 */
export class User {
  id: string;
  email: string;

  /**
   * User model class constructor
   * @param {string} email User email param
   */
  constructor(email: string) {
    this.id = "";
    this.email = email;
  }
}
