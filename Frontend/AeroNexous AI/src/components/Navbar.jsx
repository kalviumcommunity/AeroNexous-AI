import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const userProfile = JSON.parse(localStorage.getItem('userProfile'));

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userProfile');
    navigate('/');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.5rem 2rem',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: '50px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        marginBottom: '2rem',
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          fontSize: '1.8rem',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
        onClick={() => navigate('/')}
      >
        <span style={{ fontSize: '2rem', marginRight: '0.4rem' }}>✈️</span>
        <span
          style={{
            background: 'linear-gradient(90deg, #63b3ed, #90cdf4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          AeroNexous
        </span>
      </div>

      {/* Nav Items */}
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        {/* About */}
        <span
          onClick={() => navigate('/about')}
          style={linkStyle}
          onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)')}
          onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          About
        </span>

        {/* Solutions */}

        {/* Contact */}
        <span
          onClick={() => navigate('/contact')}
          style={linkStyle}
          onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)')}
          onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          Contact
        </span>

        {/* Auth Buttons */}
        {token && userProfile ? (
          <>
            <button
              onClick={handleProfile}
              style={buttonStyle('#3b82f6', '#2563eb')}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 6px 15px rgba(59, 130, 246, 0.6)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 10px rgba(59, 130, 246, 0.4)';
              }}
            >
              Profile
            </button>

            <button
              onClick={handleLogout}
              style={buttonStyle('#ef4444', '#dc2626')}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 6px 15px rgba(239, 68, 68, 0.6)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 10px rgba(239, 68, 68, 0.4)';
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={handleLogin}
            style={buttonStyle('#f97316', '#fb923c')}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 15px rgba(249, 115, 22, 0.6)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 10px rgba(249, 115, 22, 0.4)';
            }}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

// Reusable Styles
const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '0.95rem',
  fontWeight: '500',
  transition: 'all 0.3s ease',
  padding: '0.5rem 1rem',
  borderRadius: '20px',
  cursor: 'pointer',
};

const buttonStyle = (from, to) => ({
  background: `linear-gradient(90deg, ${from}, ${to})`,
  color: 'white',
  padding: '0.6rem 1.5rem',
  fontSize: '0.9rem',
  fontWeight: '600',
  border: 'none',
  borderRadius: '50px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow: `0 4px 10px ${from}66`, // 40% opacity
});

export default Navbar;
