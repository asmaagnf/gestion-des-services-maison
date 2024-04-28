
const express = require('express');
const router = express.Router();
const { Service } = require('../models');
const {validateToken} = require('../Middleware/authMiddleware');

//create service
router.post('/services', validateToken, async (req, res) => {
    try {
        const { title, description, location, yearsOfExperience, image, SubcategoryId, userId } = req.body;
        const newService = await Service.create({
            title,
            description,
            location,
            yearsOfExperience,
            image,
            SubcategoryId,
            userId
        });
        
        res.status(201).json(newService);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//fetch all services
router.get('/services', async (req, res) => {
    try {
        const services = await Service.findAll();
        res.json(services);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get service by ID
router.get('/services/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const service = await Service.findByPk(id);
        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }
        res.json(service);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get services by subcategory ID
router.get('/services/subcat/:subcategoryId', async (req, res) => {
    const { subcategoryId } = req.params;

    try {
        // Find services by subcategory ID
        const services = await Service.findAll({
            where: { SubcategoryId: subcategoryId } // Filter services by subcategory ID
        });

        res.json(services);
    } catch (error) {
        console.error('Error fetching services by subcategory ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//update service
router.put('/services/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const service = await Service.findByPk(id);
        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }
        const { title, description, location, yearsOfExperience, image, SubcategoryId } = req.body;
        await service.update({
            title,
            description,
            location,
            yearsOfExperience,
            image,
            SubcategoryId
        });
        res.json(service);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//delete a service
router.delete('/services/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const service = await Service.findByPk(id);
        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }
        await service.destroy();
        res.json({ message: 'Service deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
