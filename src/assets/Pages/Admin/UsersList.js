// UsersList.js
import * as React from "react";
import { List, Datagrid, TextField, EditButton, DeleteButton } from 'react-admin';

export const UsersList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" /> {/* Assurez-vous que 'name' correspond à un attribut de votre utilisateur */}
            <TextField source="email" /> {/* Ajoutez ou modifiez les champs selon les données de votre utilisateur */}
            <EditButton basePath="/users" />
            <DeleteButton basePath="/users" />
        </Datagrid>
    </List>
);

export default UsersList;

