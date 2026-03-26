import { useState, useEffect } from 'react';
import PetCard from '../components/PetCard';

const Pets = () => {
  const [filter, setFilter] = useState('All');
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/pets')
      .then(res => res.json())
      .then(data => {
        setPets(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredPets = filter === 'All' ? pets : pets.filter(p => p.type === filter);

  return (
    <div className="animate-fade-up">
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '1rem' }}>Adopt a Pet</h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 2rem' }}>
          Browse our list of lovable pets waiting for their forever home. Filter by category to find your perfect companion.
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          {['All', 'Dog', 'Cat', 'Other'].map(type => (
            <button
              key={type}
              className={`btn ${filter === type ? 'btn-primary' : 'btn-glass'}`}
              onClick={() => setFilter(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3">
        {loading ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem' }}>Loading pets...</div>
        ) : filteredPets.map((pet, idx) => (
          <PetCard key={pet._id || idx} pet={pet} index={idx} />
        ))}
        
        {!loading && filteredPets.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
            <h3>No pets found</h3>
            <p>Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pets;
