import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import Demo1 from "../../assets/images/demos/demo-1-940-602.jpg";
import Demo2 from "../../assets/images/demos/demo-2-740-560.jpg";
const Work = () => {
  return (
    <React.Fragment>
      <div className="py-160 overflow-hidden">
        <Container>
          <Row className="gh-1 gv-2 align-items-center mb-100">
            <Col lg={5} className="col-12 d-flex flex-column align-items-lg-end">
              <img
                className="w-100 h-100 mb-30 mb-lg-0 box-shadow"
                src={Demo1}
                alt=""
                data-aos="fade-right"
              />
              <img
                className="mw-100 mt-lg-n70 me-lg-n100 box-shadow"
                width="370"
                src={Demo2}
                alt=""
                data-aos="fade-right"
              />
            </Col>
            <Col lg={2} className="d-none d-lg-block"></Col>
            <Col lg={4} className="col-12">
              <h2 className="h3 ms-lg-n100 mb-40" data-aos="fade-left">
                Present your work in unique way 💪
              </h2>
              <p className="mt-lg-n2" data-aos="fade-left">
                Themebau has 1/2/3/4 columns layouts to showcase your work and
                collections. Choose between the 19 types of layouts to create
                your portfolio.
              </p>
              <NavLink
                to="/portfolio-col-2-style-1"
                className="btn btn-dark btn-with-ball"
                id="btn-view"
              >
                view pages
                <span className="btn-ball" style={{ transform: "translateY(0px)" }}></span>
              </NavLink>
            </Col>
          </Row>
          <Row className="gh-1 gv-1 justify-content-center">
            <Col
              sm={6} md={4} lg={3} xl={2}
              data-aos="fade-up"
            >
              <NavLink to="/portfolio-col-1-style-1" className="card card-demo">
                <span className="card-img d-flex align-items-center justify-content-center flex-column">
                  <span className="p-18">
                    <svg
                      width="134"
                      height="109"
                      viewBox="0 0 134 109"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M134 0H0V50H134V0ZM134 59H0V109H134V59Z"
                        fill="#E2E2E2"
                      />
                    </svg>
                  </span>
                </span>
              </NavLink>
            </Col>
            <Col
              sm={6} md={4} lg={3} xl={2}
              data-aos="fade-up"
            >
              <NavLink to="/portfolio-col-2-style-1" className="card card-demo">
                <span className="card-img d-flex align-items-center justify-content-center flex-column">
                  <span className="p-18">
                    <svg
                      width="134"
                      height="109"
                      viewBox="0 0 134 109"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M62 0H0V50H62V0ZM62 59H0V109H62V59ZM72 59H134V109H72V59ZM134 0H72V50H134V0Z"
                        fill="#E2E2E2"
                      />
                    </svg>
                  </span>
                </span>
              </NavLink>
            </Col>
            <Col
              sm={6} md={4} lg={3} xl={2}
              data-aos="fade-up"
            >
              <NavLink to="/portfolio-col-2-style-2" className="card card-demo">
                <span className="card-img d-flex align-items-center justify-content-center flex-column">
                  <span className="p-18">
                    <svg
                      width="134"
                      height="109"
                      viewBox="0 0 134 109"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M62 0H0V64H62V0ZM134 45H72V109H134V45ZM72 0H134V36H72V0ZM62 73H0V109H62V73Z"
                        fill="#E2E2E2"
                      />
                    </svg>
                  </span>
                </span>
              </NavLink>
            </Col>
            <Col
              sm={6} md={4} lg={3} xl={2}
              data-aos="fade-up"
            >
              <NavLink to="/portfolio-col-3-style-1" className="card card-demo">
                <span className="card-img d-flex align-items-center justify-content-center flex-column">
                  <span className="p-18">
                    <svg
                      width="134"
                      height="109"
                      viewBox="0 0 134 109"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M38 0H0V50H38V0ZM86 0H47V50H86V0ZM95 0H134V50H95V0ZM38 59H0V109H38V59ZM47 59H86V109H47V59ZM134 59H95V109H134V59Z"
                        fill="#E2E2E2"
                      />
                    </svg>
                  </span>
                </span>
              </NavLink>
            </Col>
            <Col
              sm={6} md={4} lg={3} xl={2}
              data-aos="fade-up"
            >
              <NavLink to="/portfolio-col-3-style-2" className="card card-demo">
                <span className="card-img d-flex align-items-center justify-content-center flex-column">
                  <span className="p-18">
                    <svg
                      width="134"
                      height="109"
                      viewBox="0 0 134 109"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M38 0H0V62H38V0ZM86 0H47V38H86V0ZM95 0H134V62H95V0ZM38 71H0V109H38V71ZM47 47H86V109H47V47ZM134 71H95V109H134V71Z"
                        fill="#E2E2E2"
                      />
                    </svg>
                  </span>
                </span>
              </NavLink>
            </Col>
            <Col
              sm={6} md={4} lg={3} xl={2}
              data-aos="fade-up"
            >
              <NavLink to="/portfolio-col-4-style-1" className="card card-demo">
                <span className="card-img d-flex align-items-center justify-content-center flex-column">
                  <span className="p-18">
                    <svg
                      width="134"
                      height="109"
                      viewBox="0 0 134 109"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M29 0H0V32H29V0ZM29 38H0V71H29V38ZM0 77H29V109H0V77ZM64 0H35V32H64V0ZM35 38H64V71H35V38ZM64 77H35V109H64V77ZM70 0H99V32H70V0ZM99 38H70V71H99V38ZM70 77H99V109H70V77ZM134 0H105V32H134V0ZM105 38H134V71H105V38ZM134 77H105V109H134V77Z"
                        fill="#E2E2E2"
                      />
                    </svg>
                  </span>
                </span>
              </NavLink>
            </Col>
          </Row>
          <div
            className="text-center mt-40 pt-10"
            data-show-distance="20"
            data-aos="fade-up"
          >
            <NavLink
              to="/#"
              className="font-size-18 fw-medium text-decoration-none"
            >
              and more... 🔥
            </NavLink>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Work;
