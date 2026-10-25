import { useState, type FormEvent } from 'react'

export function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
    }

    return (
        <main className="destination-page">
            <a className="destination-brand" href="/">
                <span className="brand-mark" aria-hidden="true">D</span>
                <span>Distributed Infrastructure Protocol</span>
            </a>
            <section className="login-card" aria-labelledby="login-heading">
                <p className="eyebrow">DISTRIBUTED INFRASTRUCTURE PROTOCOL</p>
                <h1 id="login-heading">Welcome back</h1>
                <p className="login-description">Log in to your account to continue.</p>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="login-email">Email</label>
                    <input
                        id="login-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />

                    <label htmlFor="login-password">Password</label>
                    <input
                        id="login-password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        required
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />

                    <button className="primary-button login-submit" type="submit">
                        Login
                    </button>
                </form>
                <p className="signup-prompt">
                    Don&apos;t have an account? <a href="/signup">Sign up</a>
                </p>
            </section>
        </main>
    )
}
