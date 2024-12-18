import { Request, Response } from 'express';
import { db } from '../config/firebase';

export const getUserByEmail = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email } = req.params;

    return res.status(200).json(email);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch users' });
  }
};