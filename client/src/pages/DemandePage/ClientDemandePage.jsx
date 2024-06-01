import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';

const ClientDemandePage = () => {
  const [demands, setDemands] = useState([]);
  const token = localStorage.getItem('token');

  if (!token) {
    toast.error('Vous devez être connecté');
    return null; // If not logged in, return null to prevent further execution
  }

  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;

  useEffect(() => {
    const fetchDemands = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/demande/client-demandes/${userId}`);
        setDemands(response.data.demandes);
      } catch (error) {
        console.error('Error fetching demands:', error);
      }
    };

    fetchDemands();
  }, [userId]);

  return (
    <div className='innerheight paddings'>
      <h1 className='primaryText margin-b'>Votre Demandes </h1>
      <table className='margin-b '>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom du Professionnel</th>
            <th>Service Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Adresse</th>
            <th>Taille</th>
            
            {/* Add more headers as needed */}
          </tr>
        </thead>
        <tbody>
          {demands.map((demand) => (
            <tr key={demand.id}>
              <td>{demand.id}</td>
              <td>{demand.Service.user.username}</td>
              <td>{demand.Service.title}</td>
              <td>{demand.description}</td>
              <td>{demand.status}</td>
              <td>{demand.adresse}</td>
              <td>{demand.taille}</td>
              
              {/* Add more cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientDemandePage;