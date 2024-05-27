import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';
import { getCategoryData, getSubcategoryData } from '../../utils/api';
import { BsArrowRight } from 'react-icons/bs';


const Category = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    // Fetch categories and subcategories data
    const fetchData = async () => {
      try {
        const [categoriesData, subcategoriesData] = await Promise.all([getCategoryData(), getSubcategoryData()]);
        setCategories(categoriesData);
        setSubcategories(subcategoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: '60vh' }}>
        <PuffLoader height={80} width={80} radius={1} color="#4066ff" aria-label="puff-loading" />
      </div>
    );
  }

  // Find the maximum number of subcategories among all categories
  const maxSubcategoriesCount = Math.max(
    ...categories.map(category => subcategories.filter(subcategory => subcategory.CategoryId === category.id).length)
  );
  const imageHeight = 150;
  const maxCardHeight = imageHeight + maxSubcategoriesCount * 40 + 40;

  return (
    <div className='wrapper paddings'>
    <h1 className=" margin-b orangeText">Services à domicile populaires près de chez vous</h1>
    <div className="wrapper paddings" style={{ display: 'flex', justifyContent: 'center' }}>
      <ul
        className="c-container"
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', listStyleType: 'none', padding: 0 }}
      >
        {categories.map(category => (
          <li key={category.id} style={{ flex: '0 1 320px', margin: '10px' }}>
            <div
              className="card"
              style={{
                width: '100%',
                border: '1px solid #ccc',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s',
                height: `${maxCardHeight}px`,
              }}
            >
              <div style={{ height: `${imageHeight}px`, overflow: 'hidden', border: 'none', position: 'relative' }}>
                <img
                  src={`http://localhost:3001/${category.image}`} 
                  alt="categorie image"
                  className="card-image"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    position: 'absolute',
                    top: '0',
                    left: '0',
                  }}
                />
              </div>
              <div style={{ backgroundColor: '#f8f8f8', textAlign: 'center', fontSize: 13 }}>
                <h2>{category.name}</h2>
              </div>
              <div  style={{ maxHeight: `calc(100% - ${imageHeight + 116}px)`, overflowY: 'auto', padding: '0 16px' }}>
                <ul style={{ padding: 0, listStyleType: 'none' }}>
                  {subcategories
                    .filter(subcategory => subcategory.CategoryId === category.id)
                    .map(subcategory => (
                      <li key={subcategory.id} style={{ padding: '8px 0', display: 'flex', alignItems: 'center' }}>
                        <div style={{ marginRight: '8px' }}>
                          <BsArrowRight size={16} />
                        </div>
                        {isLoggedIn ? (
                        <Link
                          to={`/allservices/subcategory/${subcategory.id}`}
                          style={{
                            textDecoration: 'none',
                            color: '#007aff',
                            fontSize: '16px',
                            transition: 'color 0.3s',
                          }}
                          onMouseOver={e => (e.target.style.color = 'black')}
                          onMouseOut={e => (e.target.style.color = '#007aff')}
                        >
                          {subcategory.name}
                        </Link>
                        ) : (
                          <Link to={`/services/subcategory/${subcategory.id}`}
                          style={{
                            textDecoration: 'none',
                            color: '#007aff',
                            fontSize: '16px',
                            transition: 'color 0.3s',
                          }}
                          onMouseOver={e => (e.target.style.color = 'black')}
                          onMouseOut={e => (e.target.style.color = '#007aff')}
                          
                          > {subcategory.name} </Link>
                     )}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default Category;
