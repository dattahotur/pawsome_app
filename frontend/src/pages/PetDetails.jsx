import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from '../components/Toast';

const PetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [adopting, setAdopting] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetch(`http://localhost:5000/api/pets/${id}`)
      .then(res => res.json())
      .then(data => setPet(data));
  }, [id]);

  const handleAdopt = async () => {
    if (!user) {
      toast.error("Please login first to request an appointment!");
      navigate('/login');
      return;
    }

    setAdopting(true);
    try {
      const payload = {
        userId: user._id,
        sellerId: pet.ownerId,
        petId: pet._id,
        serviceType: 'Meetup',
        date: new Date().toISOString().split('T')[0], // Defaulting to today for demo
        time: '12:00 PM'
      };

      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        toast.success(`Success! Appointment requested to meet ${pet.name}.`);
        navigate('/dashboard');
      } else {
        toast.error('Failed to send request');
      }
    } catch(err) {
      toast.error('Network error.');
    } finally {
      setAdopting(false);
    }
  };

  if (!pet) return <div style={{ textAlign: 'center', marginTop: '5rem' }}>Loading...</div>;

  return (
    <div className="animate-fade-up grid grid-cols-2" style={{ gap: '4rem', marginTop: '2rem' }}>
      <div className="glass-panel" style={{ 
        height: '500px', 
        borderRadius: 'var(--radius-lg)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '8rem',
        background: 'rgba(255,107,107,0.1)'
      }}>
        {pet.type === 'Dog' ? '🐕' : '🐈'}
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <h1 style={{ margin: 0, fontSize: '3.5rem' }}>{pet.name}</h1>
          <span className="badge badge-primary">{pet.type}</span>
        </div>
        
        <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>🎂</span> {pet.age} Years Old
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>🧬</span> {pet.breed}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>📍</span> {pet.location}
          </div>
        </div>
        
        <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>About {pet.name}</h3>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>{pet.description}</p>
        </div>
        
        {user && pet.ownerId && user._id === pet.ownerId ? (
          <button className="btn btn-glass" style={{ width: '100%', padding: '1.25rem', fontSize: '1.25rem', cursor: 'not-allowed' }} disabled>
            You own this pet
          </button>
        ) : (
          <button 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '1.25rem', fontSize: '1.25rem' }}
            onClick={handleAdopt}
            disabled={adopting}
          >
            {adopting ? 'Processing...' : `Request Meetup with ${pet.name}`}
          </button>
        )}
      </div>
    </div>
  );
};

export default PetDetails;
