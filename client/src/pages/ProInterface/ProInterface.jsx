
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {fetchUserServicesCount, fetchUserdemandeCount } from '../../utils/api';
import './Prointerface.css';


const ProInterface = () => {
  const [serviceCount, setServiceCount] = useState(0);
  const [demandeCount, setDemandeCount] = useState(0);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      // Fetch user info using the user ID
      axios.get(`http://localhost:3001/users/${userId}`)
        .then(response => {
          setUserInfo(response.data);
        })
        .catch(error => {
          console.error('Error fetching user info:', error);
        });

      // Fetch service count using the user ID
      fetchUserServicesCount(userId)
        .then(count => {
          setServiceCount(count);
        })
        .catch(error => {
          console.error('Error fetching service count:', error);
        });

      // Fetch demande count using the user ID
      fetchUserdemandeCount(userId)
      .then(count => {
        setDemandeCount(count);
      })
      .catch(error => {
        console.error('Error fetching demande count:', error);
      });


    }
  }, []);

  return (
    <div className='interface'>
      {userInfo && (
        <div className="Container">
          <div className="card">
            <div className="card__avatar">
            {userInfo ? (
          userInfo.image ? (
            <img
              src={`http://localhost:3001/${userInfo.image}`}
              alt="User Avatar"
              
            />
          ) : (
           
              <span >
                {userInfo.email[0].toUpperCase()}
              </span>
            
          )
        ) : (
          <div className="bg-purple-500 h-24 w-24 flex items-center justify-center rounded-full relative">
            <span className="text-5xl text-white">
              
            </span>
          </div>
        )}
            </div>
            <div className="card__content">
              <span className="card__username">{userInfo.username}</span>
            </div>
            <div className="card__divider"></div>
          </div>
          <div className="grid">
            <div className="grid__item" onClick={() => navigate("/pro/service")}>
              <h2 className="grid__title">Service Total</h2>
              <h3 className="grid__count">{serviceCount}</h3>
            </div>
            <div className="grid__item">
              <h2 className="grid__title">Total des demandes</h2>
              <h3 className="grid__count">{demandeCount}</h3>
            </div>
            <div className="grid__item">
              <h2 className="grid__title">Nouveau Messages</h2>
              <h3 className="grid__count">0</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
  



export default ProInterface

