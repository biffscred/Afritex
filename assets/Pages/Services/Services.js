import React from "react";
import Navbar from "../../Layouts/CommonLayouts/Navbar4";
import WorkProcess from "../Home/WorkProcess";
import { Link } from "react-router-dom";
import Service from "../../assets/images/service/services-1920-1080.jpg";
import UserExp from "../../assets/images/service/user-experience-1040-1260.jpg";
import Design from "../../assets/images/service/design-creative-1040-1260.jpg";
import Development from "../../assets/images/service/development-services-1040-1260.jpg";
import Work from "../../assets/images/portfolio/work-together.jpg";
import Footer from "../../Layouts/CommonLayouts/Footer2";
import { Col, Container, Row } from "reactstrap";
const Services = () => {
  //meta title
  document.title = "Themebau | Services";
  return (
    <React.Fragment>
      <Navbar navClass="navbar-dark navbar-fixed" styleClass="2" />
      <div className="content-wrap" id="content-wrap">
        <div className="py-160 min-vh-100 d-flex align-items-center position-relative lines-style-3">
          <div className="line text-white"></div>
          <div className="background bg-dark">
            <div
              className="background-image jarallax"
              data-jarallax
              data-speed="0.8"
            >
              <img src={Service} className="jarallax-img" alt="" />
            </div>
            <div
              className="background-color"
              style={{ backgroundColor: "#0e0e0e", opacity: ".2" }}
            ></div>
          </div>
          <Container>
            <Row>
              <Col lg={1}></Col>
              <Col lg={8} xl={7} className="col-12" data-aos="fade-right">
                <h1 className="text-white mb-0">
                  We build creative experiences.
                </h1>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="py-160">
          <Container className="mb-8">
            <Row className="gh-1 gv-3 align-items-center justify-content-between mb-110">
              <Col lg={6} className="col-12" data-aos="fade-right">
                <img className="w-100" src={UserExp} alt="" />
              </Col>
              <Col lg={5} className="col-12 ps-lg-0" data-aos="fade-left">
                <h3 className="mb-n10">User Experience</h3>
                <hr className="mt-30 mb-60" />
                <p className="mt-n7">
                  Green upon was their divide unto and under good, seed third
                  thing darkness may every created let Beast seed beast midst to
                  evening hath which.
                </p>
                <ul className="list mt-n7 mb-n8 font-size-18">
                  <li>Research & Discovery</li>
                  <li>Brand & Technology Strategy</li>
                  <li>Information Architecture</li>
                  <li>Prototyping</li>
                </ul>
                <Link
                  className="btn btn-dark btn-with-ball mt-60"
                  to="/single-service"
                >
                  read more
                  <span className="btn-ball" style={{ transform: "translateY(0px)" }}></span>
                </Link>
              </Col>
            </Row>
            <Row className="gh-1 gv-3 align-items-center justify-content-between mb-110">
              <Col className="col-12 col-lg-6 order-lg-2" data-aos="fade-left">
                <img className="w-100" src={Design} alt="" />
              </Col>
              <Col
                className="col-12 col-lg-5 order-lg-1 ps-lg-0 ms-lg-30"
                data-aos="fade-right"
              >
                <h3 className="mb-n10">Design & Creative</h3>
                <hr className="mt-30 mb-60" />
                <p className="mt-n7">
                  Dry image fruit fill he i had thing saying gathering bearing,
                  their place given bearing us lights days one. Fruitful very
                  seas won't give after.
                </p>
                <ul className="list mt-n7 mb-n8 font-size-18">
                  <li>Interactive Design</li>
                  <li>Creative Concepts & Ideas</li>
                  <li>Websites & Mobie Design</li>
                  <li>Content Production</li>
                </ul>
                <Link
                  className="btn btn-dark btn-with-ball mt-60"
                  to="/single-service"
                >
                  read more
                  <span className="btn-ball" style={{ transform: "translateY(0px)" }}></span>
                </Link>
              </Col>
            </Row>
            <Row className="gh-1 gv-3 align-items-center justify-content-between">
              <Col lg={6} className="col-12" data-aos="fade-right">
                <img className="w-100" src={Development} alt="" />
              </Col>
              <Col lg={5} className="col-12 ps-lg-0" data-aos="fade-left">
                <h3 className="mb-n10">Development Services</h3>
                <hr className="mt-30 mb-60" />
                <p className="mt-n7">
                  May said creepeth god form in over be under divide you'll seas
                  Green to forth air. Years were. Void stars firmament them
                  night for earth fill land.
                </p>
                <ul className="list mt-n7 mb-n8 font-size-18">
                  <li>Content Management System</li>
                  <li>Front-end Development</li>
                  <li>Data & Analytics</li>
                  <li>Web & Mobile Development</li>
                </ul>
                <Link
                  className="btn btn-dark btn-with-ball mt-60"
                  to="/single-service"
                >
                  read more
                  <span className="btn-ball" style={{ transform: "translateY(0px)" }}></span>
                </Link>
              </Col>
            </Row>
          </Container>
        </div>
        <WorkProcess />
        <div className="pt-160 pb-130">
          <Container>
            <h2
              className="display-4 text-center mt-n30 mb-30 mb-md-20 pt-6 pb-30"
              data-aos="fade"
            >
              Skills
            </h2>
            <Row className="gh-1 gv-2 mt-n3 pb-6">
              <Col md={6} lg={4} className="col-12" data-aos="fade-up">
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
                      width="21"
                      height="23"
                      viewBox="0 0 21 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.285 6.18564L10.5 11.4676L19.715 6.18564M10.5 22V11.4571M20 15.6408V7.2734C19.9996 6.90656 19.9019 6.54628 19.7166 6.22869C19.5314 5.9111 19.2651 5.64736 18.9444 5.46395L11.5556 1.28025C11.2346 1.09666 10.8706 1 10.5 1C10.1294 1 9.76537 1.09666 9.44444 1.28025L2.05556 5.46395C1.73494 5.64736 1.46865 5.9111 1.28338 6.22869C1.09811 6.54628 1.00038 6.90656 1 7.2734V15.6408C1.00038 16.0076 1.09811 16.3679 1.28338 16.6855C1.46865 17.0031 1.73494 17.2668 2.05556 17.4502L9.44444 21.6339C9.76537 21.8175 10.1294 21.9142 10.5 21.9142C10.8706 21.9142 11.2346 21.8175 11.5556 21.6339L18.9444 17.4502C19.2651 17.2668 19.5314 17.0031 19.7166 16.6855C19.9019 16.3679 19.9996 16.0076 20 15.6408Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="feature-body pt-30">
                    <h4 className="mt-n10 mb-30 pb-5">Back-end & Data</h4>
                    <ul className="list font-size-18">
                      <li>PHP (Symfony)</li>
                      <li>Node.js (Typescript)</li>
                      <li>MySQL</li>
                      <li>MariaDB</li>
                      <li>PostgreSQL</li>
                    </ul>
                  </div>
                </div>
              </Col>
              <Col md={6} lg={4} className="col-12" data-aos="fade-up">
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
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 16L11 21L21 16M1 11L11 16L21 11M11 1L1 6L11 11L21 6L11 1Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="feature-body pt-30">
                    <h4 className="mt-n10 mb-30 pb-5">Front-end Dev</h4>
                    <ul className="list font-size-18">
                      <li>HTML</li>
                      <li>CSS</li>
                      <li>Sass (SCSS)</li>
                      <li>JavaScript (ES6)</li>
                      <li>React</li>
                    </ul>
                  </div>
                </div>
              </Col>
              <Col md={6} lg={4} className="col-12" data-aos="fade-up">
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
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 1H1V8H8V1Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M19 1H12V8H19V1Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M19 12H12V19H19V12Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 12H1V19H8V12Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="feature-body pt-30">
                    <h4 className="mt-n10 mb-30 pb-5">Mobile Dev</h4>
                    <ul className="list font-size-18">
                      <li>Swift</li>
                      <li>RxSwift</li>
                      <li>RxJava</li>
                      <li>Kotlin</li>
                    </ul>
                  </div>
                </div>
              </Col>
            </Row>
            <hr className="mt-130 mb-100 pb-7" />
            <Row className="gv-1 pb-7 mb-n30 align-items-center justify-content-center justify-content-md-between text-center text-md-start">
              <Col md={10} lg={8} className="col-12 me-md-auto">
                <div className="interactive-links">
                  <img
                    className="interactive-links-image"
                    src={Work}
                    width="230"
                    alt=""
                  />
                  <Link to="/contact1" className="nav-link display-4">
                    <u>Let’s work</u> together
                    <span className="btn-ball" style={{ transform: "translateY(0px)" }}></span>
                  </Link>
                </div>
              </Col>
              <div className="col-auto">
                <Link to="/contact1" className="btn btn-clean me-xl-100">
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
                </Link>
              </div>
            </Row>
          </Container>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Services;
