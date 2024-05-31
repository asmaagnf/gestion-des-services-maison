import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import CategoryHomeP from "../pages/Category/CategoryHomeP";
import Contact from "../components/Contact/Contact";
import GetStarted from "../components/GetStarted/GetStarted";
import Hero from "../components/Hero/Hero";
import Services from "../components/Services/Services";
import Value from "../components/Value/Value";

const Website = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');

    if (token) {
      try {
        // Decode the token to extract user role
        const decodedToken = jwtDecode(token);

        // Redirect user to appropriate interface based on role
        switch (decodedToken.role) {
          case 'client':
            navigate('/client-interface', { replace: true });
            break;
          case 'pro':
            navigate('/pro-interface', { replace: true });
            break;
          case 'admin':
            navigate('/admin-interface', { replace: true });
            break;
          default:
            navigate('/login', { replace: true }); // Redirect to login if role is invalid
        }
      } catch (error) {
        // Handle invalid token or decoding error
        console.error('Error decoding token:', error);
        navigate('/login', { replace: true }); // Redirect to login page
      }
    }
  }, [navigate]); // Depend on navigate function

  return (
    <div className="App">
      <Hero />
      <Services />
      <Value />
      <CategoryHomeP />
      <section style={howItWorksSectionStyle}>
        <div style={howItWorksContainerStyle}>
          <h2 style={howItWorksHeadingStyle}>Comment ça marche</h2>
          <div style={stepsContainerStyle}>
            <div style={stepStyle}>
              <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Étape 1" style={stepImageStyle} />
              <div style={stepContentStyle}>
                <h3>1. Explorez les services disponibles</h3>
                <p>Entrez sur notre site web et explorez les différents services proposés par les professionnels. Choisissez la catégorie qui correspond à vos besoins.</p>
              </div>
            </div>
            <div style={stepStyle}>
              <img src="https://plus.unsplash.com/premium_photo-1661306437432-a868b14c880c?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Étape 2" style={stepImageStyle} />
              <div style={stepContentStyle}>
                <h3>2. Consultez les professionnels près de chez vous</h3>
                <p>Après avoir choisi une catégorie, une liste de services disponibles près de chez vous s'affichera. Consultez les détails des services et les profils des professionnels.</p>
              </div>
            </div>
            <div style={stepStyle}>
              <img src="https://image.pbs.org/video-assets/cjpSuul-asset-mezzanine-16x9-lOlFLEQ.jpg.fit.1280x720.jpg" alt="Étape 3" style={stepImageStyle} />
              <div style={stepContentStyle}>
                <h3>3. Faites une demande et commencez le travail</h3>
                <p>Faites une demande pour vérifier la disponibilité du professionnel. Discutez des détails et du prix via notre chat. Une fois l'accord trouvé, commencez le travail avec le professionnel.</p>
              </div>
            </div>
          </div>
        </div>
      </section>         
  <GetStarted />

      {/* Uncomment Contact if needed */}
      {/* <Contact /> */}
    </div>
  );
};

const howItWorksSectionStyle = {
  padding: '50px 20px',
  backgroundColor: '#f9f9f9',
};

const howItWorksContainerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
};

const howItWorksHeadingStyle = {
  textAlign: 'center',
  marginBottom: '30px',
  color: 'orange',
};

const stepsContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '20px',
};

const stepStyle = {
  flex: 1,
  background: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  transition: 'transform 0.3s ease',
};

const stepImageStyle = {
  width: '100%',
  height: '200px',
  objectFit: 'cover',
};

const stepContentStyle = {
  padding: '20px',
  textAlign: 'center',
};

export default Website;
