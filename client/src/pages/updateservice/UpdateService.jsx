import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../addservice/addservice.css'; // Import your CSS file
import { useNavigate, useParams } from 'react-router-dom';
import { getService } from '../../utils/api';

const UpdateService = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [error, setError] = useState('');
  const [updateImages, setUpdateImages] = useState(false); // New state for tracking image update

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setUpdateImages(true); // Set updateImages to true when new images are selected
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('location', location);
      formData.append('yearsOfExperience', yearsOfExperience);
      formData.append('SubcategoryId', selectedSubcategory);
      formData.append('userId', service.userId); // Include userId in formData for validation
      formData.append('updateImages', updateImages); // Append updateImages flag

      if (image) {
        formData.append('image', image);
      }

      if (updateImages) {
        images.forEach((image) => {
          formData.append('images', image);
        });
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      };

      const response = await axios.put(`http://localhost:3001/api/services/${serviceId}`, formData, config);
      console.log('Service updated:', response.data);
      navigate(`/pro/service/${serviceId}`);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to update service');
    }
  };

  useEffect(() => {
    const fetchService = async () => {
      try {
        const fetchedService = await getService(serviceId);
        setService(fetchedService);
        setTitle(fetchedService.title);
        setDescription(fetchedService.description);
        setLocation(fetchedService.location);
        setYearsOfExperience(fetchedService.yearsOfExperience);
        setSelectedSubcategory(fetchedService.SubcategoryId);
        setImages(fetchedService.ServiceImages || []); // Assuming fetchedService.ServiceImages is an array of image URLs
      } catch (error) {
        setError('Failed to fetch service');
      }
    };

    if (serviceId) {
      fetchService();
    }
  }, [serviceId]);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/subcategories');
        setSubcategories(response.data); // Assuming response.data is an array of subcategories
      } catch (error) {
        setError('Failed to fetch subcategories');
      }
    };

    fetchSubcategories();
  }, []);

  if (!service) {
    return <div>Loading...</div>;
  }

  return (
    <div className="form-container">
      <h2 className="form-heading">Modifier le service</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" method="POST">
        <div>
          <label className="form-label">Titre:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div>
          <label className="form-label">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="form-input"
          ></textarea>
        </div>
        <div>
          <label className="form-label">Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div>
          <label className="form-label">Years of Experience:</label>
          <input
            type="number"
            value={yearsOfExperience}
            onChange={(e) => setYearsOfExperience(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div>
          <label className="form-label">Subcategory:</label>
          <select
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
            required
            className="form-input"
          >
            <option value="">Select Subcategory</option>
            {subcategories.map((subcategory) => (
              <option key={subcategory.id} value={subcategory.id}>
                {subcategory.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="form-label">Photo actuelle:</label>
          <img src={`http://localhost:3001/${service?.image}`} alt="Service" className="current-image" />
        </div>
        <div>
          <label className="form-label">Nouvelle photo:</label>
          <input
            type="file"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
            className="form-input"
          />
        </div>
        <div>
          <label className="form-label">Ajouter d'autres photos:</label>
          <input
            type="file"
            name="images"
            multiple
            onChange={handleFileChange}
            className="form-input"
          />
          {images.length > 0 && (
            <div>
             <label className="form-label">Current Additional Photos:</label>
            <div className="selected-images-container">
              {images.map((img, index) => (
                <img key={index} src={`http://localhost:3001/${img?.imageUrl}`} alt={`Additional ${index}`} className="preview-image" />
              ))}
            </div>
            </div>
          )}
        </div>
        
        <button type="submit" className="button">Mettre à jour le service</button>
      </form>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default UpdateService;