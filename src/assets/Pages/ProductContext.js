// ProductContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    const loadProducts = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/product');
            setProducts(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des produits', error);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <ProductContext.Provider value={{ products, loadProducts }}>
            {children}
        </ProductContext.Provider>
    );
};
