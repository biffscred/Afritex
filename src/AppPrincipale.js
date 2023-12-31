import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Index from "./assets/routes/index";
import "./assets/scss/custom.css";
import "./assets/scss/jquery.fancybox.min.css";
import "./assets/scss/themebau.min.css";
import "./assets/scss/themebau.scss";
import { AuthProvider } from './assets/Pages/AuthContext'; 
import {CartProvider } from "./assets/Pages/CartContext";
import { ProductProvider } from "./assets/Pages/ProductContext";
import { UserProvider } from "./assets/Pages/UserContext";
function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
    AOS.refresh();
  });
  return (
<React.Fragment>
  <AuthProvider>
    <UserProvider> 
      <CartProvider>
        <ProductProvider>
          <Index />
        </ProductProvider>
      </CartProvider>
    </UserProvider>
  </AuthProvider>
</React.Fragment>


  );
}

export default App;
