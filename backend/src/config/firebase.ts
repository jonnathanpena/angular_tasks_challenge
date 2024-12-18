import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

export const db = admin.firestore();
