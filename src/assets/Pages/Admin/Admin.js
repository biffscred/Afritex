import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import AddUser from './AddUser';
import UsersList from './UsersList';
import DeleteUser from './DeleteUser';
// import AddCategory from './AddCategory';
import CategoriesList from './CategoryList';
import DeleteCategory from './DeleteCategory';
import AddProduct from './AddProduct';
import ProductsList from './ProductsList';
import DeleteProduct from './DeleteProduct';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    // Fetch users, categories, and products on component mount
    fetchUsers();
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs', error);
    }
  };
  
  const fetchCategories = async () => {
    try {
      const response = await axios.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories', error);
    }
  };
  
  const fetchProducts = async () => {
    try {
      const response = await axios.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des produits', error);
    }
  };
  
  // Fonctions CRUD pour les utilisateurs
  const addUser = async (userData) => {
    try {
      const response = await axios.post('/users', userData);
      setUsers(users.concat(response.data));
    } catch (error) {
      console.error('Erreur lors de l’ajout d’un utilisateur', error);
    }
  };
  
  const updateUser = async (userId, userData) => {
    try {
      const response = await axios.put(`/users/${userId}`, userData);
      setUsers(users.map((user) => (user.id === userId ? response.data : user)));
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l’utilisateur', error);
    }
  };
  
  const DeleteUser = async (userId) => {
    try {
      await axios.delete(`/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Erreur lors de la suppression de l’utilisateur', error);
    }
  };
  
  // Fonctions CRUD pour les catégories
  // const addCategory = async (categoryData) => {
  //   try {
  //     const response = await axios.post('/categories', categoryData);
  //     setCategories(categories.concat(response.data));
  //   } catch (error) {
  //     console.error('Erreur lors de l’ajout d’une catégorie', error);
  //   }
  // };
  
  const updateCategory = async (categoryId, categoryData) => {
    try {
      const response = await axios.put(`/categories/${categoryId}`, categoryData);
      setCategories(categories.map((category) => (category.id === categoryId ? response.data : category)));
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la catégorie', error);
    }
  };
  
  const DeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`/categories/${categoryId}`);
      setCategories(categories.filter((category) => category.id !== categoryId));
    } catch (error) {
      console.error('Erreur lors de la suppression de la catégorie', error);
    }
  };
  
  // Fonctions CRUD pour les produits
  const addProduct = async (productData) => {
    try {
      const response = await axios.post('/products', productData);
      setProducts(products.concat(response.data));
    } catch (error) {
      console.error('Erreur lors de l’ajout d’un produit', error);
    }
  };
  
  const updateProduct = async (productId, productData) => {
    try {
      const response = await axios.put(`/products/${productId}`, productData);
      setProducts(products.map((product) => (product.id === productId ? response.data : product)));
    } catch (error) {
      console.error('Erreur lors de la mise à jour du produit', error);
    }
  };
  
  const DeleteProduct = async (productId) => {
    try {
      await axios.delete(`/products/${productId}`);
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error('Erreur lors de la suppression du produit', error);
    }
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="admin-dashboard">
      <h1>Tableau de Bord Administrateur</h1>

      <section>
        <h2>Utilisateurs</h2>
        <AddUser onAddUser={addUser} />
        <UsersList users={users} onUpdateUser={updateUser} onDeleteUser={DeleteUser} />
      </section>

      <section>
        <h2>Catégories</h2>
        {/* <AddCategory onAddCategory={addCategory} /> */}
        <CategoriesList categories={categories} onUpdateCategory={updateCategory} onDeleteCategory={DeleteCategory} />
      </section>

      <section>
        <h2>Produits</h2>
        <AddProduct onAddProduct={addProduct} />
        <ProductsList products={products} onUpdateProduct={updateProduct} onDeleteProduct={DeleteProduct} />
      </section>

      {/* Vous pouvez continuer à ajouter d'autres sections pour d'autres entités si nécessaire */}
    </div>
  );
};

export default AdminDashboard;
