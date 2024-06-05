const express = require('express');
const router = express.Router();
const { Comment, Service, users } = require('../models');
const { validateToken } = require('../Middleware/authMiddleware');

// Create a new comment
router.post('/create',  async (req, res) => {
  try {
    const { text, rating, ServiceId, UserId } = req.body;

    if (!ServiceId || !UserId || !text || !rating) {
      return res.status(400).send("All fields are required.");
    }

    const service = await Service.findByPk(ServiceId);
    const user = await users.findByPk(UserId);

    if (!service || !user) {
      return res.status(404).send("Service or User not found.");
    }

    const newComment = await Comment.create({
      text,
      rating,
      ServiceId: service.id,
      UserId: user.id,
    });

    return res.status(201).json(newComment);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
});

// Get all comments for a service
router.get('/service/:ServiceId', async (req, res) => {
  try {
    const { ServiceId } = req.params;

    const comments = await Comment.findAll({
      where: { ServiceId },
      include: [
        { model: users, as: 'user', attributes: ['username'] },
      ],
    });

    return res.status(200).json(comments);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
});

// Get all comments by a user
router.get('/user/:UserId', async (req, res) => {
  try {
    const { UserId } = req.params;

    const comments = await Comment.findAll({
      where: { UserId },
      include: [
        { model: Service, as: 'service', attributes: ['title'] },
      ],
    });

    return res.status(200).json(comments);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;