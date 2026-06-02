import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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

    role: { type: String },
    authType: { type: String, enum: ['normal', 'google'], default: 'normal' },
    profilePic: { type: String },
    profilePicId: { type: String },
    savedProviderIds: [{type: mongoose.Schema.Types.ObjectId, ref: "Provider"}]
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;