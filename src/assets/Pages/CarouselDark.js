import React from "react";
import Navbar from "../Layouts/CommonLayouts/Navbar4";
import { NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation, Autoplay } from "swiper";
import Card from "./CarouselCard";
const CarouselDark = ({ categories }) => {
  // Meta title
  document.title = "Afritex | Produits";

  // URL de base pour les images - ajustez ceci selon votre environnement
  const baseUrl = process.env.PUBLIC_URL || 'http://localhost:3000';

  // Définir un objet contenant des tableaux d'images pour chaque catégorie
  const productImages = {
    'Tissus': ['Akwete.jpg', 'Alindi-Somalie.jpg', 'Alindi-Somalie2.jpg', 'Alindi-Somalie3.jpg', 'Ankara2.jpg', 'Tissu-Ankara.jpg'],
    'Accessoires': ['Echarpe-Bog-1.jpg', 'Housse-oreiller-Bog-2.jpg', 'Sac-Fait-Main-Bog-1.jpg', 'Tapis-XXL-Bog-14.jpg'],
    // Ajoutez des tableaux similaires pour d'autres catégories si nécessaire
  };

  // Combinez les images de toutes les catégories spécifiées dans un seul tableau
  let allImages = [];
  categories.forEach(category => {
    if (productImages[category]) {
      allImages = [...allImages, ...productImages[category].map(imageName => ({ category, imageName }))];
    }
  });

  return (
    <React.Fragment>
      <Navbar navClass="navbar-dark bg-dark" styleClass="2" />
      <div className="content-wrap bg-dark" id="content-wrap">
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          pagination={{
            clickable: true,
          }}
          spaceBetween={70}
          slidesPerView={2}
          navigation
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={true}
          // ... d'autres configurations Swiper si nécessaire ...
        >
          {allImages.length > 0 ? (
            allImages.map((item, index) => (
              <SwiperSlide key={index}>
                <Card 
            imageUrl={`${baseUrl}/images/product/${item.category}/${item.imageName}`}
            title={item.imageName} // Vous pouvez modifier pour inclure un titre dynamique si disponible
          />
          
              </SwiperSlide>
            ))
          ) : (
            <p>Aucun produit disponible</p>
          )}
        </Swiper>
      </div>
    </React.Fragment>
  );
};

export default CarouselDark;
