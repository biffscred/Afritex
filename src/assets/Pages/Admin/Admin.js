import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import AddUser from './AddUser';
import UsersList from './UsersList';

import CategoriesList from './CategoryList';

import AddProduct from './AddProduct';
import ProductsList from './ProductsList';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initialize as false, update based on authentication status

  useEffect(() => {
    // Fetch users, categories, and products on component mount
    fetchUsers();
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://127.0.0.1:8000/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://127.0.0.1:8000/category');
      setCategories(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://127.0.0.1:8000/product');
      setProducts(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des produits', error);
    }
  };

  // Fonctions CRUD pour les utilisateurs
  const addUser = async (userData) => {
    try {
      const response = await axios.post('https://127.0.0.1:8000/users', userData);
      setUsers(users.concat(response.data));
    } catch (error) {
      console.error('Erreur lors de l’ajout d’un utilisateur', error);
    }
  };

  const updateUser = async (userId, userData) => {
    try {
      const response = await axios.put(`https://127.0.0.1:8000/users/${userId}`, userData);
      setUsers(users.map((user) => (user.id === userId ? response.data : user)));
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l’utilisateur', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`https://127.0.0.1:8000/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Erreur lors de la suppression de l’utilisateur', error);
    }
  };

  // Fonctions CRUD pour les catégories
  const updateCategory = async (categoryId, categoryData) => {
    try {
      const response = await axios.put(`https://127.0.0.1:8000/categories/${categoryId}`, categoryData);
      setCategories(categories.map((category) => (category.id === categoryId ? response.data : category)));
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la catégorie', error);
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      await axios.delete(`https://127.0.0.1:8000/categories/${categoryId}`);
      setCategories(categories.filter((category) => category.id !== categoryId));
    } catch (error) {
      console.error('Erreur lors de la suppression de la catégorie', error);
    }
  };

  // Fonctions CRUD pour les produits
  const addProduct = async (productData) => {
    try {
      const response = await axios.post('https://127.0.0.1:8000/products', productData);
      setProducts(products.concat(response.data));
    } catch (error) {
      console.error('Erreur lors de l’ajout d’un produit', error);
    }
  };

  const updateProduct = async (productId, productData) => {
    try {
      const response = await axios.put(`https://127.0.0.1:8000/products/${productId}`, productData);
      setProducts(products.map((product) => (product.id === productId ? response.data : product)));
    } catch (error) {
      console.error('Erreur lors de la mise à jour du produit', error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`https://127.0.0.1:8000/products/${productId}`);
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error('Erreur lors de la suppression du produit', error);
    }
  };

  // if (!isLoggedIn) {
  //   return <Navigate to="/login" replace />;
  // }

  return (
    <div className="admin-dashboard">
      <h1>Tableau de Bord Administrateur</h1>

      <section>
        <h2>Utilisateurs</h2>
        <AddUser onAddUser={addUser} />
        <UsersList users={users} onUpdateUser={updateUser} onDeleteUser={deleteUser} />
      </section>

      <section>
        <h2>Catégories</h2>
        <CategoriesList categories={categories} onUpdateCategory={updateCategory} onDeleteCategory={deleteCategory} />
      </section>

      <section>
        <h2>Produits</h2>
        <AddProduct onAddProduct={addProduct} />
        <ProductsList products={products} onUpdateProduct={updateProduct} onDeleteProduct={deleteProduct} />
      </section>

      {/* Vous pouvez continuer à ajouter d'autres sections pour d'autres entités si nécessaire */}
    </div>
  );
};

export default AdminDashboard;
