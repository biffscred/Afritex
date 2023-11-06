import React from "react";
import { Container, Row, Col } from "reactstrap";
import { NavLink } from "react-router-dom";
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import "swiper/css/scrollbar";

import { Scrollbar, Pagination, Autoplay } from "swiper";

import Service1 from "../../assets/images/service/service-1-940-580.jpg";
import Service2 from "../../assets/images/service/service-3-540-500.jpg";
import Service3 from "../../assets/images/service/service-2-280-280.jpg";

const Service = () => {
  return (
    <React.Fragment>
      <div className="pt-160 pb-130 mb-6">
        <Container>
          <Row className="gh-1 gv-1 justify-content-xl-end">
            <Col lg={5} data-aos="fade-up">
              <img className="w-100" src={Service1} alt="" />
            </Col>
            <div className="d-none d-lg-block col-1 order-lg-1"></div>
            <Col lg={6} xl={4} className="align-self-center order-11 order-lg-2">
              <h2 className="h3 mt-30 mt-lg-0 mt-xl-0 mb-0">
                We create everything digital, printable and analytical 🔥
              </h2>
            </Col>
            <div className="d-none d-xl-block col-2 order-lg-3"></div>
            <div
              className="d-none d-lg-block col-lg-2 col-xl-auto order-10 order-lg-4"
              data-aos="fade-up"
            >
              <img className="mw-100" width="140" src={Service3} alt="" />
            </div>
            <div
              className="d-none d-lg-block col-lg-3 order-9 order-lg-5"
              data-aos="fade-up"
            >
              <img className="w-100" src={Service2} alt="" />
            </div>
            <div className="d-none d-lg-block col-1 order-lg-6"></div>
            <Col lg={6} xl={5} className="mt-xl-n60 order-12 order-lg-7">
              <p>
                Won't seasons, appear days them stars replenish divided. All
                second forth. Him place was seas man and gathering creepeth
                called fly. Them sea place lights, midst bearing fourth above.
              </p>
              <NavLink to="/services" className="btn btn-dark btn-with-ball">
                read more
                <span className="btn-ball" style={{ transform: "translateY(0px)" }}></span>
              </NavLink>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="pb-160">
        <Container>
          <div className="position-relative">
            <h2 className="display-4 mb-60 pb-30 text-center">Values</h2>
            <Swiper
              scrollbar={{
                el: ".swiper-scrollbar",
                dragSize: 50,
                clickable: true,
                dynamicBullets: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  // spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  // spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 3,
                  // spaceBetween: 50,
                },
              }}
              modules={[Scrollbar]}
              grabCursor={true}
              className="swiper mt-n4 pb-30"
            >
              <div className="swiper-container">
                <div className="swiper-wrapper">
                  <SwiperSlide className="swiper-slide">
                    <div className="feature">
                      <div className="feature-icon">
                        <svg
                          width="71"
                          height="70"
                          viewBox="0 0 71 70"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.18911 17.7887L35 0.57735L64.8109 17.7887V52.2113L35 69.4226L5.18911 52.2113V17.7887Z"
                            stroke="currentColor"
                          />
                          <path
                            d="M18.2867 65.3084L1.0754 35.4976L18.2867 5.68667H52.7094L69.9207 35.4976L52.7094 65.3084H18.2867Z"
                            stroke="currentColor"
                          />
                        </svg>
                        <svg
                          width="18"
                          height="25"
                          viewBox="0 0 18 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.3323 14.4715C15.5391 13.1686 17 10.8995 17 8.31818C17 4.27646 13.4183 1 9 1C4.58172 1 1 4.27646 1 8.31818C1 12.3599 4.58172 15.6364 9 15.6364C10.5965 15.6364 12.0838 15.2086 13.3323 14.4715ZM13.3323 14.4715L14.7143 24L9 20.8636L3.28571 24L4.66857 14.4759M13.3323 14.4715L13.3314 14.4655"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="feature-body">
                        <h4 className="feature-title">Excellent Quality</h4>
                        <p className="feature-text">
                          Forth forth moveth shall i unto midst tree, fruit great
                          subdue every be so fowl.
                        </p>
                        <NavLink to="/about-us" className="btn btn-clean">
                          read more
                          <svg
                            className="icon-arrow icon-arrow-right"
                            width="25"
                            height="10"
                            viewBox="0 0 25 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M20 1L24 5L20 9"
                              stroke="currentColor"
                              strokeWidth="1.3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M7 5L24 5"
                              stroke="currentColor"
                              strokeWidth="1.3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </NavLink>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div className="feature">
                      <div className="feature-icon">
                        <svg
                          width="71"
                          height="70"
                          viewBox="0 0 71 70"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.18911 17.7887L35 0.57735L64.8109 17.7887V52.2113L35 69.4226L5.18911 52.2113V17.7887Z"
                            stroke="currentColor"
                          />
                          <path
                            d="M18.2867 65.3084L1.0754 35.4976L18.2867 5.68667H52.7094L69.9207 35.4976L52.7094 65.3084H18.2867Z"
                            stroke="currentColor"
                          />
                        </svg>
                        <svg
                          width="23"
                          height="23"
                          viewBox="0 0 23 23"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 18.5V11.5C1 8.71523 2.10625 6.04451 4.07538 4.07538C6.04451 2.10625 8.71523 1 11.5 1C14.2848 1 16.9555 2.10625 18.9246 4.07538C20.8938 6.04451 22 8.71523 22 11.5V18.5M22 19.6667C22 20.2855 21.7542 20.879 21.3166 21.3166C20.879 21.7542 20.2855 22 19.6667 22H18.5C17.8812 22 17.2877 21.7542 16.8501 21.3166C16.4125 20.879 16.1667 20.2855 16.1667 19.6667V16.1667C16.1667 15.5478 16.4125 14.9543 16.8501 14.5168C17.2877 14.0792 17.8812 13.8333 18.5 13.8333H22V19.6667ZM1 19.6667C1 20.2855 1.24583 20.879 1.68342 21.3166C2.121 21.7542 2.71449 22 3.33333 22H4.5C5.11884 22 5.71233 21.7542 6.14992 21.3166C6.5875 20.879 6.83333 20.2855 6.83333 19.6667V16.1667C6.83333 15.5478 6.5875 14.9543 6.14992 14.5168C5.71233 14.0792 5.11884 13.8333 4.5 13.8333H1V19.6667Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="feature-body">
                        <h4 className="feature-title">Customer Service</h4>
                        <p className="feature-text">
                          Be saying moveth spirit fruitful called set evening fly
                          give shall moveth lesser very.
                        </p>
                        <NavLink to="/about-us" className="btn btn-clean">
                          read more
                          <svg
                            className="icon-arrow icon-arrow-right"
                            width="25"
                            height="10"
                            viewBox="0 0 25 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M20 1L24 5L20 9"
                              stroke="currentColor"
                              strokeWidth="1.3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M7 5L24 5"
                              stroke="currentColor"
                              strokeWidth="1.3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </NavLink>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div className="feature">
                      <div className="feature-icon">
                        <svg
                          width="71"
                          height="70"
                          viewBox="0 0 71 70"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.18911 17.7887L35 0.57735L64.8109 17.7887V52.2113L35 69.4226L5.18911 52.2113V17.7887Z"
                            stroke="currentColor"
                          />
                          <path
                            d="M18.2867 65.3084L1.0754 35.4976L18.2867 5.68667H52.7094L69.9207 35.4976L52.7094 65.3084H18.2867Z"
                            stroke="currentColor"
                          />
                        </svg>
                        <svg
                          width="24"
                          height="21"
                          viewBox="0 0 24 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21.3036 2.67974C20.766 2.14721 20.1278 1.72477 19.4253 1.43656C18.7228 1.14834 17.9699 1 17.2095 1C16.4491 1 15.6961 1.14834 14.9936 1.43656C14.2912 1.72477 13.6529 2.14721 13.1153 2.67974L11.9997 3.7844L10.8841 2.67974C9.79827 1.60458 8.32556 1.00056 6.78997 1.00056C5.25437 1.00056 3.78167 1.60458 2.69584 2.67974C1.61001 3.7549 1 5.21313 1 6.73364C1 8.25415 1.61001 9.71238 2.69584 10.7875L11.9997 20L21.3036 10.7875C21.8414 10.2553 22.268 9.62328 22.5591 8.9277C22.8502 8.23212 23 7.48657 23 6.73364C23 5.98071 22.8502 5.23516 22.5591 4.53958C22.268 3.84399 21.8414 3.21201 21.3036 2.67974Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="feature-body">
                        <h4 className="feature-title">The best People</h4>
                        <p className="feature-text">
                          Heaven to bearing that yielding and man. Brought over
                          shall fill over blessed, he appear.
                        </p>
                        <NavLink to="/about-us" className="btn btn-clean">
                          read more
                          <svg
                            className="icon-arrow icon-arrow-right"
                            width="25"
                            height="10"
                            viewBox="0 0 25 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M20 1L24 5L20 9"
                              stroke="currentColor"
                              strokeWidth="1.3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M7 5L24 5"
                              stroke="currentColor"
                              strokeWidth="1.3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </NavLink>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div className="feature">
                      <div className="feature-icon">
                        <svg
                          width="71"
                          height="70"
                          viewBox="0 0 71 70"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.18911 17.7887L35 0.57735L64.8109 17.7887V52.2113L35 69.4226L5.18911 52.2113V17.7887Z"
                            stroke="currentColor"
                          />
                          <path
                            d="M18.2867 65.3084L1.0754 35.4976L18.2867 5.68667H52.7094L69.9207 35.4976L52.7094 65.3084H18.2867Z"
                            stroke="currentColor"
                          />
                        </svg>
                        <svg
                          width="26"
                          height="26"
                          viewBox="0 0 26 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13 1V3.18182M13 22.8182V25M4.51273 4.51273L6.06182 6.06182M19.9382 19.9382L21.4873 21.4873M1 13H3.18182M22.8182 13H25M4.51273 21.4873L6.06182 19.9382M19.9382 6.06182L21.4873 4.51273M18.4545 13C18.4545 16.0125 16.0125 18.4545 13 18.4545C9.98754 18.4545 7.54545 16.0125 7.54545 13C7.54545 9.98754 9.98754 7.54545 13 7.54545C16.0125 7.54545 18.4545 9.98754 18.4545 13Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="feature-body">
                        <h4 className="feature-title">Creative Ideas</h4>
                        <p className="feature-text">
                          Let fly over give, tree i second years two gathering
                          wherein itself called for them.
                        </p>
                        <NavLink to="/about-us" className="btn btn-clean">
                          read more
                          <svg
                            className="icon-arrow icon-arrow-right"
                            width="25"
                            height="10"
                            viewBox="0 0 25 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M20 1L24 5L20 9"
                              stroke="currentColor"
                              strokeWidth="1.3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M7 5L24 5"
                              stroke="currentColor"
                              strokeWidth="1.3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </NavLink>
                      </div>
                    </div>
                  </SwiperSlide>
                </div>
              </div>
            </Swiper>
            <div className="swiper-scrollbar mt-3"></div>
          </div>
        </Container>
      </div>

      <div className="pt-130 pb-160 bg-dark shape-parent overflow-hidden lines-style-1">
        <div className="line text-white"></div>
        <div className="line text-white"></div>
        <div className="shape align-items-end justify-content-center">
          <svg
            data-rellax-speed="1"
            className="mb-n160"
            width="641"
            height="641"
            viewBox="0 0 641 641"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="320.5" cy="320.5" r="320.5" fill="#202020" />
          </svg>
        </div>
        <Swiper
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"1"}
          className="swiper swiper-reviews text-white text-center"
          modules={[Pagination, Autoplay]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop={true}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
            dynamicBullets: true,
          }}
        >
          <div className="swiper-container">
            <div className="swiper-wrapper">
              <SwiperSlide className="swiper-slide">
                <div className="review container-fluid">
                  <div className="review-icon">
                    <svg
                      width="38"
                      height="24"
                      viewBox="0 0 38 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 24L10.1466 0H18.801L13.4293 24H0ZM19.199 24L29.3455 0H38L32.5288 24H19.199Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                  <div className="review-text">
                    <p className="mb-0">
                      “ There from stars gathering gathered, upon tree brought
                      life fruitful shall that together without there form You
                      make, morning he from unto. ”
                    </p>
                  </div>
                  <div className="review-author">Brian Newton, Unvab Inc.</div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div className="review container-fluid">
                  <div className="review-icon">
                    <svg
                      width="38"
                      height="24"
                      viewBox="0 0 38 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 24L10.1466 0H18.801L13.4293 24H0ZM19.199 24L29.3455 0H38L32.5288 24H19.199Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                  <div className="review-text">
                    <p className="mb-0">
                      “ Called saw fly bring beginning very, may so sixth fowl
                      created replenish fill greater replenish was and earth
                      green bearing. ”
                    </p>
                  </div>
                  <div className="review-author">June Oliver, Unvab Inc.</div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div className="review container-fluid">
                  <div className="review-icon">
                    <svg
                      width="38"
                      height="24"
                      viewBox="0 0 38 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 24L10.1466 0H18.801L13.4293 24H0ZM19.199 24L29.3455 0H38L32.5288 24H19.199Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                  <div className="review-text">
                    <p className="mb-0">
                      “ Replenish firmament, god days over. Creeping spirit him
                      place for moved second. ”
                    </p>
                  </div>
                  <div className="review-author">
                    James Hamilton, Unvab Inc.
                  </div>
                </div>
              </SwiperSlide>
            </div>
          </div>
          <div className="swiper-pagination"></div>
        </Swiper>
      </div>
    </React.Fragment>
  );
};

export default Service;
