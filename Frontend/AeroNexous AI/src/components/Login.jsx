import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    expertise: 'general'
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          expertise: formData.expertise
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userProfile', JSON.stringify(data.userProfile));
        alert('Login successful!');
        navigate('/chat');
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      height: '100vh',
      width: '100%',
      backgroundImage: 'url("https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '"Segoe UI", sans-serif',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.55)',
        zIndex: 1
      }} />

      <div style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: '1000px',
        width: '100%',
        padding: '0 2rem',
      }}>
        {/* Left Side Title */}
        <div style={{
          flex: 1,
          color: 'white',
          paddingRight: '2rem',
        }}>
          <h1 style={{
            fontSize: '3.5rem',
            lineHeight: '1.2',
            background: 'linear-gradient(90deg, #63b3ed, #90cdf4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}>
            AeroNexous AI
          </h1>
          <p style={{ marginTop: '1rem', fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.8)' }}>
            Connect, Learn, and Fly Smart with Aviation Intelligence.
          </p>
        </div>

        {/* Right Side Form */}
        <div style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.65)',
          padding: '2rem',
          borderRadius: '20px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)',
          color: 'white',
          maxWidth: '450px',
        }}>
          <h2 style={{
            fontSize: '1.8rem',
            marginBottom: '1.25rem',
            textAlign: 'center',
            background: 'linear-gradient(90deg, #63b3ed, #90cdf4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Login to Your Account
          </h2>

          {error && (
            <div style={{
              color: '#ff6b6b',
              backgroundColor: 'rgba(255, 107, 107, 0.1)',
              padding: '0.75rem',
              borderRadius: '8px',
              marginBottom: '1.2rem',
              textAlign: 'center',
              border: '1px solid rgba(255, 107, 107, 0.3)'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <Input label="Username" name="username" value={formData.username} onChange={handleChange} placeholder="Enter your username" />
            <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" />
            <Select label="Aviation Expertise" name="expertise" value={formData.expertise} onChange={handleChange} />
            <Input label="Password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Minimum 6 characters" />
            <Input label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} placeholder="Re-enter password" />

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '0.85rem',
                borderRadius: '10px',
                background: isLoading
                  ? 'rgba(99, 179, 237, 0.4)'
                  : 'linear-gradient(90deg, #63b3ed, #90cdf4)',
                color: 'white',
                border: 'none',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {isLoading ? 'Creating Account...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Reusable Input
const Input = ({ label, name, type = 'text', value, onChange, placeholder }) => (
  <div style={{ marginBottom: '1rem' }}>
    <label style={{ display: 'block', marginBottom: '0.5rem' }}>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required
      placeholder={placeholder}
      style={{
        width: '100%',
        padding: '0.75rem',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: 'white',
        fontSize: '1rem',
        outline: 'none'
      }}
    />
  </div>
);

// Expertise Select
const Select = ({ label, name, value, onChange }) => (
  <div style={{ marginBottom: '1rem' }}>
    <label style={{ display: 'block', marginBottom: '0.5rem' }}>{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      required
      style={{
        width: '100%',
        padding: '0.75rem',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: 'white',
        fontSize: '1rem',
        outline: 'none'
      }}
    >
      <option value="beginner">Beginner</option>
      <option value="general">General Knowledge</option>
      <option value="enthusiast">Aviation Enthusiast</option>
      <option value="professional">Aviation Professional</option>
    </select>
  </div>
);

export default Login;
