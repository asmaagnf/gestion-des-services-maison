import React, { useState, useEffect } from 'react';

import './Services.css';
import useServices from '../../hooks/useServices';
import { PuffLoader } from "react-spinners";
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Servicebyuserid = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const { data, isError, isLoading } = useServices();

  useEffect(() => {
    // Fetch user ID from JWT token
    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;
    if (decodedToken) {
      setUserId(decodedToken.id);
    }
  }, []);
  const handleDeleteService = async (serviceId) => {
    try {
      await axios.delete(`http://localhost:3001/api/services/${serviceId}`);
      // After successful deletion, refetch the services data to update the UI
      window.location.reload();
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };
  const handleUpdateService = (serviceId) => {
    // Redirect to the update service page with the service ID
    navigate(`/pro/service/Modifier-Service/${serviceId}`);
  };


  if (isError) {
    return (
      <div className="wrapper">
        <span>Error while fetching data</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }

  // Filter services based on the user's ID
  const userServices = data.filter(service => service.userId === userId);

  return (
    <div className='wrapper'>
    <div className="flexColCenter paddings innerWidth service-container">
      {userServices.map((card, i) => (
        <div key={i} className="paddings flexCenter services">
          <ServiceCard card={card} />
          
          <button className='button margin-R'  onClick={() => handleDeleteService(card.id)}>Supprimer</button>
          <button className='button 'onClick={() => handleUpdateService(card.id)} >Modifier</button>
          </div>
        
          
      ))}
    </div>
  </div>
  );
}

export default Servicebyuserid;
