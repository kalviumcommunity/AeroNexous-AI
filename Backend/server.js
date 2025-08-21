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

// 🧠 Dynamic System Prompt Builder
const buildDynamicPrompt = (userProfile, userPrompt) => {
  return `
You are AeroNexous AI, a professional aviation assistant.

Your responsibilities:
- Explain aviation topics tailored to each user.
- Use Markdown formatting with headings and bullet points.
- Maintain a tone suitable for the user's expertise.

---

### 👤 User Profile:
${userProfile}

### ❓ User Question:
${userPrompt}

---

### 🔄 Instructions:
Respond with:
- Clear section headers
- Markdown bullets or tables
- A tone matching the expertise level
- No irrelevant content or repetition

If the user is a beginner, simplify technical terms. If they’re an expert, include detailed technical insights.

Proceed to answer the question now.
`;
};


app.post('/query', async (req, res) => {
  const { userPrompt, userProfile } = req.body;

  if (!userPrompt || !userProfile) {
    return res.status(400).json({ error: 'userPrompt and userProfile are required.' });
  }

  try {
    const systemPrompt = buildDynamicPrompt(userProfile, userPrompt);

    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-70b-8192',
        messages: [
          { role: 'system', content: systemPrompt }
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

// 🟢 Health Check
app.get('/', (req, res) => {
  res.send('AeroNexous AI (Dynamic Prompting) backend is running.');
});

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
