import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChatHeader from './ChatHeader';
import ChatHistory from './ChatHistory';
import AIResponse from './AIResponse';
import ChatInput from './ChatInput';

const AIChat = () => {
  const [chatInput, setChatInput] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeChat, setActiveChat] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchChatHistory();
  }, []);

  const fetchChatHistory = async () => {
    try {
      const res = await axios.get('https://aeronexous-ai.onrender.com/chat/getchat', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setChatHistory(res.data);
    } catch (err) {
      console.error('Fetch chat history error:', err);
    }
  };

  const sendPrompt = async () => {
    if (!chatInput.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/query', {
        userPrompt: chatInput
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const responseText = res.data.response || 'No response received';
      setChatResponse(responseText);
      const newChat = { prompt: chatInput, response: responseText };

      // Save to DB
      await axios.post('http://localhost:3000/chat/postchat', newChat, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setChatHistory(prev => [newChat, ...prev]);
      setActiveChat(newChat);
      setChatInput('');
    } catch (err) {
      console.error('Send prompt error:', err);
      setChatResponse('Error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChatClick = (chat) => {
    setActiveChat(chat);
    setChatResponse(chat.response);
    setChatInput(chat.prompt);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      fontFamily: '"Segoe UI", sans-serif',
      background: 'linear-gradient(135deg, #1a202c, #2d3748)',
      color: 'white'
    }}>
      <div style={{ marginTop: '1rem' }}>
        <ChatHeader />
      </div>
      
      {/* Main Content */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <ChatHistory 
          chatHistory={chatHistory} 
          activeChat={activeChat} 
          handleChatClick={handleChatClick} 
        />
        
        {/* Chat Interface */}
        <div style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <AIResponse chatResponse={chatResponse} />
          </div>
          
          <ChatInput 
            chatInput={chatInput} 
            setChatInput={setChatInput} 
            loading={loading} 
            sendPrompt={sendPrompt} 
          />
        </div>
      </div>
    </div>
  );
};

export default AIChat;