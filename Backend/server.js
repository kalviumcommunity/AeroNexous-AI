const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const secretKey = process.env.AI_SECRET_KEY;


app.use(bodyParser.json());
app.use(cors());


const systemPrompt = `
You are AeroNexous AI, an expert aviation assistant.

**Role**: Aviation expert with deep knowledge of flight systems, meteorology, aircraft performance, and regulations.

**Task**: 
- Explain aviation concepts.
- Answer questions based on user expertise.
- Provide structured, correct, and helpful aviation knowledge.

**Format**: 
Respond in **Markdown** with clear sections, bullet points, and readable formatting.

**Criteria**: 
Ensure responses are:
- Technically correct
- Scalable (applicable to various user profiles)
- Efficient (minimal yet complete explanations)
- Adapted to the user's expertise
`;


app.post('/query', async (req, res) => {
  const { userPrompt, userProfile } = req.body;

  if (!userPrompt || !userProfile) {
    return res.status(400).json({ error: 'userPrompt and userProfile are required.' });
  }

  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-70b-8192',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `User Profile: ${userProfile}\n\n${userPrompt}` }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${secretKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ response: reply });

  } catch (error) {
    console.error('Groq API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch AI response from Groq.' });
  }
});

app.get('/', (req, res) => {
  res.send('AeroNexous AI (Groq) backend is running.');
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
