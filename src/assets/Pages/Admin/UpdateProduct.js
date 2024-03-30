// UpdateProduct.js
import * as React from "react";
import { Edit, SimpleForm, TextInput, NumberInput } from 'react-admin';

export const UpdateProduct = props => (
  <Edit {...props} undoable={false}>
    <SimpleForm>
      <TextInput source="name" /> {/* Assurez-vous que 'name' correspond à un attribut de votre produit */}
      <NumberInput source="price" /> {/* Assurez-vous que 'price' correspond à un attribut de votre produit */}
      {/* Ajoutez d'autres champs TextInput ou NumberInput pour d'autres attributs à modifier */}
    </SimpleForm>
  </Edit>
);

export default UpdateProduct;