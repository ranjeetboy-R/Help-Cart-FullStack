import express from 'express';
import { deleteImage, deleteServiceCharge, profileSaveByUserDetails, updateProfile } from '../controllers/providerController.js';
import upload from '../utils/upload.js';
import authMiddleware from '../middleware/authMiddleware.js';

const providerRoute = express.Router();

providerRoute.get('/getUserDetails', authMiddleware, profileSaveByUserDetails);
providerRoute.post('/delete-image', authMiddleware, deleteImage);
providerRoute.post('/delete-serviceCharge', authMiddleware, deleteServiceCharge);

providerRoute.put(
    '/update-provider',
    authMiddleware,
    upload.fields([
        {name: 'profilePic', maxCount: 1},
        {name: 'images', maxCount: 5}
    ]),
    updateProfile
);

export default providerRoute;