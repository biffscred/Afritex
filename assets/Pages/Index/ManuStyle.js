import React from "react";
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper";
import "swiper/css/scrollbar";
import "swiper/css";

//Images
import ClassicMenu from "../../assets/images/demos/classic-menu-740-362.jpg";
import WhiteLeftMenu from "../../assets/images/demos/white-left-menu-740-362.jpg";
import DarkCenterMenu from "../../assets/images/demos/dark-center-menu-740-362.jpg";
import LeftMenu from "../../assets/images/demos/left-menu-740-362.jpg";
import { Container } from "reactstrap";
import { NavLink } from "react-router-dom";

const ManuStyle = () => {
  return (
    <React.Fragment>
      <div className="py-160 bg-dark text-center">
        <Container>
          <h2 className="mt-n10 text-white mb-70 " data-aos="fade-up">
            Menu Styles
          </h2>
          <Swiper
            scrollbar={{
              el: ".swiper-scrollbar",
              clickable: true,
            }}
            spaceBetween={20}
            slidesPerView={"3"}
            modules={[Scrollbar]}
            grabCursor={true}
            className="swiper swiper-dark swiper-container-horizontal pb-40"
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
                slidesPerView: 3,
              },
            }}
          >
            <div className="swiper-wrapper pt-20">
              <SwiperSlide className="swiper-slide">
                <NavLink to="/home" className="card card-demo text-white">
                  <span className="card-img">
                    <img src={ClassicMenu} alt="" />
                  </span>
                  <span className="card-body">
                    <span className="card-title h5">Classic Menu</span>
                  </span>
                </NavLink>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <NavLink
                  to="/left-menu"
                  className="card card-demo text-white"
                >
                  <span className="card-img">
                    <img src={WhiteLeftMenu} alt="" />
                  </span>
                  <span className="card-body">
                    <span className="card-title h5">White Left Menu</span>
                  </span>
                </NavLink>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <NavLink
                  to="/creative-agency"
                  className="card card-demo text-white"
                >
                  <span className="card-img">
                    <img src={DarkCenterMenu} alt="" />
                  </span>
                  <span className="card-body">
                    <span className="card-title h5">Dark Center Menu</span>
                  </span>
                </NavLink>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <NavLink
                  to="/left-menu"
                  className="card card-demo text-white"
                >
                  <span className="card-img">
                    <img src={LeftMenu} alt="" />
                  </span>
                  <span className="card-body">
                    <span className="card-title h5">Left Menu</span>
                  </span>
                </NavLink>
              </SwiperSlide>
            </div>
            <div className="swiper-scrollbar"></div>
          </Swiper>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ManuStyle;
