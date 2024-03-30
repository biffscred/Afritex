// UpdateCategory.js
import * as React from "react";
import { Edit, SimpleForm, TextInput } from 'react-admin';

export const UpdateCategory = props => (
  <Edit {...props} undoable={false}>
    <SimpleForm>
      <TextInput source="name" /> {/* Assurez-vous que 'name' correspond à l'attribut de votre catégorie */}
      {/* Ajoutez d'autres TextInput si votre catégorie a d'autres attributs à modifier */}
    </SimpleForm>
  </Edit>
);

export default UpdateCategory;

