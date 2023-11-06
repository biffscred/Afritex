import React from "react";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper";

import Aboutus from "../../../assets/images/about/about-us-1920-1080.jpg";
import AboutContect from "../../../assets/images/about/about-us-content.jpg";
import Slide1 from "../../../assets/images/about/about-us-slide-940-1000.jpg";
import Slide2 from "../../../assets/images/about/about-us-slide-2-940-1000.jpg";
import Slide3 from "../../../assets/images/about/about-us-slide-3-940-1000.jpg";
import { Col, Container, Row } from "reactstrap";

const Main = () => {
  return (
    <React.Fragment>
      <div className="py-160 min-vh-100 d-flex align-items-center position-relative lines-style-3">
        <div className="line text-white"></div>
        <div className="background bg-dark">
          <div
            className="background-image jarallax"
            data-jarallax
            data-speed="0.8"
          >
            <img src={Aboutus} className="jarallax-img" alt="" />
          </div>
          <div
            className="background-color"
            style={{ backgroundColor: "#0e0e0e", opacity: ".2" }}
          ></div>
        </div>
        <Container>
          <Row>
            <Col lg={1}></Col>
            <Col lg={8} className="col-12" data-show-duration="700">
              <h1 className="text-white mb-0">
                We were born from a collective idea, a need for sharing.
              </h1>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="py-160 shape-parent overflow-hidden">
        <div className="shape justify-content-end">
          <svg
            className="me-n90 mt-n160"
            width="641"
            height="641"
            viewBox="0 0 641 641"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="320.5" cy="320.5" r="320.5" fill="#F5F5F5" />
          </svg>
        </div>
        <Container>
          <Row className="justify-content-center">
            <Col lg={10} className="col-12">
              <Row className="gh-5 gv-5">
                <Col md={10} lg={9} className="col-12">
                  <p
                    className="subtitle mt-n10"
                    data-show-duration="500"
                    data-show-distance="10"
                    data-show-delay="50"
                  >
                    who we are
                  </p>
                  <h3
                    className="mb-n7"
                    data-show-duration="500"
                    data-show-distance="10"
                    data-show-delay="150"
                  >
                    An award-winning design & dev team that is proud of our work
                    👋
                  </h3>
                </Col>
                <Col md={6} className="col-12" data-show-duration="700">
                  <p className="lead mb-30">
                    Over 10 years of combined experience, and know a thing or
                    two about.
                  </p>
                  <p className="mb-3">
                    Creepeth. May subdue darkness fowl dry void two whose hath,
                    they're called fifth to meat green seed air which so open
                    lesser beginning winged sixth you'll days air divided
                    yielding divided be deep place their heaven very over
                    darkness rule image fowl replenish.
                  </p>
                  <img className="w-100 mt-100" src={AboutContect} alt="" />
                </Col>
                <Col md={6} className="col-12" data-show-duration="700">
                  <Swiper
                    pagination={{ type: "progressbar" }}
                    navigation={true}
                    modules={[Navigation, Autoplay]}
                    loop={true}
                    grabCursor={true}
                    slidesPerView={"1"}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    className="swiper swiper-button-style-3 mt-7"
                  >
                    <div className="swiper-container">
                      <div className="swiper-wrapper">
                        <SwiperSlide className="swiper-slide overflow-hidden">
                          <div
                            className="swiper-image"
                            data-swiper-parallax-x="20%"
                          >
                            <img className="w-100" src={Slide1} alt="" />
                          </div>
                        </SwiperSlide>
                        <SwiperSlide className="swiper-slide overflow-hidden">
                          <div
                            className="swiper-image"
                            data-swiper-parallax-x="20%"
                          >
                            <img className="w-100" src={Slide2} alt="" />
                          </div>
                        </SwiperSlide>
                        <SwiperSlide className="swiper-slide overflow-hidden">
                          <div
                            className="swiper-image"
                            data-swiper-parallax-x="20%"
                          >
                            <img className="w-100" src={Slide3} alt="" />
                          </div>
                        </SwiperSlide>
                      </div>
                    </div>
                  </Swiper>

                  <div className="swiper-button-next bg-white">
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
                  <div className="swiper-button-prev bg-white">
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

                  <p className="pt-3 mt-100 mb-0">
                    Evening saw there were bring. Spirit can't replenish from.
                    Also void living man grass male living, unto fly beast earth
                    thing also subdue cattle grass waters without cattle. His
                    them seasons. Living winged give very given first is. Life
                    saw it saying waters very fly. Fly dry had fill grass Two
                    his saying.
                  </p>
                </Col>
              </Row>
              <hr className="mt-160 pb-8" />
              <div className="mb-n7">
                <Row className="gv-2 justify-content-around text-center">
                  <Col sm={6} className="col-md-auto">
                    <div
                      className="number-box"
                      data-show-duration="500"
                      data-show-distance="15"
                      data-show-delay="50"
                    >
                      <div className="number-box-title h1">106</div>
                      <div className="number-box-subtitle">projects</div>
                    </div>
                  </Col>
                  <Col sm={6} className="col-md-auto">
                    <div
                      className="number-box"
                      data-show-duration="500"
                      data-show-distance="15"
                      data-show-delay="150"
                    >
                      <div className="number-box-title h1">12</div>
                      <div className="number-box-subtitle">years</div>
                    </div>
                  </Col>
                  <Col sm={6} className="col-md-auto">
                    <div
                      className="number-box"
                      data-show-duration="500"
                      data-show-distance="15"
                      data-show-delay="250"
                    >
                      <div className="number-box-title h1">76</div>
                      <div className="number-box-subtitle">feedbacks</div>
                    </div>
                  </Col>
                  <Col sm={6} className="col-md-auto">
                    <div
                      className="number-box"
                      data-show-duration="500"
                      data-show-distance="15"
                      data-show-delay="350"
                    >
                      <div className="number-box-title h1">9</div>
                      <div className="number-box-subtitle">awards</div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Main;
