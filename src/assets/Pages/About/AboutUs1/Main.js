import React from "react";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper";

import Aboutus from "../../../images/about/groupe-amis.png";
import AboutContect from "../../../images/about/rouleau-coton.png";
import Slide1 from "../../../images/about/styliste.png";
import Slide2 from "../../../images/about/créations-tissus.png";
import Slide3 from "../../../images/about/tisserands.png";
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
Un besoin de partage, et une passion pour les textiles africains.
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
                   Qui nous sommes
                  </p>
                  <h3
                    className="mb-n7"
                    data-show-duration="500"
                    data-show-distance="10"
                    data-show-delay="150"
                  >
                    Une équipe de passionnés du textile africain, engagée dans la création et le développement de produits uniques.
                    👋
                  </h3>
                </Col>
                <Col md={6} className="col-12" data-show-duration="700">
                  <p className="lead mb-30">
                  Chez Afritex, nous sommes animés par la vision d'un avenir où les tissus africains et les produits qui en découlent auront une place de choix sur la scène internationale. Notre équipe est prête à relever les défis à venir pour continuer à promouvoir la beauté et la diversité des textiles africains, en restant à la pointe de la conception de sites web et d'applications mobiles.".
                  </p>
                  <p className="mb-3">
                  Notre passion pour les textiles africains authentiques nous pousse à concevoir des produits uniques qui célèbrent la richesse culturelle du continen
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
                  Tout comme un oiseau prend son envol, nous donnons vie à nos produits avec énergie et enthousiasme. Chaque saison est une opportunité pour nous de vous offrir des textiles uniques et inspirants. Notre objectif est de donner des ailes à la mode africaine, en comblant le vide de l'innovation et en créant des pièces exceptionnelles.
                  </p>
                </Col>
              </Row>
              <hr className="mt-160 pb-8" />
              
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Main;
