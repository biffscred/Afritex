import React from "react";
//Images
import Home from "../../images/demos/main-home-740-600.jpg";
import Portfolio from "../../images/demos/simple-portfolio-740-600.jpg";
import Creative from "../../images/demos/creative-agency-740-600.jpg";
import Freelancer from "../../images/demos/freelancer-portfolio-740-600.jpg";
import Interactive from "../../images/demos/interactive-dark-740-600.jpg";
import Digital from "../../images/demos/digital-agency-740-600.jpg";
import Fullscreen from "../../images/demos/fullscreen-slider-740-362.jpg";
import Light from "../../images/demos/carousel-light-740-362.jpg";
import Dark from "../../images/demos/carousel-dark-740-362.jpg";
import InteractiveLight from "../../images/demos/interactive-light-740-600.jpg";
import LeftMenu from "../../images/demos/left-menu-740-600.jpg";
import { Container, Row, Col } from "reactstrap";
import { NavLink } from "react-router-dom";

const ThemebauMain = () => {
  return (
    <React.Fragment>
      <div className="py-160 bg-dark text-center">
        <Container className="shape-parent">
          <div className="shape ms-60">
            <svg
              className="mt-n160"
              data-rellax-speed="1"
              width="500"
              height="318"
              viewBox="0 0 500 318"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="250" cy="68" r="250" fill="#202020" />
            </svg>
          </div>
          <Row className="justify-content-center text-white mb-100">
            <Col className="col-12 col-lg-8 col-xl-6" data-aos="fade-up">
              <h1 className="display-4 mb-20 text-white">Afritex.</h1>
              <p className="mb-4">
             
              Un espace de valorisation et de promotion de tissus africains authentiques surtout en coton tissé pour faciliter leur accès à l'international et permettre à une plus grande clientèle de s'en approvisionner en un même endroit (Gain de temps, choix variés en qualité et en quantité, coût moindre).
              </p>
            </Col>
          </Row>
          <Row className="gh-1 gv-4">
            <Col md={6} lg={4} className="col-12" data-aos="fade-up">
              <NavLink to="/home" className="card card-demo text-white">
                <span className="card-img">
                  <img src={Home} alt="" />
                </span>
                <span className="card-body">
                  <span className="card-title h5">Main Home</span>
                </span>
              </NavLink>
            </Col>
            <Col md={6} lg={4} className="col-12" data-aos="fade-up">
              <NavLink
                to="/simple-portfolio"
                className="card card-demo text-white"
              >
                <span className="card-img">
                  <img src={Portfolio} alt="" />
                </span>
                <span className="card-body">
                  <span className="card-title h5">Simple Portfolio</span>
                </span>
              </NavLink>
            </Col>
            <Col md={6} lg={4} className="col-12" data-aos="fade-up">
              <NavLink
                to="/creative-agency"
                className="card card-demo text-white"
              >
                <span className="card-img">
                  <img src={Creative} alt="" />
                </span>
                <span className="card-body">
                  <span className="card-title h5">Creative Agency</span>
                </span>
              </NavLink>
            </Col>
            <Col md={6} lg={4} className="col-12" data-aos="fade-up">
              <NavLink
                to="/freelancer-portfolio"
                className="card card-demo text-white"
              >
                <span className="card-img">
                  <img src={Freelancer} alt="" />
                </span>
                <span className="card-body">
                  <span className="card-title h5">Freelancer Portfolio</span>
                </span>
              </NavLink>
            </Col>
            <Col md={6} lg={4} className="col-12" data-aos="fade-up">
              <NavLink
                to="/interactive-links-dark"
                className="card card-demo text-white"
              >
                <span className="card-img">
                  <img src={Interactive} alt="" />
                </span>
                <span className="card-body">
                  <span className="card-title h5">Interactive Dark</span>
                </span>
              </NavLink>
            </Col>
            <Col md={6} lg={4} className="col-12" data-aos="fade-up">
              <NavLink
                to="/digital-agency"
                className="card card-demo text-white"
              >
                <span className="card-img">
                  <img src={Digital} alt="" />
                </span>
                <span className="card-body">
                  <span className="card-title h5">Digital Agency</span>
                </span>
              </NavLink>
            </Col>
            <Col md={6} lg={4} className="col-12" data-aos="fade-up">
              <NavLink
                to="/fullscreen-showcase"
                className="card card-demo text-white"
              >
                <span className="card-img">
                  <img src={Fullscreen} alt="" />
                </span>
                <span className="card-body">
                  <span className="card-title h5">Fullscreen Slider</span>
                </span>
              </NavLink>
            </Col>
            <Col md={6} lg={4} className="col-12" data-aos="fade-up">
              <NavLink
                to="/carousel-light"
                className="card card-demo text-white"
              >
                <span className="card-img">
                  <img src={Light} alt="" />
                </span>
                <span className="card-body">
                  <span className="card-title h5">Carousel Light</span>
                </span>
              </NavLink>
            </Col>
            <Col md={6} lg={4} className="col-12" data-aos="fade-up">
              <NavLink
                to="/carousel-dark"
                className="card card-demo text-white"
              >
                <span className="card-img">
                  <img src={Dark} alt="" />
                </span>
                <span className="card-body">
                  <span className="card-title h5">Carousel Dark</span>
                </span>
              </NavLink>
            </Col>
            <Col md={6} lg={4} className="col-12" data-aos="fade-up">
              <NavLink
                to="/interactive-links-light"
                className="card card-demo text-white"
              >
                <span className="card-img">
                  <img src={InteractiveLight} alt="" />
                </span>
                <span className="card-body">
                  <span className="card-title h5">Interactive Light</span>
                </span>
              </NavLink>
            </Col>
            <Col md={6} lg={4} className="col-12" data-aos="fade-up">
              <NavLink to="/left-menu" className="card card-demo text-white">
                <span className="card-img">
                  <img src={LeftMenu} alt="" />
                </span>
                <span className="card-body">
                  <span className="card-title h5">Left Menu</span>
                </span>
              </NavLink>
            </Col>
          </Row>
        </Container>
      </div>
      {/* <Work /> */}
    </React.Fragment>
  );
};

export default ThemebauMain;
