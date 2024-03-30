// ProductsList.js
import * as React from "react";
import { List, Datagrid, TextField, NumberField, EditButton, DeleteButton } from 'react-admin';

export const ProductsList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" /> {/* Assurez-vous que 'name' correspond à un attribut de votre produit */}
            <NumberField source="price" /> {/* Assurez-vous que 'price' correspond à un attribut de votre produit */}
            {/* Ajoutez d'autres TextField ou NumberField pour d'autres attributs de produit ici */}
            <EditButton basePath="/products" />
            <DeleteButton basePath="/products" />
        </Datagrid>
    </List>
);

export default ProductsList;

