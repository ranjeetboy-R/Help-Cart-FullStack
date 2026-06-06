import Provider from "../models/provider.js";
import User from "../models/user.js";

// Find all users 
export const getAllUsers = async (req, res) => {
    try {
        const profile = req.profile;

        if (profile.role !== 'admin') return;

        const users = await User.find().select("full_name email authType role createdAt updatedAt").sort({createdAt: -1});

        return res.status(200).json({ success: true, users });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Find all experts 
export const getAllExperts = async (req, res) => {
    try {
        const profile = req.profile;

        if (profile.role !== 'admin') return;

        const experts = await Provider.find().select("-password").sort({createdAt: -1});

        return res.status(200).json({ success: true, experts });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}