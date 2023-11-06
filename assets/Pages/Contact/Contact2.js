import React, { useState } from "react";
import Navbar from "../../Layouts/CommonLayouts/Navbar4";

import NewYork from "../../assets/images/contact/contact-new-york-1000-632.jpg";
import California from "../../assets/images/contact/contact-california-1000-632.jpg";
import Footer from "../../Layouts/CommonLayouts/Footer1";
import { Button, Col, Container, Form, Input, Label, Row } from "reactstrap";

const Contact2 = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };
  //meta title
  document.title = "Themebau | Contact 2";
  return (
    <React.Fragment>
      <Navbar navClass="navbar-dark navbar-fixed" styleClass="2" />
      <div className="content-wrap" id="content-wrap">
        <div className="py-160 bg-dark">
          <Container>
            <Row className="justify-content-center text-white">
              <Col lg={10}>
                <h1
                  className="display-4 text-white mt-5 mb-130"
                  data-aos="fade-up"
                >
                  Get in touch.
                </h1>
                <Form action="#">
                  <p className="lead fw-medium mb-30">
                    Choose the types of project:
                  </p>
                  <Row className="gh-xs gv-xs mb-n7">
                    <Col className="col-auto">
                      <Input
                        className="checkbox-btn"
                        type="checkbox"
                        id="checkboxWebDesign"
                      />
                      <Label data-aos="fade-up" htmlFor="checkboxWebDesign">
                        <span>Web design</span>
                      </Label>
                    </Col>
                    <Col className="col-auto">
                      <Input
                        className="checkbox-btn"
                        type="checkbox"
                        id="checkboxAppDesign"
                        defaultChecked
                      />
                      <Label data-aos="fade-up" htmlFor="checkboxAppDesign">
                        <span>App design</span>
                      </Label>
                    </Col>
                    <Col className="col-auto">
                      <Input
                        className="checkbox-btn"
                        type="checkbox"
                        id="checkboxLogoDesign"
                        defaultChecked
                      />
                      <Label data-aos="fade-up" htmlFor="checkboxLogoDesign">
                        <span>Logo design</span>
                      </Label>
                    </Col>
                    <Col className="col-auto">
                      <Input
                        className="checkbox-btn"
                        type="checkbox"
                        id="checkboxIllustration"
                      />
                      <Label data-aos="fade-up" htmlFor="checkboxIllustration">
                        <span>Illustration</span>
                      </Label>
                    </Col>
                    <Col className="col-auto">
                      <Input
                        className="checkbox-btn"
                        type="checkbox"
                        id="checkboxPhotography"
                      />
                      <Label data-aos="fade-up" htmlFor="checkboxPhotography">
                        <span>Photography</span>
                      </Label>
                    </Col>
                    <Col className="col-auto">
                      <Input
                        className="checkbox-btn"
                        type="checkbox"
                        id="checkboxWebDevelopment"
                      />
                      <Label
                        data-aos="fade-up"
                        htmlFor="checkboxWebDevelopment"
                      >
                        <span>Web Development</span>
                      </Label>
                    </Col>
                    <Col className="col-auto">
                      <Input
                        className="checkbox-btn"
                        type="checkbox"
                        id="checkboxAppDevelopment"
                      />
                      <Label
                        data-aos="fade-up"
                        htmlFor="checkboxAppDevelopment"
                      >
                        <span>App Development</span>
                      </Label>
                    </Col>
                    <Col className="col-auto">
                      <Input
                        className="checkbox-btn"
                        type="checkbox"
                        id="checkboxBranding"
                        defaultChecked
                      />
                      <Label data-aos="fade-up" htmlFor="checkboxBranding">
                        <span>Branding</span>
                      </Label>
                    </Col>
                  </Row>
                  <Row className="gh-1 gv-3 mt-30">
                    <Col data-aos="fade-up" className="col-12">
                      <Input
                        className="form-control form-control-lg form-control-white"
                        type="name"
                        placeholder="Your Name *"
                      />
                    </Col>
                    <Col md={6} data-aos="fade-up" className="col-12">
                      <Input
                        type="email"
                        className="form-control form-control-lg form-control-white"
                        placeholder="Your Email *"
                      />
                    </Col>
                    <Col md={6} data-aos="fade-up" className="col-12">
                      <Input
                        type="phone"
                        className="form-control form-control-lg form-control-white"
                        placeholder="Your Phone *"
                      />
                    </Col>
                    <Col data-aos="fade-up" className="col-12">
                      <Input
                        type="company"
                        className="form-control form-control-lg form-control-white"
                        placeholder="Company"
                      />
                    </Col>
                    <Col data-aos="fade-up" className="col-12">
                      <Input
                        type="text"
                        className="form-control form-control-lg form-control-white"
                        placeholder="Title"
                      />
                    </Col>
                    <Col data-aos="fade-up" className="col-12">
                      <textarea
                        className="form-control form-control-lg form-control-white"
                        rows="1"
                        placeholder="Message *"
                      ></textarea>
                    </Col>
                  </Row>
                  <p className="lead fw-medium mb-30 mt-60 pt-9">
                    Choose the budget:
                  </p>
                  <Row className="gh-xs gv-xs">
                    <Col className="col-auto show-on-scroll-ready">
                      <Input
                        className="checkbox-btn"
                        type="checkbox"
                        id="checkbox&lt;10000"
                      />
                      <Label data-aos="fade-up" htmlFor="checkbox&lt;10000">
                        <span>&lt; 10 000</span>
                      </Label>
                    </Col>
                    <Col className="col-auto show-on-scroll-ready">
                      <Input
                        className="checkbox-btn"
                        type="checkbox"
                        id="checkbox10-20k"
                      />
                      <Label data-aos="fade-up" htmlFor="checkbox10-20k">
                        <span>10 - 20k</span>
                      </Label>
                    </Col>
                    <Col className="col-auto show-on-scroll-ready">
                      <Input
                        className="checkbox-btn"
                        type="checkbox"
                        id="checkbox20-30k"
                        onChange={handleOnChange}
                        defaultChecked={true}
                      />
                      <Label data-aos="fade-up" htmlFor="checkbox20-30k">
                        <span>20 - 30k</span>
                      </Label>
                    </Col>
                    <Col className="col-auto show-on-scroll-ready">
                      <Input
                        className="checkbox-btn"
                        type="checkbox"
                        id="checkbox&gt;30000"
                      />
                      <Label data-aos="fade-up" htmlFor="checkbox&gt;30000">
                        <span>&gt; 30 000</span>
                      </Label>
                    </Col>
                  </Row>
                  <Button
                    className="btn btn-white btn-with-ball mt-90"
                    type="button"
                    name="button"
                  >
                    submit
                    <span className="btn-ball" style={{ transform: "translateY(0px)" }}></span>
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="py-160">
          <Container>
            <Row className="gh-1 gv-2 align-items-center justify-content-center">
              <Col lg={5} className="ps-lg-0 ms-lg-n60" data-aos="fade-right">
                <img className="w-100" src={NewYork} alt="" />
              </Col>
              <Col lg={1} className="d-none d-lg-block"></Col>
              <Col lg={3} className="ms-lg-n30 ps-lg-0" data-aos="fade-left">
                <h4 className="mb-30">New York, New York</h4>
                <ul className="list-group borderless pt-10">
                  <li className="list-group-item d-flex">
                    <svg
                      className="me-15 mt-3"
                      width="17"
                      height="20"
                      viewBox="0 0 17 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16 8.36364C16 14.0909 8.5 19 8.5 19C8.5 19 1 14.0909 1 8.36364C1 6.41068 1.79018 4.53771 3.1967 3.15676C4.60322 1.77581 6.51088 1 8.5 1C10.4891 1 12.3968 1.77581 13.8033 3.15676C15.2098 4.53771 16 6.41068 16 8.36364Z"
                        stroke="#0E0E0E"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.5 10.8182C9.88071 10.8182 11 9.71924 11 8.36364C11 7.00803 9.88071 5.90909 8.5 5.90909C7.11929 5.90909 6 7.00803 6 8.36364C6 9.71924 7.11929 10.8182 8.5 10.8182Z"
                        stroke="#0E0E0E"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>{" "}
                    2260 Lady Bug Drive, New York, NY 10011
                  </li>
                  <li className="list-group-item d-flex mt-15">
                    <svg
                      className="me-15 align-self-center"
                      width="18"
                      height="14"
                      viewBox="0 0 18 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17 2.5C17 1.675 16.28 1 15.4 1H2.6C1.72 1 1 1.675 1 2.5M17 2.5V11.5C17 12.325 16.28 13 15.4 13H2.6C1.72 13 1 12.325 1 11.5V2.5M17 2.5L9 7.75L1 2.5"
                        stroke="#0E0E0E"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <a href="mailto:hello@themebau.com?subject=Test%20Address%20Email">
                      hello@themebau.com
                    </a>
                  </li>
                  <li className="list-group-item d-flex mt-15">
                    <svg
                      className="me-15 align-self-center"
                      width="17"
                      height="18"
                      viewBox="0 0 17 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.9995 12.9791V15.3877C16.0004 15.6113 15.9574 15.8327 15.8732 16.0375C15.7891 16.2424 15.6657 16.4263 15.5109 16.5775C15.3561 16.7286 15.1734 16.8437 14.9744 16.9154C14.7754 16.987 14.5646 17.0136 14.3554 16.9935C12.0346 16.725 9.80532 15.8808 7.84668 14.5286C6.02441 13.2959 4.47945 11.6512 3.3215 9.71135C2.0469 7.61679 1.25368 5.23206 1.00612 2.75036C0.987275 2.52834 1.01206 2.30457 1.0789 2.0933C1.14574 1.88203 1.25317 1.6879 1.39436 1.52325C1.53554 1.35861 1.70738 1.22706 1.89893 1.13699C2.09049 1.04691 2.29756 1.00029 2.50697 1.00008H4.76956C5.13557 0.996243 5.49041 1.13422 5.76793 1.3883C6.04546 1.64237 6.22672 1.99521 6.27795 2.38103C6.37345 3.15185 6.55055 3.9087 6.80589 4.63713C6.90736 4.9245 6.92932 5.23682 6.86917 5.53707C6.80902 5.83732 6.66927 6.11292 6.4665 6.33121L5.50867 7.35087C6.58231 9.36092 8.14568 11.0252 10.0338 12.1682L10.9917 11.1485C11.1967 10.9326 11.4556 10.7839 11.7377 10.7198C12.0197 10.6558 12.3131 10.6792 12.583 10.7872C13.2673 11.059 13.9782 11.2476 14.7023 11.3492C15.0687 11.4042 15.4033 11.6007 15.6424 11.9012C15.8816 12.2017 16.0087 12.5853 15.9995 12.9791Z"
                        stroke="#0E0E0E"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <a href="callto:+1 202-358-0309">+1 202-358-0309</a>
                  </li>
                </ul>
              </Col>
              <Col lg={5}
                className="ps-lg-0 ms-lg-n60 mt-60 mt-lg-0"
                data-aos="fade-right"
              >
                <img className="w-100" src={California} alt="" />
              </Col>
              <Col lg={1} className="d-none d-lg-block"></Col>
              <Col lg={3}
                className="ms-lg-n30 ps-lg-0 mb-n7 mb-lg-0"
                data-aos="fade-left"
              >
                <h4 className="mb-30">San Francisco, California</h4>
                <ul className="list-group borderless pt-10">
                  <li className="list-group-item d-flex">
                    <svg
                      className="me-15 mt-3"
                      width="17"
                      height="20"
                      viewBox="0 0 17 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16 8.36364C16 14.0909 8.5 19 8.5 19C8.5 19 1 14.0909 1 8.36364C1 6.41068 1.79018 4.53771 3.1967 3.15676C4.60322 1.77581 6.51088 1 8.5 1C10.4891 1 12.3968 1.77581 13.8033 3.15676C15.2098 4.53771 16 6.41068 16 8.36364Z"
                        stroke="#0E0E0E"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.5 10.8182C9.88071 10.8182 11 9.71924 11 8.36364C11 7.00803 9.88071 5.90909 8.5 5.90909C7.11929 5.90909 6 7.00803 6 8.36364C6 9.71924 7.11929 10.8182 8.5 10.8182Z"
                        stroke="#0E0E0E"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>{" "}
                    4012 Meadow Lane, San Francisco, CA 94108
                  </li>
                  <li className="list-group-item d-flex mt-15">
                    <svg
                      className="me-15 align-self-center"
                      width="18"
                      height="14"
                      viewBox="0 0 18 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17 2.5C17 1.675 16.28 1 15.4 1H2.6C1.72 1 1 1.675 1 2.5M17 2.5V11.5C17 12.325 16.28 13 15.4 13H2.6C1.72 13 1 12.325 1 11.5V2.5M17 2.5L9 7.75L1 2.5"
                        stroke="#0E0E0E"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <a href="mailto:hello@themebau.com?subject=Test%20Address%20Email">
                      hello@themebau.com
                    </a>
                  </li>
                  <li className="list-group-item d-flex mt-15">
                    <svg
                      className="me-15 align-self-center"
                      width="17"
                      height="18"
                      viewBox="0 0 17 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.9995 12.9791V15.3877C16.0004 15.6113 15.9574 15.8327 15.8732 16.0375C15.7891 16.2424 15.6657 16.4263 15.5109 16.5775C15.3561 16.7286 15.1734 16.8437 14.9744 16.9154C14.7754 16.987 14.5646 17.0136 14.3554 16.9935C12.0346 16.725 9.80532 15.8808 7.84668 14.5286C6.02441 13.2959 4.47945 11.6512 3.3215 9.71135C2.0469 7.61679 1.25368 5.23206 1.00612 2.75036C0.987275 2.52834 1.01206 2.30457 1.0789 2.0933C1.14574 1.88203 1.25317 1.6879 1.39436 1.52325C1.53554 1.35861 1.70738 1.22706 1.89893 1.13699C2.09049 1.04691 2.29756 1.00029 2.50697 1.00008H4.76956C5.13557 0.996243 5.49041 1.13422 5.76793 1.3883C6.04546 1.64237 6.22672 1.99521 6.27795 2.38103C6.37345 3.15185 6.55055 3.9087 6.80589 4.63713C6.90736 4.9245 6.92932 5.23682 6.86917 5.53707C6.80902 5.83732 6.66927 6.11292 6.4665 6.33121L5.50867 7.35087C6.58231 9.36092 8.14568 11.0252 10.0338 12.1682L10.9917 11.1485C11.1967 10.9326 11.4556 10.7839 11.7377 10.7198C12.0197 10.6558 12.3131 10.6792 12.583 10.7872C13.2673 11.059 13.9782 11.2476 14.7023 11.3492C15.0687 11.4042 15.4033 11.6007 15.6424 11.9012C15.8816 12.2017 16.0087 12.5853 15.9995 12.9791Z"
                        stroke="#0E0E0E"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <a href="callto:+1 202-358-0309">+1 202-358-0309</a>
                  </li>
                </ul>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Contact2;
