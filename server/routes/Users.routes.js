const express = require("express");
const router = express.Router();
const { users } = require("../models");
const bcrypt = require("bcrypt");

  // Create user account with provided details and role 'client'
router.post('/', async (req, res) => {
    const { username, email, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {

      users.create({
        username,
        email,
        password: hash,
        role: 'client'
      });
  
      // Handle successful registration
      res.json(' registered successfully');
    });
  });

    // Create user account with provided details and role 'pro'
  router.post('/pro', async (req, res) => {
    const { username, email, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {

      users.create({
        username,
        email,
        password: hash,
        role: 'pro'
      });
  
      // Handle successful registration
      res.json(' registered successfully');
    });
  });


// Get all users
router.get('/', async (req, res) => {
  try {
    const user = await users.findAll();
    res.json(user);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await users.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update user by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { username, email, role } = req.body;

  try {
    // Find user by ID
    const user = await users.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user attributes
    user.username = username;
    user.email = email;
    user.role = role;

    // Save updated user
    await user.save();

    res.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Delete user by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Find user by ID
    const user = await users.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete user
    await user.destroy();

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});






  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
      // Find user by email
      const User = await users.findOne({ where: { email } });
      if (!User) {
        return res.json({ error: "User not found" });
      }
  
      // Compare passwords
      const match = await bcrypt.compare(password, User.password);
      if (!match) {
        return res.json({ error: "Invalid password" });
      }
  
      // User authenticated, return user data (you may want to exclude password)
      res.json("logged in");
    
  });

  module.exports = router;