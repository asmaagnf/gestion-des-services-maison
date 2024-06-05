import React, { useEffect, useState } from 'react';
import './ServiceCard.css';
import { truncate } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';

const ServiceCard = ({ card }) => {
  const navigate = useNavigate();
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/comments/service/${card.id}`);
        const comments = response.data;

        if (comments.length === 0) return;

        const totalRating = comments.reduce((acc, comment) => acc + comment.rating, 0);
        const avgRating = (totalRating / comments.length).toFixed(1);
        setAverageRating(avgRating);
      } catch (error) {
        console.error('Error fetching ratings:', error);
      }
    };

    fetchRatings();
  }, [card.id]);

  return (
    <div className="flexColStart r-card" onClick={() => navigate(`../service/${card.id}`)}>
      <img src={`http://localhost:3001/${card.image}`} alt="service" />
      <div className="average-rating">
        <FaStar size={20} color="#FFD700" />
        <span>{averageRating}</span>
      </div>
      <span className="primaryText">{truncate(card.title, { length: 17 })}</span>
      <span className="secondaryText">{truncate(card.description, { length: 80 })}</span>
    </div>
  );
};

export default ServiceCard;
