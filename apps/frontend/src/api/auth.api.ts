const AUTH_API_URL = `${(import.meta.env.VITE_API_BASE_URL ?? '/api/v2').replace(/\/$/, '')}/auth`

type JsonObject = Record<string, unknown>

export type OtpVerificationResult = {
  success: boolean
  message: string
  signupToken?: string
}

function isJsonObject(value: unknown): value is JsonObject {
  return typeof value === 'object' && value !== null
}

async function post(path: string, body: JsonObject): Promise<unknown> {
  const response = await fetch(`${AUTH_API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  let result: unknown
  try {
    result = await response.json()
  } catch {
    throw new Error('The server returned an invalid response.')
  }

  if (!response.ok) {
    const message =
      isJsonObject(result) && typeof result.message === 'string'
        ? result.message
        : 'The request could not be completed.'
    throw new Error(message)
  }

  return result
}

export async function requestSignupOtp(email: string): Promise<void> {
  const result = await post('/request-otp', { email })

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
  const result = await post('/verify-otp', { email, otp })

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
