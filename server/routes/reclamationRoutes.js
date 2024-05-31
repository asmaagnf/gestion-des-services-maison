// // routes/reclamationRoutes.js

// const express = require('express');
// const router = express.Router();

// // Importer le modèle de réclamation
// const {Reclamation} = require('../models');

// // GET - Récupérer toutes les réclamations
// router.get('/', async (req, res) => {
//   try {
//     const reclamations = await Reclamation.findAll();
//     res.json(reclamations);
//   } catch (error) {
//     console.error('Error fetching reclamations:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// // GET - Récupérer une réclamation par ID
// router.get('/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const reclamation = await Reclamation.findByPk(id);
//     if (!reclamation) {
//       return res.status(404).json({ message: 'Reclamation not found' });
//     }
//     res.json(reclamation);
//   } catch (error) {
//     console.error('Error fetching reclamation by ID:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// // POST - Créer une réclamation
// router.post('/', async (req, res) => {
//   const { title, description, userId, userEmail } = req.body;
//   try {
//     const reclamation = await Reclamation.create({ title, description, userId, userEmail });
//     res.status(201).json(reclamation);
//   } catch (error) {
//     console.error('Error creating reclamation:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// // DELETE - Supprimer une réclamation par ID
// router.delete('/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deletedReclamation = await Reclamation.destroy({ where: { id } });
//     if (deletedReclamation === 0) {
//       return res.status(404).json({ message: 'Reclamation not found' });
//     }
//     res.json({ message: 'Reclamation deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting reclamation:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const { Reclamation } = require('../models');

// GET - Récupérer toutes les réclamations
router.get('/', async (req, res) => {
  try {
    const reclamations = await Reclamation.findAll();
    res.json(reclamations);
  } catch (error) {
    console.error('Error fetching reclamations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET - Récupérer une réclamation par ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const reclamation = await Reclamation.findByPk(id);
    if (!reclamation) {
      return res.status(404).json({ message: 'Reclamation not found' });
    }
    res.json(reclamation);
  } catch (error) {
    console.error('Error fetching reclamation by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST - Créer une réclamation
router.post('/', async (req, res) => {
  const { title, description, userId, userEmail } = req.body;
  try {
    const reclamation = await Reclamation.create({ title, description, userId, userEmail });
    res.status(201).json(reclamation);
  } catch (error) {
    console.error('Error creating reclamation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE - Supprimer une réclamation par ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedReclamation = await Reclamation.destroy({ where: { id } });
    if (deletedReclamation === 0) {
      return res.status(404).json({ message: 'Reclamation not found' });
    }
    res.json({ message: 'Reclamation deleted successfully' });
  } catch (error) {
    console.error('Error deleting reclamation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
