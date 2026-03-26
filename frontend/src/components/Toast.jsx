import { useState, useEffect } from 'react';

// Global toast object to trigger notifications from anywhere without Context
export const toast = {
  notify: null,
  success: (msg) => toast.notify && toast.notify(msg, 'success'),
  error: (msg) => toast.notify && toast.notify(msg, 'error'),
  info: (msg) => toast.notify && toast.notify(msg, 'info'),
};

const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    toast.notify = (msg, type) => {
      const id = Date.now() + Math.random();
      setToasts(prev => [...prev, { id, msg, type }]);
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, 4000);
    };
  }, []);

  return (
    <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {toasts.map(t => (
        <div key={t.id} className="animate-fade-up glass-panel" style={{
          background: t.type === 'error' ? 'rgba(255, 107, 107, 0.95)' : t.type === 'success' ? 'rgba(0, 184, 148, 0.95)' : 'rgba(108, 92, 231, 0.95)',
          color: '#fff',
          padding: '1rem 1.5rem',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          minWidth: '300px'
        }}>
          {t.type === 'success' ? <span style={{fontSize:'1.5rem'}}>✨</span> : t.type === 'error' ? <span style={{fontSize:'1.5rem'}}>⚠️</span> : <span style={{fontSize:'1.5rem'}}>🔔</span>}
          {t.msg}
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
