import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroContent = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    const userProfile = localStorage.getItem('userProfile');
    
    if (token && userProfile) {
        // alert('Welcome back! Redirecting to chat...');
      // Redirect to chat page if token exists
        navigate('/chat');
    } else {
    //    alert('Please log in to continue.');
      navigate('/login');
    }
  };

  return (
    <div style={{
      flex: '1 1 400px',
      padding: '1rem',
      textAlign: 'left',
      maxWidth: '600px'
    }}>
      <h1 style={{
        fontSize: '2.8rem',
        fontWeight: '800',
        margin: '0 0 1rem 0',
        textShadow: '2px 2px 6px rgba(0,0,0,0.7)',
        lineHeight: '1.2'
      }}>
        Next-Generation <span style={{
          background: 'linear-gradient(90deg, #63b3ed, #90cdf4)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>Aviation Intelligence</span> Through AI
      </h1>
      <p style={{
        fontSize: '1.2rem',
        opacity: 0.9,
        maxWidth: '500px',
        textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
        marginBottom: '2rem',
        lineHeight: '1.6'
      }}>
        Transforming complex aviation data into clear, actionable knowledge through conversational AI and advanced analytics.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <button 
          onClick={handleGetStarted}
          style={{
            background: 'linear-gradient(90deg, #f97316, #fb923c)',
            color: 'white',
            padding: '1rem 2.5rem',
            fontSize: '1rem',
            fontWeight: '700',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(249, 115, 22, 0.4)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
          onMouseOver={e => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(249, 115, 22, 0.6)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(249, 115, 22, 0.4)';
          }}
        >
          Get Started
        </button>
        <button style={{
          background: 'transparent',
          color: 'white',
          padding: '1rem 2rem',
          fontSize: '1rem',
          fontWeight: '600',
          border: '2px solid rgba(255,255,255,0.3)',
          borderRadius: '50px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(10px)'
        }}
          onMouseOver={e => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Watch Demo
        </button>
      </div>
    </div>
  );
};

export default HeroContent;