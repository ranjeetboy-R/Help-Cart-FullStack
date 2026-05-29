import express from 'express';
import { getProfile, googleAuth, login, logout, signup } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.post('/google-auth', googleAuth);
authRouter.post('/logout', logout);

authRouter.get('/profile', authMiddleware, getProfile);

export default authRouter;