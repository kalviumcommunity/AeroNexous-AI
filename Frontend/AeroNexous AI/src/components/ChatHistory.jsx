import React from 'react';

const ChatHistory = ({ chatHistory, activeChat, handleChatClick }) => {
  return (
    <div style={{
      width: '25%',
      background: 'rgba(0, 0, 0, 0.4)',
      borderRight: '1px solid rgba(255,255,255,0.1)',
      padding: '1rem',
      overflowY: 'auto'
    }}>
      <h2 style={{
        fontSize: '1.3rem',
        borderBottom: '1px solid rgba(255,255,255,0.2)',
        paddingBottom: '0.5rem',
        marginBottom: '1rem'
      }}>Chat History</h2>
      {chatHistory.length === 0 ? (
        <p style={{ opacity: 0.6 }}>No chats yet.</p>
      ) : (
        chatHistory.map((chat, index) => (
          <div
            key={index}
            onClick={() => handleChatClick(chat)}
            style={{
              marginBottom: '1rem',
              padding: '0.7rem',
              backgroundColor: chat === activeChat
                ? 'rgba(99, 179, 237, 0.2)'
                : 'rgba(255, 255, 255, 0.05)',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: '0.2s ease'
            }}
          >
            <p style={{ fontSize: '0.9rem', marginBottom: '0.4rem' }}>
              <strong>You:</strong> {chat.prompt}
            </p>
            <p style={{ fontSize: '0.85rem', color: '#90cdf4' }}>
              <strong>AI:</strong> {chat.response?.slice(0, 80)}...
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default ChatHistory;