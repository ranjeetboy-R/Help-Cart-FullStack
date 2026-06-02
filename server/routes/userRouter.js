import express from 'express';
import { getAllProvider, getProviderById, getSavedProvider, saveProvider, toggleReaction, userUpdateProfile } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import upload from '../utils/upload.js';

const userRouter = express.Router();

userRouter.get('/get-allProviders', authMiddleware, getAllProvider);
userRouter.get('/get-providerById/:id', authMiddleware, getProviderById);
userRouter.get('/get-savedProvider', authMiddleware, getSavedProvider);

userRouter.post('/toggle-reaction/:providerId', authMiddleware, toggleReaction);
userRouter.post('/save-provider', authMiddleware, saveProvider);

userRouter.put(
    '/update-user',
    authMiddleware,
    upload.single('profilePic'),
    userUpdateProfile
);


export default userRouter;