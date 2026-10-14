const Hero = ({
  title = "12B",
  location = "Kolar Road, Bhopal",
  distance = "0.8 km",
  price = "₹6,500",
  period = "per month"
}) => {
  return (
    <section style={{
      background: 'linear-gradient(155deg, #f7faf3 0%, #e8f5d5 55%, #d4edba 100%)',
      padding: '72px 24px',
      minHeight: '520px',
      display: 'flex',
      alignItems: 'center',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '48px',
        flexWrap: 'wrap',
      }}>

        {/* Left: Copy */}
        <div style={{ flex: '1 1 340px', maxWidth: '560px' }} className="animate-fadeInUp">
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(245,158,11,0.12)',
            border: '1px solid rgba(245,158,11,0.35)',
            borderRadius: '99px',
            padding: '5px 14px',
            marginBottom: '24px',
          }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#92400e' }}>
              ✦ Verified Hostels
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2rem, 5vw, 3.25rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            color: '#0c2218',
            marginBottom: '20px',
          }}>
            Find a hostel near <br />
            campus, without <br />
            <span style={{ color: '#2a6854' }}>the guesswork.</span>
          </h1>

          <p style={{
            fontSize: '1.0625rem',
            lineHeight: 1.75,
            color: '#2a6854',
            marginBottom: '36px',
            maxWidth: '440px',
          }}>
            Verified rooms, real distances, and an owner you can message directly — no site visits wasted.
          </p>

          {/* Search bar */}
          <form
            style={{ display: 'flex', gap: '10px', maxWidth: '480px', flexWrap: 'wrap' }}
            onSubmit={e => e.preventDefault()}
          >
            <div style={{ flex: 1, position: 'relative', minWidth: '220px' }}>
              <span style={{
                position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                fontSize: '1rem', pointerEvents: 'none',
              }}>🔍</span>
              <input
                type="search"
                placeholder="Search by college or locality…"
                aria-label="Search hostels"
                style={{
                  width: '100%',
                  height: '48px',
                  paddingLeft: '40px',
                  paddingRight: '16px',
                  borderRadius: '12px',
                  border: '1.5px solid rgba(42,104,84,0.25)',
                  background: 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(8px)',
                  fontSize: '0.9rem',
                  color: '#0c2218',
                  outline: 'none',
                  boxShadow: '0 2px 12px rgba(20,58,46,0.08)',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                  fontFamily: 'inherit',
                }}
                onFocus={e => {
                  e.target.style.borderColor = '#2a6854'
                  e.target.style.boxShadow = '0 0 0 3px rgba(42,104,84,0.15)'
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'rgba(42,104,84,0.25)'
                  e.target.style.boxShadow = '0 2px 12px rgba(20,58,46,0.08)'
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                height: '48px',
                padding: '0 24px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #1d4d3e 0%, #143a2e 100%)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.9rem',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(20,58,46,0.3)',
                transition: 'transform 0.15s, box-shadow 0.15s',
                fontFamily: 'inherit',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 6px 24px rgba(20,58,46,0.4)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(20,58,46,0.3)'
              }}
            >
              Search
            </button>
          </form>

          {/* Trust pill row */}
          <div style={{ display: 'flex', gap: '20px', marginTop: '28px', flexWrap: 'wrap' }}>
            {['100+ Verified Rooms', 'Direct Owner Chat', 'No Hidden Fees'].map(label => (
              <span key={label} style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                fontSize: '0.8rem', fontWeight: 600, color: '#2a6854',
              }}>
                <span style={{
                  width: '18px', height: '18px', borderRadius: '50%',
                  background: 'rgba(42,104,84,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.6rem',
                }}>✓</span>
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Property card */}
        <div
          style={{ flex: '0 0 auto', width: '300px' }}
          className="animate-fadeInUp"
        >
          <div style={{
            background: 'linear-gradient(145deg, #1d5240 0%, #143a2e 100%)',
            borderRadius: '24px',
            padding: '28px 24px',
            color: '#fff',
            boxShadow: '0 16px 48px rgba(20,58,46,0.35)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Pattern overlay */}
            <div style={{
              position: 'absolute', inset: 0, opacity: 0.06,
              backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '18px 18px',
              pointerEvents: 'none',
            }} />

            {/* Glow */}
            <div style={{
              position: 'absolute', top: '-40px', right: '-40px',
              width: '120px', height: '120px',
              borderRadius: '50%',
              background: 'rgba(251,191,36,0.15)',
              filter: 'blur(30px)',
              pointerEvents: 'none',
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              {/* Status chip */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                background: 'rgba(251,191,36,0.18)',
                border: '1px solid rgba(251,191,36,0.4)',
                borderRadius: '99px',
                padding: '4px 12px',
                marginBottom: '20px',
              }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fbbf24' }} />
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#fbbf24', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Available
                </span>
              </div>

              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '3.25rem',
                fontWeight: 800,
                color: '#f3eed9',
                lineHeight: 1,
                marginBottom: '8px',
              }}>
                {title}
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'rgba(200,216,206,0.75)', fontWeight: 500, letterSpacing: '0.5px', marginBottom: '24px' }}>
                {location}
              </p>

              <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '24px' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: '#f3eed9', marginBottom: '2px' }}>
                    {distance}
                  </p>
                  <p style={{ fontSize: '0.7rem', color: 'rgba(200,216,206,0.6)', letterSpacing: '0.5px' }}>from campus</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: '#fbbf24', marginBottom: '2px' }}>
                    {price}
                  </p>
                  <p style={{ fontSize: '0.7rem', color: 'rgba(200,216,206,0.6)', letterSpacing: '0.5px' }}>{period}</p>
                </div>
              </div>

              {/* Amenities row */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '24px', flexWrap: 'wrap' }}>
                {['WiFi', 'Mess', 'CCTV'].map(tag => (
                  <span key={tag} style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '99px',
                    padding: '3px 10px',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    color: 'rgba(200,216,206,0.9)',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero