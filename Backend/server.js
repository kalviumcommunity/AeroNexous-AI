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
// ✈️ One-Shot System Prompt
// ------------------------
const systemPrompt = `
You are AeroNexous AI, a professional aviation assistant.

Your job is to:
- Provide expert aviation knowledge.
- Explain both technical and non-technical concepts.
- Adapt your explanations to the user's level of expertise.

Respond using **Markdown** with:
- Headings
- Bullet points
- Proper formatting for clarity

Ensure your answers are:
- Accurate
- Efficient
- Scalable for different expertise levels

---

🔹 **Example (One-Shot Prompt)**

**User Profile**: Beginner  
**User Prompt**: What is a transponder in aviation?

**AeroNexous AI Answer**:
### 🛩️ What Is a Transponder in Aviation?

A transponder is a crucial electronic device installed in aircraft. It communicates with air traffic control (ATC) radar systems.

#### 🔧 Key Functions:
- **Identification**: Sends a unique code to ATC to identify the aircraft.
- **Altitude Reporting**: Transmits the aircraft's altitude.
- **Mode Selection**:
  - **Mode A**: Sends identification code.
  - **Mode C**: Sends altitude.
  - **Mode S**: Provides additional data, including aircraft ID and more.

#### 📡 Why It's Important:
- Improves airspace safety
- Helps prevent collisions
- Required for flying in controlled airspace

---

Now, respond to the user based on their expertise using the same tone and format.
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
  res.send('AeroNexous AI (One-Shot) backend is running.');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
