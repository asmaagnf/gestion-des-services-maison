// good
import React, { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import '../Services/Services.css';
import useServices from '../../hooks/useServices';
import { PuffLoader } from "react-spinners";
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import { useNavigate } from 'react-router-dom';
import HeaderAdmin from "../../components/HeaderAdmin/HeaderAdmin"
import axios from 'axios';

const listeservices = () => {
  const navigate = useNavigate();
  const {data, isError, isLoading} = useServices()
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  
  }, []);
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

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
  return (
        <div className='wrapper'>
            <HeaderAdmin />
          
      <div className="flexColCenter paddings innerWidth service-container">
      <SearchBar filter={filter} setFilter={setFilter} />
      <div className="flexColCenter paddings grid innerWidth service-container">
           { 
           data.filter(
                (service) =>
                  service.title.toLowerCase().includes(filter.toLowerCase()) ||
                  service.location.toLowerCase().includes(filter.toLowerCase())
              )
              .map((card, i) => (
                <div key={i} className="paddings flexCenter services">
                <ServiceCard  card={card} key={i} />
                <p className='secondaryText' >posté à {new Date(card.createdAt).toLocaleDateString()} par<br/> <b>{users.find(users => users.id === card.userId)?.username}</b></p>
                <div>
          <button className='button margin-R'  onClick={() => handleDeleteService(card.id)}>Supprimer</button>
          <button className='button 'onClick={() => handleUpdateService(card.id)} >Modifier</button>
          </div>
                </div>
              ))
             
            }
            
        
      </div>
    </div>
    </div>
  )
}

export default listeservices;


