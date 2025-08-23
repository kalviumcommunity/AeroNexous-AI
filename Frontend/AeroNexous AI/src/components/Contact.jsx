import React from 'react';
import Navbar from './Navbar';

const Contact = () => {
  return (
    <div style={{
      height: '100vh',
      width: '100%',
      position: 'relative',
      fontFamily: '"Segoe UI", sans-serif',
      overflow: 'hidden'
    }}>
      {/* Background */}
      <div style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(0.9)',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1
      }} />

      {/* Content Overlay */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Navbar */}
        <div style={{ margin: '1rem 0 1rem' }}>
          <Navbar />
        </div>

        {/* Main Content */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '0 2rem 2rem'
        }}>
          <div style={{
            padding: '2rem',
            maxWidth: '800px',
            margin: '0 auto',
            backgroundColor: 'rgba(45, 55, 72, 0.85)',
            borderRadius: '15px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
            backdropFilter: 'blur(5px)'
          }}>
            <h1 style={{
              textAlign: 'center',
              marginBottom: '2rem',
              fontSize: '2.5rem',
              background: 'linear-gradient(90deg, #63b3ed, #90cdf4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold'
            }}>
              Contact Us
            </h1>

            <div style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              padding: '1.5rem',
              borderRadius: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}>
              {/* Name */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(99, 179, 237, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '1rem',
                  color: '#63b3ed',
                  fontSize: '1.2rem'
                }}>
                  🙍
                </span>
                <div>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.2rem' }}>Name</div>
                  <div style={{ fontSize: '0.95rem' }}>Jannat</div>
                </div>
              </div>

              {/* Phone */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(99, 179, 237, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '1rem',
                  color: '#63b3ed',
                  fontSize: '1.2rem'
                }}>
                  📞
                </span>
                <div>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.2rem' }}>Phone</div>
                  <div style={{ fontSize: '0.95rem' }}>+91 9815220961</div>
                </div>
              </div>

              {/* Address */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(99, 179, 237, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '1rem',
                  color: '#63b3ed',
                  fontSize: '1.2rem'
                }}>
                  🏢
                </span>
                <div>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.2rem' }}>Address</div>
                  <div style={{ fontSize: '0.95rem' }}>
                    Lovely Professional University,Phagwara, Punjab, India
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
