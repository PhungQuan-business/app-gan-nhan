// services/auth.service.ts
import { prisma } from "../../config/prisma.js";
import { generateOTP, hashOtp } from "../utils/otp-generator.js";
import { sentOtpToEmail } from "../utils/email.js";
import dotenv from "dotenv";
import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { hash as hashPassword } from "bcryptjs";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

export async function verifyDulicateEmail(email: string) {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return {
        success: false,
        message: "An account with this email already exists.",
      };
    }
    return {
      success: true,
      message: "Email is available.",
    };
};

export async function sendOtp(email: string) {
    // TODO: Make attempt filed increase everytime user request and limit 5 otp within 30p

    // const existingUser = await prisma.user.findUnique({
    //   where: {
    //     email: email,
    //   },
    // });

    // if (existingUser) {
    //   return {
    //     success: false,
    //     message: "An account with this email already exists.",
    //   };
    // }

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
 * Helper function
 * Generates a cryptographically random signup token.
 * Only the token's hash will be stored in the database.
 */
function generateSignupToken(): string {
  return randomBytes(32).toString("base64url");
}

/**
 * Helper function
 * Hashes a signup token before it is stored in the database.
 */
function hashSignupToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

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
 * Generate a sign up token when OTP is verified successfully
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

// Generate a token that proves the email has been verified.
    const signupToken = generateSignupToken();
    const tokenHash = hashSignupToken(signupToken);
    const tokenExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Consume the OTP and save the signup token in one transaction.
    // If either database operation fails, both operations are rolled back.
    const verificationResult = await prisma.$transaction(async (tx) => {
    const consumeResult = await tx.emailOtp.deleteMany({
        where: {
        id: otpRecord.id,
        otpHash: otpRecord.otpHash,
        expiresAt: { gt: new Date() },
        attempts: { lt: MAX_OTP_ATTEMPTS },
        },
    });

    // Another request may already have consumed or invalidated this OTP.
    if (consumeResult.count !== 1) {
        return false;
    }

    // Create or replace the signup token for this verified email.
    await tx.signupVerification.upsert({
        where: { email: email },
        create: {
        email: email,
        tokenHash,
        expiresAt: tokenExpiresAt,
        },
        update: {
        tokenHash,
        expiresAt: tokenExpiresAt,
        },
    });

    return true;
    });

    if (!verificationResult) {
    return {
        success: false,
        message: "Invalid or expired OTP.",
    };
    }

    // Return the plaintext token only to the client.
    // The database stores only its hash.
    return {
    success: true,
    message: "OTP verified successfully.",
    data: {
        signupToken,
        expiresIn: 600,
    },
    };
}

/**
 * Creates a user account after successful email verification.
 *
 * Validates the signup token, checks its expiration, hashes the
 * password, creates the user, and consumes the token in a transaction.
 */
export async function completeSignup(
  name: string | undefined,
  email: string,
  password: string,
  signupToken: string,
) {
  const normalizedEmail = email.trim().toLowerCase();

  // Basic input validation. Request-level validation can be added separately.
  if (
    !normalizedEmail ||
    !password ||
    !signupToken ||
    password.length < 8
  ) {
    return {
      success: false,
      message: "Invalid signup details.",
    };
  }

  const tokenHash = hashSignupToken(signupToken);

  // Hash the password before storing it. Never save plaintext passwords.
  const passwordHash = await hashPassword(password, 12);

  return prisma.$transaction(async (tx) => {
    // Find the verification record belonging to this email and token.
    const verification = await tx.signupVerification.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    if (!verification || verification.tokenHash !== tokenHash) {
      return {
        success: false,
        message: "Invalid or expired signup token.",
      };
    }

    if (verification.expiresAt <= new Date()) {
      return {
        success: false,
        message: "Invalid or expired signup token.",
      };
    }

    // Consume the token conditionally so concurrent requests cannot
    // both successfully use the same verification record.
    const consumeResult = await tx.signupVerification.deleteMany({
      where: {
        id: verification.id,
        tokenHash,
        expiresAt: { gt: new Date() },
      },
    });

    if (consumeResult.count !== 1) {
      return {
        success: false,
        message: "Invalid or expired signup token.",
      };
    }

    // Create the account only after successfully consuming the token.
    // The transaction rolls back token consumption if account creation fails.
    const user = await tx.user.create({
      data: {
        name: name?.trim() || null,
        email: normalizedEmail,
        password: passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    return {
      success: true,
      message: "Account created successfully.",
      data: user,
    };
  });
}

type LoginResult =
  | {
      success: true;
      message: string;
      data: {
        accessToken: string;
        tokenType: "Bearer";
        expiresIn: number;
        user: {
          id: number;
          name: string | null;
          email: string;
        };
      };
    }
  | {
      success: false;
      message: string;
    };

/**
 * Authenticates a user using their email and password.
 *
 * Finds the user by normalized email, compares the submitted password
 * with the stored bcrypt hash, and issues a JWT access token when the
 * credentials are valid. The token expires after 15 minutes.
 *
 * Returns a generic failure message for invalid credentials to avoid
 * revealing whether an email address is registered.
 *
 * @param email - Email address submitted by the user.
 * @param password - Plaintext password submitted by the user.
 * @returns An access token and safe user information, or a failure result.
 * @throws Error if JWT_SECRET is missing or a database operation fails.
 */
export async function login(
  email: string,
  password: string,
): Promise<LoginResult> {
  const normalizedEmail = email.trim().toLowerCase();

  // Ensure the JWT signing secret is configured.
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is missing from environment variables.");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: normalizedEmail,
    },
  });

  if (!user) {
    return {
      success: false,
      message: "Invalid email or password.",
    };
  }

  const passwordMatches = await compare(password, user.password);

  if (!passwordMatches) {
    return {
      success: false,
      message: "Invalid email or password.",
    };
  }

  // Issue an access token containing the user's ID as its subject.
  const accessToken = jwt.sign(
    {},
    jwtSecret,
    {
      subject: String(user.id),
      expiresIn: 900, // 15 minutes
    },
  );

  // Return only public user fields; never expose the password hash.
  return {
    success: true,
    message: "Login successful.",
    data: {
      accessToken,
      tokenType: "Bearer",
      expiresIn: 900,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    },
  };
}