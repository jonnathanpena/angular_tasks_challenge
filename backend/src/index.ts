import * as functions from 'firebase-functions';
import express, { Request, Response, NextFunction } from 'express';
import { userRoutes } from './routes/user.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Export the Express app as a Firebase Cloud Function
export const api = functions.https.onRequest(app);
