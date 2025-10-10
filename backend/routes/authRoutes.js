import express from 'express';
import { register, login, getUserProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const userRouter = express.Router();

// ✅ These must be exactly like this
userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/profile', protect, getUserProfile);

export default userRouter;
