import { Router } from 'express';
import { getUserByEmail } from '../controllers/user.controller';

const router = Router();

router.get('/:email', getUserByEmail);

export { router as userRoutes };
