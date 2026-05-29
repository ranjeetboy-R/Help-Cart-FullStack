// utils/jwt.js
import { SignJWT } from "jose";

export const generateToken = async (payload) => {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("30d")
        .sign(secret);
};