import express from 'express';
import { getAllProvider, getProviderById } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.get('/get-allProviders', authMiddleware, getAllProvider);
userRouter.get('/get-providerById/:id', authMiddleware, getProviderById);

export default userRouter;