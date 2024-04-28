const express = require('express');
const router = express.Router();
const { Subcategory } = require('../models');

// Create a subcategory
router.post('/', async (req, res) => {
    try {
        const subcategory = await Subcategory.create(req.body);
        res.status(201).json(subcategory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Read all subcategories
router.get('/', async (req, res) => {
    try {
        const subcategories = await Subcategory.findAll();
        res.json(subcategories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read subcategory by ID
router.get('/:id', async (req, res) => {
    try {
        const subcategory = await Subcategory.findByPk(req.params.id);
        if (!subcategory) {
            return res.status(404).json({ error: 'Subcategory not found' });
        }
        res.json(subcategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a subcategory
router.put('/:id', async (req, res) => {
    try {
        const subcategory = await Subcategory.findByPk(req.params.id);
        if (!subcategory) {
            return res.status(404).json({ error: 'Subcategory not found' });
        }
        await subcategory.update(req.body);
        res.json(subcategory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a subcategory
router.delete('/:id', async (req, res) => {
    try {
        const subcategory = await Subcategory.findByPk(req.params.id);
        if (!subcategory) {
            return res.status(404).json({ error: 'Subcategory not found' });
        }
        await subcategory.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
