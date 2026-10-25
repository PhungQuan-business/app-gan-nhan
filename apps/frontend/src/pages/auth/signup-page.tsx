import { useState, type FormEvent } from 'react'
import { requestSignupOtp } from '../../features/auth/services/auth.api'

export function SignupPage() {
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMessage('')
    setIsSubmitting(true)

    try {
      const normalizedEmail = email.trim().toLowerCase()
      await requestSignupOtp(normalizedEmail)
      sessionStorage.setItem('signupEmail', normalizedEmail)
      sessionStorage.setItem(
        'signupOtpMessage',
        'A verification code has been sent to your email.',
      )
      window.location.assign('/verify-otp')
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Unable to send a verification code.',
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
      <section className="signup-card" aria-labelledby="signup-heading">
        <p className="eyebrow">DISTRIBUTED INFRASTRUCTURE PROTOCOL</p>
        <h1 id="signup-heading">Create your account</h1>
        <p className="signup-description">Start with your email address.</p>
        <form className="signup-form" onSubmit={handleSubmit}>
          <label htmlFor="signup-email">Email</label>
          <input
            id="signup-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
              setErrorMessage('')
            }}
          />
          {errorMessage && (
            <p className="form-error" role="alert">{errorMessage}</p>
          )}
          <button
            className="primary-button signup-submit"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending…' : 'Continue'}
          </button>
        </form>
        <p className="signin-prompt">
          Already have an account? <a href="/login">Sign in</a>
        </p>
      </section>
    </main>
  )
}
