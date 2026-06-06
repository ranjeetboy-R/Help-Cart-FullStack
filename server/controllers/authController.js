import { OAuth2Client } from "google-auth-library";
import User from "../models/user.js";
import Provider from "../models/provider.js";
import bcrypt from 'bcrypt';
import { generateToken } from "../utils/jwt.js";
import Admin from "../models/admin.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ✅ NORMAL SIGNUP
export const signup = async (req, res) => {
    try {
        const { full_name, email, password, role } = req.body;

        if (!full_name || !email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters",
            });
        }

        let account = null;
        let type = '';

        if (role === 'provider') {
            const existingProvider = await Provider.findOne({ email });

            if (existingProvider) {
                return res.status(400).json({
                    success: false,
                    message: "Email already registered",
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const provider = await Provider.create({
                full_name,
                email,
                password: hashedPassword,
                authType: "normal",
                role: "provider"
            });

            account = provider;
            type = 'provider';
        }

        if (role === 'user') {
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: "Email already registered",
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await User.create({
                full_name,
                email,
                password: hashedPassword,
                authType: "normal",
                role: "user"
            });

            account = user;
            type = 'user';
        }

        // ✅ invalid role
        if (!account) {
            return res.status(400).json({
                success: false,
                message: "Invalid role"
            });
        }

        const token = await generateToken({
            id: account._id.toString(),
            role: type,
        });

        res.cookie("helpToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 30 * 24 * 60 * 60 * 1000,
            path: "/",
        });

        const accountObj = account.toObject();
        delete accountObj.password;

        return res.status(201).json({
            success: true,
            message: "Signup successful",
            account: accountObj
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ✅ NORMAL LOGIN
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        let account = null;
        let type = '';

        if (role === 'provider') {

            const provider = await Provider.findOne({ email });

            if (!provider) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid credentials",
                });
            }

            account = provider;
            type = 'provider';
        }

        if (role === 'user') {

            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid credentials",
                });
            }

            account = user;
            type = 'user';
        }

        if (role === 'admin') {
            const admin = await Admin.findOne({ email });

            if (!admin) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid credentials",
                });
            }

            account = admin;
            type = 'admin';
        }

        // ✅ invalid role
        if (!account) {
            return res.status(400).json({
                success: false,
                message: "Invalid role"
            });
        }

        // ✅ google account check
        if (account.authType === "google") {
            return res.status(400).json({
                success: false,
                message: "Please login with Google",
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            account.password
        );

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentails",
            });
        }

        // ✅ token
        const token = await generateToken({
            id: account._id.toString(),
            role: type,
        });

        // ✅ cookie
        res.cookie("helpToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 30 * 24 * 60 * 60 * 1000,
            path: "/",
        });

        const accountObj = account.toObject();
        delete accountObj.password;

        return res.status(200).json({
            success: true,
            message: "Login successful",
            account: accountObj
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// ✅ GOOGLE LOGIN / SIGNUP MERGE
export const googleAuth = async (req, res) => {
    try {

        const { token, role } = req.body;

        if (!token || !role) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // ✅ verify google token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        const { name, email, picture } = payload;

        let account = null;
        let type = "";

        // ✅ provider
        if (role === "provider") {

            let provider = await Provider.findOne({ email });

            // create
            if (!provider) {

                provider = await Provider.create({
                    full_name: name,
                    email,
                    profilePic: picture,
                    authType: "google",
                    role: "provider",
                });

            }

            account = provider;
            type = "provider";
        }

        // ✅ user
        if (role === "user") {

            let user = await User.findOne({ email });

            // create
            if (!user) {

                user = await User.create({
                    full_name: name,
                    email,
                    profilePic: picture,
                    authType: "google",
                    role: "user",
                });

            }

            account = user;
            type = "user";
        }

        // ✅ invalid role
        if (!account) {
            return res.status(400).json({
                success: false,
                message: "Invalid role",
            });
        }

        // ✅ merge normal auth
        if (account.authType === "normal") {

            account.authType = "google";

            if (picture) {
                account.profilePic = picture;
            }

            await account.save();
        }

        // ✅ jwt
        const jwtToken = await generateToken({
            id: account._id.toString(),
            role: type,
        });

        // ✅ cookie
        res.cookie("helpToken", jwtToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:
                process.env.NODE_ENV === "production"
                    ? "none"
                    : "lax",
            maxAge: 30 * 24 * 60 * 60 * 1000,
            path: "/",
        });

        const accountObj = account.toObject();

        delete accountObj.password;

        return res.status(200).json({
            success: true,
            message: "Google auth successful",
            account: accountObj,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// Logout 
export const logout = (req, res) => {
    try {
        res.clearCookie("helpToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            path: "/"
        });

        return res.status(200).json({ success: true, message: "Logout successful" })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

// Getting provider profile 
export const getProfile = async (req, res) => {
    try {
        const provider = req.profile;

        const providerObj = provider?.toObject();
        delete providerObj.password;

        return res.status(200).json({ success: true, account: providerObj });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Delete profile 
export const deleteAccount = async (req, res) => {
    try {
        const profile = req.profile;
        const { password } = req.body;

        if (profile.authType === 'normal') {
            if (!password) {
                return res.status(400).json({ success: false, message: "Password is required" });
            }

            const isMatched = await bcrypt.compare(password, profile.password);

            if (!isMatched) {
                return res.status(400).json({ success: false, message: "Invalid password" });
            }
        }

        // 🔥 provider delete
        await profile.deleteOne();

        res.clearCookie("helpToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 30 * 24 * 60 * 60 * 1000,
            path: "/",
        })

        return res.status(200).json({
            success: true,
            message: "Account deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};