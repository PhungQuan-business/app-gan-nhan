const networkMetrics = [
  { value: '340+', label: 'active edge locations mapped' },
  { value: '€8.2T', label: 'total verified settling volume' },
  { value: '99.999%', label: 'system availability SLA' },
  { value: '1.2B+', label: 'daily compute executions' },
]

export function LandingPage() {
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
