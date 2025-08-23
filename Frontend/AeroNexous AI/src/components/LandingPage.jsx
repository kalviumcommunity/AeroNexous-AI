import React from 'react';
import Navbar from './Navbar';



import HeroContent from './HeroComponent';
import ImageGallery from './ImageGallary';

const LandingPage = () => {
  return (
    <div style={{
      height: '100vh',
      width: '100%',
      position: 'relative',
      fontFamily: '"Segoe UI", sans-serif',
      overflow: 'hidden',
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

      {/* Overlay Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        height: '100%',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        color: '#fff',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
      }}>

        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content */}
        <main style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '2rem',
          flex: 1
        }}>
          {/* Left - Text Content */}
          <HeroContent/>

          {/* Right - Image Gallery */}
          <ImageGallery/>
        </main>

        {/* Footer */}

      </div>
    </div>
  );
};

export default LandingPage;