import mongoose from "mongoose";

const providerSchema = new mongoose.Schema({
    full_name: { type: String, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true, match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email"] },

    password: {
        type: String, minlength: 6, required: function () {
            return this.authType === "normal"
        }
    },

    state: { type: String, default: "Bihar", trim: true },
    district: { type: String, default: "Muzaffarpur", trim: true },
    village: { type: String, trim: true },
    pincode: { type: String, trim: true },
    phone: { type: String, trim: true },
    ward: { type: String, trim: true },
    profession: [String],
    services: { type: String },

    profilePic: { type: String },
    profilePicId: { type: String },

    recent_works: [{ image: String, title: String, description: String }],
    service_charges: [{ title: String, amount: Number }],

    whatsapp: { type: String, trim: true },
    facebook: { type: String, trim: true },
    instagram: { type: String, trim: true },

    bio: { type: String, validate: { validator: v => !v || v.trim().split(/\s+/).length <= 60, message: "Max 60 words allowed" } },
    description: { type: String, validate: { validator: v => !v || v.trim().split(/\s+/).length <= 300, message: "Max 300 words allowed" } },
    availability: { type: Boolean, default: true },

    likes: { type: Number, default: 0 },
    liked: {type: Boolean, default: false},
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    dislikes: { type: Number, default: 0 },
    disliked: {type: Boolean, default: false},
    dislikedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    
    authType: { type: String, enum: ['normal', 'google'], default: 'normal' },
    role: { type: String }
}, { timestamps: true });

const Provider = mongoose.model("Provider", providerSchema);
export default Provider;