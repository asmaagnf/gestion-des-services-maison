import React, { useState } from 'react';
import axios from 'axios';
import { Link  } from 'react-router-dom';
import './Register.css'; // Import the CSS file
import { toast } from 'react-toastify';


const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/users', {
        username,
        email,
        password
      });

      console.log('Registration successful:', response.data);
      toast.success("Votre inscription a été complétée avec succès !");
     
    } catch (error) {
      console.error('Error registering user:', error);
      setError('Erreur lsors de l enregistrement. Veuillez réessayer.'); // Set error message
    }
  };

  return (
    <div className="form-container">
      <h2 className='primaryText'>S'inscrire</h2>
      {error && <div className="error">{error}</div>} {/* Display error message if there's an error */}
      <form onSubmit={handleSubmit}>
        <label>
        Nom d'utilisateur* :
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <label>
          Email* :
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
        Mot de passe* :
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit" className='button'>Register</button>
      </form>
      <span>
      Vous avez déjà un compte?&nbsp;
        <Link to="/login" className='linktext'>
              se connecter
            </Link>
        </span>
    </div>
  );
};

export default Register;
