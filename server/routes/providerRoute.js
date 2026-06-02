import express from 'express';
import { profileSaveByUserDetails, updateProfile } from '../controllers/providerController.js';
import upload from '../utils/upload.js';
import authMiddleware from '../middleware/authMiddleware.js';

const providerRoute = express.Router();

providerRoute.get('/getUserDetails', authMiddleware, profileSaveByUserDetails);

providerRoute.put(
    '/update-provider',
    authMiddleware,
    upload.single('profilePic'),
    updateProfile
);

export default providerRoute;