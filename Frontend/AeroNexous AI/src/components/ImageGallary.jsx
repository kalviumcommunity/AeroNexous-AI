import React, { useState, useEffect } from 'react';

const ImageGallery = () => {
  const [activeImage, setActiveImage] = useState(0);

  const images = [
    "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    "https://images.saymedia-content.com/.image/t_share/MTkyMjE0NTA0Mjc1MTkxMDIw/shutterstock_1815171710.jpg",
    "https://dcfwfuaf91uza.cloudfront.net/online/wp-content/uploads/MS-in-Aeronautics-Online-Degree.jpg"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div style={{
      flex: '1 1 400px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      height: '400px'
    }}>
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt="Aviation Visual"
          style={{
            position: 'absolute',
            width: '400px',
            height: '300px',
            objectFit: 'cover',
            borderRadius: '12px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
            border: '3px solid rgba(255,255,255,0.3)',
            transition: 'all 1s ease-in-out',
            opacity: activeImage === index ? 1 : 0,
            transform: activeImage === index ? 
              'translateX(0) scale(1)' : 
              `translateX(${index > activeImage ? '100px' : '-100px'}) scale(0.8)`,
            zIndex: activeImage === index ? 3 : 2
          }}
        />
      ))}
      <div style={{
        position: 'absolute',
        bottom: '10px',
        display: 'flex',
        gap: '8px',
        zIndex: 4
      }}>
        {images.map((_, index) => (
          <div 
            key={index}
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: activeImage === index ? '#f97316' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onClick={() => setActiveImage(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;