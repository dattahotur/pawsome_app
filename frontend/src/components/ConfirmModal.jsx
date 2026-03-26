const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000
    }}>
      <div className="glass-panel animate-fade-up" style={{
        padding: '2.5rem', maxWidth: '450px', width: '90%', textAlign: 'center',
        border: '1px solid rgba(255,107,107,0.3)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
      }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '1rem', animation: 'pulse 2s infinite' }}>❓</div>
        <h2 style={{ marginBottom: '1rem' }}>Are you sure?</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.6, fontSize: '1.1rem' }}>
          {message}
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button className="btn btn-glass" onClick={onCancel} style={{ flex: 1, padding: '1rem' }}>Cancel</button>
          <button className="btn btn-primary" onClick={onConfirm} style={{ flex: 1, padding: '1rem', background: 'var(--primary)' }}>Yes, Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
