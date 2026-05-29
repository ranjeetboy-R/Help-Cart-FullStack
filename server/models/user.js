import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    full_name: { type: String, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true, match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email"] },

    password: {
        type: String, minlength: 6, required: function () {
            return this.authType === "normal"
        }
    },

    role: { type: String },
    authType: { type: String, enum: ['normal', 'google'], default: 'normal' },
    profilePic: { type: String },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;