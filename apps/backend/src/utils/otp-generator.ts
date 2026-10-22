import { createHmac } from "node:crypto";
import * as crypto from 'crypto';
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

dotenv.config();
/**
 * Generates a secure N-digit OTP (e.g., 6 digits).
 * @param length - Number of digits required
 */
export function generateOTP(length: number = 6): string {
  const min = Math.pow(10, length - 1); // this ensures that the OTP has the correct number of digits (e.g., 100000 for 6 digits)
  const max = Math.pow(10, length) - 1; // this ensures that the OTP has the correct number of digits (e.g., 999999 for 6 digits)
  // crypto.randomInt(min, max + 1) is inclusive of min and exclusive of (max + 1)
  const otp = crypto.randomInt(min, max + 1);
  return otp.toString().padStart(length, '0');
}

export function hashOtp(otp: string, secret: string): string {
  const hmac = createHmac('sha256', secret);
  hmac.update(otp);
  return hmac.digest('hex');
}

// For debugging purposes, run this file directly in Javascript debug terminal to see a generated OTP.

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log(generateOTP(6));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const secret = process.env.OTP_SECRET!
  console.log(hashOtp("123456", secret));
}