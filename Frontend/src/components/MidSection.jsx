import { Link } from 'react-router'

const SAMPLE_HOSTELS = [
  { id: 1, name: 'Shree Balaji Boys PG', area: 'Kolar Road', distance: '1.2 km', price: '₹6,500', type: 'Boys', tags: ['WiFi', 'Mess'] },
  { id: 2, name: 'Green Valley Girls PG', area: 'Ayodhya Bypass', distance: '0.9 km', price: '₹7,000', type: 'Girls', tags: ['AC', 'WiFi'] },
  { id: 3, name: 'Campus View Hostel', area: 'Misrod', distance: '0.5 km', price: '₹5,800', type: 'Boys', tags: ['Mess', 'Gym'] },
]

const FilterBtn = ({ active, label, onClick }) => (
  <button
    onClick={onClick}
    style={{
      padding: '6px 18px',
      borderRadius: '99px',
      fontSize: '0.82rem',
      fontWeight: 600,
      cursor: 'pointer',
      border: 'none',
      transition: 'all 0.2s',
      background: active ? '#143a2e' : 'rgba(42,104,84,0.1)',
      color: active ? '#dbecb9' : '#2a6854',
      boxShadow: active ? '0 2px 10px rgba(20,58,46,0.2)' : 'none',
    }}
  >
    {label}
  </button>
)

const MidSection = () => {
  return (
    <section style={{
      background: '#f7faf3',
      padding: '56px 24px',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '32px',
        }}>
          <div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.75rem',
              fontWeight: 800,
              color: '#0c2218',
              marginBottom: '4px',
            }}>
              Verified stays near you
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#2a6854' }}>
              Hand-picked, verified hostels around top Bhopal campuses
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <FilterBtn active label="All" />
            <FilterBtn label="Boys" />
            <FilterBtn label="Girls" />
            <FilterBtn label="Under ₹7,000" />
          </div>
        </div>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '32px',
        }}>
          {SAMPLE_HOSTELS.map((h, i) => (
            <div
              key={h.id}
              className="animate-fadeInUp"
              style={{
                background: '#fff',
                border: '1.5px solid rgba(42,104,84,0.15)',
                borderRadius: '18px',
                padding: '20px',
                boxShadow: '0 4px 20px rgba(20,58,46,0.06)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                animationDelay: `${i * 80}ms`,
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(20,58,46,0.14)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(20,58,46,0.06)'
              }}
            >
              {/* Image placeholder */}
              <div style={{
                height: '130px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #d4edba 0%, #b7dca3 100%)',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.5rem',
              }}>
                🏠
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '8px' }}>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#0c2218', marginBottom: '4px' }}>
                    {h.name}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: '#2a6854' }}>
                    {h.area} · {h.distance} from campus
                  </p>
                </div>
                <span style={{
                  flexShrink: 0,
                  padding: '3px 10px',
                  background: h.type === 'Girls' ? 'rgba(251,191,36,0.12)' : 'rgba(42,104,84,0.1)',
                  border: `1px solid ${h.type === 'Girls' ? 'rgba(251,191,36,0.3)' : 'rgba(42,104,84,0.2)'}`,
                  borderRadius: '99px',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: h.type === 'Girls' ? '#92400e' : '#2a6854',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>
                  {h.type}
                </span>
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', gap: '6px', marginBottom: '16px', flexWrap: 'wrap' }}>
                {h.tags.map(tag => (
                  <span key={tag} style={{
                    background: '#f0f7ea',
                    borderRadius: '99px',
                    padding: '3px 10px',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    color: '#1d4d3e',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <p style={{ fontSize: '1.1rem', fontWeight: 800, color: '#143a2e' }}>
                  {h.price}
                  <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#2a6854', marginLeft: '4px' }}>/ month</span>
                </p>
                <Link to="/browsehostels" style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: '#1d4d3e',
                  textDecoration: 'none',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  background: '#dbecb9',
                  transition: 'background 0.2s',
                }}>
                  View →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View all CTA */}
        <div style={{ textAlign: 'center' }}>
          <Link
            to="/browsehostels"
            style={{
              display: 'inline-block',
              padding: '12px 32px',
              borderRadius: '12px',
              background: 'transparent',
              border: '2px solid #143a2e',
              color: '#143a2e',
              fontWeight: 700,
              fontSize: '0.9rem',
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#143a2e'
              e.currentTarget.style.color = '#dbecb9'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#143a2e'
            }}
          >
            Browse All Hostels
          </Link>
        </div>
      </div>
    </section>
  )
}

export default MidSection