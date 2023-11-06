import React from "react";
import { NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation, Autoplay } from "swiper";

import Colorib from "../../assets/images/portfolio/colibri-creative-1920-1080.jpg";
import Happy from "../../assets/images/portfolio/happy-moments-1920-1080.jpg";
import Portfolio from "../../assets/images/portfolio/luxury-car-1920-1080.jpg";
const Slider = () => {
  return (
    <React.Fragment>
      <div className="banner banner-dark shape-parent">
        <div className="shape align-items-end mb-n160">
          <svg
            className="mb-n160"
            data-rellax-speed="-1"
            width="518"
            height="641"
            viewBox="0 0 518 641"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="197.5" cy="320.5" r="320.5" fill="#F5F5F5" />
          </svg>
        </div>
        <Swiper
          className="swiper swiper-portfolio swiper-portfolio-banner container text-white"
          modules={[Navigation, Pagination, Autoplay]}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          navigation={true}
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          grabCursor={true}
        >
          <div
            className="swiper-container"
            data-cursor-style="cursor-circle"
            data-cursor-text="view"
            style={{ backgroundColor: "#fff" }}
          >
            <div className="swiper-wrapper">
              <SwiperSlide>
                <NavLink
                  className="card card-portfolio card-overlay card-image-sm card-portfolio-banner text-white"
                  to="/portfolio-single-style-1"
                >
                  <span
                    className="card-img swiper-image"
                    data-swiper-parallax-x="20%"
                  >
                    <img src={Colorib} alt="" />
                    <span
                      className="background-color"
                      style={{ backgroundColor: "rgba(14, 14, 14, .2)" }}
                    ></span>
                  </span>
                  <span className="card-img-overlay">
                    <span className="card-title h1">
                      <span className="card-title-decoration"></span>Colibri
                      Creative Project
                    </span>
                  </span>
                </NavLink>
              </SwiperSlide>
              <SwiperSlide>
                <NavLink
                  className="card card-portfolio card-overlay card-image-sm card-portfolio-banner text-white"
                  to="/portfolio-single-style-2"
                >
                  <span
                    className="card-img swiper-image"
                    data-swiper-parallax-x="20%"
                  >
                    <img src={Happy} alt="" />
                    <span
                      className="background-color"
                      style={{ backgroundColor: "rgba(14, 14, 14, .2)" }}
                    ></span>
                  </span>
                  <span className="card-img-overlay">
                    <span className="card-title h1">
                      <span className="card-title-decoration"></span>Happy
                      Moments Photoset
                    </span>
                  </span>
                </NavLink>
              </SwiperSlide>
              <SwiperSlide>
                <NavLink
                  className="card card-portfolio card-overlay card-image-sm card-portfolio-banner text-white"
                  to="/portfolio-single-style-3"
                >
                  <span
                    className="card-img swiper-image"
                    data-swiper-parallax-x="20%"
                  >
                    <img src={Portfolio} alt="" />
                    <span
                      className="background-color"
                      style={{ backgroundColor: "rgba(14, 14, 14, .2)" }}
                    ></span>
                  </span>
                  <span className="card-img-overlay">
                    <span className="card-title h1">
                      <span className="card-title-decoration"></span>Luxury Car
                      Website
                    </span>
                  </span>
                </NavLink>
              </SwiperSlide>
            </div>
          </div>

          <div className="swiper-button-prev d-none d-sm-flex">
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
          <div className="swiper-button-next d-none d-sm-flex">
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
          <div className="swiper-pagination"></div>
        </Swiper>
      </div>
    </React.Fragment>
  );
};

export default Slider;
