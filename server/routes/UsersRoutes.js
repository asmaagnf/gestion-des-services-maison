const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { users } = require("../models")




// // Get all users
// router.get('/', async (req, res) => {
//   try {
//     const user = await users.findAll();
//     res.json(user);
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// // Get user by ID
// router.get('/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//     const user = await users.findByPk(id);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json(user);
//   } catch (error) {
//     console.error('Error fetching user by ID:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// // Update user by ID
// router.put('/:id', async (req, res) => {
//   const { id } = req.params;
//   const { username, email, role, image } = req.body;

//   try {
//     // Find user by ID
//     const user = await users.findByPk(id);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Update user attributes
//     user.username = username;
//     user.email = email;
//     user.role = role;
//     user.image = image;

//     // Save updated user
//     await user.save();

//     res.json(user);
//   } catch (error) {
//     console.error('Error updating user:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });


// // Delete user by ID
// router.delete('/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//     // Find user by ID
//     const user = await users.findByPk(id);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Delete user
//     await user.destroy();

//     res.json({ message: 'User deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting user:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });




// //login route

// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//       // Find user by email
//       const user = await users.findOne({ where: { email } });
//       if (!user) {
//           return res.status(404).json({ error: "User not found" });
//       }

//       // Compare passwords
//       const match = await bcrypt.compare(password, user.password);
//       if (!match) {
//           return res.status(401).json({ error: "Invalid password" });
//       }

//       // User authenticated, generate JWT token
//       const payload = {
//           id: user.id,
//           email: user.email,
//           role: user.role
//       };
//       const token = jwt.sign(payload, process.env.JWT_SECRET);

//       res.json({ token, id: user.id });
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Server error" });
//   }
// });


//   module.exports = router;et ca cest  mon code const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcrypt");
// const jwt = require('jsonwebtoken');

// const db = require('../models');
// const users = db.users; // Modification ici

// // Créer un compte utilisateur avec les détails fournis et le rôle 'client'
// router.post('/', async (req, res) => {
//     const { username, email, password } = req.body;
//     try {
//         const hash = await bcrypt.hash(password, 10);
//         const user = await users.create({
//             username,
//             email,
//             password: hash,
//             role: 'client'
//         });
//         res.json(user);
//     } catch (error) {
//         console.error('Error creating user:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// // Récupérer le nombre total d'utilisateurs
// router.get('/count', async (req, res) => {
//     try {
//         const count = await users.count();
//         res.json({ count });
//     } catch (error) {
//         console.error('Error counting users:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// // Récupérer le nombre d'utilisateurs en ligne
// router.get('/online/count', async (req, res) => {
//     try {
//         res.json({ count: onlineUsers.length });
//     } catch (error) {
//         console.error('Error fetching online users count:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });


// // Créer un compte utilisateur avec les détails fournis et le rôle 'pro'
// router.post('/pro', async (req, res) => {
//     const { username, email, password } = req.body;
//     try {
//         const hash = await bcrypt.hash(password, 10);
//         const user = await users.create({
//             username,
//             email,
//             password: hash,
//             role: 'pro'
//         });
//         res.json(user);
//     } catch (error) {
//         console.error('Error creating user:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// // Récupérer tous les utilisateurs
// router.get('/', async (req, res) => {
//     try {
//         const userList = await users.findAll();
//         res.json(userList);
//     } catch (error) {
//         console.error('Error fetching users:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// // Récupérer un utilisateur par ID
// router.get('/:id', async (req, res) => {
//     const { id } = req.params;

//     try {
//         const user = await users.findByPk(id);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.json(user);
//     } catch (error) {
//         console.error('Error fetching user by ID:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// // Mettre à jour un utilisateur par ID
// router.put('/:id', async (req, res) => {
//     const { id } = req.params;
//     const { username, email, role, image } = req.body;

//     try {
//         const user = await users.findByPk(id);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         user.username = username;
//         user.email = email;
//         user.role = role;
//         user.image = image;

//         await user.save();

//         res.json(user);
//     } catch (error) {
//         console.error('Error updating user:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// // Supprimer un utilisateur par ID
// router.delete('/:id', async (req, res) => {
//     const { id } = req.params;

//     try {
//         const deletedUser = await users.destroy({ where: { id } });
//         if (deletedUser === 0) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.json({ message: 'User deleted successfully' });
//     } catch (error) {
//         console.error('Error deleting user:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });




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
 
  //add user
  router.post('/adduser', async (req, res) => {
    const { username, email, password, role } = req.body;
    bcrypt.hash(password, 10).then((hash) => {

      users.create({
        username,
        email,
        password: hash,
        role
      });
  
      res.json(' added successfully');
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

// Récupérer le nombre total d'utilisateurs
router.get('/count', async (req, res) => {
    try {
        const count = await users.count();
        res.json({ count });
    } catch (error) {
        console.error('Error counting users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Récupérer le nombre d'utilisateurs en ligne
router.get('/online/count', async (req, res) => {
    try {
        res.json({ count: onlineUsers.length });
    } catch (error) {
        console.error('Error fetching online users count:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



// Récupérer tous les utilisateurs
router.get('/', async (req, res) => {
    try {
        const userList = await users.findAll();
        res.json(userList);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Récupérer un utilisateur par ID
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

// Mettre à jour un utilisateur par ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email, role, image } = req.body;

    try {
        const user = await users.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.username = username;
        user.email = email;
        user.role = role;
        user.image = image;

        await user.save();

        res.json(user);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Supprimer un utilisateur par ID
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
