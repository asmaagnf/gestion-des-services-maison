import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { fetchDemandeStatusCounts, fetchUserServicesCount, fetchUserdemandeCount } from '../../utils/api';
import './Prointerface.css';
import { MdOutlineMail } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";
import { TbCurrentLocation } from "react-icons/tb";

const ProInterface = () => {
  const [serviceCount, setServiceCount] = useState(0);
  const [demandeCount, setDemandeCount] = useState(0);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const [statusCounts, setStatusCounts] = useState({
    enCoursCount: 0,
    refuseCount: 0,
    completeCount: 0
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        axios.get(`http://localhost:3001/users/${userId}`)
          .then(response => {
            setUserInfo(response.data);
          })
          .catch(error => {
            console.error('Error fetching user info:', error);
          });

        fetchUserServicesCount(userId)
          .then(count => {
            setServiceCount(count);
          })
          .catch(error => {
            console.error('Error fetching service count:', error);
          });

        fetchUserdemandeCount(userId)
          .then(count => {
            setDemandeCount(count);
          })
          .catch(error => {
            console.error('Error fetching demande count:', error);
          });

        fetchDemandeStatusCounts(userId)
          .then(data => {
            setStatusCounts(data);
          })
          .catch(error => {
            console.error('Failed to fetch demandes status counts', error);
          });
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  return (
    <div className="container-d">
      {userInfo && (
        <>
          <div className="profile">
            <div className="avatar-container">
              {userInfo.image ? (
                <img src={`http://localhost:3001/${userInfo.image}`} alt="User Avatar" className="avatar" />
              ) : (
                <div className="avatar-placeholder">
                  <span>{userInfo.email[0].toUpperCase()}</span>
                </div>
              )}
            </div>
            <div className="info">
              <span className="username">{userInfo.username}</span>
              <p> <MdOutlineMail /> {userInfo.email}</p>
              <p> <MdOutlineLocationOn />{userInfo.adresse}</p>
              <p><TbCurrentLocation /> {userInfo.code_postal}</p>
            </div>
          </div>
          <div className="dashboard">
            <div className="card" onClick={() => navigate("/pro/service")}>
              <h2>Services total</h2>
              <h3>{serviceCount}</h3>
            </div>
            <div className="card" onClick={() => navigate("/pro-interface/Demande")}>
              <h2>Total des demandes</h2>
              <h3>{demandeCount}</h3>
            </div>
            <div className="card">
              <h2>Demandes complété</h2>
              <h3>{statusCounts.completeCount}</h3>
            </div>
            <div className="card">
              <h2>Demandes en cours</h2>
              <h3>{statusCounts.enCoursCount}</h3>
            </div>
            <div className="card">
              <h2>Demandes Refusé</h2>
              <h3>{statusCounts.refuseCount}</h3>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProInterface;