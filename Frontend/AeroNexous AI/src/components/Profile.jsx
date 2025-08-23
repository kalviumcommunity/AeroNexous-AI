import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const Profile = () => {
  const token = localStorage.getItem('token');
  const [form, setForm] = useState({
    username: '',
    email: '',
    expertise: '',
    password: ''
  });
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get('https://aeronexous-ai.onrender.com/user/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setForm({ ...res.data, password: '' });
    } catch (err) {
      console.error('Profile fetch error:', err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.put('https://aeronexous-ai.onrender.com/user/editprofile', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage(res.data.message);
      setEditing(false);
      setForm({ ...res.data.user, password: '' });
    } catch (err) {
      console.error('Profile update error:', err);
      setMessage('Failed to update profile');
    }
  };

  return (
    <div style={{
      height: '100vh',
      width: '100%',
      position: 'relative',
      fontFamily: '"Segoe UI", sans-serif',
      overflow: 'hidden', // prevent whole page scroll
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
      }}>

        {/* Navbar */}
        <div style={{ margin: '1rem 0 2rem 0' }}>
          <Navbar />
        </div>

        {/* Scrollable Profile Form Container */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '0 2rem 2rem',
        }}>
          <div style={{
            maxWidth: '600px',
            margin: '0 auto',
            padding: '2rem',
            backgroundColor: 'rgba(45, 55, 72, 0.85)',
            borderRadius: '10px',
            boxShadow: '0 0 15px rgba(0,0,0,0.3)'
          }}>
            <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>User Profile</h2>

            {['username', 'email', 'expertise'].map(field => (
              <div key={field} style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type="text"
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  readOnly={!editing}
                  style={{
                    width: '100%',
                    padding: '0.7rem',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: editing ? '#4a5568' : '#1a202c',
                    color: 'white'
                  }}
                />
              </div>
            ))}

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem' }}>New Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                readOnly={!editing}
                placeholder="Leave blank to keep existing"
                style={{
                  width: '100%',
                  padding: '0.7rem',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: editing ? '#4a5568' : '#1a202c',
                  color: 'white'
                }}
              />
            </div>

            {message && (
              <p style={{ marginBottom: '1rem', color: '#90cdf4' }}>{message}</p>
            )}

            <div style={{ textAlign: 'center' }}>
              {editing ? (
                <>
                  <button
                    onClick={handleSubmit}
                    style={buttonStyle('#48bb78')}
                  >Save</button>
                  <button
                    onClick={() => setEditing(false)}
                    style={buttonStyle('#e53e3e')}
                  >Cancel</button>
                </>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  style={buttonStyle('#4299e1')}
                >Edit Profile</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const buttonStyle = (bg) => ({
  backgroundColor: bg,
  color: 'white',
  padding: '0.6rem 1.2rem',
  border: 'none',
  borderRadius: '6px',
  margin: '0 0.5rem',
  cursor: 'pointer',
  fontWeight: 'bold'
});

export default Profile;
