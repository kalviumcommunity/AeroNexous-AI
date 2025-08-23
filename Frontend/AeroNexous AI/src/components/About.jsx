import React from 'react';
import Navbar from './Navbar';

const About = () => {
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
        {/* Navbar with margin */}
        <div style={{ margin: '1rem 0 1rem' }}>
          <Navbar />
        </div>

        {/* Scrollable Content Container */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '0 2rem 2rem'
        }}>
          {/* About Content */}
          <div style={{
            padding: '2rem',
            maxWidth: '1000px',
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
              About AeroNexous
            </h1>
            
            {/* Hero Section with Image */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Aircraft in flight" 
                style={{
                  width: '100%',
                  maxWidth: '600px',
                  height: '250px',
                  objectFit: 'cover',
                  borderRadius: '10px',
                  marginBottom: '1.5rem',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
                }}
              />
              <p style={{ 
                fontSize: '1.1rem', 
                lineHeight: '1.6',
                textAlign: 'center',
                maxWidth: '800px'
              }}>
                <strong>AeroNexous</strong> is your intelligent aerospace assistant designed to help professionals, enthusiasts, and learners in the aerospace field. Whether you're seeking technical answers, design guidance, or educational insights, AeroNexous uses AI to provide context-aware support in real-time.
              </p>
            </div>

            {/* Compact Features Grid */}
            <h2 style={{ 
              textAlign: 'center', 
              margin: '1.5rem 0',
              color: '#fbd38d',
              fontSize: '1.6rem'
            }}>
              What We Offer
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                padding: '1.2rem',
                borderRadius: '10px',
                textAlign: 'center',
                height: '100%'
              }}>
                <img 
                  src="https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
                  alt="AI Technology" 
                  style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    marginBottom: '0.8rem'
                  }}
                />
                <h3 style={{ color: '#63b3ed', marginBottom: '0.8rem', fontSize: '1.1rem' }}>AI-Powered Assistance</h3>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>Get instant answers to complex aerospace questions with our advanced AI technology.</p>
              </div>
              
              <div style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                padding: '1.2rem',
                borderRadius: '10px',
                textAlign: 'center',
                height: '100%'
              }}>
                <img 
                  src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
                  alt="Technical Design" 
                  style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    marginBottom: '0.8rem'
                  }}
                />
                <h3 style={{ color: '#63b3ed', marginBottom: '0.8rem', fontSize: '1.1rem' }}>Technical Guidance</h3>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>Receive expert-level guidance on aerospace design, engineering, and problem-solving.</p>
              </div>
              
              <div style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                padding: '1.2rem',
                borderRadius: '10px',
                textAlign: 'center',
                height: '100%'
              }}>
                <img 
                  src="https://i.ytimg.com/vi/0DA1dopNC44/maxresdefault.jpg" 
                  alt="Learning Resources" 
                  style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    marginBottom: '0.8rem'
                  }}
                />
                <h3 style={{ color: '#63b3ed', marginBottom: '0.8rem', fontSize: '1.1rem' }}>Educational Resources</h3>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>Access comprehensive learning materials and tutorials for all skill levels.</p>
              </div>
            </div>

            {/* Compact Technology Section */}
            <div style={{
              backgroundColor: 'rgba(99, 179, 237, 0.1)',
              padding: '1.5rem',
              borderRadius: '10px',
              marginBottom: '1.5rem'
            }}>
              <h2 style={{ 
                textAlign: 'center', 
                marginBottom: '1rem',
                color: '#fbd38d',
                fontSize: '1.4rem'
              }}>
                Technologies Used
              </h2>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <div style={{
                  textAlign: 'center',
                  padding: '0.8rem',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  minWidth: '100px'
                }}>
                  <div style={{ fontSize: '1.8rem', marginBottom: '0.4rem' }}>⚛️</div>
                  <div style={{ fontSize: '0.9rem' }}>React</div>
                </div>
                <div style={{
                  textAlign: 'center',
                  padding: '0.8rem',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  minWidth: '100px'
                }}>
                  <div style={{ fontSize: '1.8rem', marginBottom: '0.4rem' }}>🟢</div>
                  <div style={{ fontSize: '0.9rem' }}>Node.js</div>
                </div>
                <div style={{
                  textAlign: 'center',
                  padding: '0.8rem',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  minWidth: '100px'
                }}>
                  <div style={{ fontSize: '1.8rem', marginBottom: '0.4rem' }}>🗄️</div>
                  <div style={{ fontSize: '0.9rem' }}>MongoDB</div>
                </div>
                <div style={{
                  textAlign: 'center',
                  padding: '0.8rem',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  minWidth: '100px'
                }}>
                  <div style={{ fontSize: '1.8rem', marginBottom: '0.4rem' }}>🤖</div>
                  <div style={{ fontSize: '0.9rem' }}>OpenAI API</div>
                </div>
              </div>
            </div>

            {/* Future Features */}
            <div style={{
              padding: '1.5rem',
              backgroundColor: 'rgba(249, 115, 22, 0.1)',
              borderRadius: '10px',
              textAlign: 'center'
            }}>
              <h2 style={{ 
                marginBottom: '0.8rem',
                color: '#fbd38d',
                fontSize: '1.4rem'
              }}>
                Coming Soon
              </h2>
              <p style={{ fontSize: '1rem', lineHeight: '1.6' }}>
                We're constantly evolving. Stay tuned for upcoming features like real-time collaboration, 
                aerospace project tools, and personalized learning journeys!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;