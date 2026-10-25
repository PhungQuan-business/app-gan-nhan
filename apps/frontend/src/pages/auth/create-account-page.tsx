import { useState, type SubmitEvent } from 'react'
import { completeSignup } from '../../features/auth/services/auth.api'

const MIN_PASSWORD_LENGTH = 8

export function CreateAccountPage() {
    const [email] = useState(() => sessionStorage.getItem('signupEmail') ?? '')
    const [signupToken] = useState(() => sessionStorage.getItem('signupToken') ?? '')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const hasSignupContext = Boolean(email && signupToken)

    async function handleSubmit(event: SubmitEvent) {
        event.preventDefault()
        setErrorMessage('')

        if (password.length < MIN_PASSWORD_LENGTH) {
            setErrorMessage(`Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`)
            return
        }

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.')
            return
        }

        if (!hasSignupContext) {
            setErrorMessage('Verify your email before creating an account.')
            return
        }

        setIsSubmitting(true)
        try {
            await completeSignup(email, password, signupToken)
            sessionStorage.removeItem('signupToken')
            sessionStorage.removeItem('signupEmail')
            window.location.assign('/app')
        } catch (error) {
            setErrorMessage(
                error instanceof Error ? error.message : 'Unable to create your account.',
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
            <section className="account-card" aria-labelledby="account-heading">
                <p className="eyebrow">DISTRIBUTED INFRASTRUCTURE PROTOCOL</p>
                <h1 id="account-heading">Create your account</h1>
                <p className="account-description">
                    Set a password to finish creating your account{email ? ` for ${email}` : ''}.
                </p>
                {!hasSignupContext ? (
                    <p className="form-error" role="alert">
                        Verify your email before creating an account. <a href="/signup">Start again</a>
                    </p>
                ) : (
                    <form className="account-form" onSubmit={handleSubmit}>
                        <label htmlFor="account-password">Password</label>
                        <input
                            id="account-password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value)
                                setErrorMessage('')
                            }}
                        />
                        <p className="account-password-hint">Use at least {MIN_PASSWORD_LENGTH} characters.</p>

                        <label htmlFor="account-confirm-password">Confirm password</label>
                        <input
                            id="account-confirm-password"
                            name="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            required
                            value={confirmPassword}
                            onChange={(event) => {
                                setConfirmPassword(event.target.value)
                                setErrorMessage('')
                            }}
                        />

                        {errorMessage && (
                            <p className="form-error account-form-error" role="alert">{errorMessage}</p>
                        )}
                        <button
                            className="primary-button account-submit"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Creating account…' : 'Create Account'}
                        </button>
                    </form>
                )}
            </section>
        </main>
    )
}
