import React, { useState, useEffect } from "react";
import axios from "axios";
import './AddReclamation.css';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

const AddReclamation = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id);
        setUserEmail(decodedToken.email);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const addReclamation = async () => {
    if (!userId || !userEmail) {
      alert("User ID or email is missing");
      return;
    }
    
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
      <label className="primaryText">Ajouter une réclamation
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
        rows={8}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea></label>
      <button className="button" onClick={addReclamation}>Ajouter</button>
    </div>
  );
};

export default AddReclamation;
