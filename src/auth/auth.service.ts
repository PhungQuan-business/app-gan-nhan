// services/auth.service.ts

import generateOtp from "../utils/otp-generator.js";
import sentOtpToEmail from "../utils/email.js";

export async function login(email: string, password: string) {
    // TODO: Implement login logic, e.g., check credentials, generate JWT, etc.
}

export async function sendOtp(email: string) {
  const otp = generateOtp();

  // TODO: Store OTP with an expiration time.

  // TODO: Replace this with actual email delivery.
  const status = sentOtpToEmail(email, otp);


  console.log(`OTP for ${email}: ${otp}`);

  return {
    message: "If the address can be registered, an OTP will be sent.",
  };
}

export async function verifyOtp(email: string, otp: string) {

}

export async function completeSignup(email: string, password: string) {

}



