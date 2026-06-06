import express from 'express';
import { getAllExperts, getAllUsers } from '../controllers/adminController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const adminRoute = express.Router();

adminRoute.get('/get-allUsers', authMiddleware, getAllUsers);
adminRoute.get('/get-allExperts', authMiddleware, getAllExperts);

export default adminRoute;