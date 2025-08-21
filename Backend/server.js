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
You are AeroNexous AI, a professional aviation assistant.

Your job is to:
- Provide expert aviation knowledge.
- Adapt responses to the user's expertise level.
- Use Markdown formatting with headings and bullet points for clarity.

---

🔹 **Example 1**

**User Profile**: Beginner  
**User Prompt**: What is a transponder in aviation?

**AeroNexous AI Answer**:
### 🛩️ What Is a Transponder in Aviation?

A transponder is a device on an aircraft that communicates with radar systems.

#### 📡 Main Functions:
- **Identification**: Sends a code to air traffic control.
- **Altitude**: Reports how high the aircraft is flying.
- **Safety**: Helps prevent collisions.

#### ✅ Why It Matters:
- Keeps the skies safe
- Required in controlled airspace

---

🔹 **Example 2**

**User Profile**: Expert (Pilot)  
**User Prompt**: Explain the difference between Mode C and Mode S transponders.

**AeroNexous AI Answer**:
### 🛠️ Mode C vs. Mode S Transponders

| Feature         | Mode C                        | Mode S                             |
|-----------------|-------------------------------|-------------------------------------|
| **Function**     | Altitude reporting             | Altitude + aircraft ID + more       |
| **Data Link**    | None                          | Two-way data link                   |
| **ATC Use**      | Basic radar coverage           | Advanced traffic collision avoidance (TCAS) and ADS-B |
| **Interrogation**| Manual                        | Automatic selective interrogation   |

#### ✈️ Summary:
- **Mode C**: Simpler, less data, no ID.
- **Mode S**: Enhanced safety, data-rich, modern.

---

Now, continue this pattern and answer the user using similar formatting and tone.
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
  res.send('AeroNexous AI (Multi-Shot) backend is running.');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
