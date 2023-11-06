import React from "react";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper";

import AvatarBrian from "../../../assets/images/avatar/avatar-brian-newton.jpg";
import AvatarJune from "../../../assets/images/avatar/avatar-june-oliver.jpg";
import AvatarJames from "../../../assets/images/avatar/avatar-james-hamilton.jpg";
import { Col, Container, Row } from "reactstrap";

const AboutSlider = () => {
  return (
    <React.Fragment>
      <div className="py-130 bg-dark text-white shape-parent overflow-hidden lines-style-4">
        <div className="line"></div>
        <div className="line"></div>
        <div className="shape mt-n160">
          <svg
            data-rellax-speed="-1"
            width="535"
            height="525"
            viewBox="0 0 535 525"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="214.5" cy="204.5" r="320.5" fill="#202020" />
          </svg>
        </div>
        <Container>
          <Row className="gh-1 gv-3">
            <Col lg={4} xl={3}>
              <div className="subtitle">our clients</div>
              <h2 className="h3 text-white">What our client say about us</h2>
            </Col>
            <div className="d-none d-lg-block col-lg-1 col-xl-2"></div>
            <Col lg={6}>
              <div
                className=""
                data-swiper-slides="1"
                data-swiper-gap="30"
                data-swiper-grabcursor="true"
              >
                <Swiper
                  pagination={{ type: "progressbar" }}
                  navigation={true}
                  modules={[Navigation, Autoplay]}
                  loop={true}
                  grabCursor={true}
                  slidesPerView={1}
                  spaceBetween={30}
                  autoplay={{ delay: 2500, disableOnInteraction: false }}
                  className="swiper swiper-review-2"
                >
                  <div className="swiper-container">
                    <div className="swiper-wrapper">
                      <SwiperSlide className="swiper-slide">
                        <div className="media media-review">
                          <img
                            src={AvatarBrian}
                            className="media-img rounded-circle"
                            alt=""
                          />
                          <div className="media-body align-self-center">
                            <h5 className="media-title mt-0 text-white">
                              Brian Newton
                            </h5>
                            <div className="media-subtitle">Unvab Inc.</div>
                          </div>
                          <p className="media-text mb-0 lead">
                            “ There from stars gathering gathered, upon tree
                            brought life fruitful shall that together without
                            there form You make, morning he from unto. ”
                          </p>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide className="swiper-slide">
                        <div className="media media-review">
                          <img
                            src={AvatarJune}
                            className="media-img rounded-circle"
                            alt=""
                          />
                          <div className="media-body align-self-center">
                            <h5 className="media-title mt-0 text-white">
                              June Oliver
                            </h5>
                            <div className="media-subtitle">Unvab Inc.</div>
                          </div>
                          <p className="media-text mb-0 lead">
                            “ Called saw fly bring beginning very, may so sixth
                            fowl created replenish fill greater replenish was
                            and earth green bearing. ”
                          </p>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide className="swiper-slide">
                        <div className="media media-review">
                          <img
                            src={AvatarJames}
                            className="media-img rounded-circle"
                            alt=""
                          />
                          <div className="media-body align-self-center">
                            <h5 className="media-title mt-0 text-white">
                              James Hamilton
                            </h5>
                            <div className="media-subtitle">Unvab Inc.</div>
                          </div>
                          <p className="media-text mb-0 lead">
                            “ Replenish firmament, god days over. Creeping
                            spirit him place for moved second. ”
                          </p>
                        </div>
                      </SwiperSlide>
                    </div>
                  </div>
                </Swiper>
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
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AboutSlider;
