import express from 'express';
import { updateProfile } from '../controllers/providerController.js';
import upload from '../utils/upload.js';
import authMiddleware from '../middleware/authMiddleware.js';

const providerRoute = express.Router();

providerRoute.put(
    '/update-provider',
    authMiddleware,
    upload.single('profilePic'),
    updateProfile
);

export default providerRoute;