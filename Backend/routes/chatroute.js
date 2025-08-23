const express = require('express');
const router = express.Router();
const Chat = require('../model/chatmodel');
const authMiddleware = require('../middleware/authenticate');


router.post('/postchat', authMiddleware, async (req, res) => {
  const { prompt, response } = req.body;
  if (!prompt || !response) {
    return res.status(400).json({ error: 'Prompt and response are required' });
  }

  try {
    const newChat = new Chat({
      userId: req.user.userId,
      prompt,
      response
    });
    await newChat.save();
    res.status(201).json(newChat);
  } catch (err) {
    console.error('Save chat error:', err);
    res.status(500).json({ error: 'Failed to save chat' });
  }
});

// Get all chats for a user
router.get('/getchat', authMiddleware, async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.user.userId }).sort({ timestamp: -1 });
    res.json(chats);
  } catch (err) {
    console.error('Fetch chat error:', err);
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
});

// Update a specific chat
router.put('/:id', authMiddleware, async (req, res) => {
  const { prompt, response } = req.body;

  try {
    const updated = await Chat.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { prompt, response },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Chat not found or unauthorized' });
    }

    res.json(updated);
  } catch (err) {
    console.error('Update chat error:', err);
    res.status(500).json({ error: 'Failed to update chat' });
  }
});
module.exports = router;