const express = require('express');
const router = express.Router();
const { validateToken } = require('../Middleware/authMiddleware');
const { Demande, Service, users } = require('../models');

// Create a new demande
router.post('/create-demande', async (req, res) => {
  try {
    const { description, adresse, taille, ServiceId, userId } = req.body;

    if (!ServiceId || !userId) {
      return res.status(400).send("Service ID and User ID are required.");
    }

    const service = await Service.findByPk(ServiceId);
    const user = await users.findByPk(userId);

    if (!service || !user) {
      return res.status(404).send("Service or User not found.");
    }

    const newDemande = await Demande.create({
      description,
      adresse,
      taille,
      status: 'pending',
      userId: user.id,
      ServiceId: service.id,
    });

    return res.status(201).json(newDemande);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
});

// Get Client Demandes
router.get('/client-demandes/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const demandes = await Demande.findAll({
      where: { userId },
      include: [
        { model: Service, include: [{ model: users, as: 'user', attributes: ['username'] }] },
      ],
    });

    return res.status(200).json({ demandes });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
});

// Get Seller Demandes
router.get('/seller-demandes/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const services = await Service.findAll({ where: { userId } });
    const serviceIds = services.map(service => service.id);

    const demandes = await Demande.findAll({
      where: { ServiceId: serviceIds },
      include: [
        { model: Service, attributes: ['title'], include: [{ model: users, as: 'user', attributes: ['username'] }] },
        { model: users, as: 'user', attributes: ['username'] } ],
     
     
    });

    return res.status(200).json({ demandes });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
});

// Update Demande Status
router.put('/update-demande-status/:demandeId', async (req, res) => {
  try {
    const { demandeId } = req.params;
    const { status } = req.body;

    if (!['pending', 'in-progress', 'completed'].includes(status)) {
      return res.status(400).send("Invalid status");
    }

    const demande = await Demande.findByPk(demandeId);
    if (!demande) {
      return res.status(404).send("Demande not found");
    }

    demande.status = status;
    await demande.save();

    return res.status(200).json({ message: "Demande status updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
});

//user demande count
router.get('/user/demande/count/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Find all services owned by the seller
      const services = await Service.findAll({ where: { userId } });
      const serviceIds = services.map(service => service.id);
  
      // Find all demandes associated with the services
      const demandeCount = await Demande.count({ where: { ServiceId: serviceIds } });
  
      return res.status(200).json({ count: demandeCount });
    } catch (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }
  });


module.exports = router;