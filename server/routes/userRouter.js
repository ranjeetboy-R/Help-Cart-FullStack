import express from 'express';
import { getAllProvider, getProviderById, toggleReaction } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.get('/get-allProviders', authMiddleware, getAllProvider);
userRouter.get('/get-providerById/:id', authMiddleware, getProviderById);
userRouter.post('/toggle-reaction/:providerId', authMiddleware, toggleReaction);


export default userRouter;