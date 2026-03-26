import { Link } from 'react-router-dom';
import PetCard from '../components/PetCard';

const Home = () => {
  const featuredPets = [
    { id: 1, name: 'Luna', age: 2, breed: 'Golden Retriever', location: 'New York', type: 'Dog', image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80' },
    { id: 2, name: 'Milo', age: 1, breed: 'Persian Cat', location: 'Los Angeles', type: 'Cat', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80' },
    { id: 3, name: 'Bella', age: 3, breed: 'Beagle', location: 'Chicago', type: 'Dog', image: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=600&q=80' }
  ];

  return (
    <div className="animate-fade-up">
      {/* Hero Section */}
      <section style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '6rem 0 4rem',
      }}>
        <div className="badge badge-glass" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: 'var(--primary)' }}>✨</span> New matching algorithm live
        </div>
        <h1 style={{ maxWidth: '800px', margin: '0 auto 1.5rem', background: '-webkit-linear-gradient(45deg, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Find Your Perfect Companion Today
        </h1>
        <p style={{ maxWidth: '600px', margin: '0 auto 2.5rem', fontSize: '1.25rem', color: 'var(--text-muted)' }}>
          Adopt a pet, book vet appointments, and manage your pet's life all in one stunning platform.
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/pets" className="btn btn-primary btn-lg">Browse Pets</Link>
          {localStorage.getItem('user') ? (
            <Link to="/dashboard" className="btn btn-glass">My Dashboard</Link>
          ) : (
            <Link to="/register" className="btn btn-glass">Create an Account</Link>
          )}
        </div>
      </section>

      {/* Featured Pets Section */}
      <section style={{ padding: '4rem 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ marginBottom: '0.5rem' }}>Featured Friends</h2>
            <p style={{ color: 'var(--text-muted)' }}>These cute pets are looking for a forever home.</p>
          </div>
          <Link to="/pets" style={{ color: 'var(--primary)', fontWeight: '600' }}>View All →</Link>
        </div>
        
        <div className="grid grid-cols-3">
          {featuredPets.map((pet, idx) => (
            <PetCard key={pet.id} pet={pet} index={idx} />
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="glass-panel" style={{ padding: '4rem', marginTop: '4rem', borderRadius: 'var(--radius-lg)' }}>
        <div className="grid grid-cols-2" style={{ alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Full-Service Pet Care</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.1rem' }}>
              We don't just help you find a pet, we help you take care of them. Schedule appointments with top-rated veterinarians directly through our platform.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ color: 'var(--secondary)', fontSize: '1.5rem' }}>✓</span> Health checkups
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ color: 'var(--secondary)', fontSize: '1.5rem' }}>✓</span> Vaccinations
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ color: 'var(--secondary)', fontSize: '1.5rem' }}>✓</span> Emergency care booking
              </li>
            </ul>
            <Link to="/dashboard" className="btn btn-secondary">Book Appointment</Link>
          </div>
          <div style={{ 
            background: 'linear-gradient(135deg, rgba(78, 205, 196, 0.2), rgba(255, 107, 107, 0.2))',
            height: '400px',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '5rem',
            boxShadow: 'inset 0 0 50px rgba(0,0,0,0.5)'
          }}>
            🩺
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
