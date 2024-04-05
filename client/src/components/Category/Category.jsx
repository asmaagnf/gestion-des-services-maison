import React from 'react'
import './Category.css'

const Category = ({ category }) => {
  return (
    <div>
       <h5 className='primaryText'>{category.name}</h5>
      <ul>
        {category.subcategories.map(subcategory => (
          <li className='secondaryText' key={subcategory.id}>{subcategory.name}</li>
        ))}
      </ul>
    </div>
  );
};


export default Category
