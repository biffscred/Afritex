// CategoriesList.js
import * as React from "react";
import { List, Datagrid, TextField, EditButton, DeleteButton } from 'react-admin';

export const CategoryList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" /> {/* Assurez-vous que 'name' correspond à un attribut de votre catégorie */}
            <EditButton basePath="/categories" />
            <DeleteButton basePath="/categories" />
        </Datagrid>
    </List>
);

export default CategoryList;
