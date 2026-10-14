import { Link } from "react-router"

const Footer = () => {
  return (
    <footer style={{ background: '#0c2218', color: '#dbecb9', padding: '0' }}>
      {/* CTA Banner */}
      <div style={{
        background: 'linear-gradient(120deg, #1d4d3e 0%, #143a2e 100%)',
        padding: '48px 24px',
        textAlign: 'center',
        borderTop: '1px solid rgba(42,104,84,0.3)',
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <span style={{
            display: 'inline-block',
            background: 'rgba(251,191,36,0.15)',
            border: '1px solid rgba(251,191,36,0.3)',
            borderRadius: '99px',
            padding: '4px 14px',
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            color: '#fbbf24',
            marginBottom: '20px',
          }}>
            For Owners & Brokers
          </span>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
            fontWeight: 800,
            color: '#f7faf3',
            marginBottom: '12px',
            lineHeight: 1.2,
          }}>
            Manage your listings on NestIn
          </h2>
          <p style={{
            fontSize: '0.9375rem',
            lineHeight: 1.7,
            color: 'rgba(219,236,185,0.75)',
            marginBottom: '28px',
            maxWidth: '420px',
            margin: '0 auto 28px',
          }}>
            Get a dashboard for inquiries, availability, and verification — all in one place.
          </p>
          <Link
            to="/listproperty"
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: '#0c2218',
              fontWeight: 800,
              fontSize: '0.9rem',
              padding: '13px 32px',
              borderRadius: '12px',
              textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(245,158,11,0.35)',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 8px 28px rgba(245,158,11,0.5)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(245,158,11,0.35)'
            }}
          >
            List your property →
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid rgba(42,104,84,0.3)',
        padding: '20px 24px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: '1.1rem', color: '#dbecb9' }}>
            Nest
          </span>
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: '1.1rem', color: '#f59e0b' }}>
            In
          </span>
          <span style={{ fontSize: '0.8rem', color: 'rgba(219,236,185,0.5)', marginLeft: '4px' }}>
            · Bhopal
          </span>
        </div>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {['Student', 'Broker', 'Owner', 'Admin'].map(role => (
            <span key={role} style={{
              fontSize: '0.8rem',
              fontWeight: 500,
              color: 'rgba(219,236,185,0.5)',
              cursor: 'default',
            }}>
              {role}
            </span>
          ))}
        </div>

        <p style={{ fontSize: '0.8rem', color: 'rgba(219,236,185,0.4)' }}>
          © 2026 NestIn. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer