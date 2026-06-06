import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    full_name: { type: String, trim: true },

    email: { type: String, required: true, unique: true, trim: true, lowercase: true, match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email"] },

    password: {
        type: String, minlength: 6, required: function () {
            return this.authType === "normal"
        }
    },

    role: { type: String },
}, { timestamps: true });

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;