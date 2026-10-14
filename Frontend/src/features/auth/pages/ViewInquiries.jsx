import { useState, useEffect } from 'react';
import { getInquiery, deleteInquiery, updateInquieryStatus } from '../services/inquiery.service';

const statusConfig = {
  resolved:  { bg: '#ecfdf5', border: 'rgba(16,185,129,0.3)', color: '#065f46', dot: '#10b981', label: 'Resolved' },
  rejected:  { bg: '#fef2f2', border: 'rgba(239,68,68,0.3)',  color: '#7f1d1d', dot: '#ef4444', label: 'Rejected'  },
  booked:    { bg: '#eff6ff', border: 'rgba(59,130,246,0.3)', color: '#1e3a8a', dot: '#3b82f6', label: 'Booked'    },
  pending:   { bg: '#fffbeb', border: 'rgba(245,158,11,0.3)', color: '#78350f', dot: '#f59e0b', label: 'Pending'   },
}

const StatusBadge = ({ status = 'Pending' }) => {
  const c = statusConfig[status.toLowerCase()] || statusConfig.pending;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '5px',
      background: c.bg, border: `1px solid ${c.border}`,
      borderRadius: '99px', padding: '4px 12px',
      fontSize: '0.72rem', fontWeight: 700, color: c.color,
      letterSpacing: '0.3px',
    }}>
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: c.dot }} />
      {c.label}
    </span>
  );
};

const ViewInquiries = ({ hostelId }) => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const response = await getInquiery(hostelId);
      const list = response.inquiries || response.data?.inquiries || (Array.isArray(response) ? response : []);
      setInquiries(list);
    } catch (err) {
      console.error('Error fetching inquiries:', err);
      setInquiries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchInquiries(); }, [hostelId]);

  const handleUpdateStatus = async (id, newStatus) => {
    setUpdatingId(id);
    setInquiries(prev => prev.map(item => item._id === id ? { ...item, status: newStatus } : item));
    try {
      await updateInquieryStatus(id, newStatus);
    } catch (err) {
      console.error('Failed to update status', err);
      await fetchInquiries();
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    setInquiries(prev => prev.filter(item => item._id !== id));
    try {
      await deleteInquiery(id);
    } catch (err) {
      console.error('Failed to delete inquiry', err);
      await fetchInquiries();
    }
  };

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
      <p style={{ color: '#2a6854', fontWeight: 600, fontSize: '0.9rem' }}>Loading inquiries…</p>
    </div>
  );

  return (
    <div style={{ background: '#f7faf3', minHeight: '100vh', padding: '40px 24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* Page header */}
        <div style={{
          background: 'linear-gradient(135deg, #1d5240 0%, #0c2218 100%)',
          borderRadius: '20px', padding: '28px 32px', marginBottom: '32px',
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
          boxShadow: '0 8px 32px rgba(12,34,24,0.25)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(251,191,36,0.12)', filter: 'blur(30px)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <span style={{ display: 'inline-block', background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '99px', padding: '3px 12px', fontSize: '0.7rem', fontWeight: 700, color: '#fbbf24', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '10px' }}>
              Inquiries
            </span>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', fontWeight: 800, color: '#f7faf3', marginBottom: '4px' }}>
              Student Questions
            </h1>
            <p style={{ fontSize: '0.83rem', color: 'rgba(219,236,185,0.55)' }}>
              Review and manage incoming inquiries
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative', zIndex: 1 }}>
            <button onClick={fetchInquiries} style={{
              padding: '9px 18px', borderRadius: '10px',
              background: 'rgba(219,236,185,0.15)', border: '1.5px solid rgba(219,236,185,0.25)',
              color: '#dbecb9', fontWeight: 600, fontSize: '0.83rem',
              cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(219,236,185,0.25)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(219,236,185,0.15)'}
            >
              🔄 Refresh
            </button>
            <span style={{
              background: 'rgba(251,191,36,0.2)', border: '1px solid rgba(251,191,36,0.35)',
              borderRadius: '99px', padding: '6px 16px',
              fontSize: '0.83rem', fontWeight: 700, color: '#fbbf24',
            }}>
              {inquiries.length} total
            </span>
          </div>
        </div>

        {inquiries.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '80px 24px',
            background: '#fff', borderRadius: '20px',
            border: '1.5px dashed rgba(42,104,84,0.2)',
          }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '20px' }}>💬</div>
            <h2 style={{ fontWeight: 800, color: '#0c2218', fontSize: '1.2rem', marginBottom: '8px' }}>
              No inquiries found
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#2a6854', opacity: 0.7 }}>
              Student questions will appear here once submitted.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {inquiries.map((inquiry) => {
              const currentStatus = inquiry.status || 'Pending';
              const isUpdating = updatingId === inquiry._id;
              return (
                <div key={inquiry._id} style={{
                  background: '#fff', borderRadius: '16px',
                  border: '1.5px solid rgba(42,104,84,0.1)',
                  boxShadow: '0 3px 14px rgba(20,58,46,0.06)',
                  padding: '20px 22px',
                  display: 'flex', gap: '20px', flexWrap: 'wrap',
                  transition: 'box-shadow 0.2s',
                }}
                  className="animate-fadeInUp"
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 6px 24px rgba(20,58,46,0.1)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = '0 3px 14px rgba(20,58,46,0.06)'}
                >
                  {/* Left: content */}
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    {/* Meta row */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <StatusBadge status={currentStatus} />
                      {inquiry.hostel?.name && (
                        <span style={{
                          background: '#f0f7ea', borderRadius: '99px',
                          padding: '4px 12px', fontSize: '0.72rem', fontWeight: 700, color: '#1d4d3e',
                        }}>
                          🏠 {inquiry.hostel.name}{inquiry.hostel?.city ? ` · ${inquiry.hostel.city}` : ''}
                        </span>
                      )}
                      <span style={{ fontSize: '0.72rem', color: 'rgba(42,104,84,0.5)', marginLeft: 'auto' }}>
                        📅 {new Date(inquiry.createdAt || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>

                    {/* Message */}
                    <blockquote style={{
                      background: '#f7faf3', borderLeft: '3px solid rgba(42,104,84,0.3)',
                      borderRadius: '0 10px 10px 0', padding: '12px 16px',
                      margin: '0 0 12px', fontStyle: 'italic',
                      fontSize: '0.875rem', color: '#143a2e', lineHeight: 1.6,
                    }}>
                      "{inquiry.message}"
                    </blockquote>

                    {/* People */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '0.78rem', color: '#2a6854' }}>
                      {inquiry.student && (
                        <span>
                          👤 <strong style={{ color: '#0c2218' }}>{inquiry.student.Username || inquiry.student.username || inquiry.student.name || 'Student'}</strong>
                          <span style={{ opacity: 0.7 }}> · {inquiry.student.email}</span>
                        </span>
                      )}
                      {inquiry.owner && (
                        <span>
                          🏢 <strong style={{ color: '#0c2218' }}>{inquiry.owner.Username || inquiry.owner.username || inquiry.owner.name || 'Owner'}</strong>
                          <span style={{ opacity: 0.7 }}> · {inquiry.owner.email}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right: action buttons */}
                  <div style={{
                    display: 'flex', flexDirection: 'column', gap: '7px',
                    justifyContent: 'flex-start', minWidth: '140px',
                  }}>
                    <button
                      onClick={() => handleUpdateStatus(inquiry._id, 'Resolved')}
                      disabled={isUpdating || currentStatus.toLowerCase() === 'resolved'}
                      style={{
                        padding: '8px 12px', borderRadius: '9px', border: 'none',
                        background: currentStatus.toLowerCase() === 'resolved' ? 'rgba(16,185,129,0.1)' : '#10b981',
                        color: currentStatus.toLowerCase() === 'resolved' ? '#065f46' : '#fff',
                        fontWeight: 700, fontSize: '0.78rem', cursor: isUpdating || currentStatus.toLowerCase() === 'resolved' ? 'not-allowed' : 'pointer',
                        fontFamily: 'inherit', opacity: isUpdating ? 0.5 : 1, transition: 'opacity 0.2s, transform 0.15s',
                      }}
                      onMouseEnter={e => { if (!isUpdating && currentStatus.toLowerCase() !== 'resolved') e.currentTarget.style.transform = 'translateY(-1px)' }}
                      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                      ✔ Resolve
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(inquiry._id, 'Rejected')}
                      disabled={isUpdating || currentStatus.toLowerCase() === 'rejected'}
                      style={{
                        padding: '8px 12px', borderRadius: '9px', border: 'none',
                        background: currentStatus.toLowerCase() === 'rejected' ? 'rgba(239,68,68,0.08)' : '#ef4444',
                        color: currentStatus.toLowerCase() === 'rejected' ? '#7f1d1d' : '#fff',
                        fontWeight: 700, fontSize: '0.78rem', cursor: isUpdating || currentStatus.toLowerCase() === 'rejected' ? 'not-allowed' : 'pointer',
                        fontFamily: 'inherit', opacity: isUpdating ? 0.5 : 1, transition: 'opacity 0.2s, transform 0.15s',
                      }}
                      onMouseEnter={e => { if (!isUpdating && currentStatus.toLowerCase() !== 'rejected') e.currentTarget.style.transform = 'translateY(-1px)' }}
                      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                      ✖ Reject
                    </button>
                    {currentStatus.toLowerCase() !== 'pending' && (
                      <button
                        onClick={() => handleUpdateStatus(inquiry._id, 'Pending')}
                        disabled={isUpdating}
                        style={{
                          padding: '8px 12px', borderRadius: '9px',
                          border: '1.5px solid rgba(245,158,11,0.4)',
                          background: 'rgba(245,158,11,0.08)', color: '#78350f',
                          fontWeight: 600, fontSize: '0.78rem', cursor: isUpdating ? 'not-allowed' : 'pointer',
                          fontFamily: 'inherit', opacity: isUpdating ? 0.5 : 1, transition: 'background 0.2s',
                        }}
                      >
                        ↩ Reset
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(inquiry._id)}
                      style={{
                        padding: '8px 12px', borderRadius: '9px',
                        border: '1.5px solid rgba(220,38,38,0.2)',
                        background: 'rgba(220,38,38,0.05)', color: '#b91c1c',
                        fontWeight: 600, fontSize: '0.78rem', cursor: 'pointer',
                        fontFamily: 'inherit', transition: 'background 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(220,38,38,0.12)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'rgba(220,38,38,0.05)'}
                    >
                      🗑️ Delete
                    </button>
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

export default ViewInquiries;