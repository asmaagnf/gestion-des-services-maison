import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Categorie.css'; // Import CSS file for styling
import HeaderAdmin from '../../components/HeaderAdmin/HeaderAdmin';

const Categorie = () => {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newSubcategoryName, setNewSubcategoryName] = useState('');
    const [selectedParentCategory, setSelectedParentCategory] = useState('');
    const [isLoading, setIsLoading] = useState(true);

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
        try {
            await axios.post('http://localhost:3001/api/categories', { name: newCategoryName });
            // Refresh categories after adding
            const categoriesResponse = await axios.get('http://localhost:3001/api/categories');
            setCategories(categoriesResponse.data);
            setNewCategoryName('');
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

    return (
        <>
        <HeaderAdmin/>
        <div className="paddings categorie-container">
            {/* Add Category Form */}
            <div className="add-user-form">
                <h3 >Ajouter une catégorie</h3>
                <input type="text" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} />
                <button className='button' onClick={handleAddCategory}>ajouter</button>
            </div>

            {/* Display Categories */}
            <div>
                <h2 className='orangeText' >Catégories</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Nom de catégorie</th>
                            <th>Date de création</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(category => (
                            <tr key={category.id}>
                                <td>{category.name}</td>
                                <td>{new Date(category.createdAt).toLocaleDateString()}</td>
                                <td  className="action-buttons">
                                    <button className='supprimer' onClick={() => handleDeleteCategory(category.id)}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        
   {/* Add Subcategory Form */}
   <div className="add-user-form">
                <h3 >Ajouter une sous-catégorie</h3>
                <input type="text" value={newSubcategoryName} onChange={(e) => setNewSubcategoryName(e.target.value)} />
                <select className='margin-R' value={selectedParentCategory} onChange={(e) => setSelectedParentCategory(e.target.value)}>
                    <option >Sélectionnez la catégorie parent</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
                <button className='button' onClick={handleAddSubcategory}>ajouter</button>
            </div>


            {/* Display Subcategories */}
            <div>
                <h2 className='orangeText'>Sous-catégories</h2>
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
                        {subcategories.map(subcategory => (
                            <tr key={subcategory.id}>
                                <td>{subcategory.name}</td>
                                <td>{categories.find(category => category.id === subcategory.CategoryId)?.name}</td>
                                <td>{new Date(subcategory.createdAt).toLocaleDateString()}</td>
                                <td  className="action-buttons">
                                    <button className='supprimer'  onClick={() => handleDeleteSubcategory(subcategory.id)}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    );
};

export default Categorie;