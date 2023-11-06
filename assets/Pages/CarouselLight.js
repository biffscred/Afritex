import React from "react";
import Navbar from "../Layouts/CommonLayouts/Navbar4";
import { NavLink } from "react-router-dom";
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation, Autoplay } from "swiper";

import Cool from "../assets/images/portfolio/cool-photography-1920-1080.jpg";
import Colorib from "../assets/images/portfolio/colibri-project-1920-1080.jpg";
import Bag from "../assets/images/portfolio/bag-design-1920-1080.jpg";
import Dog from "../assets/images/portfolio/dog-photoset-1920-1080.jpg";
import Breakfast from "../assets/images/portfolio/breakfast-1920-1080.jpg";
const CarouselLight = () => {
  //meta title
  document.title = "Themebau | Carousel Light";
  return (
    <React.Fragment>
      <Navbar styleClass="3" navClass="" />
      <div className="content-wrap" id="content-wrap">
        <Swiper
          className="swiper text-white swiper-full swiper-full-horizontal swiper-portfolio-animejs"
          pagination={{
            el: "swiper-pagination",
            clickable: true,
            // dynamicBullets: true,
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
              <SwiperSlide
                className="swiper-slide"
                data-cursor-style="cursor-circle"
                data-cursor-text="view"
              >
                <NavLink
                  className="card card-portfolio card-overlay card-image-sm card-bg-show text-white text-center"
                  to="/portfolio-single-style-1"
                >
                  <span className="card-img">
                    <img src={Cool} alt="" />
                    <span
                      className="background-color"
                      style={{ backgroundColor: "rgba(14, 14, 14, .2)" }}
                    ></span>
                  </span>
                  <span className="card-img-overlay">
                    <span className="card-title h2">Cool Photography</span>
                    <span className="card-category subtitle">photography</span>
                  </span>
                </NavLink>
              </SwiperSlide>
              <SwiperSlide
                className="swiper-slide"
                data-cursor-style="cursor-circle"
                data-cursor-text="view"
              >
                <NavLink
                  className="card card-portfolio card-overlay card-image-sm card-bg-show text-white text-center"
                  to="/portfolio-single-style-1"
                >
                  <span className="card-img">
                    <img src={Colorib} alt="" />
                    <span
                      className="background-color"
                      style={{ backgroundColor: "rgba(14, 14, 14, .2)" }}
                    ></span>
                  </span>
                  <span className="card-img-overlay">
                    <span className="card-title h2">Colibri Project</span>
                    <span className="card-category subtitle">marketing</span>
                  </span>
                </NavLink>
              </SwiperSlide>
              <SwiperSlide
                className="swiper-slide"
                data-cursor-style="cursor-circle"
                data-cursor-text="view"
              >
                <NavLink
                  className="card card-portfolio card-overlay card-image-sm card-bg-show text-white text-center"
                  to="/portfolio-single-style-1"
                >
                  <span className="card-img">
                    <img src={Bag} alt="" />
                    <span
                      className="background-color"
                      style={{ backgroundColor: "rgba(14, 14, 14, .2)" }}
                    ></span>
                  </span>
                  <span className="card-img-overlay">
                    <span className="card-title h2">Bag Design</span>
                    <span className="card-category subtitle">branding</span>
                  </span>
                </NavLink>
              </SwiperSlide>
              <SwiperSlide
                className="swiper-slide"
                data-cursor-style="cursor-circle"
                data-cursor-text="view"
              >
                <NavLink
                  className="card card-portfolio card-overlay card-image-sm card-bg-show text-white text-center"
                  to="/portfolio-single-style-3"
                >
                  <span className="card-img">
                    <img src={Dog} alt="" />
                    <span
                      className="background-color"
                      style={{ backgroundColor: "rgba(14, 14, 14, .2)" }}
                    ></span>
                  </span>
                  <span className="card-img-overlay">
                    <span className="card-title h2">Dog Photoset</span>
                    <span className="card-category subtitle">photography</span>
                  </span>
                </NavLink>
              </SwiperSlide>
              <SwiperSlide
                className="swiper-slide"
                data-cursor-style="cursor-circle"
                data-cursor-text="view"
              >
                <NavLink
                  className="card card-portfolio card-overlay card-image-sm card-bg-show text-white text-center"
                  to="/portfolio-single-style-5"
                >
                  <span className="card-img">
                    <img src={Breakfast} alt="" />
                    <span
                      className="background-color"
                      style={{ backgroundColor: "rgba(14, 14, 14, .2)" }}
                    ></span>
                  </span>
                  <span className="card-img-overlay">
                    <span className="card-title h2">Breakfast</span>
                    <span className="card-category subtitle">branding</span>
                  </span>
                </NavLink>
              </SwiperSlide>
            </div>
          </div>
          <div className="swiper-button-wrapper container">
            <div className="swiper-button-prev">
              <svg
                width="26"
                height="11"
                viewBox="0 0 26 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.5 1L1 5.5L5.5 10"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 5.5H1"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="swiper-button-next">
              <svg
                width="26"
                height="11"
                viewBox="0 0 26 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.5 1L25 5.5L20.5 10"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 5.5H25"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="swiper-pagination"></div>
        </Swiper>
      </div>
    </React.Fragment>
  );
};

export default CarouselLight;
