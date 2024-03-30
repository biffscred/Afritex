// Importations de React et des packages externes
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Importations de React Admin et du data provider

import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';


// Importations des composants de React Admin (ajustez les chemins selon vos fichiers)
import { UsersList } from './assets/Pages/Admin/UsersList';
import { ProductsList } from './assets/Pages/Admin/ProductsList';
import { CategoryList } from './assets/Pages/Admin/CategoryList';
// Importations de votre projet
import Index from "./assets/routes/index";
import "./assets/scss/custom.css";
import "./assets/scss/jquery.fancybox.min.css";
import "./assets/scss/themebau.min.css";
import "./assets/scss/themebau.scss";

// Context providers
import { AuthProvider } from './assets/Pages/AuthContext'; 
import { CartProvider } from "./assets/Pages/CartContext";
import { ProductProvider } from "./assets/Pages/ProductContext";
import { UserProvider } from "./assets/Pages/UserContext";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
    AOS.refresh();
  });


// Configurez l'URL de votre API ici
const dataProvider = simpleRestProvider('https://127.0.0.1:8000/');


  return (
    <React.Fragment>
      <AuthProvider>
        <UserProvider> 
          <CartProvider>
            {/* <ProductProvider> */}
             {/* Intégration de React Admin */}
             {/* <Admin dataProvider={dataProvider}>
                  <Resource name="users" list={UsersList} />
                  <Resource name="products" list={ProductsList} />
                  <Resource name="categories" list={CategoryList} />
                </Admin> */}
              {/* Autres composants de votre application */}
              <Index />
            {/* </ProductProvider> */}
          </CartProvider>
        </UserProvider>
      </AuthProvider>
    </React.Fragment>
  );
}

export default App;
