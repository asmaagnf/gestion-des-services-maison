import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import './AddService.css'; // Import your CSS file

const addservice = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [image, setImage] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [error, setError] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const response = await axios.post('http://localhost:3001/api/services', {
        title,
        description,
        location,
        yearsOfExperience,
        image,
        SubcategoryId: selectedSubcategory, // Use selected subcategory ID
        userId
      }, config);

      console.log('Service created:', response.data);
    } catch (error) {
      setError(error.response.data.error || 'Failed to create service');
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-heading">Créer un service</h2>
      <form onSubmit={handleSubmit}>
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
          <label className="form-label">Description de votre service :</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div>
          <label className="form-label">votre address / business address:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="form-input"
          />
        </div>
        <div>
          <label className="form-label">Vos années d'expérience :</label>
          <input
            type="number"
            value={yearsOfExperience}
            onChange={(e) => setYearsOfExperience(e.target.value)}
            className="form-input"
          />
        </div>
        <div>
          <label className="form-label">photo:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="form-input"
          />
        </div>
        <div>
          <label className="form-label">Sélectionnez la catégorie de vos services :</label>
          <select value={selectedSubcategory} onChange={(e) => setSelectedSubcategory(e.target.value)} className="form-select">
            <option value="">catégorie</option>
            {subcategories.map(subcategory => (
              <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="button">Créer un service</button>
      </form>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default addservice;
