import Provider from "../models/provider.js";


export const getAllProvider = async (req, res) => {
    try {
        if (req.profile.role === 'user') {
            const providers = await Provider.find().select("-password -email -authType -profilePicId");

            if (providers.length === 0) {
                return res.status(404).json({ message: "Provider not found" });
            }

            return res.status(200).json({ success: true, providers })
        }

        return res.status(404).json({ message: "Internal server error" });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}