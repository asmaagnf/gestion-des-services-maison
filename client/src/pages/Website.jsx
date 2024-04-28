import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode }from 'jwt-decode';
import Categories from "../components/Categories/Categories";
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

  // Render nothing (or loading indicator) in the home page component
  return (
    <div className="App">
    <div>
      <div className="white-gradient" />
  
      <Hero />
    </div>
    <Services/>
    <Value/>
    <Categories />
    <Contact/>
    <GetStarted/>
  
  </div> );
};
  


export default Website
