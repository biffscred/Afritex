// UsersList.js

import React from 'react';

const UsersList = ({ users, onEdit, onDelete }) => {
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          {/* Informations de l'utilisateur */}
          <button onClick={() => onEdit(user.id)}>Modifier</button>
          <button onClick={() => onDelete(user.id)}>Supprimer</button>
        </div>
      ))}
    </div>
  );
};

export default UsersList;
