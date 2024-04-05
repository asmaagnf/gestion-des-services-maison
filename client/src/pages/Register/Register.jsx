import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; // Import the CSS file

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
     
    } catch (error) {
      console.error('Error registering user:', error);
      setError('Error registering user. Please try again.'); // Set error message
    }
  };

  return (
    <div className="form-container">
      <h2 className='primaryText'>Inscription</h2>
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
    </div>
  );
};

export default Register;
