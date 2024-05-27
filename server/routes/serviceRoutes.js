
const express = require('express');
const router = express.Router();
const { Service, ServiceImage } = require('../models');
const {validateToken} = require('../Middleware/authMiddleware');
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

  // Route for creating a new service with image upload
  router.post('/services', validateToken,  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'images', maxCount: 6 },
  ]), async (req, res) => {
    try {
     
      console.log('req.files:', req.files); // Log req.files
      const { title, description, location, yearsOfExperience, SubcategoryId, userId } = req.body;
      let mainImagePath = null;

    // Check if a main image was uploaded
   
      mainImagePath = req.files['image'][0].path;
    
      // Create the service with the main image
      const newService = await Service.create({
        title,
        description,
        location,
        yearsOfExperience,
        image: mainImagePath, // Save the main image path in the database
        SubcategoryId,
        userId
      });
  
      // Create records for additional images
      const images = req.files['images'].map((file) => ({
        imageUrl: file.path, // Path to the uploaded file
        ServiceId: newService.id
      }));
      
      await ServiceImage.bulkCreate(images);
      
      
      res.status(201).json(newService);
      
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  




  //fetch all services
  router.get('/services', async (req, res) => {
      try {
          const services = await Service.findAll({ include: ServiceImage }); // Include ServiceImages when fetching services
          res.json(services);
      } catch (error) {
          res.status(400).json({ error: error.message });
      }
  });




// Get service by ID
router.get('/services/:id', async (req, res) => {
  const { id } = req.params;
  try {
      const service = await Service.findByPk(id, { include: ServiceImage });
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
router.put('/services/:id', validateToken, upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'images', maxCount: 6 },
]), async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    const { title, description, location, yearsOfExperience, SubcategoryId, updateImages } = req.body;
    let mainImagePath = service.image; // Use existing image path by default

    // Check if a new main image was uploaded
    if (req.files['image'] && req.files['image'].length > 0) {
      mainImagePath = req.files['image'][0].path;
    }

    // Process additional images if updateImages is true
    let images = [];
    if (updateImages === 'true') {
      if (req.files['images'] && req.files['images'].length > 0) {
        images = req.files['images'].map(file => ({ imageUrl: file.path }));
        await ServiceImage.destroy({ where: { ServiceId: id } }); // Delete existing images
        await ServiceImage.bulkCreate(images.map(image => ({ ...image, ServiceId: id }))); // Create new images
      }
    }

    // Update service details
    await service.update({
      title,
      description,
      location,
      yearsOfExperience,
      image: mainImagePath,
      SubcategoryId,
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
      const deletedService = await Service.destroy({ where: { id } });
      if (deletedService === 0) {
          return res.status(404).json({ message: 'service not found' });
      }
      res.json({ message: 'service deleted successfully' });
  } catch (error) {
      console.error('Error deleting service:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});



//user services count
router.get('/user/services/count/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
      const serviceCount = await Service.count({ where: { userId } });
      res.json({ count: serviceCount });
  } catch (error) {
      console.error('Error counting user services:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});





module.exports = router;
