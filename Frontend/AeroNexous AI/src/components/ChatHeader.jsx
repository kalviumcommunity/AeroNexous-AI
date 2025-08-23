import React from 'react';
import Navbar from './Navbar';

const ChatHeader = () => {
  return (
    <Navbar/>
    // <header style={{
    //   display: 'flex',
    //   alignItems: 'center',
    //   justifyContent: 'space-between',
    //   padding: '1rem 2rem',
    //   backgroundColor: 'rgba(0, 0, 0, 0.6)',
    //   borderBottom: '1px solid rgba(255,255,255,0.1)',
    //   backdropFilter: 'blur(6px)',
    //   zIndex: 10
    // }}>
    //   <div style={{
    //     display: 'flex',
    //     alignItems: 'center',
    //     fontSize: '1.6rem',
    //     fontWeight: 'bold'
    //   }}>
    //     <span style={{ fontSize: '2rem', marginRight: '0.5rem' }}>✈️</span>
    //     <span style={{
    //       background: 'linear-gradient(90deg, #63b3ed, #90cdf4)',
    //       WebkitBackgroundClip: 'text',
    //       WebkitTextFillColor: 'transparent'
    //     }}>AeroNexous AI</span>
    //   </div>
    // </header>
  );
};

export default ChatHeader;