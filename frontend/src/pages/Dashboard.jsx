import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '../components/Toast';
import ChatModal from '../components/ChatModal';
import ConfirmModal from '../components/ConfirmModal';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [myBookings, setMyBookings] = useState([]);
  const [sellerRequests, setSellerRequests] = useState([]);
  const [myListings, setMyListings] = useState([]);
  const [activeTab, setActiveTab] = useState('buyer');
  const [initialBuyerTime] = useState(() => parseInt(localStorage.getItem('lastSeenBuyerTime') || '0', 10));
  const [activeChatBooking, setActiveChatBooking] = useState(null);
  const [confirmAdoptPetId, setConfirmAdoptPetId] = useState(null);

  useEffect(() => {
    if (activeTab === 'seller') {
      localStorage.setItem('lastSeenSellerTime', Date.now().toString());
    } else {
      localStorage.setItem('lastSeenBuyerTime', Date.now().toString());
    }
    window.dispatchEvent(new Event('notificationsSeen'));
  }, [activeTab]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(storedUser);

    // Fetch buyer bookings
    fetch(`http://localhost:5000/api/bookings/user/${storedUser._id}`)
      .then(res => res.json())
      .then(data => {
        setMyBookings(data);
        if (Array.isArray(data)) {
          let hasNew = false;
          data.forEach(req => {
            if (req.status !== 'Pending' && new Date(req.updatedAt || req.createdAt).getTime() > initialBuyerTime) {
              toast.success(`Update! A seller has ${req.status.toLowerCase()} your Meetup request!`);
              hasNew = true;
            }
          });
          if (hasNew) {
            localStorage.setItem('lastSeenBuyerTime', Date.now().toString());
            window.dispatchEvent(new Event('notificationsSeen'));
          }
        }
      });

    // Fetch seller requests
    fetch(`http://localhost:5000/api/bookings/seller/${storedUser._id}`)
      .then(res => res.json())
      .then(data => setSellerRequests(data));

    // Fetch seller listings
    fetch(`http://localhost:5000/api/pets/seller/${storedUser._id}`)
      .then(res => res.json())
      .then(data => setMyListings(data));

  }, [navigate]);

  const handleUpdateStatus = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:5000/api/bookings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (response.ok) {
        setSellerRequests(prev => prev.map(req => req._id === id ? { ...req, status } : req));
      }
    } catch(err) {
      toast.error("Error updating status");
    }
  };

  const handleMarkAdopted = async (petId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/pets/${petId}/adopt`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id }) 
      });
      if (response.ok) {
        toast.success("Pet marked as beautifully adopted! ✨");
        setMyListings(prev => prev.map(p => p._id === petId ? { ...p, isAdopted: true } : p));
      } else {
        toast.error("Failed to mark adopted");
      }
    } catch(err) {
      toast.error("Network error marking adopted");
    }
  };

  if (!user) return null;

  return (
    <div className="animate-fade-up glass-panel" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1>Welcome, <span style={{ color: 'var(--primary)' }}>{user.name}</span></h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage your adoptions, appointments, and listings.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: 'var(--radius-lg)' }}>
          <button className={`btn ${activeTab === 'buyer' ? 'btn-primary' : 'btn-glass'}`} onClick={() => setActiveTab('buyer')}>My Activity</button>
          <button className={`btn ${activeTab === 'seller' ? 'btn-primary' : 'btn-glass'}`} onClick={() => setActiveTab('seller')}>Seller Hub</button>
        </div>
      </div>

      {activeTab === 'buyer' ? (
        <div className="grid grid-cols-2" style={{ gap: '2rem' }}>
          <div>
            <h3>My Appointments & Requests</h3>
            {myBookings.length === 0 ? <p>No bookings yet.</p> : myBookings.map(b => (
              <div key={b._id} className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h4 style={{ margin: 0 }}>{b.serviceType}</h4>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    {b.status === 'Accepted' && <button className="btn btn-primary" style={{ padding: '0.2rem 0.8rem', fontSize: '0.8rem' }} onClick={() => setActiveChatBooking(b)}>💬 Chat</button>}
                    <span className={`status-badge status-${b.status.toLowerCase()}`}>{b.status}</span>
                  </div>
                </div>
                <p style={{ margin: '0.5rem 0', color: 'var(--text-muted)' }}>Date: {b.date} at {b.time}</p>
                <p style={{ margin: 0 }}>Doctor/Host: {b.doctor}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2" style={{ gap: '2rem' }}>
          <div>
            <h3>Incoming Meetup Requests</h3>
            {sellerRequests.length === 0 ? <p>No requests yet.</p> : sellerRequests.map(req => (
              <div key={req._id} className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1rem', borderLeft: '4px solid var(--primary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h4 style={{ margin: 0 }}>Meetup for Pet</h4>
                  {req.status === 'Pending' ? (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn btn-primary" style={{ padding: '0.2rem 0.8rem', fontSize: '0.8rem' }} onClick={() => handleUpdateStatus(req._id, 'Accepted')}>Accept</button>
                      <button className="btn btn-glass" style={{ padding: '0.2rem 0.8rem', fontSize: '0.8rem' }} onClick={() => handleUpdateStatus(req._id, 'Rejected')}>Reject</button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      {req.status === 'Accepted' && <button className="btn btn-primary" style={{ padding: '0.2rem 0.8rem', fontSize: '0.8rem' }} onClick={() => setActiveChatBooking(req)}>💬 Chat</button>}
                      <span className={`status-badge status-${req.status.toLowerCase()}`}>{req.status}</span>
                    </div>
                  )}
                </div>
                <p style={{ margin: '0.5rem 0', color: 'var(--text-muted)' }}>Requested Date: {req.date} at {req.time}</p>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>Buyer ID: {req.userId}</p>
              </div>
            ))}
          </div>
          <div>
            <h3>My Pet Listings</h3>
            {myListings.length === 0 ? <p>No pets listed.</p> : myListings.map(pet => (
              <div key={pet._id} className="glass-panel" style={{ padding: '1rem', marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                {pet.image ? (
                  <img src={pet.image} alt={pet.name} style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🐶</div>
                )}
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: 0 }}>{pet.name}</h4>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>{pet.breed} • {pet.age} yrs</p>
                </div>
                <div>
                  {pet.isAdopted ? (
                    <span className="status-badge" style={{ background: 'var(--primary)', color: 'white' }}>Adopted ✨</span>
                  ) : (
                    <button className="btn btn-glass" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem', border: '1px solid var(--primary)' }} onClick={() => setConfirmAdoptPetId(pet._id)}>
                      Mark Adopted
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeChatBooking && (
        <ChatModal 
          booking={activeChatBooking} 
          currentUser={user} 
          onClose={() => setActiveChatBooking(null)} 
        />
      )}

      {confirmAdoptPetId && (
        <ConfirmModal 
          message="Are you sure you want to mark this pet as formally adopted? They will be removed from the public pet listings!"
          onCancel={() => setConfirmAdoptPetId(null)}
          onConfirm={() => {
            handleMarkAdopted(confirmAdoptPetId);
            setConfirmAdoptPetId(null);
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
