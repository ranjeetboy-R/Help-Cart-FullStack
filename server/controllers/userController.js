import Provider from "../models/provider.js";
import User from "../models/user.js";


export const getAllProviderForLandingPage = async (req, res) => {
    try {
        const providers = await Provider.find().sort({ createdAt: -1 }).select("full_name village phone profession profilePic services");

        if (providers.length === 0) {
            return res.status(404).json({ message: "Provider not found" });
        }

        return res.status(200).json({ success: true, providers })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getAllProvider = async (req, res) => {
    try {
        if (req.profile.role === 'user') {
            const providers = await Provider.find().sort({ createdAt: -1 }).select("-password -email -authType -profilePicId");

            if (providers.length === 0) {
                return res.status(404).json({ message: "Provider not found" });
            }

            return res.status(200).json({ success: true, providers })
        }

        return res.status(400).json({ success: false, message: 'UnAuthorized' })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const getProviderById = async (req, res) => {
    try {
        const { id } = req.params;


        const provider = await Provider.findOne({ _id: id }).select("-email -password -profilePicId");
        if (!provider) {
            return res.status(404).json({ success: false, message: "Expert not available" })
        }

        return res.status(200).json({ success: true, provider })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const toggleReaction = async (req, res) => {
    try {
        const { providerId } = req.params;
        const { type } = req.body; // "like" | "dislike"
        const userId = req.profile._id.toString();

        const provider = await Provider.findById(providerId);

        if (!provider) {
            return res.status(404).json({
                success: false,
                message: "Expert not found"
            });
        }

        const alreadyLiked = provider.likedBy.some(
            id => id.toString() === userId
        );

        const alreadyDisliked = provider.dislikedBy.some(
            id => id.toString() === userId
        );

        if (type === "like") {

            // Like remove
            if (alreadyLiked) {
                provider.likes -= 1;
                provider.likedBy.pull(userId);
            }
            // Add Like
            else {
                provider.likes += 1;
                provider.likedBy.push(userId);

                // Remove dislike if exists
                if (alreadyDisliked) {
                    provider.dislikes -= 1;
                    provider.dislikedBy.pull(userId);
                }
            }

        } else if (type === "dislike") {

            // Dislike remove
            if (alreadyDisliked) {
                provider.dislikes -= 1;
                provider.dislikedBy.pull(userId);
            }
            // Add Dislike
            else {
                provider.dislikes += 1;
                provider.dislikedBy.push(userId);

                // Remove like if exists
                if (alreadyLiked) {
                    provider.likes -= 1;
                    provider.likedBy.pull(userId);
                }
            }

        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid reaction type"
            });
        }

        const liked = provider.likedBy.some(
            id => id.toString() === userId
        );

        const disliked = provider.dislikedBy.some(
            id => id.toString() === userId
        );

        if (liked) {
            provider.liked = true;
            provider.disliked = false;
        }
        if (disliked) {
            provider.disliked = true;
            provider.liked = false;
        }

        await provider.save();

        return res.status(200).json({
            success: true,
            likes: provider.likes,
            dislikes: provider.dislikes,
            liked,
            disliked
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Save providers 
export const saveProvider = async (req, res) => {

    try {
        const user = req.profile;
        const { providerId } = req.body;

        if (!providerId) {
            return res.status(400).json({
                success: false,
                message: "Provider ID is required"
            });
        }

        const provider = await Provider.findById(providerId);

        if (!provider) {
            return res.status(404).json({
                success: false,
                message: "Provider not found"
            });
        }

        let saved = null;

        const alreadySaved = user.savedProviderIds.some(id =>
            id.toString() === providerId
        )

        if (alreadySaved) {
            user.savedProviderIds.pull(providerId);
            provider.saveByUser.pull(user._id);
            saved = false;
        }
        else {
            user.savedProviderIds.push(providerId);
            provider.saveByUser.push(user._id);
            saved = true;
        }

        await user.save();
        await provider.save();

        return res.status(200).json({
            success: true,
            saved
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getSavedProvider = async (req, res) => {
    try {
        const userId = req.profile._id;

        const savedProvider = await User.findById(userId)
            .populate("savedProviderIds")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            providers: [...savedProvider.savedProviderIds].reverse()
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Search experts 
export const searchProvider = async (req, res) => {
    try {
        const value = req.query.search || '';

        const providers = await Provider.find({
            $or: [
                { full_name: { $regex: value, $options: "i" } },
                { village: { $regex: value, $options: "i" } },
                { services: { $regex: value, $options: "i" } },
                { ward: { $regex: value, $options: "i" } },
                { profession: { $regex: value, $options: "i" } },
            ]
        })
            .select("-password -email")

        return res.status(200).json({ success: true, providers });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}