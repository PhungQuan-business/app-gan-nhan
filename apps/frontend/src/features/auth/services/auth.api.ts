import { postJson } from '../../../services/api-client'

type JsonObject = Record<string, unknown>

export type OtpVerificationResult = {
  success: boolean
  message: string
  signupToken?: string
}

function isJsonObject(value: unknown): value is JsonObject {
  return typeof value === 'object' && value !== null
}

export async function requestSignupOtp(email: string): Promise<void> {
  const result = await postJson('/auth/request-otp', { email })

  if (!isJsonObject(result) || result.success !== true) {
    const message =
      isJsonObject(result) && typeof result.message === 'string'
        ? result.message
        : 'Unable to send a verification code.'
    throw new Error(message)
  }
}

export async function verifySignupOtp(
  email: string,
  otp: string,
): Promise<OtpVerificationResult> {
  const result = await postJson('/auth/verify-otp', { email, otp })

  if (
    !isJsonObject(result) ||
    !isJsonObject(result.data) ||
    typeof result.data.success !== 'boolean' ||
    typeof result.data.message !== 'string'
  ) {
    throw new Error('The server returned an invalid verification response.')
  }

  return {
    success: result.data.success,
    message: result.data.message,
    ...(typeof result.data.data === 'object' &&
      result.data.data !== null &&
      'signupToken' in result.data.data &&
      typeof result.data.data.signupToken === 'string'
      ? { signupToken: result.data.data.signupToken }
      : {}),
  }
}
