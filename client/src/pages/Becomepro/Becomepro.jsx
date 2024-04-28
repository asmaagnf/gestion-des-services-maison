import React from 'react';
import { useState } from 'react';
import { Link  } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import '../Register/Register.css'; 

const Becomepro = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/users/pro', {
        username,
        email,
        password
      });

      console.log('Registration successful:', response.data);
      toast.success(response.data);
    
    } catch (error) {
      console.error('Error registering user:', error);
      setError('Error registering user. Please try again.'); // Set error message
    }
  };

  return (
    <div className="form-container">
      <h2 className='primaryText'> s'inscrice comme prestataire</h2>
      {error && <div className="error">{error}</div>} {/* Display error message if there's an error */}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Password:
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




export default Becomepro;