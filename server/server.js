import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import providerRoute from './routes/providerRoute.js';
import database from './config/db.js';
import dns from 'dns';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import adminRoute from './routes/adminRoute.js';

dns.setServers(["1.1.1.1", "8.8.8.8"])

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: process.env.FRONTEND_BASE_URL,
    credentials: true
}))

// Database connection 
database();

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Help Cart API is running' });
});

app.use('/api/provider', providerRoute);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/admin', adminRoute);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
