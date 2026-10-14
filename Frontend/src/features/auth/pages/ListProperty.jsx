import { useState } from 'react';
import { addHostel } from '../services/hostel.service';

const inputStyle = {
  width: '100%', padding: '11px 16px', borderRadius: '10px',
  border: '1.5px solid rgba(255,255,255,0.12)',
  background: 'rgba(255,255,255,0.06)',
  color: '#f7faf3', fontSize: '0.875rem', outline: 'none',
  fontFamily: 'inherit', transition: 'border-color 0.2s, background 0.2s',
}
const labelStyle = {
  display: 'block', fontSize: '0.78rem', fontWeight: 600,
  color: 'rgba(219,236,185,0.7)', marginBottom: '7px',
  letterSpacing: '0.5px', textTransform: 'uppercase',
}
const focusIn = e => {
  e.target.style.borderColor = 'rgba(219,236,185,0.5)'
  e.target.style.background = 'rgba(255,255,255,0.1)'
}
const focusOut = e => {
  e.target.style.borderColor = 'rgba(255,255,255,0.12)'
  e.target.style.background = 'rgba(255,255,255,0.06)'
}

const ListProperty = () => {
  const [hostels, setHostels] = useState([]);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [pricePerMonth, setPricePerMonth] = useState('');
  const [amenities, setAmenities] = useState('');
  const [roomType, setRoomType] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddHostels = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const amenitiesArray = amenities.split(',').map(item => item.trim());
      const response = await addHostel({ name, city, address, pricePerMonth: Number(pricePerMonth), amenities: amenitiesArray, roomType });
      if (response?.hostel || response?.data) {
        const newProperty = response.hostel || response.data;
        setHostels(prev => [newProperty, ...prev]);
        setName(''); setCity(''); setAddress(''); setPricePerMonth(''); setAmenities(''); setRoomType('');
      }
    } catch (error) {
      console.log('Error while Adding property', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#f7faf3', minHeight: '100vh', padding: '48px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', gap: '40px', flexWrap: 'wrap', alignItems: 'flex-start' }}>

        {/* Form Card */}
        <div style={{
          flex: '0 0 420px', minWidth: '300px',
          background: 'linear-gradient(145deg, #1d5240 0%, #143a2e 100%)',
          borderRadius: '24px', padding: '36px 32px',
          boxShadow: '0 16px 48px rgba(12,34,24,0.3)',
          border: '1px solid rgba(255,255,255,0.08)',
          position: 'sticky', top: '80px',
        }}
          className="animate-fadeInUp"
        >
          {/* Glow */}
          <div style={{
            position: 'absolute', top: '-50px', right: '-50px', width: '140px', height: '140px',
            borderRadius: '50%', background: 'rgba(251,191,36,0.1)', filter: 'blur(36px)', pointerEvents: 'none',
          }} />

          <div style={{ marginBottom: '28px', position: 'relative', zIndex: 1 }}>
            <span style={{
              display: 'inline-block', background: 'rgba(251,191,36,0.15)',
              border: '1px solid rgba(251,191,36,0.3)', borderRadius: '99px',
              padding: '4px 12px', fontSize: '0.7rem', fontWeight: 700,
              color: '#fbbf24', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px',
            }}>
              Owner Portal
            </span>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.75rem', fontWeight: 800, color: '#f7faf3', marginBottom: '6px',
            }}>
              List Your Property
            </h1>
            <p style={{ fontSize: '0.83rem', color: 'rgba(219,236,185,0.55)' }}>
              Add your hostel to the NestIn network
            </p>
          </div>

          <form onSubmit={handleAddHostels} style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', zIndex: 1 }}>
            <div>
              <label style={labelStyle}>Hostel Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)}
                placeholder="e.g. Green Valley Boys PG" required style={inputStyle}
                onFocus={focusIn} onBlur={focusOut} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={labelStyle}>City</label>
                <input type="text" value={city} onChange={e => setCity(e.target.value)}
                  placeholder="Bhopal" required style={inputStyle}
                  onFocus={focusIn} onBlur={focusOut} />
              </div>
              <div>
                <label style={labelStyle}>Rent / Month (₹)</label>
                <input type="number" value={pricePerMonth} onChange={e => setPricePerMonth(e.target.value)}
                  placeholder="6500" required style={inputStyle}
                  onFocus={focusIn} onBlur={focusOut} />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Full Address</label>
              <input type="text" value={address} onChange={e => setAddress(e.target.value)}
                placeholder="Street, Area, Landmark" required style={inputStyle}
                onFocus={focusIn} onBlur={focusOut} />
            </div>

            <div>
              <label style={labelStyle}>Amenities</label>
              <input type="text" value={amenities} onChange={e => setAmenities(e.target.value)}
                placeholder="WiFi, AC, Mess, CCTV…" required style={inputStyle}
                onFocus={focusIn} onBlur={focusOut} />
              <p style={{ fontSize: '0.72rem', color: 'rgba(219,236,185,0.35)', marginTop: '5px' }}>Separate by commas</p>
            </div>

            <div>
              <label style={labelStyle}>Room Type</label>
              <input type="text" value={roomType} onChange={e => setRoomType(e.target.value)}
                placeholder="Single / Double / Dorm" required style={inputStyle}
                onFocus={focusIn} onBlur={focusOut} />
            </div>

            <button type="submit" disabled={loading} style={{
              marginTop: '8px', width: '100%', padding: '13px',
              borderRadius: '12px', border: 'none',
              background: loading ? 'rgba(219,236,185,0.4)' : 'linear-gradient(135deg, #dbecb9 0%, #c5e4a3 100%)',
              color: '#143a2e', fontWeight: 800, fontSize: '0.95rem',
              cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
              transition: 'transform 0.15s, box-shadow 0.15s',
              boxShadow: '0 4px 16px rgba(219,236,185,0.15)',
            }}
              onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(219,236,185,0.3)' } }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(219,236,185,0.15)' }}
            >
              {loading ? 'Adding Property…' : 'Add Property →'}
            </button>
          </form>
        </div>

        {/* Properties list */}
        <div style={{ flex: 1, minWidth: '260px' }}>
          {hostels.length === 0 ? (
            <div style={{
              textAlign: 'center', padding: '64px 24px',
              background: '#fff', borderRadius: '20px',
              border: '1.5px dashed rgba(42,104,84,0.2)',
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🏠</div>
              <h3 style={{ fontWeight: 700, color: '#143a2e', marginBottom: '6px', fontSize: '1.1rem' }}>
                No properties listed yet
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#2a6854', opacity: 0.7 }}>
                Submit the form to add your first hostel listing.
              </p>
            </div>
          ) : (
            <>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 800, color: '#0c2218', marginBottom: '20px' }}>
                Recently Added ({hostels.length})
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
                {hostels.map((hostel, index) => (
                  <div key={hostel._id || index} style={{
                    background: '#fff', borderRadius: '16px',
                    border: '1.5px solid rgba(42,104,84,0.12)',
                    boxShadow: '0 4px 16px rgba(20,58,46,0.06)',
                    overflow: 'hidden',
                  }}
                    className="animate-fadeInUp"
                  >
                    <div style={{ background: 'linear-gradient(135deg, #1d5240 0%, #143a2e 100%)', padding: '16px 18px' }}>
                      <h3 style={{ fontWeight: 800, color: '#dbecb9', fontSize: '1rem', marginBottom: '2px' }}>{hostel.name}</h3>
                      <p style={{ fontSize: '0.78rem', color: 'rgba(219,236,185,0.6)' }}>{hostel.city}</p>
                    </div>
                    <div style={{ padding: '14px 18px' }}>
                      <p style={{ fontSize: '0.78rem', color: '#2a6854', marginBottom: '10px', lineHeight: 1.5 }}>{hostel.address}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{
                          background: '#f0f7ea', borderRadius: '99px',
                          padding: '3px 10px', fontSize: '0.7rem', fontWeight: 700, color: '#1d4d3e',
                        }}>
                          {hostel.roomType || 'Standard'}
                        </span>
                        <span style={{ fontWeight: 800, fontSize: '1rem', color: '#143a2e' }}>
                          ₹{hostel.pricePerMonth}/mo
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default ListProperty;