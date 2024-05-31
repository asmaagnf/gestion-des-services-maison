// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom'; // Assuming you use React Router for navigation
// import { PuffLoader } from "react-spinners";
// import { getCategoryData, getSubcategoryData } from '../../utils/api'; // Functions to fetch data from API
// import './categories.css';
// const Categories = () => {
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
  

//   useEffect(() => {
  

//     // Fetch categories data
//     getCategoryData()
//       .then(data => {
//         setCategories(data);
//         setIsLoading(false);
//       })
//       .catch(error => console.error('Error fetching categories:', error));

//     // Fetch subcategories data
//     getSubcategoryData()
//       .then(data => {
//         setSubcategories(data);
//       })
//       .catch(error => console.error('Error fetching subcategories:', error));
//   }, []);

//   useEffect(() => {
//     // Check if both categories and subcategories are fetched
//     if (categories.length > 0 && subcategories.length > 0) {
//       setIsLoading(false);
//     }
//   }, [categories, subcategories]);

//   if (isLoading) {
//     return (
//       <div className="wrapper flexCenter" style={{ height: "60vh" }}>
//         <PuffLoader
//           height="80"
//           width="80"
//           radius={1}
//           color="#4066ff"
//           aria-label="puff-loading"
//         />
//       </div>
//     );
//   }

//   return (
//     <div className="paddings cat-container">
      
//       <ul className="grid c-container">
//         {categories.map(category => (
//           <li className=" c-container"  key={category.id}>
//             <Link className='primaryText' to={`/services?category=${category.id}`}>
//               {category.name}
//             </Link>
//             <ul>
//               {subcategories
//                 .filter(subcategory => subcategory.CategoryId === category.id)
//                 .map(subcategory => (
//                   <li key={subcategory.id}>
                 
//                     <Link to={`/services/subcategory/${subcategory.id}`}>
//                       {subcategory.name}
//                     </Link>
                  
//                   </li>
//                 ))}
//             </ul>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Categories;
//good ila w9e3 xi moxkil f category rje3 lwl 
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Assuming you use React Router for navigation
import { PuffLoader } from "react-spinners";
import { getCategoryData, getSubcategoryData } from '../../utils/api'; // Functions to fetch data from API
import './categories.css';
import { FcLeftDown2 } from 'react-icons/fc';
import { MdArrowRightAlt } from 'react-icons/md';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
  

    // Fetch categories data
    getCategoryData()
      .then(data => {
        setCategories(data);
        setIsLoading(false);
      })
      .catch(error => console.error('Error fetching categories:', error));

    // Fetch subcategories data
    getSubcategoryData()
      .then(data => {
        setSubcategories(data);
      })
      .catch(error => console.error('Error fetching subcategories:', error));
  }, []);

  useEffect(() => {
    // Check if both categories and subcategories are fetched
    if (categories.length > 0 && subcategories.length > 0) {
      setIsLoading(false);
    }
  }, [categories, subcategories]);

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

  return (
    <div className='wrapper paddings'>
    <h1 className=" margin-b orangeText">Les Categories</h1>
    <div className=" cat-container">
      <ul className="grid c-container">
        {categories.map(category => (
          <li className=" c-container"  key={category.id}>
            <FcLeftDown2 />
            <Link className='primaryText' to={`/services?category=${category.id}`}>
              {category.name}
            </Link>
            <ul>
              {subcategories
                .filter(subcategory => subcategory.CategoryId === category.id)
                .map(subcategory => (
                  <li key={subcategory.id}>
                 <MdArrowRightAlt />
                    <Link to={`/services/subcategory/${subcategory.id}`}>
                      {subcategory.name}
                    </Link>
                  
                  </li>
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default Categories;
