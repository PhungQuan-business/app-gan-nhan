// services/auth.service.ts
import { prisma } from "../../config/prisma.js";
import { generateOTP, hashOtp } from "../utils/otp-generator.js";
import { sentOtpToEmail } from "../utils/email.js";
import dotenv from "dotenv";
import { timingSafeEqual } from "node:crypto";

dotenv.config();

export async function login() {
    // TODO: Implement login logic, e.g., check credentials, generate JWT, etc.
}

export async function sendOtp(email: string) {
    // TODO: Make attempt filed increase everytime user request and limit 5 otp within 30p


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
        await prisma.emailOtp.upsert({
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

    sentOtpToEmail(email, otp);

    console.info(`[OTP] Successfully saved OTP for ${email}`);

    return {
        message: "OTP sent successfully",
        expiresIn: 300,
    };
    } catch (error) {
        console.error(`[OTP] Failed to save OTP for ${email}:`, error);
        throw new Error("Failed to save OTP to the database", {cause: error});
    }

}

const MAX_OTP_ATTEMPTS = 5;

/**
 * Verifies an email OTP and invalidates it after successful verification.
 *
 * Checks that the OTP exists, has not expired, and has not exceeded
 * the maximum number of verification attempts. The submitted OTP is
 * hashed and compared with the stored hash.
 *
 * Incorrect attempts are counted in the database. A successfully
 * verified OTP is deleted atomically so it cannot be reused.
 *
 * @param email - Email address associated with the OTP.
 * @param otp - Plaintext OTP submitted by the user.
 * @returns Whether verification succeeded and an explanatory message.
 */
export async function verifyOtp(email: string, otp: string) {
    // const normalizedEmail = email.trim().toLowerCase();

    // Reject malformed OTPs before querying the database.
    if (!/^\d{6}$/.test(otp)) {
        return {
            success: false,
            message: "Invalid or expired OTP.",
        };
    }

    // Load the secret used to hash OTPs during issuance.
    const secret = process.env.OTP_SECRET;

    if (!secret) {
        throw new Error("OTP_SECRET is missing in environment variables.");
    }

    // Retrieve the OTP record associated with this email.
    const otpRecord = await prisma.emailOtp.findUnique({
        where: {
            email: email,
        },
    });

    // Reject requests when no OTP record exists.
    if (!otpRecord) {
        return {
            success: false,
            message: "Invalid or expired OTP.",
        };
    }

    // Reject and remove an OTP that has expired.
    const now = new Date();

    if (otpRecord.expiresAt <= now) {
        await prisma.emailOtp.deleteMany({
            where: {
                id: otpRecord.id,
                expiresAt: {
                    lte: now, // lte means less than or equal
                },
            },
        });

        return {
            success: false,
            message: "Invalid or expired OTP.",
        };
    }

    // Reject OTPs that have already reached the attempt limit.
    if (otpRecord.attempts >= MAX_OTP_ATTEMPTS) {
        return {
            success: false,
            message: "Invalid or expired OTP.",
        };
    }

    // Hash the submitted OTP using the same secret used during issuance.
    const submittedHash = hashOtp(otp, secret);

    // Compare the hashes without a straightforward timing-dependent string comparison.
    const submittedBuffer = Buffer.from(submittedHash, "hex");
    const storedBuffer = Buffer.from(otpRecord.otpHash, "hex");

    const hashesMatch =
        submittedBuffer.length === storedBuffer.length &&
        timingSafeEqual(submittedBuffer, storedBuffer);

    if (!hashesMatch) {
        // Atomically increment attempts only while the OTP remains eligible.
        const updateResult = await prisma.emailOtp.updateMany({
            where: {
                id: otpRecord.id,
                expiresAt: {
                    gt: new Date(),
                },
                attempts: {
                    lt: MAX_OTP_ATTEMPTS,
                },
            },
            data: {
                attempts: {
                    increment: 1,
                },
            },
        });

        // The record may have expired, been consumed, or reached its limit
        // while this request was being processed.
        if (updateResult.count === 0) {
            return {
                success: false,
                message: "Invalid or expired OTP.",
            };
        }

        // Invalidate the OTP once the maximum number of attempts is reached.
        await prisma.emailOtp.deleteMany({
            where: {
                id: otpRecord.id,
                attempts: {
                    gte: MAX_OTP_ATTEMPTS,
                },
            },
        });

        return {
            success: false,
            message: "Invalid or expired OTP.",
        };
    }

    // Consume the OTP atomically. Only one concurrent request can delete
    // this matching, unexpired record and successfully verify it.
    const consumeResult = await prisma.emailOtp.deleteMany({
        where: {
            id: otpRecord.id,
            otpHash: otpRecord.otpHash,
            expiresAt: {
                gt: new Date(),
            },
            attempts: {
                lt: MAX_OTP_ATTEMPTS,
            },
        },
    });

    if (consumeResult.count !== 1) {
        return {
            success: false,
            message: "Invalid or expired OTP.",
        };
    }

    // The OTP has been verified and consumed.
    // Signup-token issuance will be added separately.
    return {
        success: true,
        message: "OTP verified successfully.",
    };
}

export async function completeSignup() {

}



