import React from "react";
import { Container } from "reactstrap";
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper";
import "swiper/css/scrollbar";
import "swiper/css";

//Images
import SingleP from "../../assets/images/demos/portfolio-single-1-1000-958.jpg";
import SingleP2 from "../../assets/images/demos/portfolio-single-2-660-660.jpg";
import SingleP3 from "../../assets/images/demos/portfolio-single-3-1000-958.jpg";
import SingleP4 from "../../assets/images/demos/portfolio-single-4-660-660.jpg";
import SingleP5 from "../../assets/images/demos/portfolio-single-5-1000-958.jpg";
import SingleP6 from "../../assets/images/demos/portfolio-single-6-660-660.jpg";

const ProjectShowcase = () => {
  return (
    <React.Fragment>
      <div className="py-160 bg-dark shape-parent overflow-hidden">
        <div className="shape justify-content-end mt-n130">
          <svg
            className="mt-n160 me-n60"
            width="640"
            height="640"
            viewBox="0 0 640 640"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="320" cy="320" r="320" fill="#202020" />
          </svg>
        </div>
        <Container>
          <h2
            className="text-center text-white mt-n10 mb-100"
          >
            Projects Showcase
          </h2>
        </Container>
        <Swiper
          scrollbar={{
            hide: "true",
            el: ".swiper-scrollbar",
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          modules={[Scrollbar]}
          slidesPerView={"3"}
          centeredSlides={true}
          grabCursor={true}
          spaceBetween={70}
          className="mySwiper swiper swiper-dark swiper-container-horizontal align-items-center pb-40"
        >
          <div className="swiper-wrapper align-items-center">
            <SwiperSlide className="w-sm-auto">
              <a href="/portfolio-single-style-1">
                <img className="mw-100" width="500" src={SingleP} alt="" />
              </a>
            </SwiperSlide>
            <SwiperSlide className="w-sm-auto">
              <a href="/portfolio-single-style-2">
                <img className="mw-100" width="330" src={SingleP2} alt="" />
              </a>
            </SwiperSlide>
            <SwiperSlide className="w-sm-auto">
              <a href="/portfolio-single-style-3">
                <img className="mw-100" width="500" src={SingleP3} alt="" />
              </a>
            </SwiperSlide>
            <SwiperSlide className="w-sm-auto">
              <a href="/portfolio-single-style-4">
                <img className="mw-100" width="330" src={SingleP4} alt="" />
              </a>
            </SwiperSlide>
            <SwiperSlide className="w-sm-auto">
              <a href="/portfolio-single-style-5">
                <img className="mw-100" width="500" src={SingleP5} alt="" />
              </a>
            </SwiperSlide>
            <SwiperSlide className="w-sm-auto">
              <a href="/portfolio-single-style-6">
                <img className="mw-100" width="330" src={SingleP6} alt="" />
              </a>
            </SwiperSlide>
          </div>
          <div className="swiper-scrollbar"></div>
        </Swiper>
      </div>
    </React.Fragment>
  );
};

export default ProjectShowcase;