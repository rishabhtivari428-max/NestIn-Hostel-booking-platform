import { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const inputStyle = {
  width: '100%',
  padding: '11px 16px',
  borderRadius: '10px',
  border: '1.5px solid rgba(255,255,255,0.12)',
  background: 'rgba(255,255,255,0.06)',
  color: '#f7faf3',
  fontSize: '0.9rem',
  outline: 'none',
  fontFamily: 'inherit',
  transition: 'border-color 0.2s, background 0.2s',
}

const labelStyle = {
  display: 'block',
  fontSize: '0.8rem',
  fontWeight: 600,
  color: 'rgba(219,236,185,0.75)',
  marginBottom: '7px',
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
}

const Login = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const navigate = useNavigate()
  const { handleLogin } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await handleLogin(email, password)
      navigate('/')
      alert('User logged in successfully')
    } catch (error) {
      console.log('Error while logging you in: ', error)
    }
    setemail('')
    setpassword('')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(155deg, #e8f5d5 0%, #d4edba 60%, #c5e4a3 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        background: 'linear-gradient(145deg, #1d5240 0%, #143a2e 100%)',
        borderRadius: '24px',
        padding: '40px 36px',
        boxShadow: '0 20px 64px rgba(12,34,24,0.45)',
        border: '1px solid rgba(255,255,255,0.08)',
        position: 'relative',
        overflow: 'hidden',
      }}
        className="animate-fadeInUp"
      >
        {/* Glow accent */}
        <div style={{
          position: 'absolute', top: '-60px', right: '-60px',
          width: '160px', height: '160px', borderRadius: '50%',
          background: 'rgba(251,191,36,0.1)', filter: 'blur(40px)',
          pointerEvents: 'none',
        }} />

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', fontWeight: 800, color: '#dbecb9' }}>Nest</span>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', fontWeight: 800, color: '#f59e0b' }}>In</span>
          </Link>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f7faf3', marginTop: '16px', marginBottom: '6px' }}>
            Welcome back
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'rgba(219,236,185,0.6)' }}>
            Log in to manage your NestIn bookings
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative', zIndex: 1 }}>
          <div>
            <label style={labelStyle} htmlFor="login-email">E-Mail</label>
            <input
              id="login-email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={e => setemail(e.target.value)}
              style={inputStyle}
              required
              onFocus={e => {
                e.target.style.borderColor = 'rgba(219,236,185,0.5)'
                e.target.style.background = 'rgba(255,255,255,0.1)'
              }}
              onBlur={e => {
                e.target.style.borderColor = 'rgba(255,255,255,0.12)'
                e.target.style.background = 'rgba(255,255,255,0.06)'
              }}
            />
          </div>

          <div>
            <label style={labelStyle} htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setpassword(e.target.value)}
              style={inputStyle}
              required
              onFocus={e => {
                e.target.style.borderColor = 'rgba(219,236,185,0.5)'
                e.target.style.background = 'rgba(255,255,255,0.1)'
              }}
              onBlur={e => {
                e.target.style.borderColor = 'rgba(255,255,255,0.12)'
                e.target.style.background = 'rgba(255,255,255,0.06)'
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              marginTop: '4px',
              width: '100%',
              padding: '13px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #dbecb9 0%, #c5e4a3 100%)',
              color: '#143a2e',
              fontWeight: 800,
              fontSize: '0.95rem',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'transform 0.15s, box-shadow 0.15s',
              boxShadow: '0 4px 16px rgba(219,236,185,0.2)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-1px)'
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(219,236,185,0.35)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(219,236,185,0.2)'
            }}
          >
            Log In
          </button>

          <p style={{ textAlign: 'center', fontSize: '0.83rem', color: 'rgba(219,236,185,0.55)', marginTop: '4px' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#fbbf24', fontWeight: 600, textDecoration: 'none' }}>
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login