import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hasPendingRequests, setHasPendingRequests] = useState(false);
  const navigate = useNavigate();
  // Using a simple state for the demo to trigger re-renders properly on route changes
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    const checkNotifications = async () => {
      if (!user) return;
      try {
        let notify = false;

        // Check Seller Notifications (New Pending Requests)
        const sellerRes = await fetch(`http://localhost:5000/api/bookings/seller/${user._id}`);
        const sellerData = await sellerRes.json();
        if (Array.isArray(sellerData)) {
          const lastSeenSeller = parseInt(localStorage.getItem('lastSeenSellerTime') || '0', 10);
          if (sellerData.some(req => req.status === 'Pending' && new Date(req.createdAt).getTime() > lastSeenSeller)) {
            notify = true;
          }
        }

        // Check Buyer Notifications (Status Updates from Seller)
        const buyerRes = await fetch(`http://localhost:5000/api/bookings/user/${user._id}`);
        const buyerData = await buyerRes.json();
        if (Array.isArray(buyerData)) {
          const lastSeenBuyer = parseInt(localStorage.getItem('lastSeenBuyerTime') || '0', 10);
          if (buyerData.some(req => req.status !== 'Pending' && new Date(req.updatedAt || req.createdAt).getTime() > lastSeenBuyer)) {
            notify = true;
          }
        }

        setHasPendingRequests(notify);
      } catch (err) {
        console.error(err);
      }
    };

    checkNotifications();

    window.addEventListener('notificationsSeen', checkNotifications);
    return () => window.removeEventListener('notificationsSeen', checkNotifications);
  }, [user?._id]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
    // Force reload for simplest update mechanism
    window.location.reload();
  };

  return (
    <nav className={`glass-panel ${scrolled ? 'nav-scrolled' : ''}`} style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      borderRadius: scrolled ? '0' : 'var(--radius-lg)',
      margin: scrolled ? '0' : '1rem',
      transition: 'var(--transition)'
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{
          width: '36px', height: '36px', borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>🐶</div>
        <h2 style={{ margin: 0, fontSize: '1.5rem', background: '-webkit-linear-gradient(45deg, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Pawsome
        </h2>
      </Link>
      
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Link to="/pets" className="nav-link">Adopt a Pet</Link>
        {user ? (
          <>
            <Link to="/add-pet" className="nav-link">Sell a Pet</Link>
            <div style={{ position: 'relative' }}>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              {hasPendingRequests && <div style={{ position: 'absolute', top: '-2px', right: '-8px', width: '10px', height: '10px', background: 'var(--primary)', borderRadius: '50%', boxShadow: '0 0 10px var(--primary)' }}></div>}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '1rem', borderLeft: '1px solid var(--border)', paddingLeft: '1rem' }}>
              <span style={{ fontWeight: 600, color: 'var(--text)' }}>Hi, <span style={{ color: 'var(--primary)' }}>{user.name}</span></span>
              <button className="btn btn-glass" onClick={handleLogout} style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>Logout</button>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-glass">Log In</Link>
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
