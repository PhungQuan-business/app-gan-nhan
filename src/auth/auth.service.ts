// services/auth.service.ts
import { prisma } from "../../config/prisma.js";
import { generateOTP, hashOtp } from "../utils/otp-generator.js";
import { sentOtpToEmail } from "../utils/email.js";
import dotenv from "dotenv";

dotenv.config();

export async function login(email: string, password: string) {
    // TODO: Implement login logic, e.g., check credentials, generate JWT, etc.
}

export async function sendOtp(email: string) {
    const otp = generateOTP()

    const secret = process.env.OTP_SECRET;
    if (!secret) {
        throw new Error("OTP_SECRET is missing in environment variables.");
    }

    // TypeScript now knows 'secret' is definitely a string here
    const hashedOtp = hashOtp(otp, secret);
    
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // TODO: Store OTP with an expiration time.

    try {
        const result = await prisma.emailOtp.upsert({
            where: {
            email,
            },
            create: {
            email,
            otpHash: hashedOtp,
            expiresAt,
            },
            update: {
            otpHash: hashedOtp,
            expiresAt,
            attempts: 0,
            },
        });

    const status = sentOtpToEmail(email, otp);

    console.info(`[OTP] Successfully saved OTP for ${email}`);

    return result;
    } catch (error) {
        console.error(`[OTP] Failed to save OTP for ${email}:`, error);
        throw new Error("Failed to save OTP to the database");
    }
    
}

export async function verifyOtp(email: string, otp: string) {

}

export async function completeSignup(email: string, password: string) {

}



