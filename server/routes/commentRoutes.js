const express = require('express');
const router = express.Router();
const db = require('../models');

// Récupérer les commentaires d'un service par son ID
router.get('/service/:serviceId', async (req, res) => {
    try {
        const { serviceId } = req.params;

        const comments = await db.Comment.findAll({
            where: { ServiceId: serviceId }
        });

        res.status(200).json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Ajouter un commentaire à un service
router.post('/:serviceId', async (req, res) => {
    try {   
        const { serviceId } = req.params;
        const { text } = req.body;

        const service = await db.Service.findByPk(serviceId);
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }

        const comment = await db.Comment.create({
            text,
            ServiceId: serviceId,
            //UserId: req.user.id // Utilisateur qui a fait le commentaire
        });

        res.status(201).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
