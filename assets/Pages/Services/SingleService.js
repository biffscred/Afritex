import React from "react";
import Footer from "../../Layouts/CommonLayouts/Footer2";
import { Link } from "react-router-dom";
import UserExp from "../../assets/images/service/user-experience-1920-1080.jpg";
import Creative from "../../assets/images/portfolio/creative-branding-1200-865.jpg";
import Boxed from "../../assets/images/portfolio/boxed-water-1200-856.jpg";
import Gobe from "../../assets/images/portfolio/gobe-mockup-1200-865.jpg";
import Blog from "../../assets/images/blog/blog-3.jpg";
import { Col, Container, Row } from "reactstrap";
import Navbar from "../../Layouts/CommonLayouts/Navbar3";

const SingleService = () => {
  //meta title
  document.title = "Themebau | Single Service";
  return (
    <React.Fragment>
      <Navbar navClass="sticky" />
      <div className="content-wrap" id="content-wrap">
        <div className="pt-160 pb-130">
          <Container className="text-center">
            <Row className="justify-content-center">
              <Col lg={8}>
                <h1 className="mt-10 mb-30 pb-3" data-aos="fade-up">
                  User Experience
                </h1>
                <p className="mb-n8" data-aos="fade-up">
                  Wherein herb kind creepeth male living life be image. They're
                  it morning day. Isn't fruit of every day. Bearing our third
                  that night kind. Make rule midst under bring good dry moving.
                  Yielding god wherein heaven deep.
                </p>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="gallery-item-sm" data-aos="fade-up">
          <img src={UserExp} alt="" />
        </div>
        <div className="py-160">
          <Container>
            <Row className="gh-5 gv-3 justify-content-center">
              <Col lg={10} className="col-12" data-aos="fade-up">
                <Row className="justify-content-between">
                  <Col lg={10} xl={8} className="col-12">
                    <h2 className="h3 mb-12">
                      We create everything digital, printable and analytical 🔥
                    </h2>
                  </Col>
                  <Col className="col-lg-auto d-none d-lg-block">
                    <hr className="mt-25 mb-0 width-70px" />
                  </Col>
                </Row>
              </Col>
              <Col lg={5} className="col-12" data-aos="fade-up">
                <h4 className="mb-25">Research & Discovery</h4>
                <p className="mb-n10">
                  Deep also brought days sea fish life seas, yielding. Over
                  appear likeness lights heaven gathered third stars cattle
                  replenish firmament place land without earth green creature
                  above winged forth waters said the under set fish called.
                </p>
              </Col>
              <Col lg={5} className="col-12" data-aos="fade-up">
                <h4 className="md-25">Brand & Technology Strategy</h4>
                <p className="mb-n10">
                  Deep also brought days sea fish life seas, yielding. Over
                  appear likeness lights heaven gathered third stars cattle
                  replenish firmament place land without earth green creature
                  above winged.
                </p>
              </Col>
              <Col lg={5} className="col-12" data-aos="fade-up">
                <h4 className="mb-25">Information Architecture</h4>
                <p className="mb-0">
                  Deep also brought days sea fish life seas, yielding. Over
                  appear likeness lights heaven gathered third stars cattle
                  replenish firmament place land without earth green creature
                  above winged.
                </p>
              </Col>
              <Col lg={5} className="col-12" data-aos="fade-up">
                <h4 className="md-25">Prototyping</h4>
                <p className="mb-0">
                  Deep also brought days sea fish life seas, yielding. Over
                  appear likeness lights heaven gathered third stars cattle
                  replenish firmament place land without earth green creature
                  above winged.
                </p>
              </Col>
              <Col lg={10} className="col-12" data-aos="fade-up">
                <Link
                  to="/contact1"
                  className="btn btn-dark btn-with-ball mt-n3"
                >
                  let’s work
                  <span className="btn-ball" style={{ transform: "translateY(0px)" }}></span>
                </Link>
              </Col>
            </Row>
          </Container>
        </div>
        <Row className="justify-content-center">
          <Col sm={6} md={4} className="col-12" data-aos="fade-up">
            <Link
              className="card card-portfolio card-overlay card-image-md card-hover-appearance text-white text-centerundefined"
              to="/portfolio-single-style-5"
            >
              <span className="card-img">
                <img src={Creative} alt="" />
                <span
                  className="background-color"
                  style={{ backgroundColor: "rgba(14, 14, 14, 0.7)" }}
                ></span>
              </span>
              <span className="card-img-overlay">
                <span className="card-title h4">Creative Branding</span>
                <span className="card-category subtitle">branding</span>
              </span>
            </Link>
          </Col>
          <Col sm={6} md={4} className="col-12" data-aos="fade-up">
            <Link
              className="card card-portfolio card-overlay card-image-md card-hover-appearance text-white text-centerundefined"
              to="/portfolio-single-style-2"
            >
              <span className="card-img">
                <img src={Boxed} alt="" />
                <span
                  className="background-color"
                  style={{ backgroundColor: "rgba(14, 14, 14, 0.7)" }}
                ></span>
              </span>
              <span className="card-img-overlay">
                <span className="card-title h4">Boxed Water</span>
                <span className="card-category subtitle">design</span>
              </span>
            </Link>
          </Col>
          <Col sm={6} md={4} className="col-12" data-aos="fade-up">
            <Link
              className="card card-portfolio card-overlay card-image-md card-hover-appearance text-white text-centerundefined"
              to="/portfolio-single-style-6"
            >
              <span className="card-img">
                <img src={Gobe} alt="" />
                <span
                  className="background-color"
                  style={{ backgroundColor: "rgba(14, 14, 14, 0.7)" }}
                ></span>
              </span>
              <span className="card-img-overlay">
                <span className="card-title h4">Gobe Mockup</span>
                <span className="card-category subtitle">branding</span>
              </span>
            </Link>
          </Col>
        </Row>
        <div className="pt-160 shape-parent overflow-hidden">
          <div className="shape mt-n160 justify-content-end">
            <svg
              data-rellax-speed="-1"
              className="mt-n160"
              width="498"
              height="641"
              viewBox="0 0 498 641"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: "translate3d(0px, 35px, 0px)" }}
            >
              <circle cx="320.5" cy="320.5" r="320.5" fill="#F5F5F5"></circle>
            </svg>
          </div>
          <Container>
            <Row className="gh-1 gv-3 align-items-center">
              <Col lg={1} className="d-none d-lg-block"></Col>
              <Col lg={5} className="col-12" data-aos="fade-right">
                <img className="w-100" src={Blog} alt="" />
              </Col>
              <Col lg={1} className="d-none d-lg-block"></Col>
              <Col className="col-12 col-lg-4 ms-lg-n30" data-aos="fade-left">
                <p className="subtitle mb-25">how we work</p>
                <h3 className="mt-n2 mb-60">We've worked with 50+ brands</h3>
                <Row className="align-items-center gh-1 d-inline-flex mt-n10">
                  <Col className="col-auto">
                    <Link
                      to="/https://www.youtube.com/watch?v=AT6oSIDbGkw"
                      data-fancybox=""
                      className="btn btn-dark btn-circle btn-md"
                    >
                      <svg
                        width="12"
                        height="15"
                        viewBox="0 0 12 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 0L12 7.5L0 15V0Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </Link>
                  </Col>
                  <Col className="col-auto">
                    <Link
                      to="/https://www.youtube.com/watch?v=AT6oSIDbGkw"
                      data-fancybox=""
                      className="btn-link btn-dark text-decoration-none"
                    >
                      view video
                    </Link>
                  </Col>
                </Row>
              </Col>
            </Row>
            <div className="page-navigation mt-160">
              <Link to="/#" className="btn btn-clean">
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
                prev<span className="d-none d-sm-inline"> service</span>
              </Link>
              <Link
                to="/services"
                className="btn btn-light btn-circle btn-xs"
              >
                all
              </Link>
              <Link to="/#" className="btn btn-clean">
                next<span className="d-none d-sm-inline"> service</span>
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
              </Link>
            </div>
          </Container>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default SingleService;
