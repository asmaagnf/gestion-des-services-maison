import { React, useEffect } from "react";
import "./Footer.css";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { GrLanguage } from "react-icons/gr";

const Footer = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='footer'>
      <div className="container-f">
      <hr />
        <div className="top">
          <div className="item">
            <h1>Categories</h1>
            <span>Services de Design</span>
            <span>Décoration Intérieure</span>
            <span>Services de Sécurité</span>
            <span>Services de Jardinage </span>
            <span>Réparation et Installation d'Appareils</span>
            <span>Services de Maintenance</span>
            <span>Services de Nettoyage</span>
            <span>Service d'Automatisation Domiciliaire</span>
          </div>
        <div className="item">
           <h1>À propos</h1>
           <span>Carrières</span>
           <span>Presse et actualités</span>
           <span>Partenariat</span>
           <span>Politique de confidentialité</span>
           <span>Conditions d'utilisation</span>
           <span>Réclamations en matière de propriété intellectuelle</span>
           <span>Relations avec les investisseurs</span>
          </div>
          <div className="item">
           <h1>Assistance</h1>
           <span>Aide et support</span>
           <span>Confiance et sécurité</span>
           <span>Homyz Pro</span>
           <span>Homyz Client</span>
          </div>
          <div className="item">
           <h1>Communauté</h1>
           <span>Événements</span>
           <span>Blog</span>
           <span>Forum</span>
           <span>Normes communautaires</span>
           <span>Podcast</span>
           <span>Affiliés</span>
          </div>
          <div className="item">
           <h1>Plus de Homyz</h1>
           <span>Homyz Entreprise</span>
           <span>Homyz Pro</span>
           <span>Homyz Studios</span>
           <span>Guilde Homyz</span>
           <span>Homyz Sélect</span>
           <span>Homyz Espace de travail </span>
           <span>Apprendre</span>
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <img src="../../public/logo2.png" alt="Logo" width={120} />
            <span>© Homyz International Ltd. {new Date().getFullYear()}</span>
          </div>
          <div className="right">
            <div className="social">
               <a href="#"><FacebookIcon style={{ color: 'Blue', fontSize: 24 }} /></a>
              <a href="#"><TwitterIcon style={{ color: 'Blue', fontSize: 24 }} /></a>
              <a href="#"><InstagramIcon style={{ color: 'Tomato', fontSize: 24 }} /></a>
            </div>
            <div className="link">
              <GrLanguage />
              <span>Français</span>
            </div>
         
          </div>
        </div>
      
    </div>
    </div>
  )
}

export default Footer