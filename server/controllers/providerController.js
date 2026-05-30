import cloudinary from "../config/cloudinary.js";
import Provider from "../models/provider.js";
import { generateToken } from "../utils/jwt.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";
import bcrypt from 'bcrypt';

// Delete profile 
export const deleteAccount = async (req, res) => {
    try {
        const provider = req.profile;
        const { password } = req.body;

        const isMatched = await bcrypt.compare(password, provider.password);

        if (!isMatched) {
            return res.status(400).json({ success: false, message: "Invalid password" });
        }

        // 🔥 provider delete
        await provider.deleteOne();

        res.clearCookie("helpToken", {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: "/"
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

// Update Profile 
export const updateProfile = async (req, res) => {
    try {
        const provider = req.profile;
        const providerId = req.profile._id;

        const { full_name, village, pincode, phone, ward, profession, experiences, recent_works, services, whatsapp, facebook, instagram, bio, description, availability, likes, dislike } = req.body;

        const file = req.file;

        // 🔹 mobile duplicate check
        if (phone) {
            const existing = await Provider.findOne({ phone });
            if (existing && existing._id !== provider._id) {
                return res.status(400).json({ success: false, message: "Phone already in use" });
            }
        }

        if (full_name !== undefined) provider.full_name = full_name;
        if (village !== undefined) provider.village = village;
        if (pincode !== undefined) provider.pincode = pincode;
        if (phone !== undefined) provider.phone = phone;
        if (ward !== undefined) provider.ward = ward;
        if (services !== undefined) provider.services = services;

        if (profession !== undefined) {
            provider.profession = profession;
        }

        if (experiences !== undefined) {
            provider.experiences = JSON.parse(experiences);
        }

        if (recent_works !== undefined) {
            provider.recent_works = JSON.parse(recent_works);
        }

        if (whatsapp !== undefined) provider.whatsapp = whatsapp;
        if (facebook !== undefined) provider.facebook = facebook;
        if (instagram !== undefined) provider.instagram = instagram;
        if (bio !== undefined) provider.bio = bio;
        if (description !== undefined) provider.description = description;
        if (availability !== undefined) provider.availability = availability;
        if (likes !== undefined) provider.likes = likes;
        if (dislike !== undefined) provider.dislike = dislike;

        if (file) {
            try {
                if (provider.profilePicId) {
                    try {
                        await cloudinary.uploader.destroy(
                            provider.profilePicId
                        )
                    } catch (error) {
                        console.log("Profile image destroy error : ", error.message);
                    }
                }

                const result = await uploadToCloudinary(file.buffer, "Profile");
                provider.profilePic = result.secure_url;
                provider.profilePicId = result.public_id;

            } catch (error) {
                console.log("Profile image upload error : ", error.message);
            }
        }

        // 🔹 save
        await provider.save();

        // 🔐 remove sensitive data
        const providerObj = provider.toObject();
        delete providerObj.password;

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            providerObj
        });

    } catch (error) {

        console.log(error.message);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};