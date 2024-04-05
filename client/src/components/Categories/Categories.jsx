import React from "react";
import './Categories.css'
import Category from "../Category/Category";
import { categories } from '../../utils/categories';

const Categories = () => {
  return (
    <section className="c-wrapper">
      <div className="paddings innerWidth flexCenter c-container">
      {categories.map(category => (
        <Category key={category.id} category={category} />
      ))}

      </div>
    </section>
    
  );
};

export default Categories;
