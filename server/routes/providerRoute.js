import express from 'express';
import { deleteAccount, updateProfile } from '../controllers/providerController.js';
import upload from '../utils/upload.js';
import authMiddleware from '../middleware/authMiddleware.js';

const providerRoute = express.Router();

providerRoute.post('/delete-account', authMiddleware, deleteAccount);

providerRoute.put(
    '/update-provider',
    authMiddleware,
    upload.single('profilePic'),
    updateProfile
);

export default providerRoute;