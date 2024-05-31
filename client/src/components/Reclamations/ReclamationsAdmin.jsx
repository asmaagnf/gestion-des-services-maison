// good
import React, { useState, useEffect } from "react";
import axios from "axios";
import HeaderAdmin from '../HeaderAdmin/HeaderAdmin'
import { RiDeleteBin5Line } from "react-icons/ri";

const ReclamationsAdmin = () => {
  const [reclamations, setReclamations] = useState([]);

  useEffect(() => {
    fetchReclamations();
  }, []);

  const fetchReclamations = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/reclamations");
      setReclamations(response.data);
    } catch (error) {
      console.error("Error fetching reclamations:", error);
    }
  };

  const deleteReclamation = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/reclamations/${id}`);
      fetchReclamations();
    } catch (error) {
      console.error('Error deleting reclamation:', error);
    }
  };

  return (
    <>
    <HeaderAdmin />
    <div className="admin-container">
      <h2 className="orangeText"> Liste des réclamations</h2>
      <table className="user-table"> 
        <thead>
          <tr>
            <th>id d'utilisateur</th>
            <th>Titre</th>
            <th>Description</th>
            <th>Email de l'utilisateur</th>
            <th>Date de création</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reclamations.map((reclamation) => (
            <tr key={reclamation.id}>
              <td>{reclamation.userId}</td>
              <td>{reclamation.title}</td>
              <td>{reclamation.description}</td>
              <td>{reclamation.userEmail}</td>
              <td>{new Date(reclamation.createdAt).toLocaleDateString()}</td>
              <td className="action-buttons">
                <RiDeleteBin5Line className='supprimer'  onClick={() => deleteReclamation(reclamation.id)}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default ReclamationsAdmin;
