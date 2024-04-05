import React from 'react'
import './ServiceCard.css'
const ServiceCard = ({card}) => {
  return (
    <div className="flexColStart r-card">
                <img src={card.image} alt="home" />

                <span className="primaryText">{card.name}</span>
                <span className="secondaryText">{card.detail}</span>
              </div>
  )
}

export default ServiceCard
