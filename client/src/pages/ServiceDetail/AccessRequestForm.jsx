import React, { useState } from "react";

const AccessRequestForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    address: "",
    taskSize: "petit", // Default to 'petit'
    taskDetails: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div style={styles.formContainer}>
      <h2 style={styles.formTitle}>Demande de service</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label htmlFor="address">Adresse où le service sera effectué :</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <label htmlFor="taskSize">Quelle est la taille de votre tâche ?</label>
        <select
          id="taskSize"
          name="taskSize"
          value={formData.taskSize}
          onChange={handleChange}
          style={styles.input}
          required
        >
          <option value="petit">Petite</option>
          <option value="moyen">Moyenne</option>
          <option value="grand">Grande</option>
        </select>
        <label htmlFor="taskDetails">Détails de la tâche :</label>
        <textarea
          id="taskDetails"
          name="taskDetails"
          value={formData.taskDetails}
          onChange={handleChange}
          style={{ ...styles.input, height: "100px" }}
          required
        />
        <div style={styles.buttonContainer}>
          <button type="submit" style={styles.submitButton}>Envoyer</button>
          <button type="button" onClick={onClose} style={styles.closeButton}>Fermer</button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  formContainer: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "100%",
  },
  formTitle: {
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "8px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  submitButton: {
    backgroundColor: "#4066ff",
    color: "#fff",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    width: "48%",
  },
  closeButton: {
    backgroundColor: "#ccc",
    color: "#000",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    width: "48%",
  },
};

export default AccessRequestForm;