import { Link } from 'react-router-dom';

const PetCard = ({ pet, index = 0 }) => {
  return (
    <div className={`glass-panel pet-card animate-fade-up delay-${(index % 3) + 1}`} style={{
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer'
    }}>
      <div style={{ height: '200px', width: '100%', overflow: 'hidden', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: '10px', right: '10px', zIndex: 10
        }}>
          <span className="badge badge-primary">{pet.type}</span>
        </div>
        <div style={{
          width: '100%', height: '100%',
          background: pet.image ? `url(${pet.image}) center/cover` : 'var(--surface-hover)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '4rem'
        }}>
          {!pet.image && (pet.type === 'Dog' ? '🐕' : pet.type === 'Cat' ? '🐈' : '🐾')}
        </div>
      </div>
      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{pet.name}</h3>
          <span style={{ color: 'var(--text-muted)' }}>{pet.age} yrs</span>
        </div>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem', flex: 1 }}>
          {pet.breed} • {pet.location}
        </p>
        <Link to={`/pets/${pet._id || pet.id}`} className="btn btn-secondary" style={{ width: '100%' }}>
          Meet {pet.name}
        </Link>
      </div>
    </div>
  );
};

export default PetCard;
