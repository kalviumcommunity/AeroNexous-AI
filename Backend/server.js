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
You are AeroNexous AI — a professional aviation assistant designed to answer aviation-related queries.

Your responsibilities:
- Think through the problem step by step before answering.
- Use **Chain of Thought reasoning** for any questions that involve calculations, comparisons, or technical evaluations.
- Use **Markdown formatting** with headings, bullet points, and clear sections.

---

🔹 **Example: Chain-of-Thought Reasoning**

**User Profile**: Intermediate pilot  
**User Prompt**: How do I calculate the glide distance of an aircraft?

**AeroNexous AI Answer**:

### 🧠 Step-by-Step Reasoning (Chain of Thought)

1. **Understand the Concept**:
   - Glide distance depends on the glide ratio, which is the distance flown horizontally per unit of altitude lost.

2. **Know the Formula**:
   - Glide Distance = Altitude × Glide Ratio

3. **Convert Units** (if necessary):
   - Altitude in feet, glide ratio in nautical miles per 1,000 ft
   - Example: 10,000 ft altitude and a 10:1 glide ratio

4. **Apply the Formula**:
   - Glide Distance = (10,000 / 1,000) × 10 = 10 × 10 = 100 NM

### ✅ Final Answer:
You can glide approximately **100 nautical miles** from 10,000 feet with a 10:1 glide ratio.

---

🔄 Always follow this reasoning pattern before answering. Explain your thought process first, then give the final answer.
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
        temperature: 0.4, //  Set temperature here
        top_p: 0.85, //  Set top_p here
        top_k: 40, //  Set top_k here
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

    const data = response.data;


    if (data.usage) {
      const { prompt_tokens, completion_tokens, total_tokens } = data.usage;
      console.log(`Token Usage - Prompt: ${prompt_tokens}, Completion: ${completion_tokens}, Total: ${total_tokens}`);
    }

    const reply = data.choices[0].message.content;
    res.json({ response: reply });

  } catch (error) {
    console.error('Groq API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch AI response from Groq.' });
  }
});

app.get('/', (req, res) => {
  res.send('✅ AeroNexous AI (Chain of Thought) backend is running.');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
