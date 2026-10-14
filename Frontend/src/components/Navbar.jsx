import { Link } from 'react-router'
import { useState, useEffect } from 'react'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        transition: 'all 0.3s ease',
        background: scrolled
          ? 'rgba(247,250,243,0.88)'
          : '#f7faf3',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(42,104,84,0.15)' : '1px solid transparent',
        boxShadow: scrolled ? '0 2px 16px rgba(20,58,46,0.08)' : 'none',
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link to='/' style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.5rem',
            fontWeight: 800,
            color: '#143a2e',
            letterSpacing: '-0.5px',
          }}>
            Nest
          </span>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.5rem',
            fontWeight: 800,
            color: '#f59e0b',
            letterSpacing: '-0.5px',
          }}>
            In
          </span>
          <span style={{
            marginLeft: '6px',
            fontSize: '0.65rem',
            fontWeight: 600,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: '#2a6854',
            paddingTop: '2px',
          }}>
            Bhopal
          </span>
        </Link>

        {/* Nav links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
          {[
            { to: '/browsehostels', label: 'Browse' },
            { to: '/listproperty', label: 'List Property' },
            { to: '/getbookings', label: 'My Bookings' },
            { to: '/OwnerDashboard', label: 'Dashboard' },
            { to: '/Inquiries', label: 'Inquiries' },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              style={{
                padding: '6px 14px',
                borderRadius: '99px',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#143a2e',
                textDecoration: 'none',
                transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(42,104,84,0.1)'
                e.currentTarget.style.color = '#0c2218'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#143a2e'
              }}
            >
              {label}
            </Link>
          ))}

          {/* Divider */}
          <span style={{ width: '1px', height: '20px', background: 'rgba(42,104,84,0.25)', margin: '0 6px' }} />

          <Link
            to='/login'
            style={{
              padding: '7px 18px',
              borderRadius: '99px',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#143a2e',
              textDecoration: 'none',
              border: '1.5px solid rgba(42,104,84,0.4)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#143a2e'
              e.currentTarget.style.color = '#dbecb9'
              e.currentTarget.style.borderColor = '#143a2e'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#143a2e'
              e.currentTarget.style.borderColor = 'rgba(42,104,84,0.4)'
            }}
          >
            Login
          </Link>

          <Link
            to='/register'
            style={{
              padding: '7px 18px',
              borderRadius: '99px',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#fff',
              textDecoration: 'none',
              background: 'linear-gradient(135deg, #1d4d3e 0%, #143a2e 100%)',
              boxShadow: '0 2px 8px rgba(20,58,46,0.25)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-1px)'
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(20,58,46,0.35)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(20,58,46,0.25)'
            }}
          >
            Register
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Navbar