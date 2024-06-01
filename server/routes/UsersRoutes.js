const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { users } = require("../models");
const multer = require('multer');

const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename for each uploaded file
  }
});

// Validate MIME type
const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Type de fichier invalide. Seuls les fichiers JPEG, PNG et JPG sont autorisés.'));
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Create user account with provided details and role 'client'
router.post('/', upload.single('image'), async (req, res) => {
  const { username, email, password } = req.body;
  const mainImagePath = req.file ? req.file.path : null;

  try {
    const hash = await bcrypt.hash(password, 10);

    await users.create({
      username,
      email,
      password: hash,
      image: mainImagePath,
      role: 'client'
    });

    res.json('Registered successfully');
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add user
router.post('/adduser', async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);

    await users.create({
      username,
      email,
      password: hash,
      role
    });

    res.json('Added successfully');
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create user account with provided details and role 'pro'
router.post('/pro', upload.single('image'), async (req, res) => {
  const { username, email, password } = req.body;
  const mainImagePath = req.file ? req.file.path : null;

  try {
    const hash = await bcrypt.hash(password, 10);

    await users.create({
      username,
      email,
      password: hash,
      image: mainImagePath,
      role: 'pro'
    });

    res.json('Registered successfully');
  } catch (error) {
    console.error('Error creating pro user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get total number of users
router.get('/count', async (req, res) => {
  try {
    const count = await users.count();
    res.json({ count });
  } catch (error) {
    console.error('Error counting users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get number of online users
router.get('/online/count', (req, res) => {
  try {
    // Assuming you have a mechanism to track online users
    res.json({ count: onlineUsers.length });
  } catch (error) {
    console.error('Error fetching online users count:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const userList = await users.findAll();
    res.json(userList);
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
router.put('/:id', upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const { username, email, role } = req.body;
  
    try {
      const user = await users.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      let mainImagePath = user.image; // Use existing image path by default
  
      // Check if a new main image was uploaded
      if (req.file) {
        mainImagePath = req.file.path;
      }
  
      user.username = username || user.username;
      user.email = email || user.email;
      user.role = role || user.role;  // Ensure role is not null
      user.image = mainImagePath;
  
      await user.save();
  
      res.json(user);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Update password for a user by ID
router.put('/updatePassword/:id', async (req, res) => {
  const { id } = req.params;
  const { password, newPassword } = req.body;

  try {
      const user = await users.findByPk(id);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Check if the current password matches
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
          return res.status(401).json({ message: 'Current password is incorrect' });
      }

      // Hash the new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      // Update the user's password
      user.password = hashedNewPassword;
      await user.save();

      res.json({ message: 'Password updated successfully' });
  } catch (error) {
      console.error('Error updating password:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete user by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await users.destroy({ where: { id } });
    if (deletedUser === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

 // Route de connexion
 router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
        // Find user by email
        const user = await users.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
  
        // Compare passwords
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: "Invalid password" });
        }
  
        // User authenticated, generate JWT token
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET);
  
        res.json({ token, id: user.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
  });

module.exports = router;
