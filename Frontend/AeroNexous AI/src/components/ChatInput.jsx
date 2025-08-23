import React from 'react';

const ChatInput = ({ chatInput, setChatInput, loading, sendPrompt }) => {
  return (
    <div style={{
      marginTop: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      paddingTop: '1rem',
      borderTop: '1px solid rgba(255,255,255,0.1)'
    }}>
      <textarea
        value={chatInput}
        onChange={(e) => setChatInput(e.target.value)}
        placeholder="Ask something about aircrafts, aviation systems..."
        rows={3}
        style={{
          flex: 1,
          padding: '1rem',
          fontSize: '1rem',
          borderRadius: '12px',
          backgroundColor: 'rgba(255,255,255,0.08)',
          color: 'white',
          border: 'none',
          resize: 'none'
        }}
      />
      <button
        onClick={sendPrompt}
        disabled={loading}
        style={{
          background: 'linear-gradient(90deg, #f97316, #fb923c)',
          color: 'white',
          padding: '0.8rem 1.5rem',
          fontSize: '1rem',
          fontWeight: '600',
          border: 'none',
          borderRadius: '50px',
          cursor: 'pointer',
          boxShadow: '0 4px 10px rgba(249, 115, 22, 0.4)',
          opacity: loading ? 0.7 : 1,
          transition: 'all 0.3s ease'
        }}
      >
        {loading ? 'Thinking...' : 'Send'}
      </button>
    </div>
  );
};

export default ChatInput;