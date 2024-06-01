import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdLocationPin } from "react-icons/md";
import CustomModal from '../../components/CustomModal/CustomModal'; 
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';

const ServiceCard = ({ card }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [adresse, setAdresse] = useState('');
  const [taille, setTaille] = useState('petit'); // Default to 'petit'

  const handleCreateDemande = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Vous devez être connecté');
        return;
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      const response = await axios.post('http://localhost:3001/api/demande/create-demande', {
        description,
        adresse,
        taille,
        ServiceId: card.id,
        userId,
      });
      if (response.status === 201) {
        setDescription('');
        setAdresse('');
        setTaille('petit');
        setIsModalOpen(false);
    
         toast.success('Demande envoyée avec succès !');
        }
      } catch (error) {
        console.error('Error creating demande:', error);
        toast.error('Une erreur est survenue. Veuillez réessayer.');
      }
  };


  const navigate = useNavigate();

  return (
    <div style={styles.card}>
      <div style={styles.imageContainer}>
        <img src={`http://localhost:3001/${card.image}`} alt={card.name} style={styles.image} />
      </div>
      <div style={styles.content}>
        <h3 className="primaryText" style={styles.title}>{card.title}</h3>
        <p className="secondaryText" style={styles.description}>{card.description}</p>
        <div style={styles.locationContainer}>
        <MdLocationPin size={25} />
          <p style={styles.location}>{card.location}</p>
        </div>
        <div style={styles.buttonContainer}>
          <button onClick={() => setIsModalOpen(true)} style={styles.button}>
          Demander
          </button>
          <div>
          <CustomModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Créer une Demande"
          >
            <div className="add-user-form "> 
              <label>
              Détails de la tâche :<br/>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description de la demande"
                  rows="4"
                /><br/>
              </label>
              <label>
              Adresse où le service sera effectué :<br/>
                <input
                  type="text"
                  value={adresse}
                  onChange={(e) => setAdresse(e.target.value)}
                  placeholder="Adresse"
                /><br/>
              </label>
              <label>
              Quelle est la taille de votre tâche ?<br/>
                <select
                  value={taille}
                  onChange={(e) => setTaille(e.target.value)}
                >
                  <option value="petit">petit</option>
                  <option value="moyen">moyen</option>
                  <option value="grand">grand</option>
                </select><br/>
              </label>
              <button className="button" onClick={handleCreateDemande}>Envoyer</button>
            </div>
          </CustomModal>
          </div>
          <button style={styles.button1}  onClick={()=>navigate(`../service/${card.id}`)}>Voir détails</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    display: "flex",
    alignItems: "center",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#fff",
    width: "100%",
    maxWidth: "1000px",
    margin: "0 auto",
    flexDirection: "row",
    justifyContent: "space-between",
    transition: "transform 0.3s, box-shadow 0.3s",
    overflow: "hidden",
    textDecoration: "none",
    color: "inherit",
    position: "relative",
  },
  imageContainer: {
    backgroundColor: "#f5f5f5",
    padding: "10px",
    borderRadius: "10px",
    marginRight: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "150px",
    height: "150px",
    borderRadius: "10px",
    objectFit: "cover",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    margin: "0 0 10px 0",
   
  },
  description: {
    fontSize: "16px",
    marginBottom: "10px",
  },
  locationContainer: {
    display: "flex",
    alignItems: "center",
  },
  locationIcon: {
    width: "20px",
    height: "20px",
    marginRight: "8px",
    color: "#666",
  },
  location: {
    fontSize: "16px",
    color: "#666",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "auto",
  },
  button: {
    padding: "8px 16px",
    marginLeft: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#4066ff",
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
  button1: {
    padding: "8px 16px",
    marginLeft: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#4066ff",
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "background-color 0.3s",
   },
 
  "@media (max-width: 768px)": {
    card: {
      flexDirection: "column",
      alignItems: "center",
    },
    imageContainer: {
      marginBottom: "20px",
      marginRight: "0",
    },
    image: {
      width: "100%",
      height: "auto",
      borderRadius: "10px",
    },
  },
};

export default ServiceCard;
