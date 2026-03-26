import { useState, useEffect, useRef } from 'react';
import { toast } from './Toast';

const ChatModal = ({ booking, currentUser, onClose }) => {
  const [messages, setMessages] = useState(booking.messages || []);
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  const fetchMessages = async () => {
    try {
      // In a real app we might have a specific GET /messages endpoint, 
      // but we can simply fetch the updated booking object as long as we know if we are fetching user or seller endpoints, 
      // actually the simplest is to just fetch it!
      // But wait! We don't have a GET /api/bookings/:id endpoint right now.
      // So instead, we'll fetch all bookings for this user and filter, OR we can just rely on auto-polling the dashboard logic and pass updated booking prop?
      // Since booking is passed as a prop, we will poll locally.
      // Wait, let's create a quick way to fetch just this booking's messages. Let's hit the endpoint we already have depending on if buyer or seller.
      const endpoint = booking.userId === currentUser._id 
        ? `http://localhost:5000/api/bookings/user/${currentUser._id}` 
        : `http://localhost:5000/api/bookings/seller/${currentUser._id}`;
      
      const res = await fetch(endpoint);
      const data = await res.json();
      if (Array.isArray(data)) {
        const updatedBooking = data.find(b => b._id === booking._id);
        if (updatedBooking && updatedBooking.messages) {
          setMessages(updatedBooking.messages);
        }
      }
    } catch (err) {
      console.error("Polling error", err);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setSending(true);
    try {
      const payload = {
        senderId: currentUser._id,
        senderName: currentUser.name,
        text: inputText.trim()
      };

      const res = await fetch(`http://localhost:5000/api/bookings/${booking._id}/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        const updatedBooking = await res.json();
        setMessages(updatedBooking.messages);
        setInputText('');
      } else {
        toast.error("Failed to send message");
      }
    } catch (err) {
      toast.error("Network error sending message");
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
      background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
    }}>
      <div className="glass-panel animate-fade-up" style={{
        width: '90%', maxWidth: '500px', height: '600px',
        display: 'flex', flexDirection: 'column',
        padding: 0, overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.5rem' }}>💬</span> Chat
            </h3>
            <p style={{ margin: '0.2rem 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Regarding Meetup</p>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {messages.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '2rem' }}>
              Say hello to start the conversation!
            </div>
          ) : (
            messages.map((m, i) => {
              const isMe = m.senderId === currentUser._id;
              return (
                <div key={i} className="animate-fade-up delay-1" style={{
                  alignSelf: isMe ? 'flex-end' : 'flex-start',
                  maxWidth: '80%',
                  display: 'flex', flexDirection: 'column'
                }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.2rem', textAlign: isMe ? 'right' : 'left' }}>
                    {isMe ? 'You' : m.senderName} • {new Date(m.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                  <div style={{
                    background: isMe ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                    padding: '0.8rem 1.2rem',
                    borderRadius: isMe ? '1rem 1rem 0 1rem' : '1rem 1rem 1rem 0',
                    lineHeight: 1.4
                  }}>
                    {m.text}
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <form onSubmit={handleSend} style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: '1rem' }}>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Type a message..." 
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            style={{ flex: 1 }}
          />
          <button type="submit" className="btn btn-primary" disabled={sending || !inputText.trim()} style={{ height: 'auto', padding: '0 1.5rem' }}>
            {sending ? '...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatModal;
