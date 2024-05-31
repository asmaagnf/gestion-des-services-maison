import React from "react";
import "./Value.css";
import { MdOutlineSecurity, MdOutlineThumbUp, MdOutlineAccessTime } from "react-icons/md";

const Value = () => {
  const values = [
    {
      icon: <MdOutlineSecurity size={70} />,
      title: "Sécurité et Confiance",
      description: "Nous assurons la sécurité et la fiabilité de nos services pour votre tranquillité d'esprit.",
    },
    {
      icon: <MdOutlineThumbUp size={70} />,
      title: "Satisfaction Client",
      description: "Votre satisfaction est notre priorité. Nous nous engageons à offrir le meilleur service possible.",
    },
    {
      icon: <MdOutlineAccessTime size={70} />,
      title: "Disponibilité 24/7",
      description: "Nos services sont disponibles à tout moment, selon votre convenance, 24 heures sur 24, 7 jours sur 7.",
    },
  ];

  return (
    <section id="value" className="v-wrapper">
      <div className="paddings innerWidth flexCenter v-container">
        {/* <h2 className="orangeText">Nos Valeurs</h2> */}
        <h3 className="primaryTexte">Les avantages que nous vous offrons</h3>
        <div className="values-container">
          {values.map((value, index) => (
            <div className="value-item" key={index}>
              <div className="value-icon">{value.icon}</div>
              <h4 className="value-title">{value.title}</h4>
              <p className="value-description">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Value;
