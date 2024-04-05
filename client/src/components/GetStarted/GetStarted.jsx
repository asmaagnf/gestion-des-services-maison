import React from "react";
import "./GetStarted.css";
import { Link } from "react-router-dom";
const GetStarted = () => {
  return (
    <div id="get-started" className="g-wrapper">
      <div className="paddings innerWidth g-container">
        <div className="flexColCenter inner-container">
          <span className="primaryText">Commencez avec Homyz</span>
          <span className="secondaryText">
          Réservez une aide fiable pour les tâches ménagères.
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
