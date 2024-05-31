import React, { useState } from "react";
import AccessRequestForm from "./AccessRequestForm";
import { useNavigate } from "react-router-dom";
import { MdLocationPin } from "react-icons/md";

const ServiceCard = ({ card }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const navigate = useNavigate();

  return (
    <div style={styles.card}>
      {showModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <AccessRequestForm onClose={handleCloseModal}  />
          </div>
        </div>
      )}
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
          <button onClick={handleOpenModal} style={styles.button}>
          Demander
          </button>
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
