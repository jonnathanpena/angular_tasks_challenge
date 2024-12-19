import * as admin from "firebase-admin";
import {getEnvironmentsVars} from "../utils/environment.utils";

/**
 * Database config class
 */
export class Database {
  private static instance: admin.firestore.Firestore;

  /**
   * Singleton get database instance
   * @return {Firestore} Return database instance
   */
  public static getInstance(): admin.firestore.Firestore {
    const env = getEnvironmentsVars();
    if (!Database.instance) {
      admin.initializeApp({
        projectId: env.firebase.projectId,
        credential: admin.credential.cert({
          projectId: env.firebase.projectId,
          clientEmail: env.firebase.clientEmail,
          privateKey: env.firebase.privateKey?.replace(/\\n/g, "\n"),
        }),
      });
      Database.instance = admin.firestore();
    }

    return Database.instance;
  }
}
