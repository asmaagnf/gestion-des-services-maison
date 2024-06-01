import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ImProfile } from "react-icons/im";
import { IoIosAddCircle } from "react-icons/io";
import { GiTakeMyMoney } from "react-icons/gi";

import '../Register/Register.css'; 

const Becomepro = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3003/users/pro', {
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
    <div>
      <div className="form-container">
        <h2 className='primaryText'> S'inscrice comme prestataire</h2>
        {error && <div className="error">{error}</div>} {/* Display error message if there's an error */}
        <form onSubmit={handleSubmit}>
          <label>
            Username* :
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </label>
          <label>
            Email* :
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            Password* :
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
      <div className="flexible-work-container">
        <style>{`
          .flexible-work-container {
            text-align: center;
            padding: 40px 20px;
            background-color:white;
          }

          .flexible-work-container h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
          }

          .flexible-work-container p {
            font-size: 1.2em;
            margin-bottom: 40px;
          }

          .flexible-work-features {
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
          }

          .feature-item {
            width: 30%;
            min-width: 250px;
            margin-bottom: 40px;
            text-align: center;
          }

          .feature-item img {
            height: 50px;
            margin-bottom: 20px;
          }

          .feature-item h2 {
            font-size: 1.5em;
            margin-bottom: 10px;
          }

          .feature-item p {
            font-size: 1em;
            color: #666;
          }
        `}</style>
        <h1 className='primaryText'>Travail flexible, à portée de main</h1>
        <p>Trouvez des emplois locaux qui correspondent à vos compétences et à votre emploi du temps. Avec TaskRabbit, vous avez la liberté et le soutien nécessaires pour être votre propre patron.</p>
        <div className="flexible-work-features">
          <div className="feature-item">
            <img src="https://cdn-icons-png.flaticon.com/512/41/41648.png" alt="Soyez votre propre patron" />
            <h2 className='orangeText'>Soyez votre propre patron</h2>
            <p>Travaillez comment, quand et où vous voulez. Offrez des services dans plus de 50 catégories et définissez un horaire et une zone de travail flexibles.</p>
          </div>
          <div className="feature-item">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP5eJzoqv8faBmgfZaZ-28CJuqfcuFD03ZAg&s" alt="Définissez vos propres tarifs" />
            <h2 className='orangeText'>Définissez vos propres tarifs</h2>
            <p>Fixez librement vos tarifs pour chaque service offert. Vous gardez 100% de ce que vous facturez, plus les pourboires ! Utilisez notre plateforme pour gérer vos services et communiquer facilement avec vos clients.</p>
          </div>
          <div className="feature-item">
            <img src="data:image/jpeg;base64,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" alt="Développez votre entreprise" />
            <h2 className='orangeText'>Développez votre entreprise</h2>
            <p>Nous vous mettons en relation avec des clients dans votre région et vous fournissons des moyens de vous faire connaître — pour que vous puissiez vous concentrer sur ce que vous faites de mieux.</p>
          </div>
        </div>
      </div> 
 


      <div className="getting-started-container">
      <style>{`
        .getting-started-container {
          text-align: center;
          padding: 40px 20px;
          background-color: white;
        }

        .getting-started-container h1 {
          font-size: 2.5em;
          margin-bottom: 20px;
        }

        .getting-started-steps {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          gap: 20px;
        }

        .step-item {
          width: 22%; /* Adjusted width to fit four items in one row */
          min-width: 200px;
          text-align: left;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background-color: #f9f9f9;
        }

        .step-item img {
          height: 50px;
          margin-bottom: 10px;
        }

        .step-item h2 {
          font-size: 1.5em;
          margin-bottom: 10px;
        }

        .step-item p {
          font-size: 1em;
          color: #666;
        }
      `}</style>
      <h1 className='primaryText'>Commencer</h1>
      <div className="getting-started-steps">
        <div className="step-item">
          <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSwGRZkMGg4VLAAUSc1XpcSMTf7I2yHsGQoHCkyu_WJPdDyyGlA" alt="Inscription" />
          <h2 className='orangeText'>1. Inscription</h2>
          <p>Créez votre compte. Ensuite, téléchargez l'application Tasker pour continuer l'inscription.</p>
        </div>
        <div className="step-item">
        <ImProfile className='orangeText' />
          <h2 className='orangeText'>2. Complétez votre profil</h2>
          <p>Sélectionnez les services que vous souhaitez offrir et où.</p>
        </div>
        <div className="step-item">
        <IoIosAddCircle className='orangeText'/>
          <h2 className='orangeText'>3. Ajouter des services</h2>
          <p>Ajoutez les services que vous proposez. Expliquez en détail ce que vous avez déjà fait et en quoi vous êtes qualifié pour ces services.</p>
        </div>
        <div className="step-item">
        <GiTakeMyMoney className='orangeText'/>
          <h2 className='orangeText'>4. Commencez à recevoir des offres</h2>
          <p>Développez votre entreprise selon vos propres termes.</p>
        </div>
      </div>
    </div>

      </div>
  );
};

export default Becomepro;