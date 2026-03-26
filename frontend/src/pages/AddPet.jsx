import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '../components/Toast';

const AddPet = () => {
  const [formData, setFormData] = useState({
    name: '', type: 'Dog', breed: '', age: '', location: '', description: '', image: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Getting logged in user
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      toast.error("Please login first!");
      navigate('/login');
      return;
    }

    try {
      const payload = {
        ...formData,
        ownerId: user._id, // Set the current user as the seller
        age: parseInt(formData.age, 10)
      };

      const response = await fetch('http://localhost:5000/api/pets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      if (response.ok) {
        toast.success('Your pet has been successfully listed for sale/adoption!');
        navigate('/dashboard');
      } else {
        toast.error(data.message || 'Failed to list pet');
      }
    } catch (err) {
      toast.error('Network error. Ensure the backend services are running.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) { // Limit to 5MB to prevent large Base64 strings causing issues
        toast.error("File size must be under 5MB!");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="animate-fade-up" style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem 0' }}>
      <div className="glass-panel" style={{ padding: '3rem' }}>
        <h1 style={{ marginBottom: '1rem' }}>List a Pet</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Find a loving new home for your pet. Provide all the details below.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Pet Name</label>
            <input type="text" className="form-control" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
          </div>

          <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Type</label>
              <select className="form-control" style={{ background: 'rgba(0,0,0,0.3)' }} value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} required>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Breed</label>
              <input type="text" className="form-control" value={formData.breed} onChange={e => setFormData({...formData, breed: e.target.value})} required />
            </div>
          </div>

          <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Age (Years)</label>
              <input type="number" min="0" className="form-control" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} required />
            </div>
            <div className="form-group">
              <label className="form-label">Location (City)</label>
              <input type="text" className="form-control" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} required />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Upload Pet Photo</label>
            <input type="file" accept="image/*" className="form-control" style={{ padding: '0.8rem', background: 'rgba(255,255,255,0.05)' }} onChange={handleImageUpload} />
            {formData.image && (
              <img src={formData.image} alt="Preview" style={{ marginTop: '1rem', width: '100px', height: '100px', objectFit: 'cover', borderRadius: 'var(--radius-lg)', border: '2px solid var(--border)' }} />
            )}
          </div>

          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label className="form-label">About the pet</label>
            <textarea className="form-control" rows="4" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required></textarea>
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }} disabled={loading}>
            {loading ? 'Listing Pet...' : 'List Pet for Adoption'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPet;
