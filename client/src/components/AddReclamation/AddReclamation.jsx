import React, { useState, useEffect } from "react";
import axios from "axios";
import './AddReclamation.css'
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

const AddReclamation = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedToken = token ? jwtDecode(token) : null;
    if (decodedToken) {
      setUserId(decodedToken.id);
      setUserEmail(decodedToken.email);
    }
  }, []);

  const addReclamation = async () => {
    try {
      await axios.post("http://localhost:3001/api/reclamations", {
        title,
        description,
        userId,
        userEmail
      });
      setTitle("");
      setDescription("");
      toast.success("Réclamation ajoutée avec succès !");
    } catch (error) {
      console.error("Error adding reclamation:", error);
      alert("Une erreur s'est produite lors de l'ajout de la réclamation.");
    }
  };

  return (
    <div className="recform-container">
    <h3 className="primaryText">Ajouter une réclamation</h3>
    <input
      type="text"
      className="recinput-field"
      placeholder="Titre"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
    <textarea
      className="rectextarea-field"
      placeholder="Description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    ></textarea>
    <button className="button" onClick={addReclamation}>Ajouter</button>
  </div>
);
};

export default AddReclamation;
