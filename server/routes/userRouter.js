import express from 'express';
import { getAllProvider, getAllProviderForLandingPage, getProviderById, getSavedProvider, saveProvider, searchProvider, toggleReaction } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import upload from '../utils/upload.js';

const userRouter = express.Router();

userRouter.get('/get-allProviders', authMiddleware, getAllProvider);
userRouter.get('/get-allProvidersForLandingPage', getAllProviderForLandingPage);
userRouter.get('/get-providerById/:id', authMiddleware, getProviderById);
userRouter.get('/get-savedProvider', authMiddleware, getSavedProvider);

userRouter.post('/toggle-reaction/:providerId', authMiddleware, toggleReaction);
userRouter.post('/save-provider', authMiddleware, saveProvider);
userRouter.get('/search-provider', searchProvider);

export default userRouter;