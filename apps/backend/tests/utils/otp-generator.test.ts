import { describe, expect, it } from "vitest";
import { generateOTP, hashOtp } from "../../src/utils/otp-generator.js";

describe("OTP utilities", () => {
  it("generates a fixed-width numeric OTP", () => {
    expect(generateOTP(6)).toMatch(/^\d{6}$/);
  });

  it("hashes an OTP deterministically", () => {
    expect(hashOtp("123456", "test-secret")).toBe(hashOtp("123456", "test-secret"));
  });
});
