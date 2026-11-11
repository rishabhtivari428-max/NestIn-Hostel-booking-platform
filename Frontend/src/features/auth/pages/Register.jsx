import { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth.js'

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
  fontSize: '0.78rem',
  fontWeight: 600,
  color: 'rgba(219,236,185,0.7)',
  marginBottom: '7px',
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
}

const selectStyle = {
  ...inputStyle,
  cursor: 'pointer',
  appearance: 'none',
}

const focusIn = (e) => {
  e.target.style.borderColor = 'rgba(219,236,185,0.5)'
  e.target.style.background = 'rgba(255,255,255,0.1)'
}
const focusOut = (e) => {
  e.target.style.borderColor = 'rgba(255,255,255,0.12)'
  e.target.style.background = 'rgba(255,255,255,0.06)'
}

const Register = () => {
  const [username, setusername] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [phone, setphone] = useState('')
  const [gender, setgender] = useState('')
  const [role, setrole] = useState('')
  const { handleRegister } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await handleRegister(username, email, password, phone, gender, role)
      navigate('/login')
      alert('User registered successfully')
    } catch (error) {
      console.log('Error while registering: ', error)
    }
    setusername(''); setemail(''); setpassword(''); setphone(''); setgender(''); setrole('')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(155deg, #e8f5d5 0%, #d4edba 60%, #c5e4a3 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px 24px',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '460px',
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
        {/* Glow */}
        <div style={{
          position: 'absolute', top: '-60px', right: '-60px',
          width: '160px', height: '160px', borderRadius: '50%',
          background: 'rgba(251,191,36,0.1)', filter: 'blur(40px)', pointerEvents: 'none',
        }} />

        {/* Logo + heading */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', fontWeight: 800, color: '#dbecb9' }}>Nest</span>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', fontWeight: 800, color: '#f59e0b' }}>In</span>
          </Link>
          <h1 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f7faf3', marginTop: '14px', marginBottom: '4px' }}>
            Create your account
          </h1>
          <p style={{ fontSize: '0.83rem', color: 'rgba(219,236,185,0.55)' }}>
            Join NestIn and start exploring
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', zIndex: 1 }}>
          <div>
            <label style={labelStyle} htmlFor="reg-username">Username</label>
            <input id="reg-username" type="text" placeholder="Your name" value={username}
              onChange={e => setusername(e.target.value)} style={inputStyle} required
              onFocus={focusIn} onBlur={focusOut} />
          </div>

          <div>
            <label style={labelStyle} htmlFor="reg-email">E-Mail</label>
            <input id="reg-email" type="email" placeholder="name@example.com" value={email}
              onChange={e => setemail(e.target.value)} style={inputStyle} required
              onFocus={focusIn} onBlur={focusOut} />
          </div>

          <div>
            <label style={labelStyle} htmlFor="reg-password">Password</label>
            <input id="reg-password" type="password" placeholder="••••••••" value={password}
              onChange={e => setpassword(e.target.value)} style={inputStyle} required
              onFocus={focusIn} onBlur={focusOut} />
          </div>

          <div>
            <label style={labelStyle} htmlFor="reg-phone">Contact Number</label>
            <input id="reg-phone" type="number" placeholder="10-digit phone number" value={phone}
              onChange={e => setphone(e.target.value)} style={inputStyle} required
              onFocus={focusIn} onBlur={focusOut} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={labelStyle} htmlFor="reg-role">Role</label>
              <select id="reg-role" value={role} onChange={e => setrole(e.target.value)} required
                style={selectStyle} onFocus={focusIn} onBlur={focusOut}>
                <option value="">Select role</option>
                <option value="student">Student</option>
                <option value="owner">Owner</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <label style={labelStyle} htmlFor="reg-gender">Gender</label>
              <select id="reg-gender" value={gender} onChange={e => setgender(e.target.value)} required
                style={selectStyle} onFocus={focusIn} onBlur={focusOut}>
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            style={{
              marginTop: '6px',
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
            Create Account
          </button>

          <div style={{ display: 'flex', alignItems: 'center', margin: '4px 0' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.15)' }} />
            <span style={{ padding: '0 10px', fontSize: '0.75rem', color: 'rgba(219,236,185,0.6)' }}>OR</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.15)' }} />
          </div>

          <a
            href={`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/auth/google`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              width: '100%',
              padding: '12px',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.08)',
              color: '#f7faf3',
              fontWeight: 600,
              fontSize: '0.9rem',
              border: '1.5px solid rgba(255,255,255,0.15)',
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              boxSizing: 'border-box'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.14)'
              e.currentTarget.style.borderColor = 'rgba(219,236,185,0.4)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            Continue with Google
          </a>

          <p style={{ textAlign: 'center', fontSize: '0.83rem', color: 'rgba(219,236,185,0.5)', marginTop: '2px' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#fbbf24', fontWeight: 600, textDecoration: 'none' }}>
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register