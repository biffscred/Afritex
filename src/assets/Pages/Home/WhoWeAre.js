import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

//Images
import WebDesign from "../../images/service/web-design.jpg";
import BrandStrategy from "../../images/service/brand-strategy.jpg";
import Packaging from "../../images/service/packaging.jpg";
import ContentProduction from "../../images/service/content-production.jpg";

const WhoWeAre = () => {
  return (
    <React.Fragment>
      <div className="py-160">
        <Container>
          <Row className="justify-content-center">
            <Col lg={7} className="col-12 text-center">
              <p className="subtitle mt-n10">Qui sommes nous!</p>
              <h1 className="h3 mb-0">
              Chez Afritex, notre équipe possède une vaste expérience qui célèbrent la richesse de l'artisanat africain.  👋
              </h1>
            </Col>
          </Row>
          <Row className="justify-content-center gh-5 mt-100">
            <Col lg={5}>
              <hr className="mt-0" />
              <p className="lead">
              Notre équipe est prête à relever les défis à venir pour continuer à promouvoir la beauté et la diversité des textiles africains .
              </p>
            </Col>
            <Col lg={5}>
              <p>
              Chez Afritex, notre équipe possède une vaste expérience dans la conception de plateformes en ligne qui célèbrent la richesse de l'artisanat africain. Nous sommes fiers de mettre notre savoir-faire au service de la promotion des tissus africains authentiques à travers nos réalisations.
              </p>
              <NavLink to="/about-us" className="btn btn-dark btn-with-ball">
                A propos
                <span className="btn-ball" style={{ transform: "translateY(0px)" }}></span>
              </NavLink>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="px-1" fluid>
        <Row className="gh-1 gv-1 justify-content-center">
          <Col sm={6} lg={5} xl={3} className="col-12">
            <NavLink
              className="card card-service card-image-xl card-hover-zoom card-bg-show text-white"
              to="/single-service"
            >
              <span className="card-img" data-aos="fade-up">
                <img src={WebDesign} alt="" />
                <span
                  className="background-color"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, rgba(0, 0, 0, 0.13) 0%, rgba(0, 0, 0, 0.65) 100%)",
                  }}
                ></span>
              </span>
              <span className="card-img-overlay">
                <span className="card-icon">
                  <svg
                    width="33"
                    height="33"
                    viewBox="0 0 33 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24.619 11.85H26.0952C27.6613 11.85 29.1632 12.5032 30.2705 13.6659C31.3779 14.8287 32 16.4057 32 18.05C32 19.6943 31.3779 21.2713 30.2705 22.4341C29.1632 23.5968 27.6613 24.25 26.0952 24.25H24.619M24.619 11.85H1V25.8C1 27.4443 1.62211 29.0213 2.72946 30.1841C3.83682 31.3468 5.33872 32 6.90476 32H18.7143C20.2803 32 21.7822 31.3468 22.8896 30.1841C23.9969 29.0213 24.619 27.4443 24.619 25.8V11.85ZM6.90476 1V5.65M12.8095 1V5.65M18.7143 1V5.65"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="card-title h5">
                  Web Design and Development
                </span>
                <span className="btn btn-clean">
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
                </span>
              </span>
            </NavLink>
          </Col>
          <Col sm={6} lg={5} xl={3} className="col-12">
            <NavLink
              className="card card-service card-image-xl card-hover-zoom card-bg-show text-white"
              to="/single-service"
            >
              <span className="card-img" data-aos="fade-up">
                <img src={BrandStrategy} alt="" data-aos="fade-up" />
                <span
                  className="background-color"
                  style={{
                    backgroundImage:
                      "linear-gradient(180deg, rgba(0, 0, 0, 0.13) 0%, rgba(0, 0, 0, 0.65) 100%)",
                  }}
                ></span>
              </span>
              
                
            </NavLink>
          </Col>
          
          
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default WhoWeAre;
