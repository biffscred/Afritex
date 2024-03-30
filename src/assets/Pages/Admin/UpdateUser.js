// UpdateUser.js
import * as React from "react";
import { Edit, SimpleForm, TextInput } from 'react-admin';

export const UpdateUser = (props) => (
  <Edit {...props}>
    <SimpleForm>
      {/* Utilisez TextInput ou un autre composant de champ pour chaque champ que vous souhaitez modifier */}
      <TextInput source="name" />
      <TextInput source="email" />
      {/* Ajoutez d'autres champs comme nécessaire */}
    </SimpleForm>
  </Edit>
);

export default UpdateUser;

