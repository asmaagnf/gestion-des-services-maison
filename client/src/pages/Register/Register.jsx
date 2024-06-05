import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate  } from 'react-router-dom';
import './Register.css'; // Import the CSS file
import { toast } from 'react-toastify';


const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adresse, setadresse] = useState('');
  const [code_postal, setcode_postal] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/users', {
        username,
        email,
        password,
        adresse,
        code_postal
      });

      console.log('Registration successful:', response.data);
      toast.success("Votre inscription a été complétée avec succès !");
      navigate("/login");
     
    } catch (error) {
      console.error('Error registering user:', error);
      setError('Erreur lors de l enregistrement. Veuillez réessayer.'); // Set error message
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
        Adresse :
          <input type="text" value={adresse} onChange={(e) => setadresse(e.target.value)} />
        </label>
        <label>
        Code postale :
          <input type="number" value={code_postal} onChange={(e) => setcode_postal(e.target.value)} />
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
