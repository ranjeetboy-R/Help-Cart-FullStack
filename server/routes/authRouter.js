import express from 'express';
import { deleteAccount, getProfile, googleAuth, login, logout, signup } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.post('/google-auth', googleAuth);
authRouter.post('/logout', logout);

authRouter.get('/profile', authMiddleware, getProfile);
authRouter.delete('/delete-account', authMiddleware, deleteAccount);

export default authRouter;