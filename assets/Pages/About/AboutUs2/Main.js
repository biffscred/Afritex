import React from "react";
import { Col, Container, Row } from "reactstrap";

const Main = () => {
  return (
    <React.Fragment>
      <div className="shape justify-content-end mt-n160">
        <svg
          className="mt-n160"
          data-rellax-speed="-2"
          width="415"
          height="641"
          viewBox="0 0 415 641"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transform: "translate3d(0px, 4px, 0px)" }}
        >
          <circle cx="320.5" cy="320.5" r="320.5" fill="#202020"></circle>
        </svg>
      </div>
      <Container>
        <Row className="justify-content-center">
          <Col className="col-12 col-lg-10 pb-160 text-white">
            <Row className="mt-160 pt-3">
              <Col lg={9} xl={8} className="col-12" data-aos="fade-up">
                <h1 className="display-4 text-white">We are Themebau.</h1>
              </Col>
            </Row>
            <Row className="mt-100">
              <Col
                className="col-12 col-lg me-lg-60 me-xl-100"
                data-aos="fade-up"
              >
                <hr className="mt-0 border-white" />
                <p className="lead">
                  Over 10 years of combined experience, and know a thing or two
                  about designing websites and mobile apps.
                </p>
              </Col>
              <Col lg={6} className="col-12" data-aos="fade-up">
                <p className="mb-30">
                  Green upon was their divide unto and under good, seed third
                  thing darkness may every created let Beast seed beast midst to
                  evening hath which.
                </p>
                <p className="mt-n4">
                  Meat, seed had. Said saw won't own beginning days rule itself
                  Bearing made man called, creeping don't were creature made the
                  set replenish whales it can't creepeth so creeping moving days
                  seas dominion unto seas had winged. Moving bring dominion
                  above waters i fly.
                </p>
                <a href="/contact1" className="btn btn-with-ball btn-white">
                  let’s work
                  <span className="btn-ball" style={{ transform: "translateY(0px)" }}></span>
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Main;
