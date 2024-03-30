// AddProduct.js
import * as React from "react";
import { Create, SimpleForm, TextInput, NumberInput } from 'react-admin';

export const AddProduct = (props) => (
  <Create {...props}>
    <SimpleForm>
      {/* Assurez-vous que les noms des sources correspondent aux attributs de votre produit */}
      <TextInput source="name" />
      <NumberInput source="price" />
      {/* Ajoutez d'autres champs TextInput ou NumberInput pour d'autres attributs de produit */}
    </SimpleForm>
  </Create>
);

export default AddProduct;
