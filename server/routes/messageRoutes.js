const express = require('express');
const router = express.Router();
const { ChatRoom, Message, users } = require('../models');

// Create a chat room
router.post('/create-room', async (req, res) => {
  const { clientId, proId } = req.body;

  try {
    const chatRoom = await ChatRoom.create({ clientId, proId });
    res.status(201).json(chatRoom);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Send a message
router.post('/send-message', async (req, res) => {
  const { chatRoomId, senderId, text } = req.body;

  try {
    const message = await Message.create({ ChatRoomId: chatRoomId, senderId, text });
    const populatedMessage = await Message.findOne({
      where: { id: message.id },
      include: [{ model: users, as: 'sender', attributes: ['username'] }],
    });
    res.status(201).json(populatedMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get messages in a chat room
router.get('/chat-room/:chatRoomId', async (req, res) => {
  const { chatRoomId } = req.params;

  try {
    const messages = await Message.findAll({
      where: { ChatRoomId: chatRoomId },
      include: [{ model: users, as: 'sender', attributes: ['username', 'image', 'email']}],
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
