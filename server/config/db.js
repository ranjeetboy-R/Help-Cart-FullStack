import mongoose from "mongoose";

const database = async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connection successfully");

    } catch (error) {
        console.log("Database connection error : ", error);
    }
}

export default database;