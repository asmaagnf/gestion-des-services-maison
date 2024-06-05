import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

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
            <th>NOM DU PROFESSIONNEL</th>
            <th>NOM DE SERVICE</th>
            <th>DESCRIPTION</th>
            <th>ADRESSE</th>
            <th>TAILLE DE SERVICE</th>
            <th>STATUS</th>
            <th>DATE DE DEMANDE</th>
            <th>Envoyer le message</th>
          </tr>
        </thead>
        <tbody>
          {demands.map((demand) => (
            <tr key={demand.id}>
              <td>{demand.id}</td>
              <td>{demand.Service.user.username}</td>
              <td>
                {demand.status === 'complété' ? (
                  <Link to={`/service/${demand.Service.id}`}>{demand.Service.title}</Link>
                ) : (
                  demand.Service.title
                )}
              </td>
              <td>{demand.description}</td>
              <td>{demand.adresse}</td>
              <td>{demand.taille}</td>
              <td>  {demand.status === 'complété' ? (
                  <Link to={`/service/${demand.Service.id}`} style={{color: "green"}}>{demand.status}</Link>
                ) : (
                  demand.status
                )}</td>
              <td>{new Date(demand.createdAt).toLocaleDateString()}</td>
              <td>
                <Link to={`/client/chat/${demand.chatRoomId}`}>Message</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientDemandePage;
