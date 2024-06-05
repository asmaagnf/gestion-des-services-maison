
const express = require('express');
const router = express.Router();
const { Demande, Service, users, ChatRoom } = require('../models');

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

    // Create a chat room for this demande
    const chatRoom = await ChatRoom.create({
      clientId: userId,
      proId: service.userId
    });

    // Create the demande and associate it with the chat room
    const newDemande = await Demande.create({
      description,
      adresse,
      taille,
      status: 'en cours',
      userId: user.id,
      ServiceId: service.id,
      chatRoomId: chatRoom.id
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
        { model: Service, include: [{ model: users, as: 'user'}] },
        { model: ChatRoom, attributes: ['id'] }
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
        { model: users, as: 'user' },
        { model: ChatRoom, attributes: ['id'] }
      ],
    });

    return res.status(200).json({ demandes });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
});




router.put('/update-demande-status/:demandeId', async (req, res) => {
  try {
    const { demandeId } = req.params;
    const { status } = req.body;

    if (!['en cours', 'refusé', 'complété'].includes(status)) {
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

  router.get('/status-counts/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const services = await Service.findAll({ where: { userId } });
      const serviceIds = services.map(service => service.id);
  
      const enCoursCount = await Demande.count({ where: { ServiceId: serviceIds, status: 'en cours' } });
      const refuseCount = await Demande.count({ where: { ServiceId: serviceIds, status: 'refusé' } });
      const completeCount = await Demande.count({ where: { ServiceId: serviceIds, status: 'complété' } });
  
      res.status(200).json({
        enCoursCount,
        refuseCount,
        completeCount
      });
    } catch (error) {
      console.error('Failed to fetch demandes status counts:', error);
      res.status(500).json({ error: 'Failed to fetch demandes status counts' });
    }
  });


module.exports = router;