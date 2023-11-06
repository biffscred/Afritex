import React, { useState } from "react";
import Lightbox from "react-image-lightbox";
import Navbar from "../../../Layouts/CommonLayouts/Navbar3";
import Footer from "../../../Layouts/CommonLayouts/Footer2";
import { NavLink } from "react-router-dom";
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation, Autoplay } from "swiper";

import Banner from "../../../assets/images/single-portfolio/style-5-1-1920-1080.jpg";
import img1 from "../../../assets/images/single-portfolio/style-5-2-1540-900.jpg";
import img2 from "../../../assets/images/single-portfolio/style-5-3-1540-900.jpg";
import img3 from "../../../assets/images/single-portfolio/style-5-4-1540-900.jpg";
import { Col, Container, Row } from "reactstrap";
const Style5 = () => {
  //meta title
  document.title = "Themebau | Single Work 5";
  const images = [img1, img2, img3];
  const [photoIndex, setphotoIndex] = useState(0);
  const [isGallery, setisGallery] = useState(false);
  return (
    <React.Fragment>
      <div>
        <Navbar navClass="navbar-dark navbar-fixed" />

        {isGallery ? (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            enableZoom={true}
            onCloseRequest={() => {
              setisGallery(false);
            }}
            onMovePrevRequest={() => {
              setphotoIndex((photoIndex + images.length - 1) % images.length);
            }}
            onMoveNextRequest={() => {
              setphotoIndex((photoIndex + 1) % images.length);
            }}
          />
        ) : null}

        <div className="content-wrap" id="content-wrap">
          <div className="py-160 min-vh-100 d-flex align-items-center position-relative">
            <div className="background">
              <div
                className="background-image jarallax"
                data-jarallax
                data-speed="0.8"
              >
                <img src={Banner} className="jarallax-img" alt="" />
              </div>
              <div
                className="background-color"
                style={{ backgroundColor: "rgb(14, 14, 14, .2)" }}
              ></div>
            </div>
            <Container className="text-center">
              <h1 className="text-white mb-0" data-aos="fade-up">
                Creative Interior
              </h1>
            </Container>
          </div>
          <div className="pt-160 shape-parent overflow-hidden">
            <div className="shape justify-content-end mt-n160">
              <svg
                className="mt-n160"
                data-rellax-speed="-1"
                width="504"
                height="641"
                viewBox="0 0 504 641"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="320.5" cy="320.5" r="320.5" fill="#F5F5F5" />
              </svg>
            </div>
            <Container>
              <Row className="gv-3 justify-content-center">
                <Col lg={7} className="col-12 text-center">
                  <h2 className="h3 mb-30 pb-10 mt-n10" data-aos="fade-up">
                    About project
                  </h2>
                  <p className="mb-0" data-aos="fade-up">
                    Wherein herb kind creepeth male living life be image.
                    They're it morning day. Isn't fruit of every day. Bearing
                    our third that night kind. Make rule midst under bring good
                    dry moving. Yielding god wherein heaven deep.
                  </p>
                </Col>
                <Col lg={10} className="col-12" data-aos="fade-up">
                  <hr className="mt-0 mb-30" />
                  <Row className="justify-content-around gh-1">
                    <Col className="col-auto mb-8">
                      <span className="fw-medium me-8">Date:</span> June 10,
                      2020
                    </Col>
                    <Col className="col-auto mb-8">
                      <span className="fw-medium me-8">Category:</span> Branding
                    </Col>
                    <Col className="col-auto mb-8">
                      <span className="fw-medium me-8">Client:</span> Brian
                      Newton
                    </Col>
                    <Col className="col-auto mb-8">
                      <span className="fw-medium">Share:</span>
                      <ul className="nav nav-gap-sm d-inline-flex align-items-center ms-4">
                        <li className="nav-item">
                          <NavLink
                            to="/https://facebook.com/runwebrun"
                            className="nav-link"
                          >
                            <svg
                              width="6"
                              height="15"
                              viewBox="0 0 10 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8.17421 3.65234H9.99996V0.154687C9.68557 0.107422 8.60224 0 7.34088 0C4.70831 0 2.90529 1.82188 2.90529 5.16914V8.25H0V12.1602H2.90529V22H6.46588V12.1602H9.25375L9.69693 8.25H6.46588V5.55586C6.46588 4.42578 6.7424 3.65234 8.17421 3.65234Z"
                                fill="currentColor"
                              />
                            </svg>
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink
                            to="/https://twitter.com/runwebrun"
                            className="nav-link"
                          >
                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 25 21"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M22.0706 5.51356C22.086 5.73504 22.086 5.95656 22.086 6.17804C22.086 12.9334 17.0783 20.7172 7.92575 20.7172C5.10601 20.7172 2.48661 19.8787 0.283203 18.4232C0.683835 18.4707 1.069 18.4865 1.48505 18.4865C3.81167 18.4865 5.95347 17.6797 7.6638 16.3033C5.47581 16.2558 3.64221 14.7845 3.01046 12.7594C3.31865 12.8069 3.6268 12.8385 3.9504 12.8385C4.39723 12.8385 4.84411 12.7752 5.2601 12.6645C2.97968 12.1898 1.2693 10.1332 1.2693 7.64935V7.58609C1.93183 7.96579 2.70231 8.20309 3.5189 8.2347C2.17837 7.31709 1.30013 5.75086 1.30013 3.97894C1.30013 3.02972 1.54661 2.15959 1.97807 1.40019C4.42801 4.50103 8.11063 6.52604 12.24 6.74756C12.163 6.36787 12.1168 5.97239 12.1168 5.57687C12.1168 2.76076 14.3356 0.466797 17.0937 0.466797C18.5266 0.466797 19.8209 1.0838 20.73 2.0805C21.8548 1.85902 22.9334 1.43184 23.8887 0.846495C23.5189 2.03307 22.7331 3.02977 21.7008 3.66255C22.7023 3.55186 23.673 3.26702 24.5667 2.87155C23.8888 3.88403 23.0413 4.78577 22.0706 5.51356Z"
                                fill="currentColor"
                              />
                            </svg>
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink
                            to="/https://instagram.com/runwebrun"
                            className="nav-link"
                          >
                            <svg
                              width="11"
                              height="14"
                              viewBox="0 0 11 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5.84375 0C2.90469 0 0 1.91862 0 5.02377C0 6.99849 1.13437 8.12049 1.82187 8.12049C2.10547 8.12049 2.26875 7.34631 2.26875 7.12752C2.26875 6.86665 1.58984 6.31126 1.58984 5.22573C1.58984 2.9705 3.34297 1.37165 5.61172 1.37165C7.5625 1.37165 9.00625 2.45718 9.00625 4.45154C9.00625 5.941 8.39609 8.73479 6.41953 8.73479C5.70625 8.73479 5.09609 8.22989 5.09609 7.5062C5.09609 6.4459 5.85234 5.41927 5.85234 4.32532C5.85234 2.46841 3.1625 2.80501 3.1625 5.04901C3.1625 5.52025 3.22266 6.04198 3.4375 6.47115C3.04219 8.13732 2.23438 10.6198 2.23438 12.3364C2.23438 12.8666 2.31172 13.3883 2.36328 13.9184C2.46068 14.025 2.41198 14.0138 2.56094 13.9605C4.00469 12.0251 3.95313 11.6464 4.60625 9.11346C4.95859 9.76983 5.86953 10.1233 6.59141 10.1233C9.63359 10.1233 11 7.22008 11 4.60301C11 1.81764 8.54219 0 5.84375 0Z"
                                fill="currentColor"
                              />
                            </svg>
                          </NavLink>
                        </li>
                      </ul>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
            <Swiper
              className="swiper swiper-full-horizontal mt-130 mb-n6"
              pagination={{
                el: ".swiper-pagination",
                clickable: true,
                // dynamicBullets: true,x
              }}
              slidesPerView={"2"}
              spaceBetween={70}
              navigation={true}
              grabCursor={true}
              modules={[Pagination, Navigation, Autoplay]}
              loop={true}
              centeredSlides={true}
              autoplay={{ delay: 25000, disableOnInteraction: false }}
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
                  <SwiperSlide className="swiper-slide">
                    <div
                      className="gallery-item gallery-item-md"
                      data-fancybox="gallery-1"
                      data-aos="fade"
                    >
                      <img
                        src={img1}
                        onClick={() => {
                          setisGallery(true);
                          setphotoIndex(0);
                        }}
                        alt=""
                      />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div
                      className="gallery-item gallery-item-md"
                      data-fancybox="gallery-1"
                      data-aos="fade"
                    >
                      <img
                        src={img2}
                        onClick={() => {
                          setisGallery(true);
                          setphotoIndex(1);
                        }}
                        alt=""
                      />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="swiper-slide">
                    <div
                      className="gallery-item gallery-item-md"
                      data-fancybox="gallery-1"
                      data-aos="fade"
                    >
                      <img
                        src={img3}
                        onClick={() => {
                          setisGallery(true);
                          setphotoIndex(2);
                        }}
                        alt=""
                      />
                    </div>
                  </SwiperSlide>
                </div>
              </div>
            </Swiper>
            <div className="swiper-pagination"></div>
          </div>
          <Container className="mt-160">
            <div className="page-navigation">
              <NavLink to="/portfolio-single-style-4" className="btn btn-clean">
                <svg
                  className="icon-arrow icon-arrow-left"
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
                prev<span className="d-none d-sm-inline"> project</span>
              </NavLink>
              <NavLink
                to="/portfolio-col-4-style-3"
                className="btn btn-light btn-circle btn-xs"
              >
                all
              </NavLink>
              <NavLink to="/portfolio-single-style-6" className="btn btn-clean">
                next<span className="d-none d-sm-inline"> project</span>
                <svg
                  className="icon-arrow icon-arrow-right"
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
              </NavLink>
            </div>
          </Container>
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Style5;
