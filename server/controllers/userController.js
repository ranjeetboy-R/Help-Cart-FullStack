import Provider from "../models/provider.js";


export const getAllProvider = async (req, res) => {
    try {
        if (req.account.role === 'user') {
            const providers = await Provider.find().sort({createdAt: -1}).select("-password -email -authType -profilePicId");
    
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
        const {id} = req.params;
        
        
        const provider = await Provider.findOne({_id: id}).select("-email -password -profilePicId");
        console.log("provider", provider);
        if (!provider) {
            return res.status(404).json({success: false, message: "Expert not available"})
        }

        return res.status(200).json({success: true, provider})

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}