import React from "react";
import "./GetStarted.css";
import { Link } from "react-router-dom";
const GetStarted = () => {
  return (
    <div id="get-started" className="g-wrapper">
      <div className="paddings innerWidth g-container">
        <div className="flexColCenter inner-container">
          <span className="primaryText">Rejoignez Homyz dès aujourd'hui</span>
          <span className="secondaryText">
            Découvrez des services à domicile fiables en quelques clics. Inscrivez-vous maintenant et profitez de la commodité de l'aide professionnelle à portée de main.
          </span>
          <Link to="/register"><button className="button" >
          Commencer
             </button></Link>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
