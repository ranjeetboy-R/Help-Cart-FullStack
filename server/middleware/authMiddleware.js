import { jwtVerify } from "jose";
import Provider from "../models/provider.js";
import User from "../models/user.js";

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.helpToken;

        if (!token) {
            return res.status(401).json({ success: false, message: "Token not found" })
        }

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);

        const { payload } = await jwtVerify(token, secret);

        if (!payload) {
            return res.status(403).json({ success: false, message: "Forbidden" })
        }

        let account = null;

        if (payload.role === 'provider') {
            const provider = await Provider.findOne({ _id: payload.id });

            if (!provider) {
                return res.status(404).json({ success: false, message: "Account not found" })
            }
            
            account = provider;
        }

        if (payload.role === 'user') {
            const user = await User.findOne({ _id: payload.id });

            if (!user) {
                return res.status(404).json({ success: false, message: "Account not found" })
            }
            
            account = user;
        }
        
        req.profile = account;
        next();

    } catch (error) {
        console.log(error.message);
        return res.status(401).json({ message: "Invalid token" });
    }
}

export default authMiddleware;