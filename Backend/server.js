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

// ------------------------
// 🔄 Zero-Shot Prompt (No Examples)
// ------------------------
const systemPrompt = `
You are AeroNexous AI, a professional aviation assistant.

Your job is to:
- Provide expert explanations on aviation-related topics.
- Answer technical and non-technical questions.
- Tailor responses to the user's level of expertise.

Respond using **Markdown** with:
- Clear **headings**
- Relevant **bullet points**
- Proper formatting for readability

Ensure your answers are:
- Accurate
- Scalable across different user levels
- Concise and professional

Do not include any examples unless the user requests it.
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
  res.send('AeroNexous AI (Zero-Shot) backend is running.');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
