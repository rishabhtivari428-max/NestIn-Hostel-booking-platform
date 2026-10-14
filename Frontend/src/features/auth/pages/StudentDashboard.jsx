import { useState, useEffect } from 'react';
import { getBooking } from '../services/booking.service';

const statusColors = {
  confirmed: { bg: '#ecfdf5', border: 'rgba(16,185,129,0.3)', color: '#065f46', dot: '#10b981' },
  pending:   { bg: '#fffbeb', border: 'rgba(245,158,11,0.3)', color: '#78350f', dot: '#f59e0b' },
  cancelled: { bg: '#fef2f2', border: 'rgba(239,68,68,0.3)', color: '#7f1d1d', dot: '#ef4444' },
}

const StatusBadge = ({ status = 'pending' }) => {
  const key = status.toLowerCase();
  const c = statusColors[key] || statusColors.pending;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '5px',
      background: c.bg, border: `1px solid ${c.border}`,
      borderRadius: '99px', padding: '4px 12px',
      fontSize: '0.72rem', fontWeight: 700, color: c.color,
      textTransform: 'capitalize', letterSpacing: '0.3px',
    }}>
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: c.dot }} />
      {status}
    </span>
  );
};

const StudentDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await getBooking();
      setBookings(response.myBookings || response.bookings || response.data || []);
    } catch (error) {
      console.log('Error while fetching bookings', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  if (loading) return (
    <div style={{
      minHeight: '80vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: '16px',
      background: '#f7faf3',
    }}>
      <div style={{
        width: '44px', height: '44px', borderRadius: '50%',
        border: '3px solid rgba(42,104,84,0.2)', borderTopColor: '#1d4d3e',
        animation: 'spin 0.8s linear infinite',
      }} />
      <p style={{ color: '#2a6854', fontWeight: 600, fontSize: '0.9rem' }}>Loading your bookings…</p>
    </div>
  );

  return (
    <div style={{ background: '#f7faf3', minHeight: '100vh', padding: '40px 24px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Page header */}
        <div style={{
          background: 'linear-gradient(135deg, #1d5240 0%, #0c2218 100%)',
          borderRadius: '20px', padding: '28px 32px', marginBottom: '32px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px',
          boxShadow: '0 8px 32px rgba(12,34,24,0.25)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(251,191,36,0.12)', filter: 'blur(30px)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <span style={{ display: 'inline-block', background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '99px', padding: '3px 12px', fontSize: '0.7rem', fontWeight: 700, color: '#fbbf24', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '10px' }}>
              Student Portal
            </span>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', fontWeight: 800, color: '#f7faf3', marginBottom: '4px' }}>
              My Bookings
            </h1>
            <p style={{ fontSize: '0.83rem', color: 'rgba(219,236,185,0.55)' }}>
              {bookings.length} booking{bookings.length !== 1 ? 's' : ''} found
            </p>
          </div>
          <button onClick={fetchBookings} style={{
            padding: '9px 20px', borderRadius: '10px',
            background: 'rgba(219,236,185,0.15)', border: '1.5px solid rgba(219,236,185,0.25)',
            color: '#dbecb9', fontWeight: 600, fontSize: '0.85rem',
            cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.2s',
            position: 'relative', zIndex: 1,
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(219,236,185,0.25)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(219,236,185,0.15)'}
          >
            🔄 Refresh
          </button>
        </div>

        {bookings.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '80px 24px',
            background: '#fff', borderRadius: '20px',
            border: '1.5px dashed rgba(42,104,84,0.2)',
          }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '20px' }}>📭</div>
            <h2 style={{ fontWeight: 800, color: '#0c2218', fontSize: '1.2rem', marginBottom: '8px' }}>
              No bookings yet
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#2a6854', opacity: 0.7 }}>
              Browse hostels and book your perfect stay.
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '18px' }}>
            {bookings.map((booking) => {
              const hostel = booking.hostelId || booking.hostel || {};
              const bookingId = booking._id || booking.id;
              return (
                <div key={bookingId} style={{
                  background: '#fff', borderRadius: '16px',
                  border: '1.5px solid rgba(42,104,84,0.12)',
                  boxShadow: '0 4px 16px rgba(20,58,46,0.07)',
                  overflow: 'hidden', transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                  className="animate-fadeInUp"
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(20,58,46,0.12)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(20,58,46,0.07)' }}
                >
                  {/* Card header */}
                  <div style={{ background: 'linear-gradient(135deg, #1d5240 0%, #143a2e 100%)', padding: '18px 20px' }}>
                    <h2 style={{ fontWeight: 800, color: '#dbecb9', fontSize: '1.05rem', marginBottom: '3px' }}>
                      {hostel.name || 'Hostel'}
                    </h2>
                    {hostel.city && (
                      <p style={{ fontSize: '0.78rem', color: 'rgba(219,236,185,0.55)' }}>📍 {hostel.city}</p>
                    )}
                  </div>

                  {/* Card body */}
                  <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                      <StatusBadge status={booking.status || 'Pending'} />
                      <span style={{ fontWeight: 800, fontSize: '1.05rem', color: '#143a2e' }}>
                        ₹{booking.totalAmount || booking.price || hostel.pricePerMonth}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', background: '#f7faf3', borderRadius: '10px', border: '1px solid rgba(42,104,84,0.1)' }}>
                      <span style={{ fontSize: '1rem' }}>📅</span>
                      <div>
                        <p style={{ fontSize: '0.7rem', fontWeight: 600, color: 'rgba(42,104,84,0.6)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>Check-in</p>
                        <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#143a2e' }}>
                          {new Date(booking.checkInDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;