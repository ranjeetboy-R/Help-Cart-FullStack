import cloudinary from "../config/cloudinary.js";
import Provider from "../models/provider.js";
import { generateToken } from "../utils/jwt.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";
import bcrypt from 'bcrypt';

// Update Profile 
export const updateProfile = async (req, res) => {
    try {
        const provider = req.profile;
        const providerId = req.profile._id;

        const { full_name, village, pincode, phone, ward, profession, services, whatsapp, facebook, instagram, bio, description, availability, likes, dislike, service_charges } = req.body;

        // 🔹 mobile duplicate check
        if (phone) {
            const existing = await Provider.findOne({ phone });

            if (existing && existing._id.toString() !== providerId.toString()) {
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
            provider.profession = JSON.parse(profession);
        }

        if (service_charges !== undefined && service_charges?.length > 0) {
            const parseData = JSON.parse(service_charges);

            parseData.forEach((data) =>
                provider.service_charges.push(data)
            )
        }

        if (whatsapp !== undefined) provider.whatsapp = whatsapp;
        if (facebook !== undefined) provider.facebook = facebook;
        if (instagram !== undefined) provider.instagram = instagram;
        if (bio !== undefined) provider.bio = bio;
        if (description !== undefined) provider.description = description;
        if (availability !== undefined) provider.availability = availability;
        if (likes !== undefined) provider.likes = likes;
        if (dislike !== undefined) provider.dislike = dislike;

        if (req.files?.profilePic) {
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

                const result = await uploadToCloudinary(req.files?.profilePic[0].buffer, "Profile");
                provider.profilePic = result.secure_url;
                provider.profilePicId = result.public_id;

            } catch (error) {
                console.log("Profile image upload error : ", error.message);
            }
        }

        let uploadImages = [];

        if (req.files?.images?.length > 0) {
            try {
                const uploadAll = await Promise.all(
                    req.files.images.map(async (file) => {
                        const result = await uploadToCloudinary(
                            file.buffer,
                            "recentWork"
                        );

                        return {
                            url: result.secure_url,
                            public_id: result.public_id
                        };
                    })
                );

                uploadImages = uploadAll;

            } catch (error) {
                return res.status(500).json({
                    success: false,
                    message: "Gallery images upload failed"
                });
            }
        }

        if (uploadImages?.length > 0) {
            uploadImages.forEach((item) => {
                provider.recent_works.push(item);
            })
        }

        // 🔹 save
        await provider.save();

        // 🔐 remove sensitive data
        const providerObj = provider.toObject();
        delete providerObj.password;

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            provider: providerObj
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Delete Image 
export const deleteImage = async (req, res) => {
    try {
        const providerId = req.profile._id;
        const { public_id } = req.body;

        const provider = await Provider.findOne({ _id: providerId, "recent_works.public_id": public_id });

        if (provider) {
            const result = await cloudinary.uploader.destroy(public_id);

            if (result.result === 'ok') {

                provider.recent_works = provider.recent_works?.filter(
                    item => item.public_id !== public_id
                )

                await provider.save();

                return res.status(200).json({ success: true, message: 'Image deleted' })
            }
            else {
                return res.status(404).json({ success: false, message: 'Image not found' })
            }
        }

        return res.status(400).json({ success: false, message: 'Image not found' })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Get save by user details 
export const profileSaveByUserDetails = async (req, res) => {
    try {
        const providerId = req.profile._id;

        const saveUser = await Provider.findById(providerId)
            .populate("saveByUser", "village pincode state district ward")
            .sort({ createdAt: -1 });

        return res.status(200).json({ success: true, saveUser: saveUser?.saveByUser })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// delete service_charges 
export const deleteServiceCharge = async (req, res) => {
    try {
        const providerId = req.profile._id;
        const { id } = req.body;

        const serviceCharge = await Provider.findByIdAndUpdate(
            providerId,
            {
                $pull: {
                    service_charges: {
                        _id: id
                    }
                }
            }
        )

        if (!serviceCharge) {
            return res.status(404).json({success: false, message: "The service doesn't exist in database"})
        }

        return res.status(200).json({success: true});


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}