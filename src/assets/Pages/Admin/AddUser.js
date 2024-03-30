// AddUser.js
import * as React from "react";
import { Create, SimpleForm, TextInput } from 'react-admin';

export const AddUser = (props) => (
  <Create {...props}>
    <SimpleForm>
      {/* Assurez-vous que les noms des sources correspondent aux attributs de votre utilisateur */}
      <TextInput source="email" />
      <TextInput source="password" /> {/* Notez que cela affichera le mot de passe en clair, envisagez une solution plus sécurisée pour la production */}
      <TextInput source="address" /> {/* Assurez-vous que 'address' correspond à l'attribut dans votre modèle d'utilisateur */}
      {/* Ajoutez d'autres champs TextInput pour d'autres attributs de l'utilisateur si nécessaire */}
    </SimpleForm>
  </Create>
);

export default AddUser;
