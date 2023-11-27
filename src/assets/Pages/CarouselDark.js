import React from "react";
import Navbar from "../Layouts/CommonLayouts/Navbar4";
import { NavLink } from "react-router-dom";
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation, Autoplay } from "swiper";

const CarouselDark = ({ products }) => {
  // Meta title
  document.title = "Afritex | Produits";

  // Vérification si products est défini et est un tableau
  const hasProducts = Array.isArray(products) && products.length > 0;

  return (
    <React.Fragment>
      <Navbar navClass="navbar-dark bg-dark" styleClass="2" />
      <div className="content-wrap bg-dark" id="content-wrap">
        <Swiper
          className="swiper text-white swiper-full swiper-full-horizontal swiper-portfolio-animejs"
          pagination={{
            el: "swiper-pagination",
            clickable: true,
          }}
          spaceBetween={70}
          slidesPerView={"2"}
          navigation={true}
          grabCursor={true}
          centeredSlides={true}
          modules={[Pagination, Navigation, Autoplay]}
          loop={true}
          autoplay={{ delay: 1500, disableOnInteraction: false }}
          breakpoints={{
            200: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 2,
            },
          }}
        >
          <div className="swiper-container">
            <div className="swiper-wrapper">
              {hasProducts ? (
                products.map(product => (
                  <SwiperSlide
                    key={product.id}
                    className="swiper-slide"
                    data-cursor-style="cursor-circle"
                    data-cursor-text="view"
                  >
                    <NavLink
                      className="card card-portfolio card-overlay card-image-sm card-bg-show text-white text-center"
                      to={`/product/${product.id}`}
                    >
                      <span className="card-img">
                        <img src={product.image} alt={product.name} />
                        <span
                          className="background-color"
                          style={{ backgroundColor: "rgba(14, 14, 14, .2)" }}
                        ></span>
                      </span>
                      <span className="card-img-overlay">
                        <span className="card-title h2">{product.name}</span>
                        <span className="card-category subtitle">{product.category}</span>
                      </span>
                    </NavLink>
                  </SwiperSlide>
                ))
              ) : (
                <p>Aucun produit disponible</p>
              )}
            </div>
          </div>
          <div className="swiper-button-wrapper container">
            {/* ... vos boutons de navigation Swiper ... */}
          </div>
          <div className="swiper-pagination"></div>
        </Swiper>
        <div id="footer"></div>
      </div>
    </React.Fragment>
  );
};

export default CarouselDark;
