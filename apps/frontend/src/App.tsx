import { useState } from 'react'
import './App.css'

type AuthMode = 'signin' | 'signup'

function App() {
  const [authMode, setAuthMode] = useState<AuthMode>('signin')
  const [email, setEmail] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedEmail = email.trim()

    if (!trimmedEmail) {
      return
    }

    console.info(
      authMode === 'signin'
        ? `Continue login for ${trimmedEmail}`
        : `Continue signup for ${trimmedEmail}`,
    )
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand" aria-label="App brand">
          <span className="brand-mark">A</span>
          <span className="brand-text">Auralis</span>
        </div>

        <nav className="nav" aria-label="Main navigation">
          <a href="#features">Features</a>
          <a href="#solutions">Solutions</a>
          <a href="#pricing">Pricing</a>
        </nav>

        <button
          type="button"
          className="nav-button"
          onClick={() => setAuthMode('signin')}
        >
          Login
        </button>
      </header>

      <main className="landing-page">
        <section className="hero-copy">
          <p className="eyebrow">AI DATA LABELING WORKFLOW</p>
          <h1>Build accurate AI with a streamlined labeling platform.</h1>
          <p className="subtitle">
            Create datasets, review annotations, and ship production-ready models
            from one collaborative workspace built for modern teams.
          </p>

          <div className="cta-row">
            <button
              type="button"
              className="primary-button"
              onClick={() => setAuthMode('signup')}
            >
              Get started
            </button>
            <button
              type="button"
              className="secondary-button"
              onClick={() => setAuthMode('signin')}
            >
              Login
            </button>
          </div>

          <ul className="metric-list" aria-label="Product metrics">
            <li>
              <strong>2.8x</strong>
              <span>Faster labeling</span>
            </li>
            <li>
              <strong>99.2%</strong>
              <span>Annotation quality</span>
            </li>
            <li>
              <strong>24/7</strong>
              <span>Workflow visibility</span>
            </li>
          </ul>
        </section>

        <aside className="auth-panel" aria-label="Authentication panel">
          <div className="auth-tabs" role="tablist" aria-label="Authentication mode">
            <button
              type="button"
              className={authMode === 'signin' ? 'active' : ''}
              onClick={() => setAuthMode('signin')}
            >
              Login
            </button>
            <button
              type="button"
              className={authMode === 'signup' ? 'active' : ''}
              onClick={() => setAuthMode('signup')}
            >
              Get started
            </button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Work email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <button type="submit" className="submit-button">
              {authMode === 'signin' ? 'Continue to login' : 'Create account'}
            </button>
          </form>

          <div className="divider" aria-hidden="true">
            <span>or continue with</span>
          </div>

          <button type="button" className="social-button">
            Continue with Google
          </button>
        </aside>
      </main>
    </div>
  )
}

export default App
