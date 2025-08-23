
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const axios = require('axios'); 
require('dotenv').config();
const MongoURL = process.env.MONGO_URL;
const secretKey = process.env.AI_SECRET_KEY; 
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const userRoutes = require('./routes/userroute');
const chatRoutes = require('./routes/chatroute');
const Chat = require('./model/chatmodel');
const User = require('./model/usermodel'); 
const authMiddleware = require('./middleware/authenticate');

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes
app.use('/user', userRoutes);
app.use('/chat',chatRoutes) // User authentication routes

const systemPrompt = `You are AeroNexous AI, an expert aviation assistant.
Role: Provide expert aviation knowledge and real-time data.
Task: Explain concepts, fetch live data, and adapt to user expertise.
Format: Always respond in **Markdown format** using proper headings, bullet points, and formatting for readability.
Criteria: Ensure correctness, efficiency, and scalability.`;

// app.post('/embeddings', async (req, res) => {
//   const { input } = req.body;
//   if (!input) {
//     return res.status(400).json({ error: 'Input text is required for embeddings.' });
//   }
//   try {
//     const embeddingResponse = await axios.post(
//       'https://api.groq.com/openai/v1/embeddings',
//       {
//         model: 'text-embedding-ada-002',
//         input: input
//       },
//       {
//         headers: {
//           'Authorization': `Bearer ${secretKey}`,
//           'Content-Type': 'application/json'
//         }
//       }
//     );
//     res.json(embeddingResponse.data);
//   } catch (error) {
//     console.error('Groq Embeddings API error:', error.response?.data || error.message);
//     res.status(500).json({ error: 'Failed to fetch embeddings from Groq.' });
//   }
// });
function tryParseJSON(jsonString) {
  try {
    const cleaned = jsonString
      .trim()
      .replace(/^```json/, '')
      .replace(/```$/, '')
      .trim();
    return JSON.parse(cleaned);
  } catch {
    return null;
  }
}

app.post('/query', authMiddleware, async (req, res) => {
  const { userPrompt } = req.body;
  if (!userPrompt) {
    return res.status(400).json({ error: 'userPrompt is required' });
  }

  try {
    const groqResponse = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-70b-8192',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `User expertise: ${req.user.expertise}\n${userPrompt}` }
        ],
        temperature: 0.7,
        top_p: 0.9,
        stop: ["\nEND", "stop"],
      },
      {
        headers: {
          'Authorization': `Bearer ${secretKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const data = groqResponse.data;

    if (data.usage) {
      console.log(`Tokens used - Prompt: ${data.usage.prompt_tokens}, Completion: ${data.usage.completion_tokens}, Total: ${data.usage.total_tokens}`);
    }

    let aiResult;
    if (data.choices[0].finish_reason === 'function_call' && data.choices[0].message.function_call) {
      aiResult = { function_call: data.choices[0].message.function_call };
    } else {
      const rawContent = data.choices[0].message.content;
      const parsed = tryParseJSON(rawContent);
      if (parsed) {
        aiResult = parsed;
      } else {
        aiResult = { response: rawContent };
      }
    }

    // Save chat to DB
    await Chat.create({
      userId: req.user.userId,
      prompt: userPrompt,
      response: aiResult.response || JSON.stringify(aiResult)
    });

    res.json(aiResult);
  } catch (error) {
    console.error('Groq API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch AI response from Groq.' });
  }
});


app.get('/', (req, res) => {
  res.send('AeroNexous AI (Groq) backend is running.');
});

app.listen(PORT, () => {
  try{
    mongoose.connect(MongoURL).then(() => {
      console.log('Connected to MongoDB');
    }).catch((err) => {
      console.error('MongoDB connection error:', err);
    });
}catch(err){
  console.log("MongoDB connection error:", err);}
  console.log(`Server is running on port ${PORT}`)}
);
