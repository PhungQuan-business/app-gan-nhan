import './App.css'
import { useState } from 'react'

const networkMetrics = [
  { value: '340+', label: 'active edge locations mapped' },
  { value: '€8.2T', label: 'total verified settling volume' },
  { value: '99.999%', label: 'system availability SLA' },
  { value: '1.2B+', label: 'daily compute executions' },
]

function AuthDestination({ mode }: { mode: 'login' | 'signup' }) {
  if (mode === 'login') {
    return <LoginPage />
  }

  return <SignupPage />
}

function SignupPage() {
  const [email, setEmail] = useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
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
            onChange={(event) => setEmail(event.target.value)}
          />
          <button className="primary-button signup-submit" type="submit">
            Continue
          </button>
        </form>
        <p className="signin-prompt">
          Already have an account? <a href="/login">Sign in</a>
        </p>
      </section>
    </main>
  )
}

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
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

function LandingPage() {
  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Distributed Infrastructure Protocol home">
          <span className="brand-mark" aria-hidden="true">D</span>
          <span className="brand-name">DIP<span>.</span></span>
        </a>

        <nav className="nav" aria-label="Main navigation">
          <a href="#network">Network</a>
          <a href="#metrics">Metrics</a>
          <a href="#protocol">Protocol</a>
        </nav>

        <div className="header-actions">
          <a className="login-link" href="/login">Login</a>
          <a className="primary-button" href="/signup">Get started</a>
        </div>
      </header>

      <main id="network">
        <section className="feature-section" aria-labelledby="hero-heading">
          <div className="hero-copy">
            <p className="eyebrow">DISTRIBUTED INFRASTRUCTURE PROTOCOL</p>
            <h1 id="hero-heading">The heartbeat of decentralized scale.</h1>
            <p className="hero-description">
              A global network built to move value and compute with precision.
              See the infrastructure connecting the next generation of digital
              systems.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="/signup">Get started</a>
              <a className="secondary-button" href="/login">Login</a>
            </div>
          </div>

          <div className="network-visual" aria-hidden="true">
            <div className="network-orbit network-orbit-one" />
            <div className="network-orbit network-orbit-two" />
            <div className="network-orbit network-orbit-three" />
            <span className="network-node node-one" />
            <span className="network-node node-two" />
            <span className="network-node node-three" />
            <span className="network-node node-four" />
            <span className="network-node node-five" />
            <span className="network-core" />
          </div>
        </section>

        <section className="metrics-section" id="metrics" aria-label="Network metrics">
          {networkMetrics.map((metric) => (
            <article className="metric" key={metric.label}>
              <p className="metric-value">{metric.value}</p>
              <p className="metric-label">{metric.label}</p>
            </article>
          ))}
        </section>

        <footer className="page-footer" id="protocol">
          <span>Built for a distributed world.</span>
          <span className="footer-status"><span /> NETWORK OPERATIONAL</span>
        </footer>
      </main>
    </div>
  )
}

function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'

  if (path === '/login') {
    return <AuthDestination mode="login" />
  }

  if (path === '/signup') {
    return <AuthDestination mode="signup" />
  }

  return <LandingPage />
}

export default App
