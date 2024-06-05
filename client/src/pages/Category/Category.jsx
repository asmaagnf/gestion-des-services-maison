
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PuffLoader } from "react-spinners";
import { getCategoryData, getSubcategoryData } from '../../utils/api';
import { BsArrowRight } from 'react-icons/bs';
import GeneralSearchBar from "../../components/SearchBar/GeneralSearchBar";
import "./Category.css";

// Fonction utilitaire pour formater l'URL de l'image
const getImageUrl = (imagePath) => {
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  return `http://localhost:3001/${imagePath}`;
};

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (titleFilter, addressFilter) => {
    // Navigate to the services page with query parameters
    navigate(`/service?title=${titleFilter}&address=${addressFilter}`);
  };

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
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }

  // Find the maximum number of subcategories among all categories
  const maxSubcategoriesCount = Math.max(...categories.map(category => subcategories.filter(subcategory => subcategory.CategoryId === category.id).length));
  const imageHeight = 200; // Adjust this value according to your image height
  const maxCardHeight = imageHeight + (maxSubcategoriesCount * 50) + 50;

  const headerImageContainerStyle = {
    width: "100%",
    height: "60vh",
    overflow: "hidden",
    position: "relative"
  };

  const headerImageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    position: "absolute",
    top: "0",
    left: "0"
  };

  const headerTextStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "2rem",
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: "10px 20px",
    borderRadius: "5px"
  };

  const categoryHeaderStyle = {
    textAlign: 'left',
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%'
  };

  const headerTitleStyle = {
    fontSize: '1.6em',
    color: '#f39c12', // Orange color for the first text
    fontWeight: 'bold',
    marginBottom: '0.5em'
  };

  const headerTextStyleSub = {
    fontSize: '1.2em',
    color: '#2c3e50', // Darker color for the second text
    margin: '0'
  };

  return (
    <div>
      <div style={headerImageContainerStyle}>
        <img 
          src="https://images.unsplash.com/photo-1473621038790-b778b4750efe?q=80&w=1772&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Header" 
          style={headerImageStyle} 
        />
        <div style={headerTextStyle}>
          Votre tâche, c'est notre mission
          <GeneralSearchBar onSearch={handleSearch} />
        </div>
      </div>
      <div className="wrapper paddings" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={categoryHeaderStyle}>
          <p style={headerTitleStyle}>Nos Catégories de Services</p>
          <h1 style={headerTextStyleSub}>Découvrez nos principales catégories de services et choisissez celle qui répond le mieux à vos besoins.</h1>
        </div>
        <ul className="c-container" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", listStyleType: "none", padding: 0 }}>
          {categories.map(category => (
            <li key={category.id} style={{ flex: "0 1 400px", margin: "10px" }}>
              <div className="card" style={{ width: "100%", border: "1px solid #ccc", borderRadius: "8px", overflow: "hidden", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", transition: "transform 0.2s", height: `${maxCardHeight}px` }}>
                <div style={{ height: `${imageHeight}px`, overflow: "hidden", border: "none", position: "relative" }}>
                  <img 
                    src={getImageUrl(category.image)} // Utilisation de la fonction utilitaire
                    alt={category.name} 
                    className="card-image" 
                    style={{ 
                      width: "100%", 
                      height: "100%", 
                      objectFit: "cover", 
                      position: "absolute",
                      top: "0",
                      left: "0",
                    }} 
                  />
                </div>
                <div className="card-header" style={{ padding: "16px", backgroundColor: "#f8f8f8", textAlign: "center", fontSize: 14 }}>
                  <h2>{category.name}</h2>
                </div>
                <div className="card-body" style={{ maxHeight: `calc(100% - ${imageHeight + 116}px)`, overflowY: "auto", padding: "0 16px" }}>
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
      {/* <Footer /> */}
    </div>
  );
};

export default Category;
