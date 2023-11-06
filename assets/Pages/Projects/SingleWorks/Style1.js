import React, { useState } from "react";
import Navbar from "../../../Layouts/CommonLayouts/Navbar3";
import Footer from "../../../Layouts/CommonLayouts/Footer2";
import { NavLink } from "react-router-dom";
//Lightbox
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

//Images
import Style11 from "../../../assets/images/single-portfolio/style-1-1-1920-1080.jpg";
import Style12 from "../../../assets/images/single-portfolio/style-1-2-1366-1000.jpg";
import Style13 from "../../../assets/images/single-portfolio/style-1-3-1366-1000.jpg";
import Style14 from "../../../assets/images/single-portfolio/style-1-4-1366-1000.jpg";
import Style15 from "../../../assets/images/single-portfolio/style-1-5-1920-1080.jpg";
import Style16 from "../../../assets/images/single-portfolio/style-1-6-910-1080.jpg";
import Style17 from "../../../assets/images/single-portfolio/style-1-7-910-1080.jpg";
import Style18 from "../../../assets/images/single-portfolio/style-1-8-1920-1080.jpg";
import AvatarBrian from "../../../assets/images/avatar/avatar-brian-newton.jpg";
import HappyMoments from "../../../assets/images/portfolio/happy-moments-740-860.jpg";
import { Col, Container, Row } from "reactstrap";

const Style1 = () => {
  const images = [
    Style11,
    Style12,
    Style13,
    Style14,
    Style15,
    Style16,
    Style17,
    Style18,
  ];

  //meta title
  document.title = "Themebau | Single Work";

  const [photoIndex, setphotoIndex] = useState(0);
  const [isGallery, setisGallery] = useState(false);
  return (
    <React.Fragment>
      <Navbar navClass="sticky" />

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
          imageCaption={"Project " + parseFloat(photoIndex + 1)}
        />
      ) : null}
      <div className="content-wrap" id="content-wrap">
        <Container className="mt-10">
          <div className="pt-100 mt-n30 pb-130 mb-n10">
            <Row className="gh-1">
              <div className="d-none d-xl-block col-1"></div>
              <Col lg={5} xl={4}
                className="col-12 me-lg-auto me-xl-0"
                data-aos="fade-up"
              >
                <h1 className="mb-100 mb-lg-0 pb-8 pb-lg-0">
                  Creative Branding
                </h1>
              </Col>
              <div className="d-none d-xl-block col-lg-2"></div>
              <Col lg={6}
                className="col-12 col-xl ms-xl-n30"
                data-aos="fade-up"
              >
                <p className="lead mb-0">
                  Over 10 years of combined experience, and know thing or two
                  about designing websites and mobile apps.
                </p>
                <hr />
                <Row className="gh-3 gv-1">
                  <Col sm={6} className="col-12 col-lg-auto">
                    <ul className="list-group list-group-gap borderless">
                      <li className="list-group-item">
                        <span className="fw-medium me-8">Date:</span> June 10,
                        2020
                      </li>
                      <li className="list-group-item">
                        <span className="fw-medium me-8">Category:</span>{" "}
                        Branding
                      </li>
                    </ul>
                  </Col>
                  <Col sm={6} className="col-12 col-lg-auto">
                    <ul className="list-group list-group-gap borderless">
                      <li className="list-group-item">
                        <span className="fw-medium me-8">Client:</span> Brian
                        Newton
                      </li>
                      <li className="list-group-item">
                        <span className="fw-medium">Share:</span>
                        <ul className="nav nav-gap-sm align-items-center d-inline-flex ms-4">
                          <li className="nav-item">
                            <NavLink
                              to="//facebook.com/runwebrun"
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
                              to="//twitter.com/runwebrun"
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
                              to="//instagram.com/runwebrun"
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
                      </li>
                    </ul>
                  </Col>
                </Row>
              </Col>
              <div className="d-none d-xl-block col-1"></div>
            </Row>
          </div>
        </Container>
        <Row>
          <Col className="col-12">
            <div
              to={Style11}
              className="gallery-item gallery-item-sm"
              data-fancybox="gallery-1"
              data-aos="fade"
            >
              <img
                src={Style11}
                onClick={() => {
                  setisGallery(true);
                  setphotoIndex(0);
                }}
                alt=""
              />
            </div>
          </Col>
          <Col sm={6} className="col-12">
            <div
              to={Style12}
              className="gallery-item gallery-item-md"
              data-fancybox="gallery-1"
              data-aos="fade"
            >
              <img
                src={Style12}
                onClick={() => {
                  setisGallery(true);
                  setphotoIndex(1);
                }}
                alt=""
              />
            </div>
          </Col>
          <Col sm={6} className="col-12">
            <div
              to={Style13}
              className="gallery-item gallery-item-md"
              data-fancybox="gallery-1"
              data-aos="fade"
            >
              <img
                src={Style13}
                onClick={() => {
                  setisGallery(true);
                  setphotoIndex(2);
                }}
                alt=""
              />
            </div>
          </Col>
        </Row>
        <Container>
          <div className="py-160 mt-n10">
            <Row className="gh-1 gv-5 justify-content-between">
              <div className="d-none d-xl-block col-1"></div>
              <Col lg={6} className="col-12 col-xl me-lg-auto me-xl-n30">
                <h2 className="d-flex align-items-center" data-aos="fade-up">
                  What we do
                  <hr className="d-none d-sm-block my-0 me-0 ms-auto width-70px" />
                </h2>
                <p className="" data-aos="fade-up">
                  Wherein herb kind creepeth male living life be image. They're
                  it morning day. Isn't fruit of every day. Bearing our third
                  that night kind. Make rule midst under bring good dry moving.
                  Yielding god wherein heaven deep.
                </p>
                <NavLink
                  to="/#"
                  className="btn btn-dark btn-with-ball"
                  data-aos="fade-up"
                >
                  website
                  <span className="btn-ball" style={{ transform: "translateY(0px)" }}></span>
                </NavLink>
              </Col>
              <div className="d-none d-xl-block col-lg-2"></div>
              <Col lg={4} className="col-12" data-aos="fade-up">
                <ul className="list mt-lg-6 mb-0">
                  <li>Branding Services</li>
                  <li>Identity Design</li>
                  <li>Logo Design</li>
                  <li>Website Design</li>
                </ul>
              </Col>
            </Row>
          </div>
        </Container>
        <Row>
          <Col className="col-12 col-lg-8 order-lg-1">
            <div
              to={Style15}
              className="gallery-item gallery-item-md"
              data-fancybox="gallery-2"
              data-aos="fade"
            >
              <img
                src={Style15}
                onClick={() => {
                  setisGallery(true);
                  setphotoIndex(4);
                }}
                alt=""
              />
            </div>
          </Col>
          <Col className="col-12 col-sm-6 col-lg-4 order-lg-0">
            <div
              to={Style14}
              className="gallery-item gallery-item-xl"
              data-fancybox="gallery-2"
              data-aos="fade"
            >
              <img
                src={Style14}
                onClick={() => {
                  setisGallery(true);
                  setphotoIndex(3);
                }}
                alt=""
              />
            </div>
          </Col>
          <Col className="col-12 col-sm-6 col-lg-4 order-lg-2">
            <div
              to={Style16}
              className="gallery-item gallery-item-xl"
              data-fancybox="gallery-2"
              data-aos="fade"
            >
              <img
                src={Style16}
                onClick={() => {
                  setisGallery(true);
                  setphotoIndex(5);
                }}
                alt=""
              />
            </div>
          </Col>
          <Col className="col-12 col-sm-6 col-lg-4 order-lg-3">
            <div
              to={Style17}
              className="gallery-item gallery-item-xl"
              data-fancybox="gallery-2"
              data-aos="fade"
            >
              <img
                src={Style17}
                onClick={() => {
                  setisGallery(true);
                  setphotoIndex(6);
                }}
                alt=""
              />
            </div>
          </Col>
          <Col className="col-12 col-sm-6 col-lg-4 order-lg-4">
            <div
              to={Style18}
              className="gallery-item gallery-item-xl"
              data-fancybox="gallery-2"
              data-aos="fade"
            >
              <img
                src={Style18}
                onClick={() => {
                  setisGallery(true);
                  setphotoIndex(7);
                }}
                alt=""
              />
            </div>
          </Col>
        </Row>
        <div className="pt-160 pb-130 shape-parent overflow-hidden">
          <div className="shape justify-content-end">
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
            <Row className="justify-content-center mb-160">
              <Col md={10} lg={7} xl={6} className="col-12">
                <div className="d-flex media media-review justify-content-center">
                  <p className="media-text lead text-center" data-aos="fade-up">
                    “ There from stars gathering gathered, upon tree brought
                    life fruitful shall that together without there form You
                    make, morning he from unto. ”
                  </p>
                  <img
                    src={AvatarBrian}
                    className="media-img rounded-circle"
                    alt=""
                    data-aos="fade-up"
                  />
                  <div
                    className="media-body align-self-center"
                    data-aos="fade-up"
                  >
                    <h5 className="media-title mt-0">Brian Newton</h5>
                    <div className="media-subtitle">Unvab Inc.</div>
                  </div>
                </div>
              </Col>
            </Row>
            <hr className="mt-0 mb-100 pb-7" />
            <Row className="gv-1 align-items-center justify-content-center justify-content-md-between text-center text-md-start">
              <Col md={10} lg={9} className="me-md-auto">
                <div className="interactive-links">
                  <img
                    className="interactive-links-image"
                    src={HappyMoments}
                    width="230"
                    alt=""
                  />
                  <NavLink
                    to="/portfolio-single-style-2"
                    className="nav-link display-4"
                  >
                    <u>Next project</u>
                  </NavLink>
                </div>
              </Col>
              <Col className="col-auto">
                <NavLink
                  to="/portfolio-single-style-2"
                  className="btn btn-clean me-xl-100"
                >
                  <svg
                    className="icon-arrow icon-arrow-right"
                    width="69"
                    height="30"
                    viewBox="0 0 69 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M54 2L67 15L54 28"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17 15L67 15"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </NavLink>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Style1;
