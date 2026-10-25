import { postJson } from '../../../services/api-client'

type JsonObject = Record<string, unknown>

export type OtpVerificationResult = {
    success: boolean
    message: string
    signupToken?: string
}

export type SignupResult = {
    success: boolean
    message: string
}

export type LoginResult = {
    accessToken: string
    tokenType: 'Bearer'
    expiresIn: number
    user: {
        id: number
        name: string | null
        email: string
    }
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

export async function login(email: string, password: string): Promise<LoginResult> {
    const result = await postJson('/auth/login', { email, password })

    if (
        !isJsonObject(result) ||
        result.success !== true ||
        !isJsonObject(result.data) ||
        typeof result.data.accessToken !== 'string' ||
        result.data.tokenType !== 'Bearer' ||
        typeof result.data.expiresIn !== 'number' ||
        !isJsonObject(result.data.user) ||
        typeof result.data.user.id !== 'number' ||
        !(typeof result.data.user.name === 'string' || result.data.user.name === null) ||
        typeof result.data.user.email !== 'string'
    ) {
        const message =
            isJsonObject(result) && typeof result.message === 'string'
                ? result.message
                : 'The server returned an invalid login response.'
        throw new Error(message)
    }

    return {
        accessToken: result.data.accessToken,
        tokenType: 'Bearer',
        expiresIn: result.data.expiresIn,
        user: {
            id: result.data.user.id,
            name: result.data.user.name,
            email: result.data.user.email,
        },
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

export async function completeSignup(
    email: string,
    password: string,
    signupToken: string,
): Promise<SignupResult> {
    const result = await postJson('/auth/complete-signup', {
        email,
        password,
        signupToken,
    })

    if (
        !isJsonObject(result) ||
        typeof result.success !== 'boolean' ||
        typeof result.message !== 'string'
    ) {
        throw new Error('The server returned an invalid signup response.')
    }

    if (!result.success) {
        throw new Error(result.message)
    }

    return { success: true, message: result.message }
}
