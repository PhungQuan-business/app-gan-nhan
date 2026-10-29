import { describe, expect, it } from "vitest";
import { sentOtpToEmail } from "../../src/utils/email.js";

describe("email utility", () => {
  it("reports the asynchronous send operation as accepted", () => {
    expect(sentOtpToEmail("person@example.com", "123456")).toBe(true);
  });
});
