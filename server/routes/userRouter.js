import express from 'express';
import { getAllProvider } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.get('/get-allProviders', authMiddleware, getAllProvider);

export default userRouter;