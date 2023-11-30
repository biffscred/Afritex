import React, { createContext, useState } from 'react';

// Création du contexte
export const UserContext = createContext();

// Création du Provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Commencez avec un utilisateur null

  // Fonction pour mettre à jour l'état de l'utilisateur
  const updateUser = (userData) => {
    setUser(userData);
  };

  // Le contexte fournit l'utilisateur et la fonction pour le mettre à jour
  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
