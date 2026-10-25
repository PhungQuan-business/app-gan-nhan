import { useState, type FormEvent } from 'react'
import { verifySignupOtp } from '../../features/auth/services/auth.api'

export function VerifyOtpPage() {
    const [otp, setOtp] = useState('')
    const [email] = useState(() => sessionStorage.getItem('signupEmail') ?? '')
    const [successMessage] = useState(
        () => sessionStorage.getItem('signupOtpMessage') ?? '',
    )
    const [errorMessage, setErrorMessage] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setErrorMessage('')

        if (!email) {
            setErrorMessage('Start sign up again to request a new verification code.')
            return
        }

        setIsSubmitting(true)
        try {
            const result = await verifySignupOtp(email, otp)
            if (!result.success) {
                setErrorMessage(result.message)
                setIsSubmitting(false)
                return
            }

            if (result.signupToken) {
                sessionStorage.setItem('signupToken', result.signupToken)
            }
            sessionStorage.removeItem('signupOtpMessage')
            if (!result.signupToken) {
                sessionStorage.removeItem('signupToken')
                setErrorMessage('Verification succeeded, but signup could not continue. Request a new code and try again.')
                setIsSubmitting(false)
                return
            }
            window.location.assign('/create-account')
        } catch (error) {
            setErrorMessage(
                error instanceof Error ? error.message : 'Unable to verify the code.',
            )
            setIsSubmitting(false)
        }
    }

    return (
        <main className="destination-page">
            <a className="destination-brand" href="/">
                <span className="brand-mark" aria-hidden="true">D</span>
                <span>Distributed Infrastructure Protocol</span>
            </a>
            <section className="otp-card" aria-labelledby="otp-heading">
                <p className="eyebrow">DISTRIBUTED INFRASTRUCTURE PROTOCOL</p>
                <h1 id="otp-heading">Verify your email</h1>
                {successMessage && (
                    <p className="otp-success" role="status">{successMessage}</p>
                )}
                <p className="otp-description">
                    Enter the six-digit code sent to {email || 'your email address'}.
                </p>
                <form className="otp-form" onSubmit={handleSubmit}>
                    <label htmlFor="signup-otp">Verification code</label>
                    <input
                        id="signup-otp"
                        name="otp"
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        maxLength={6}
                        placeholder="000000"
                        required
                        value={otp}
                        onChange={(event) => {
                            setOtp(event.target.value)
                            setErrorMessage('')
                        }}
                    />
                    {errorMessage && (
                        <p className="form-error otp-error" role="alert">{errorMessage}</p>
                    )}
                    <button
                        className="primary-button otp-submit"
                        type="submit"
                        disabled={isSubmitting || !email}
                    >
                        {isSubmitting ? 'Verifying…' : 'Continue'}
                    </button>
                </form>
                <p className="otp-email-note">
                    Didn&apos;t get a code? <a href="/signup">Try another email</a>
                </p>
            </section>
        </main>
    )
}
