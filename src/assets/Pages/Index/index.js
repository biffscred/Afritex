import React,{useContext,useEffect} from "react";
import Navbar from "../../Layouts/CommonLayouts/Navbar1";
import { ProductContext } from "../ProductContext";
import ThemebauMain from "./ThemebauMain";
import CarouselDark from "../CarouselDark";

// import Work from "./Work";
// import ProjectShowcase from "./ProjectShowcase";
// import InnerPages from "./InnerPages";
// import Features from "./Features";
// import ManuStyle from "./ManuStyle";
import Footer from "../../Layouts/CommonLayouts/Footer2";


const Index = () => {
  // Utiliser le contexte des produits
  const { products, loadProducts } = useContext(ProductContext);

  // Charger les produits au montage du composant
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  //meta title
  document.title = "Afritex ";
  return (
    <React.Fragment>
      <Navbar />
      <div className="content-wrap" id="content-wrap">
        <ThemebauMain />
        {/* {products && <CarouselDark products={products} />} */}


        <Footer />
        {/* <Work />
        <ProjectShowcase />
        <InnerPages />
        <ManuStyle />
        <Features /> */}
      </div>
    </React.Fragment>
  );
};

export default Index;
