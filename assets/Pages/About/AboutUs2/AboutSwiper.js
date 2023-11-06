import React from "react";
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper";
import "swiper/css/scrollbar";
import "swiper/css";

import Slide1 from "../../../assets/images/about/about-us-2-slide-1-1000-958.jpg";
import Slide2 from "../../../assets/images/about/about-us-2-slide-2-660-660.jpg";
import Slide3 from "../../../assets/images/about/about-us-2-slide-3-1000-958.jpg";
import Slide4 from "../../../assets/images/about/about-us-2-slide-4-660-660.jpg";
import Slide5 from "../../../assets/images/about/about-us-2-slide-4-660-660.jpg";
import { Container } from "reactstrap";

const AboutSwiper = () => {
  return (
    <React.Fragment>
      <Swiper
        scrollbar={{
          el: ".swiper-scrollbar",
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[Scrollbar]}
        grabCursor={true}
        spaceBetween={65}
        // centeredSlides={true}
        slidesPerView={"3"}
        className="swiper swiper-dark overflow-hidden"
      >
        <Container>
          <div className="swiper-container overflow-initial">
            <div className="swiper-wrapper align-items-center">
              <SwiperSlide className="swiper-slide w-sm-auto">
                <img
                  className="mw-100 w-xs-100"
                  width="500"
                  src={Slide1}
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide className="swiper-slide w-sm-auto">
                <img
                  className="mw-100 w-xs-100"
                  width="330"
                  src={Slide2}
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide className="swiper-slide w-sm-auto">
                <img
                  className="mw-100 w-xs-100"
                  width="500"
                  src={Slide3}
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide className="swiper-slide w-sm-auto">
                <img
                  className="mw-100 w-xs-100"
                  width="330"
                  src={Slide4}
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide className="swiper-slide w-sm-auto">
                <img
                  className="mw-100 w-xs-100"
                  width="500"
                  src={Slide5}
                  alt=""
                />
              </SwiperSlide>
            </div>
          </div>
        </Container>
      </Swiper>
    </React.Fragment>
  );
};

export default AboutSwiper;
