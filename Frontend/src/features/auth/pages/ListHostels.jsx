import { useState, useEffect } from 'react';
import { getAllHostels } from '../services/hostel.service';
import { BookHostel } from '../services/booking.service';
import { createInquiery } from '../services/inquiery.service';

const getHostelId = (hostel) => hostel?.id || hostel?._id || hostel?.hostelId;

/* ── Shared style helpers ───────────────── */
const inputFocus = (e) => {
  e.target.style.borderColor = 'rgba(219,236,185,0.5)'
  e.target.style.background = 'rgba(255,255,255,0.1)'
}
const inputBlur = (e) => {
  e.target.style.borderColor = 'rgba(255,255,255,0.12)'
  e.target.style.background = 'rgba(255,255,255,0.06)'
}
const darkInput = {
  width: '100%', padding: '10px 14px', borderRadius: '10px',
  border: '1.5px solid rgba(255,255,255,0.12)',
  background: 'rgba(255,255,255,0.06)',
  color: '#f7faf3', fontSize: '0.875rem', outline: 'none',
  fontFamily: 'inherit', transition: 'border-color 0.2s, background 0.2s',
}

const ListHostels = () => {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHostel, setSelectedHostel] = useState(null);
  const [checkInDate, setCheckInDate] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [inquireHostel, setInquireHostel] = useState(null);
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquiryLoading, setInquiryLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchHostels = async () => {
      try {
        const response = await getAllHostels();
        if (isMounted) {
          const fetched = response.hostels || response.data || [];
          setHostels(fetched.map(h => ({ ...h, id: getHostelId(h) })));
        }
      } catch (error) {
        console.log('Error while fetching hostels', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchHostels();
    return () => { isMounted = false; };
  }, []);

  const handleBookSubmit = async (e) => {
    e.preventDefault();
    if (!checkInDate) { alert('Please select a check-in date!'); return; }
    try {
      setBookingLoading(true);
      const hostelId = getHostelId(selectedHostel);
      if (!hostelId) throw new Error('This hostel does not have a valid ID');
      const response = await BookHostel({ hostelId, checkInDate, totalAmount: selectedHostel.pricePerMonth });
      console.log('Booking saved:', response);
      alert(`Successfully booked ${selectedHostel.name}!`);
      setHostels(prev => prev.map(h => getHostelId(h) === hostelId ? { ...h, isBookedByUser: true } : h));
      setSelectedHostel(null); setCheckInDate('');
    } catch (error) {
      alert(error.response?.data?.message || error.message || 'Failed to save booking');
    } finally { setBookingLoading(false); }
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    if (!inquiryMessage.trim()) { alert('Please enter a message!'); return; }
    try {
      setInquiryLoading(true);
      const hostelId = getHostelId(inquireHostel);
      const response = await createInquiery(hostelId, inquiryMessage);
      console.log('Inquiry saved:', response);
      alert(`Inquiry sent to ${inquireHostel.name}!`);
      setInquireHostel(null); setInquiryMessage('');
    } catch (error) {
      alert(error.response?.data?.message || error.message || 'Failed to send inquiry');
    } finally { setInquiryLoading(false); }
  };

  if (loading) return (
    <div style={{
      minHeight: '80vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: '16px',
      background: '#f7faf3',
    }}>
      <div style={{
        width: '44px', height: '44px', borderRadius: '50%',
        border: '3px solid rgba(42,104,84,0.2)',
        borderTopColor: '#1d4d3e',
        animation: 'spin 0.8s linear infinite',
      }} />
      <p style={{ color: '#2a6854', fontWeight: 600, fontSize: '0.9rem' }}>Loading hostels…</p>
    </div>
  );

  return (
    <div style={{ background: '#f7faf3', minHeight: '100vh', padding: '40px 24px' }}>
      {/* Page header */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 32px' }}>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '2rem', fontWeight: 800, color: '#0c2218', marginBottom: '6px',
        }}>
          Browse Hostels
        </h1>
        <p style={{ color: '#2a6854', fontSize: '0.9rem' }}>
          {hostels.length} verified listing{hostels.length !== 1 ? 's' : ''} available
        </p>
      </div>

      {/* Grid */}
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
        gap: '20px',
      }}>
        {hostels.map((hostel, i) => {
          const hId = getHostelId(hostel);
          const ownerName = typeof hostel.owner === 'object' && hostel.owner !== null
            ? (hostel.owner.Username || hostel.owner.username || hostel.owner.name || 'Unknown')
            : (hostel.owner || 'Unknown');

          return (
            <div
              key={hId}
              className="animate-fadeInUp"
              style={{
                background: '#fff',
                borderRadius: '18px',
                border: '1.5px solid rgba(42,104,84,0.12)',
                boxShadow: '0 4px 20px rgba(20,58,46,0.06)',
                overflow: 'hidden',
                display: 'flex', flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                animationDelay: `${i * 60}ms`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 12px 36px rgba(20,58,46,0.13)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(20,58,46,0.06)'
              }}
            >
              {/* Card header strip */}
              <div style={{
                background: 'linear-gradient(135deg, #1d5240 0%, #143a2e 100%)',
                padding: '20px',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', inset: 0, opacity: 0.05,
                  backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                  backgroundSize: '16px 16px', pointerEvents: 'none',
                }} />
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'rgba(219,236,185,0.55)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>
                      Owner
                    </p>
                    <p style={{ fontWeight: 700, color: '#fbbf24', fontSize: '0.95rem' }}>{ownerName}</p>
                    {(hostel.owner?.phone || hostel.owner?.phoneNumber) && (
                      <p style={{ fontSize: '0.75rem', color: 'rgba(219,236,185,0.6)', marginTop: '2px' }}>
                        📞 {hostel.owner?.phone || hostel.owner?.phoneNumber}
                      </p>
                    )}
                  </div>
                  <span style={{
                    background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.3)',
                    borderRadius: '99px', padding: '3px 10px',
                    fontSize: '0.7rem', fontWeight: 700, color: '#fbbf24',
                    textTransform: 'uppercase', letterSpacing: '0.5px',
                  }}>
                    {hostel.roomType || 'Standard'}
                  </span>
                </div>
              </div>

              {/* Card body */}
              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <h2 style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0c2218', marginBottom: '4px' }}>
                    {hostel.name}
                  </h2>
                  <p style={{ fontSize: '0.83rem', color: '#2a6854', fontWeight: 500 }}>
                    📍 {hostel.address?.city || hostel.city}
                  </p>
                  {(hostel.address?.street || (typeof hostel.address === 'string' && hostel.address)) && (
                    <p style={{ fontSize: '0.78rem', color: '#2a6854', opacity: 0.7, marginTop: '2px' }}>
                      {hostel.address?.street || hostel.address}
                    </p>
                  )}
                </div>

                {hostel.amenities && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {(Array.isArray(hostel.amenities) ? hostel.amenities : hostel.amenities.split(',')).slice(0, 4).map(a => (
                      <span key={a} style={{
                        background: '#f0f7ea', borderRadius: '99px',
                        padding: '3px 10px', fontSize: '0.72rem', fontWeight: 600, color: '#1d4d3e',
                      }}>
                        {a.trim()}
                      </span>
                    ))}
                  </div>
                )}

                <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid rgba(42,104,84,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <p style={{ fontWeight: 800, fontSize: '1.15rem', color: '#143a2e' }}>
                    ₹{hostel.pricePerMonth}
                    <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#2a6854', marginLeft: '3px' }}>/mo</span>
                  </p>
                </div>

                {/* Action buttons */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  {hostel.isBookedByUser ? (
                    <div style={{
                      flex: 1, padding: '9px', borderRadius: '10px',
                      background: '#f0f7ea', border: '1.5px solid rgba(42,104,84,0.2)',
                      color: '#2a6854', fontWeight: 700, fontSize: '0.83rem',
                      textAlign: 'center', cursor: 'not-allowed',
                    }}>
                      ✓ Booked
                    </div>
                  ) : (
                    <button
                      onClick={() => setSelectedHostel(hostel)}
                      style={{
                        flex: 1, padding: '9px', borderRadius: '10px',
                        background: 'linear-gradient(135deg, #143a2e 0%, #1d4d3e 100%)',
                        color: '#dbecb9', fontWeight: 700, fontSize: '0.83rem',
                        border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                        transition: 'opacity 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                    >
                      Book Hostel
                    </button>
                  )}
                  <button
                    onClick={() => setInquireHostel(hostel)}
                    style={{
                      flex: 1, padding: '9px', borderRadius: '10px',
                      background: 'transparent',
                      border: '1.5px solid rgba(42,104,84,0.35)',
                      color: '#2a6854', fontWeight: 700, fontSize: '0.83rem',
                      cursor: 'pointer', fontFamily: 'inherit',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(42,104,84,0.08)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'transparent'
                    }}
                  >
                    Inquire
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Book Modal ─── */}
      {selectedHostel && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 50,
            background: 'rgba(12,34,24,0.6)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px',
          }}
          className="animate-fadeIn"
          onClick={e => { if (e.target === e.currentTarget) setSelectedHostel(null) }}
        >
          <div style={{
            background: 'linear-gradient(145deg, #1d5240 0%, #143a2e 100%)',
            borderRadius: '20px', padding: '32px', width: '100%', maxWidth: '400px',
            boxShadow: '0 24px 64px rgba(12,34,24,0.5)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 800, color: '#f7faf3', marginBottom: '6px' }}>
              Book Hostel
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'rgba(219,236,185,0.65)', marginBottom: '24px' }}>
              {selectedHostel.name} · <span style={{ color: '#fbbf24', fontWeight: 700 }}>₹{selectedHostel.pricePerMonth}/mo</span>
            </p>
            <form onSubmit={handleBookSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'rgba(219,236,185,0.7)', marginBottom: '8px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                  Check-in Date
                </label>
                <input type="date" value={checkInDate} min={new Date().toISOString().split('T')[0]}
                  onChange={e => setCheckInDate(e.target.value)} style={darkInput} required
                  onFocus={inputFocus} onBlur={inputBlur} />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="button" onClick={() => setSelectedHostel(null)} style={{
                  flex: 1, padding: '11px', borderRadius: '10px', border: '1.5px solid rgba(255,255,255,0.15)',
                  background: 'transparent', color: 'rgba(219,236,185,0.75)', fontWeight: 600,
                  fontSize: '0.875rem', cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  Cancel
                </button>
                <button type="submit" disabled={bookingLoading} style={{
                  flex: 1, padding: '11px', borderRadius: '10px', border: 'none',
                  background: 'linear-gradient(135deg, #dbecb9 0%, #c5e4a3 100%)',
                  color: '#143a2e', fontWeight: 800, fontSize: '0.875rem',
                  cursor: bookingLoading ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
                  opacity: bookingLoading ? 0.6 : 1, transition: 'opacity 0.2s',
                }}>
                  {bookingLoading ? 'Saving…' : 'Confirm Booking'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Inquiry Modal ─── */}
      {inquireHostel && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 50,
            background: 'rgba(12,34,24,0.6)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px',
          }}
          className="animate-fadeIn"
          onClick={e => { if (e.target === e.currentTarget) { setInquireHostel(null); setInquiryMessage('') } }}
        >
          <div style={{
            background: 'linear-gradient(145deg, #1d5240 0%, #143a2e 100%)',
            borderRadius: '20px', padding: '32px', width: '100%', maxWidth: '400px',
            boxShadow: '0 24px 64px rgba(12,34,24,0.5)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 800, color: '#f7faf3', marginBottom: '6px' }}>
              Send Inquiry
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'rgba(219,236,185,0.65)', marginBottom: '24px' }}>
              To: <span style={{ color: '#fbbf24', fontWeight: 700 }}>{inquireHostel.name}</span>
            </p>
            <form onSubmit={handleInquirySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: 'rgba(219,236,185,0.7)', marginBottom: '8px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                  Your Message
                </label>
                <textarea rows={4} value={inquiryMessage}
                  onChange={e => setInquiryMessage(e.target.value)}
                  placeholder="Ask about rules, food, room availability…"
                  style={{ ...darkInput, resize: 'vertical', lineHeight: 1.6 }} required
                  onFocus={inputFocus} onBlur={inputBlur} />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="button" onClick={() => { setInquireHostel(null); setInquiryMessage('') }} style={{
                  flex: 1, padding: '11px', borderRadius: '10px', border: '1.5px solid rgba(255,255,255,0.15)',
                  background: 'transparent', color: 'rgba(219,236,185,0.75)', fontWeight: 600,
                  fontSize: '0.875rem', cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  Cancel
                </button>
                <button type="submit" disabled={inquiryLoading} style={{
                  flex: 1, padding: '11px', borderRadius: '10px', border: 'none',
                  background: 'linear-gradient(135deg, #dbecb9 0%, #c5e4a3 100%)',
                  color: '#143a2e', fontWeight: 800, fontSize: '0.875rem',
                  cursor: inquiryLoading ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
                  opacity: inquiryLoading ? 0.6 : 1, transition: 'opacity 0.2s',
                }}>
                  {inquiryLoading ? 'Sending…' : 'Send Inquiry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListHostels;