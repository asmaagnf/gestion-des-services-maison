import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Categorie.css';
import HeaderAdmin from '../../components/HeaderAdmin/HeaderAdmin';
import CustomModal from '../../components/CustomModal/CustomModal';
import { PuffLoader } from 'react-spinners';
import { MdArrowForward, MdArrowBack } from 'react-icons/md';
import { RiDeleteBin5Line } from 'react-icons/ri';

const Categorie = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryImage, setNewCategoryImage] = useState(null);
  const [newSubcategoryName, setNewSubcategoryName] = useState('');
  const [selectedParentCategory, setSelectedParentCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [categoryPage, setCategoryPage] = useState(0);
  const [subcategoryPage, setSubcategoryPage] = useState(0);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isSubcategoryModalOpen, setIsSubcategoryModalOpen] = useState(false);
  const rowsPerPage = 8;

  useEffect(() => {
    const fetchCategoriesAndSubcategories = async () => {
      try {
        const categoriesResponse = await axios.get('http://localhost:3001/api/categories');
        const subcategoriesResponse = await axios.get('http://localhost:3001/api/subcategories');
        setCategories(categoriesResponse.data);
        setSubcategories(subcategoriesResponse.data);
      } catch (error) {
        console.error('Error fetching categories and subcategories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoriesAndSubcategories();
  }, []);

  const handleAddCategory = async () => {
    const formData = new FormData();
    formData.append('name', newCategoryName);
    if (newCategoryImage) {
      formData.append('image', newCategoryImage);
    }

    try {
      await axios.post('http://localhost:3001/api/categories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // Refresh categories after adding
      const categoriesResponse = await axios.get('http://localhost:3001/api/categories');
      setCategories(categoriesResponse.data);
      setNewCategoryName('');
      setNewCategoryImage(null);
      setIsCategoryModalOpen(false);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleAddSubcategory = async () => {
    try {
      await axios.post('http://localhost:3001/api/subcategories', {
        name: newSubcategoryName,
        CategoryId: selectedParentCategory
      });
      // Refresh subcategories after adding
      const subcategoriesResponse = await axios.get('http://localhost:3001/api/subcategories');
      setSubcategories(subcategoriesResponse.data);
      setNewSubcategoryName('');
      setSelectedParentCategory('');
      setIsSubcategoryModalOpen(false);
    } catch (error) {
      console.error('Error adding subcategory:', error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:3001/api/categories/${categoryId}`);
      // Refresh categories after deleting
      const categoriesResponse = await axios.get('http://localhost:3001/api/categories');
      setCategories(categoriesResponse.data);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleDeleteSubcategory = async (subcategoryId) => {
    try {
      await axios.delete(`http://localhost:3001/api/subcategories/${subcategoryId}`);
      // Refresh subcategories after deleting
      const subcategoriesResponse = await axios.get('http://localhost:3001/api/subcategories');
      setSubcategories(subcategoriesResponse.data);
    } catch (error) {
      console.error('Error deleting subcategory:', error);
    }
  };

  const categoryStartIndex = categoryPage * rowsPerPage;
  const subcategoryStartIndex = subcategoryPage * rowsPerPage;

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
    <>
      <HeaderAdmin />
      <div className="paddings categorie-container">
      
        {/* Add Category Modal */}
        <CustomModal
          isOpen={isCategoryModalOpen}
          onClose={() => setIsCategoryModalOpen(false)}
          title="Ajouter une catégorie"
        >
          <label>
        nom de catégorie:<br/>
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Nom de catégorie"
          /></label><br/>
          <label>
          image de catégorie:<br/>
          <input
            type="file"
            onChange={(e) => setNewCategoryImage(e.target.files[0])}
          /></label><br/>
          {newCategoryImage && (
            <img
              src={URL.createObjectURL(newCategoryImage)}
              alt="Selected"
              style={{ width: '50px', height: '50px', marginRight: '10px' }}
            />
          )}
          <br/><button className='button' onClick={handleAddCategory}>Ajouter</button>
        </CustomModal>

        {/* Display Categories */}
        <div>
          <div className='flex'>
          <h2 className='orangeText'>Catégories</h2>
            {/* Add Category Button */}
        <button className='button margin-b' onClick={() => setIsCategoryModalOpen(true)}>Ajouter une catégorie</button>
        </div>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Nom de catégorie</th>
                <th>Date de création</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.slice(categoryStartIndex, categoryStartIndex + rowsPerPage).map(category => (
                <tr key={category.id}>
                  <td>
                    {category.image && (
                      <img
                        src={`http://localhost:3001/${category.image}`}
                        alt={category.name}
                        style={{ width: '60px', height: '60px' }}
                      />
                    )}
                  </td>
                  <td>{category.name}</td>
                  <td>{new Date(category.createdAt).toLocaleDateString()}</td>
                  <td className="action-buttons">
                    <RiDeleteBin5Line className='supprimer' onClick={() => handleDeleteCategory(category.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <button
              className='button'
              style={{ padding: '6px', marginRight: '3px', marginTop: '5px' }}
              onClick={() => setCategoryPage(prev => Math.max(prev - 1, 0))}
              disabled={categoryPage === 0}
            >
              <MdArrowBack />
            </button>
            <button
              className='button'
              style={{ padding: '6px' }}
              onClick={() => setCategoryPage(prev => (categoryStartIndex + rowsPerPage < categories.length ? prev + 1 : prev))}
              disabled={categoryStartIndex + rowsPerPage >= categories.length}
            >
              <MdArrowForward />
            </button>
          </div>
        </div>

       

        {/* Add Subcategory Modal */}
        <CustomModal
          isOpen={isSubcategoryModalOpen}
          onClose={() => setIsSubcategoryModalOpen(false)}
          title="Ajouter une sous-catégorie"
        >
          <input
            type="text"
            value={newSubcategoryName}
            onChange={(e) => setNewSubcategoryName(e.target.value)}
            placeholder="Nom de la sous-catégorie"
          />
          <select
            className='margin-R'
            value={selectedParentCategory}
            onChange={(e) => setSelectedParentCategory(e.target.value)}
          >
            <option>Sélectionnez la catégorie parent</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
          <button className='button' onClick={handleAddSubcategory}>Ajouter</button>
        </CustomModal>

        {/* Display Subcategories */}
        <div>
          <div className='flex'>
          <h2 className='orangeText'>Sous-catégories</h2>
           {/* Add Subcategory Button */}
        <button className='button margin-b' onClick={() => setIsSubcategoryModalOpen(true)}>Ajouter une sous-catégorie</button>
        </div>
          <table>
            <thead>
              <tr>
                <th>Nom de la sous-catégorie</th>
                <th>Catégorie Parentale</th>
                <th>Date de création</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {subcategories.slice(subcategoryStartIndex, subcategoryStartIndex + rowsPerPage).map(subcategory => (
                <tr key={subcategory.id}>
                  <td>{subcategory.name}</td>
                  <td>{categories.find(category => category.id === subcategory.CategoryId)?.name}</td>
                  <td>{new Date(subcategory.createdAt).toLocaleDateString()}</td>
                  <td className="action-buttons">
                    <RiDeleteBin5Line className='supprimer' onClick={() => handleDeleteSubcategory(subcategory.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <button
              className='button'
              style={{ padding: '6px', marginRight: '3px', marginTop: '5px' }}
              onClick={() => setSubcategoryPage(prev => Math.max(prev - 1, 0))}
              disabled={subcategoryPage === 0}
            >
              <MdArrowBack />
            </button>
            <button
              className='button'
              style={{ padding: '6px' }}
              onClick={() => setSubcategoryPage(prev => (subcategoryStartIndex + rowsPerPage < subcategories.length ? prev + 1 : prev))}
              disabled={subcategoryStartIndex + rowsPerPage >= subcategories.length}
            >
              <MdArrowForward />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Categorie;