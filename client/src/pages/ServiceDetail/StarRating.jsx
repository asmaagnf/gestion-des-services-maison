import React, { useState } from 'react';
import styled from 'styled-components';
import { FaStar } from 'react-icons/fa';

const StarContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Star = styled(FaStar)`
  color: ${({ selected }) => (selected ? '#FFD700' : '#ddd')};
  cursor: pointer;
  transition: color 200ms;

  &:hover {
    color: #FFD700;
  }
`;

const StarRating = ({ rating, onRatingChange }) => {
  const [hover, setHover] = useState(null);

  return (
    <StarContainer>
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <Star
            key={index}
            size={25}
            selected={ratingValue <= (hover || rating)}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(null)}
            onClick={() => onRatingChange(ratingValue)}
          />
        );
      })}
    </StarContainer>
  );
};

export default StarRating;
