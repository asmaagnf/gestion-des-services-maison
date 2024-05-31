// const express = require('express');
// const router = express.Router();
// const { Category } = require('../models');

// // Create a category
// router.post('/', async (req, res) => {
//     try {
//         const category = await Category.create(req.body);
//         res.status(201).json(category);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });

// // Read all categories
// router.get('/', async (req, res) => {
//     try {
//         const categories = await Category.findAll();
//         res.json(categories);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Read category by ID
// router.get('/:id', async (req, res) => {
//     try {
//         const category = await Category.findByPk(req.params.id);
//         if (!category) {
//             return res.status(404).json({ error: 'Category not found' });
//         }
//         res.json(category);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Update a category
// router.put('/:id', async (req, res) => {
//     try {
//         const category = await Category.findByPk(req.params.id);
//         if (!category) {
//             return res.status(404).json({ error: 'Category not found' });
//         }
//         await category.update(req.body);
//         res.json(category);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });

// // Delete a category
// router.delete('/:id', async (req, res) => {
//     try {
//         const category = await Category.findByPk(req.params.id);
//         if (!category) {
//             return res.status(404).json({ error: 'Category not found' });
//         }
//         await category.destroy();
//         res.status(204).end();
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// module.exports = router;
//good //lcode lfo9 kan diali
const express = require('express');
const router = express.Router();
const { Category } = require('../models');
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

// Create a category
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { name } = req.body;
        let mainImagePath = null;
        mainImagePath = req.file.path;
        const category = await Category.create({
            name,
            image: mainImagePath, // Save the main image path in the database
          });



        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Read all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read category by ID
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a category
router.put('/:id', async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        await category.update(req.body);
        res.json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a category
router.delete('/:id', async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        await category.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
