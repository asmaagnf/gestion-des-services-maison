import React from 'react'
import './ServiceCard.css'
import {truncate} from 'lodash'
import { useNavigate } from 'react-router-dom';
const ServiceCard = ({card}) => {

  const navigate = useNavigate();
  return (
    <div className="flexColStart r-card"
    onClick={()=>navigate(`../service/${card.id}`)}>
                <img src={`http://localhost:3001/${card.image}`} alt="image" />

                <span className="primaryText">{truncate(card.title, {length: 17})}</span>
                <span className="secondaryText">{truncate(card.description, {length: 80})}</span>
              </div>
  )
}

export default ServiceCard
