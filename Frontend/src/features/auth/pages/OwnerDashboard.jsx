import { useState } from 'react';
import { addHostel, deleteHostel } from '../services/hostel.service';

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
const fi = e => { e.target.style.borderColor = 'rgba(219,236,185,0.5)'; e.target.style.background = 'rgba(255,255,255,0.1)' }
const fo = e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.background = 'rgba(255,255,255,0.06)' }

const OwnerDashboard = () => {
  const [hostels, setHostels] = useState([]);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [pricePerMonth, setPricePerMonth] = useState('');
  const [amenities, setAmenities] = useState('');
  const [roomType, setRoomType] = useState('');
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(true);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  const handleAddHostels = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const amenitiesArray = amenities.split(',').map(item => item.trim());
      const response = await addHostel({ name, city, address, pricePerMonth: Number(pricePerMonth), amenities: amenitiesArray, roomType });
      if (response?.hostel || response?.data) {
        setHostels(prev => [response.hostel || response.data, ...prev]);
        setName(''); setCity(''); setAddress(''); setPricePerMonth(''); setAmenities(''); setRoomType('');
      }
    } catch (error) {
      console.log('Error while Adding property', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteHostel = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;
    setDeletingId(id);
    try {
      await deleteHostel(id);
      setHostels(prev => prev.filter(h => (h._id || h.id) !== id));
    } catch (error) {
      console.log('Error deleting property', error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div style={{ background: '#f7faf3', minHeight: '100vh', padding: '32px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Dashboard header */}
        <div style={{
          background: 'linear-gradient(135deg, #1d5240 0%, #0c2218 100%)',
          borderRadius: '20px', padding: '24px 28px',
          display: 'flex', flexWrap: 'wrap', alignItems: 'center',
          justifyContent: 'space-between', gap: '16px', marginBottom: '28px',
          boxShadow: '0 8px 32px rgba(12,34,24,0.25)',
          border: '1px solid rgba(255,255,255,0.07)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: '-40px', right: '-40px', width: '120px', height: '120px',
            borderRadius: '50%', background: 'rgba(251,191,36,0.12)', filter: 'blur(30px)', pointerEvents: 'none',
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <span style={{
              display: 'inline-block', background: 'rgba(251,191,36,0.15)',
              border: '1px solid rgba(251,191,36,0.3)', borderRadius: '99px',
              padding: '3px 12px', fontSize: '0.7rem', fontWeight: 700,
              color: '#fbbf24', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '10px',
            }}>Owner Dashboard</span>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 800, color: '#f7faf3', marginBottom: '4px' }}>
              Manage Your Listings
            </h1>
            <p style={{ fontSize: '0.83rem', color: 'rgba(219,236,185,0.55)' }}>
              {hostels.length} propert{hostels.length === 1 ? 'y' : 'ies'} listed
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
            <button onClick={() => setShowAddForm(!showAddForm)} style={{
              padding: '9px 20px', borderRadius: '10px', border: 'none',
              background: showAddForm ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #dbecb9 0%, #c5e4a3 100%)',
              color: showAddForm ? 'rgba(219,236,185,0.8)' : '#143a2e',
              fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit',
              transition: 'all 0.2s',
              border: showAddForm ? '1.5px solid rgba(219,236,185,0.2)' : 'none',
            }}>
              {showAddForm ? '✕ Close Form' : '+ Add Hostel'}
            </button>
            <button onClick={() => setIsDeleteMode(!isDeleteMode)} style={{
              padding: '9px 20px', borderRadius: '10px', border: 'none',
              background: isDeleteMode ? '#dc2626' : 'rgba(220,38,38,0.15)',
              color: isDeleteMode ? '#fff' : '#fca5a5',
              fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit',
              transition: 'all 0.2s',
              border: isDeleteMode ? 'none' : '1.5px solid rgba(220,38,38,0.3)',
              animation: isDeleteMode ? 'pulse 1.5s infinite' : 'none',
            }}>
              {isDeleteMode ? '🛑 Exit Delete Mode' : '🗑️ Delete Mode'}
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '28px', flexWrap: 'wrap', alignItems: 'flex-start' }}>

          {/* Add form */}
          {showAddForm && (
            <div style={{
              flex: '0 0 380px', minWidth: '280px',
              background: 'linear-gradient(145deg, #1d5240 0%, #143a2e 100%)',
              borderRadius: '20px', padding: '32px 28px',
              boxShadow: '0 12px 40px rgba(12,34,24,0.28)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
              className="animate-fadeInUp"
            >
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 800, color: '#f7faf3', marginBottom: '4px' }}>
                Add Property
              </h2>
              <p style={{ fontSize: '0.8rem', color: 'rgba(219,236,185,0.5)', marginBottom: '24px' }}>
                Fill in the details below
              </p>
              <form onSubmit={handleAddHostels} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                  <label style={labelStyle}>Hostel Name</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Green Valley" required style={inputStyle} onFocus={fi} onBlur={fo} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={labelStyle}>City</label>
                    <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="Bhopal" required style={inputStyle} onFocus={fi} onBlur={fo} />
                  </div>
                  <div>
                    <label style={labelStyle}>Rent (₹/mo)</label>
                    <input type="number" value={pricePerMonth} onChange={e => setPricePerMonth(e.target.value)} placeholder="6500" required style={inputStyle} onFocus={fi} onBlur={fo} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Address</label>
                  <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Street, Area" required style={inputStyle} onFocus={fi} onBlur={fo} />
                </div>
                <div>
                  <label style={labelStyle}>Amenities</label>
                  <input type="text" value={amenities} onChange={e => setAmenities(e.target.value)} placeholder="WiFi, AC, Mess…" required style={inputStyle} onFocus={fi} onBlur={fo} />
                </div>
                <div>
                  <label style={labelStyle}>Room Type</label>
                  <input type="text" value={roomType} onChange={e => setRoomType(e.target.value)} placeholder="Single / Double / Dorm" required style={inputStyle} onFocus={fi} onBlur={fo} />
                </div>
                <button type="submit" disabled={loading} style={{
                  marginTop: '6px', width: '100%', padding: '13px', borderRadius: '12px', border: 'none',
                  background: loading ? 'rgba(219,236,185,0.3)' : 'linear-gradient(135deg, #dbecb9 0%, #c5e4a3 100%)',
                  color: '#143a2e', fontWeight: 800, fontSize: '0.9rem',
                  cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
                  transition: 'transform 0.15s, box-shadow 0.15s', boxShadow: '0 4px 14px rgba(219,236,185,0.15)',
                }}
                  onMouseEnter={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(-1px)' } }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  {loading ? 'Adding…' : 'Add Property →'}
                </button>
              </form>
            </div>
          )}

          {/* Properties grid */}
          <div style={{ flex: 1, minWidth: '260px' }}>
            {hostels.length === 0 ? (
              <div style={{
                textAlign: 'center', padding: '64px 24px',
                background: '#fff', borderRadius: '20px',
                border: '1.5px dashed rgba(42,104,84,0.2)',
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🏘️</div>
                <h3 style={{ fontWeight: 700, color: '#143a2e', marginBottom: '6px', fontSize: '1.05rem' }}>
                  No properties yet
                </h3>
                <p style={{ fontSize: '0.83rem', color: '#2a6854', opacity: 0.65 }}>
                  Add your first property using the form.
                </p>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap', gap: '8px' }}>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', fontWeight: 800, color: '#0c2218' }}>
                    Your Properties
                  </h2>
                  {isDeleteMode && (
                    <span style={{
                      background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '99px',
                      padding: '4px 12px', fontSize: '0.72rem', fontWeight: 700, color: '#dc2626',
                    }}>
                      Click ✕ to delete
                    </span>
                  )}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
                  {hostels.map((hostel, index) => {
                    const hostelId = hostel._id || hostel.id || index;
                    return (
                      <div key={hostelId} style={{
                        background: '#fff', borderRadius: '16px',
                        border: '1.5px solid rgba(42,104,84,0.12)',
                        boxShadow: '0 4px 16px rgba(20,58,46,0.06)',
                        overflow: 'hidden', position: 'relative',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                      }}
                        className="animate-fadeInUp"
                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(20,58,46,0.12)' }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(20,58,46,0.06)' }}
                      >
                        {isDeleteMode && (
                          <button
                            onClick={() => handleDeleteHostel(hostelId)}
                            disabled={deletingId === hostelId}
                            title="Delete Property"
                            style={{
                              position: 'absolute', top: '10px', right: '10px', zIndex: 10,
                              width: '28px', height: '28px', borderRadius: '50%',
                              background: '#dc2626', border: 'none', cursor: 'pointer',
                              color: '#fff', fontSize: '0.75rem', fontWeight: 800,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              boxShadow: '0 2px 8px rgba(220,38,38,0.4)',
                              transition: 'transform 0.15s',
                              opacity: deletingId === hostelId ? 0.5 : 1,
                            }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                          >
                            {deletingId === hostelId ? '…' : '✕'}
                          </button>
                        )}
                        <div style={{ background: 'linear-gradient(135deg, #1d5240 0%, #143a2e 100%)', padding: '16px 18px' }}>
                          <h3 style={{ fontWeight: 800, color: '#dbecb9', fontSize: '1rem', marginBottom: '2px' }}>{hostel.name}</h3>
                          <p style={{ fontSize: '0.78rem', color: 'rgba(219,236,185,0.6)' }}>{hostel.city}</p>
                        </div>
                        <div style={{ padding: '14px 18px' }}>
                          <p style={{ fontSize: '0.78rem', color: '#2a6854', marginBottom: '10px', lineHeight: 1.5 }}>{hostel.address}</p>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ background: '#f0f7ea', borderRadius: '99px', padding: '3px 10px', fontSize: '0.7rem', fontWeight: 700, color: '#1d4d3e' }}>
                              {hostel.roomType || 'Standard'}
                            </span>
                            <span style={{ fontWeight: 800, fontSize: '1rem', color: '#143a2e' }}>
                              ₹{hostel.pricePerMonth}/mo
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;