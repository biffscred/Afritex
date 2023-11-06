import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

//Images
import FunnyDog from "../../assets/images/portfolio/funny-dog-1200-1330.jpg";
import CreativeBrand from "../../assets/images/portfolio/creative-branding-1200-865.jpg";
import MobileApp from "../../assets/images/portfolio/mobile-app-1200-865.jpg";
import WatchDesign from "../../assets/images/portfolio/funny-dog-1200-1330.jpg";

const FeaturedWork = () => {
  return (
    <React.Fragment>
      <div className="py-160">
        <Container className="isotope" data-isotope-mode="fitRows">
          <Row className="justify-content-center mb-100 mb-md-5">
            <Col lg={10} className="col-12 mt-8">
              <Row className="justify-content-between gh-1">
                <Col lg={6} className="col-md">
                  <h2 className="display-4 mt-n30">Featured work</h2>
                </Col>
                <div className="d-none d-lg-block col-auto">
                  <hr className="mt-30 mx-2 width-70px" />
                </div>
                <div className="col-auto">
                  <NavLink
                    to="/portfolio-col-3-style-5"
                    data-aos="fade-up"
                    className="btn btn-dark btn-with-ball"
                  >
                    all work
                    <span className="btn-ball" style={{ transform: "translateY(0px)" }}></span>
                  </NavLink>
                </div>
              </Row>
            </Col>
          </Row>
          <Row className="gh-1 gv-5 isotope-grid">
            <Col lg={1} className="d-none d-lg-block isotope-item"></Col>
            <Col md={5} lg={4} className="mt-md-160 isotope-item">
              <NavLink
                className="card card-portfolio card-default card-hover-frame"
                to="/portfolio-single-style-4"
                data-aos="fade-up"
              >
                <span
                  className="card-img"
                  data-cursor-style="cursor-circle"
                  data-cursor-text="view"
                >
                  <img src={FunnyDog} alt="" />
                </span>
                <span className="card-body">
                  <span className="card-title h4">Funny Dog</span>
                  <span className="card-category subtitle">photography</span>
                </span>
              </NavLink>
            </Col>
            <Col lg={1} className="d-none d-lg-block isotope-item"></Col>
            <Col md={7} lg={6} className="ps-lg-0 isotope-item">
              <NavLink
                className="card card-portfolio card-default card-hover-frame"
                to="/portfolio-single-style-5"
                data-aos="fade-up"
              >
                <span
                  className="card-img"
                  data-cursor-style="cursor-circle"
                  data-cursor-text="view"
                >
                  <img src={CreativeBrand} alt="" />
                </span>
                <span className="card-body">
                  <span className="card-title h4">Creative Branding</span>
                  <span className="card-category subtitle">branding</span>
                </span>
              </NavLink>
            </Col>
            <Col md={7} lg={6} className="ps-lg-0 ms-lg-30 me-lg-n30 isotope-item">
              <NavLink
                className="card card-portfolio card-default card-hover-frame"
                to="/portfolio-single-style-6"
                data-aos="fade-up"
              >
                <span
                  className="card-img"
                  data-cursor-style="cursor-circle"
                  data-cursor-text="view"
                >
                  <img src={MobileApp} alt="" />
                </span>
                <span className="card-body">
                  <span className="card-title h4">Mobile App</span>
                  <span className="card-category subtitle">design</span>
                </span>
              </NavLink>
            </Col>
            <Col lg={1} className="d-none d-lg-block isotope-item"></Col>
            <Col md={5} lg={4} className="mt-md-n160 isotope-item">
              <NavLink
                className="card card-portfolio card-default card-hover-frame"
                to="/portfolio-single-style-1"
                data-aos="fade-up"
              >
                <span
                  className="card-img"
                  data-cursor-style="cursor-circle"
                  data-cursor-text="view"
                >
                  <img src={WatchDesign} alt="" />
                </span>
                <span className="card-body">
                  <span className="card-title h4">Watch Design</span>
                  <span className="card-category subtitle">design</span>
                </span>
              </NavLink>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default FeaturedWork;
