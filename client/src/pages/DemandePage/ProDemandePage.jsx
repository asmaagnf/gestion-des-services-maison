import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const DemandePage = () => {
  const [demands, setDemands] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
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
        const response = await axios.get(`http://localhost:3001/api/demande/seller-demandes/${userId}`);
        setDemands(response.data.demandes);
      } catch (error) {
        console.error('Error fetching demands:', error);
      }
    };

    fetchDemands();
  }, [userId]);

  const updateStatus = async (demandeId, status) => {
    try {
      await axios.put(`http://localhost:3001/api/demande/update-demande-status/${demandeId}`, { status });
      setDemands((prevDemands) =>
        prevDemands.map((demand) =>
          demand.id === demandeId ? { ...demand, status } : demand
        )
      );
      toast.success(`Status updated to ${status}`);
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const filteredDemands = filterStatus === 'all' ? demands : demands.filter(demand => demand.status === filterStatus);

  const headerContainerStyle = {
    width: "100%",
    height: "65vh", // 65% of the viewport height
    overflow: "hidden",
    position: "relative",
  };

  const headerImageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    position: "absolute",
    top: "0",
    left: "0",
  };

  const textContainerInImageStyle = {
    ...styles.textContainer,
    position: "absolute",
    top: "60%",
    left: "5%", // Adjust this value to position it from the left edge
    transform: "translateY(-50%)", // Only translate vertically
    backgroundColor: "rgba(255, 255, 244, 0.7)", // Semi-transparent background
    width: "40%", // Adjust width as needed
    padding: "1rem", // Add padding for more space around the text
    marginLeft: "1rem", // Additional margin for left spacing
  };

  return (
    <div style={styles.container}>
      <div style={headerContainerStyle}>
        <img 
          src="https://plus.unsplash.com/premium_photo-1682148175448-8e418fcfbaa7?q=80&w=1772&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Header" 
          style={headerImageStyle} 
        />
        <div style={textContainerInImageStyle}>
          <p style={styles.text}>Bienvenue sur votre page de gestion des demandes. Ici, vous pouvez suivre vos demandes de service en temps réel. Veuillez noter qu'une fois une demande soumise, elle ne peut pas être modifiée. Pour toute assistance, contactez notre équipe de support.</p>
        </div> 
      </div> 
      <main style={styles.main}>
        <h1 className='primaryText margin-b'>Demandes pour vos services</h1>
        <div style={styles.filterContainer}>
          <h3>Filtrer par :</h3>
          <button style={styles.filterButton} onClick={() => setFilterStatus('all')}>Tous</button>
          <button style={styles.filterButton} onClick={() => setFilterStatus('en cours')}>En cours</button>
          <button style={styles.filterButton} onClick={() => setFilterStatus('refusé')}>Refusé</button>
          <button style={styles.filterButton} onClick={() => setFilterStatus('complété')}>Complété</button>
        </div>
        <table className='margin-b '>
          <thead>
            <tr>
              <th>ID</th>
              <th>NOM DE CLIENT</th>
              <th>NOM DE SERVICE</th>
              <th>DESCRIPTION</th>
              <th>ADRESSE</th>
              <th>TAILLE DE SERVICE</th>
              <th>DATE DE DEMANDE</th>
              <th>STATUS</th>
              <th>Actions</th>
              <th >Envoyer le message</th>
            </tr>
          </thead>
          <tbody>
            {filteredDemands.map((demand) => (
              <tr key={demand.id}>
                <td>{demand.id}</td>
                <td>{demand.user.username}</td>
                <td>{demand.Service.title}</td>
                <td>{demand.description}</td>
                <td>{demand.adresse}</td>
                <td>{demand.taille}</td>
                <td>{new Date(demand.createdAt).toLocaleDateString()}</td>
                <td>{demand.status}</td>
                <td>
                  <button 
                    style={styles.actionButton} 
                    onClick={() => updateStatus(demand.id, 'refusé')}
                  >
                    Refusé
                  </button>
                  <button 
                    style={styles.actionButton} 
                    onClick={() => updateStatus(demand.id, 'complété')}
                  >
                    Complété
                  </button>
                </td>
                <td>
                <Link to={`/pro/chat/${demand.chatRoomId}`}>Message</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: 'white',
    color: '#333',
  },
  main: {
    padding: '2rem',
  },
  title: {
    fontSize: '2rem',
    color: '#f39c12',
    marginBottom: '1rem',
  },
  filterContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1rem',
  },
  filterButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background 0.3s',
    width: '140px',
  },
  statusBadge: {
    backgroundColor: '#add8e6',
    color: '#00008b',
    padding: '0.2rem 0.5rem',
    borderRadius: '5px',
  },
  textContainer: {
    marginBottom: '1rem',
    padding: '0.5rem',
    borderRadius: '5px',
    border: '1px solid #333',
    backgroundColor: '#f0f0f0',
    width: '70%', // Make it half the width
  },
  text: {
    margin: 0,
    color: '#333',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: '0.5rem',
    padding: '0.5rem',
    backgroundColor: '#f0f0f0',
    borderRadius: '5px',
    marginBottom: '0.5rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Added shadow
  },
  tableCell: {
    padding: '0.5rem',
    textAlign: 'center',
  },
  actionButton: {
    backgroundColor: '#f39c12',
    color: '#fff',
    padding: '0.3rem 0.5rem',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    margin: '0.2rem',
  },
};

export default DemandePage;
