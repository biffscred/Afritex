import React from "react";
import { Col, Container, Row } from "reactstrap";

import Responsive from "../../assets/images/demos/responsive-1200-1070.jpg";
import Themebau from "../../assets/images/demos/themebau-460-520.jpg";

const Features = () => {
  return (
    <React.Fragment>
      <div
        className="pt-70 overflow-hidden"
        style={{ backgroundColor: "#f5f5f5" }}
      >
        <Container>
          <Row>
            <Col className="col-lg-1 d-none d-lg-block order-lg-2"></Col>
            <Col
              className="col-lg-5 col-xl-4 pt-100 pb-60 pb-lg-160 order-lg-3"
              data-aos="fade-left"
            >
              <h2 className="h3">Fully responsive and retina ready 👑</h2>
              <p>
                Themebau is designed to look great on desktop computers, tablets
                and mobile devices. Every element 100% responsive & retina
                ready.
              </p>
            </Col>
            <Col className="col-lg-6 order-lg-1" data-aos="fade-right">
              <img className="w-100 mb-n60" src={Responsive} alt="" />
            </Col>
          </Row>
        </Container>
      </div>
      <div className="py-160">
        <Container>
          <Row className="gh-1 gv-3">
            <Col md={6} lg={4}>
              <div className="feature">
                <div className="feature-icon" data-aos="fade-up">
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
                    width="17"
                    height="23"
                    viewBox="0 0 17 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 11.5H10.2308C11.4548 11.5 12.6288 10.9469 13.4943 9.96231C14.3599 8.97774 14.8462 7.64239 14.8462 6.25C14.8462 4.85761 14.3599 3.52226 13.4943 2.53769C12.6288 1.55312 11.4548 1 10.2308 1H1V11.5ZM1 11.5H11.3846C12.6087 11.5 13.7826 12.0531 14.6482 13.0377C15.5137 14.0223 16 15.3576 16 16.75C16 18.1424 15.5137 19.4777 14.6482 20.4623C13.7826 21.4469 12.6087 22 11.3846 22H1V11.5Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="feature-body" data-aos="fade-up">
                  <h4 className="feature-title">Bootstrap 4</h4>
                  <p className="feature-text">
                    Themebau based on Bootstrap 4, so layout changes is so much
                    easily.
                  </p>
                </div>
              </div>
            </Col>
            <Col md={6} lg={4}>
              <div className="feature">
                <div className="feature-icon" data-aos="fade-up">
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
                    width="25"
                    height="21"
                    viewBox="0 0 25 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.39014 19.6899V12.6899M4.39014 8.68994V1.68994M12.3901 19.6899V10.6899M12.3901 6.68994V1.68994M20.3901 19.6899V14.6899M20.3901 10.6899V1.68994M1.39014 12.6899H7.39014M9.39014 6.68994H15.3901M17.3901 14.6899H23.3901"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="feature-body" data-aos="fade-up">
                  <h4 className="feature-title">Sass Available</h4>
                  <p className="feature-text">
                    Easy customization with SASS variables. You can change
                    colors, typography and more.
                  </p>
                </div>
              </div>
            </Col>
            <Col md={6} lg={4}>
              <div className="feature" data-aos="fade-up">
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
                    width="17"
                    height="25"
                    viewBox="0 0 17 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.5 1H4.75C3.75544 1 2.80161 1.40387 2.09835 2.12276C1.39509 2.84165 1 3.81667 1 4.83333C1 5.85 1.39509 6.82502 2.09835 7.54391C2.80161 8.2628 3.75544 8.66667 4.75 8.66667M8.5 1V8.66667M8.5 1H12.25C12.7425 1 13.2301 1.09915 13.6851 1.2918C14.14 1.48444 14.5534 1.7668 14.9017 2.12276C15.2499 2.47872 15.5261 2.9013 15.7145 3.36638C15.903 3.83146 16 4.32993 16 4.83333C16 5.33673 15.903 5.83521 15.7145 6.30029C15.5261 6.76537 15.2499 7.18795 14.9017 7.54391C14.5534 7.89987 14.14 8.18223 13.6851 8.37487C13.2301 8.56751 12.7425 8.66667 12.25 8.66667M8.5 8.66667H4.75M8.5 8.66667H12.25M8.5 8.66667V16.3333M4.75 8.66667C3.75544 8.66667 2.80161 9.07053 2.09835 9.78942C1.39509 10.5083 1 11.4833 1 12.5C1 13.5167 1.39509 14.4917 2.09835 15.2106C2.80161 15.9295 3.75544 16.3333 4.75 16.3333M12.25 8.66667C11.7575 8.66667 11.2699 8.76582 10.8149 8.95846C10.36 9.1511 9.94657 9.43347 9.59835 9.78942C9.25013 10.1454 8.97391 10.568 8.78545 11.033C8.597 11.4981 8.5 11.9966 8.5 12.5C8.5 13.0034 8.597 13.5019 8.78545 13.967C8.97391 14.432 9.25013 14.8546 9.59835 15.2106C9.94657 15.5665 10.36 15.8489 10.8149 16.0415C11.2699 16.2342 11.7575 16.3333 12.25 16.3333C12.7425 16.3333 13.2301 16.2342 13.6851 16.0415C14.14 15.8489 14.5534 15.5665 14.9017 15.2106C15.2499 14.8546 15.5261 14.432 15.7145 13.967C15.903 13.5019 16 13.0034 16 12.5C16 11.9966 15.903 11.4981 15.7145 11.033C15.5261 10.568 15.2499 10.1454 14.9017 9.78942C14.5534 9.43347 14.14 9.1511 13.6851 8.95846C13.2301 8.76582 12.7425 8.66667 12.25 8.66667ZM4.75 16.3333C3.75544 16.3333 2.80161 16.7372 2.09835 17.4561C1.39509 18.175 1 19.15 1 20.1667C1 21.1833 1.39509 22.1584 2.09835 22.8772C2.80161 23.5961 3.75544 24 4.75 24C5.74456 24 6.69839 23.5961 7.40165 22.8772C8.10491 22.1584 8.5 21.1833 8.5 20.1667V16.3333M4.75 16.3333H8.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="feature-body" data-aos="fade-up">
                  <h4 className="feature-title">Figma Files Included</h4>
                  <p className="feature-text">
                    We provided a source Figma file with Themebau.
                  </p>
                </div>
              </div>
            </Col>
            <Col md={6} lg={4}>
              <div className="feature">
                <div className="feature-icon" data-aos="fade-up">
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
                    width="23"
                    height="20"
                    viewBox="0 0 23 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.3807 2.59133C19.8676 2.08683 19.2583 1.68663 18.5878 1.41358C17.9172 1.14054 17.1985 1 16.4727 1C15.7468 1 15.0281 1.14054 14.3576 1.41358C13.687 1.68663 13.0778 2.08683 12.5646 2.59133L11.4997 3.63785L10.4348 2.59133C9.39834 1.57276 7.99258 1.00053 6.52679 1.00053C5.06099 1.00053 3.65523 1.57276 2.61876 2.59133C1.58229 3.6099 1 4.99139 1 6.43187C1 7.87235 1.58229 9.25383 2.61876 10.2724L11.4997 19L20.3807 10.2724C20.8941 9.76814 21.3013 9.16942 21.5791 8.51045C21.857 7.85148 22 7.14517 22 6.43187C22 5.71857 21.857 5.01225 21.5791 4.35328C21.3013 3.69431 20.8941 3.09559 20.3807 2.59133Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="feature-body" data-aos="fade-up">
                  <h4 className="feature-title">Modern Design</h4>
                  <p className="feature-text">
                    High usability, organizing content, fully responsive design
                    as per latest design trends.
                  </p>
                </div>
              </div>
            </Col>
            <Col md={6} lg={4}>
              <div className="feature">
                <div className="feature-icon" data-aos="fade-up">
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
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.799 8.7C9.05761 7.96483 9.56807 7.34492 10.24 6.95005C10.9118 6.55518 11.7018 6.41083 12.4699 6.54258C13.238 6.67433 13.9347 7.07368 14.4366 7.66988C14.9385 8.26609 15.2132 9.02067 15.212 9.8C15.212 12 11.912 13.1 11.912 13.1M12 17.5H12.011M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="feature-body" data-aos="fade-up">
                  <h4 className="feature-title">Customer Support</h4>
                  <p className="feature-text">
                    We are here to help you if you have any queries about
                    template.
                  </p>
                </div>
              </div>
            </Col>
            <Col md={6} lg={4}>
              <div className="feature">
                <div className="feature-icon" data-aos="fade-up">
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
                    width="23"
                    height="20"
                    viewBox="0 0 23 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 1.9979V7.99947M22 7.99947H16.2727M22 7.99947L17.5709 3.63833C16.545 2.56276 15.2758 1.77704 13.8818 1.3545C12.4877 0.931957 11.0142 0.886355 9.59882 1.22195C8.1834 1.55755 6.87217 2.2634 5.78749 3.27365C4.70281 4.2839 3.88002 5.56562 3.39591 6.99921M1 18.0021V12.0005M1 12.0005H6.72727M1 12.0005L5.42909 16.3617C6.45499 17.4372 7.72417 18.223 9.11823 18.6455C10.5123 19.068 11.9858 19.1136 13.4012 18.778C14.8166 18.4425 16.1278 17.7366 17.2125 16.7263C18.2972 15.7161 19.12 14.4344 19.6041 13.0008"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="feature-body" data-aos="fade-up">
                  <h4 className="feature-title">Regular Updates</h4>
                  <p className="feature-text">
                    Lifetime reliable and regular updates with your purchase.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="py-130 bg-dark overflow-hidden shape-parent">
        <div className="shape justify-content-end mt-n130">
          <svg
            className="mt-n160 me-n60"
            width="640"
            height="640"
            viewBox="0 0 640 640"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="320" cy="320" r="320" fill="#202020" />
          </svg>
        </div>
        <Container>
          <Row className="gh-1 gv-xs mt-n30" data-aos="fade-up">
            <Col md={6} lg={4} className="col-12">
              <Row className="gh-xs mt-25">
                <Col className="col-auto">
                  <svg
                    className="mt-n4"
                    width="19"
                    height="18"
                    viewBox="0 0 19 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.5 1L12.1265 6.26604L18 7.11567L13.75 11.2124L14.753 17L9.5 14.266L4.247 17L5.25 11.2124L1 7.11567L6.8735 6.26604L9.5 1Z"
                      stroke="white"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Col>
                <Col className="col">
                  <h6 className="font-size-16 mb-5 text-white">
                    11 Homepage variations
                  </h6>
                </Col>
              </Row>
              <Row className="gh-xs mt-25">
                <Col className="col-auto">
                  <svg
                    className="mt-n4"
                    width="19"
                    height="18"
                    viewBox="0 0 19 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.5 1L12.1265 6.26604L18 7.11567L13.75 11.2124L14.753 17L9.5 14.266L4.247 17L5.25 11.2124L1 7.11567L6.8735 6.26604L9.5 1Z"
                      stroke="white"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Col>
                <Col className="col">
                  <h6 className="font-size-16 mb-5 text-white">
                    19 Portfolio styles &amp; 6 Single Projects pages
                  </h6>
                </Col>
              </Row>
              <Row className="gh-xs mt-25">
                <Col className="col-auto">
                  <svg
                    className="mt-n4"
                    width="19"
                    height="18"
                    viewBox="0 0 19 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.5 1L12.1265 6.26604L18 7.11567L13.75 11.2124L14.753 17L9.5 14.266L4.247 17L5.25 11.2124L1 7.11567L6.8735 6.26604L9.5 1Z"
                      stroke="white"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Col>
                <Col className="col">
                  <h6 className="font-size-16 mb-5 text-white">
                    4 Menu &amp; 3 Footer styles
                  </h6>
                </Col>
              </Row>
              <Row className="gh-xs mt-25">
                <Col className="col-auto">
                  <svg
                    className="mt-n4"
                    width="19"
                    height="18"
                    viewBox="0 0 19 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.5 1L12.1265 6.26604L18 7.11567L13.75 11.2124L14.753 17L9.5 14.266L4.247 17L5.25 11.2124L1 7.11567L6.8735 6.26604L9.5 1Z"
                      stroke="white"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Col>
                <Col className="col">
                  <h6 className="font-size-16 mb-5 text-white">
                    Creative Blog &amp; Inner pages
                  </h6>
                </Col>
              </Row>
              <Row className="gh-xs mt-25">
                <div className="col-auto">
                  <svg
                    className="mt-n4"
                    width="19"
                    height="18"
                    viewBox="0 0 19 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.5 1L12.1265 6.26604L18 7.11567L13.75 11.2124L14.753 17L9.5 14.266L4.247 17L5.25 11.2124L1 7.11567L6.8735 6.26604L9.5 1Z"
                      stroke="white"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <Col className="col">
                  <h6 className="font-size-16 mb-5 text-white">
                    100% Responsive &amp; Retina ready
                  </h6>
                </Col>
              </Row>
            </Col>
            <Col lg={4} md={6} className="col-12" data-aos="fade-up">
              <Row className="gh-xs mt-25">
                <Col className="col-auto">
                  <svg
                    className="mt-n4"
                    width="19"
                    height="18"
                    viewBox="0 0 19 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.5 1L12.1265 6.26604L18 7.11567L13.75 11.2124L14.753 17L9.5 14.266L4.247 17L5.25 11.2124L1 7.11567L6.8735 6.26604L9.5 1Z"
                      stroke="white"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Col>
                <Col className="col">
                  <h6 className="font-size-16 mb-5 text-white">
                    Gulp Tooling to automate the Workflow
                  </h6>
                </Col>
              </Row>
              <Row className="gh-xs mt-25">
                <Col className="col-auto">
                  <svg
                    className="mt-n4"
                    width="19"
                    height="18"
                    viewBox="0 0 19 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.5 1L12.1265 6.26604L18 7.11567L13.75 11.2124L14.753 17L9.5 14.266L4.247 17L5.25 11.2124L1 7.11567L6.8735 6.26604L9.5 1Z"
                      stroke="white"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Col>
                <Col className="col">
                  <h6 className="font-size-16 mb-5 text-white">W3C v/alid</h6>
                </Col>
              </Row>
              <Row className="gh-xs mt-25">
                <Col className="col-auto">
                  <svg
                    className="mt-n4"
                    width="19"
                    height="18"
                    viewBox="0 0 19 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.5 1L12.1265 6.26604L18 7.11567L13.75 11.2124L14.753 17L9.5 14.266L4.247 17L5.25 11.2124L1 7.11567L6.8735 6.26604L9.5 1Z"
                      stroke="white"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Col>
                <Col className="col">
                  <h6 className="font-size-16 mb-5 text-white">
                    Easy customization/ via classes &amp; attributes
                  </h6>
                </Col>
              </Row>
              <Row className="gh-xs mt-25">
                <Col className="col-auto">
                  <svg
                    className="mt-n4"
                    width="19"
                    height="18"
                    viewBox="0 0 19 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.5 1L12.1265 6.26604L18 7.11567L13.75 11.2124L14.753 17L9.5 14.266L4.247 17L5.25 11.2124L1 7.11567L6.8735 6.26604L9.5 1Z"
                      stroke="white"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Col>
                <Col className="col">
                  <h6 className="font-size-16 mb-5 text-white">
                    Smooth Animations
                  </h6>
                </Col>
              </Row>
              <Row className="gh-xs mt-25">
                <Col className="col-auto">
                  <svg
                    className="mt-n4"
                    width="19"
                    height="18"
                    viewBox="0 0 19 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.5 1L12.1265 6.26604L18 7.11567L13.75 11.2124L14.753 17L9.5 14.266L4.247 17L5.25 11.2124L1 7.11567L6.8735 6.26604L9.5 1Z"
                      stroke="white"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Col>
                <Col className="col">
                  <h6 className="font-size-16 mb-5 text-white">
                    Smooth Parallax for images &amp; videos
                  </h6>
                </Col>
              </Row>
            </Col>
            <Col
              md={6} lg={4} xl={3}
              className="col-12"
              data-aos="fade-up"
            >
              <Row className="gh-xs mt-25">
                <Col className="col-auto">
                  <svg
                    className="mt-n4"
                    width="19"
                    height="18"
                    viewBox="0 0 19 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.5 1L12.1265 6.26604L18 7.11567L13.75 11.2124L14.753 17L9.5 14.266L4.247 17L5.25 11.2124L1 7.11567L6.8735 6.26604L9.5 1Z"
                      stroke="white"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Col>
                <Col className="col">
                  <h6 className="font-size-16 mb-5 text-white">
                    Developers ready: Webpack, Gulp, SCSS, Nunjucks, NPM
                  </h6>
                </Col>
              </Row>
              <Row className="gh-xs mt-25">
                <Col className="col-auto">
                  <svg
                    className="mt-n4"
                    width="19"
                    height="18"
                    viewBox="0 0 19 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.5 1L12.1265 6.26604L18 7.11567L13.75 11.2124L14.753 17L9.5 14.266L4.247 17L5.25 11.2124L1 7.11567L6.8735 6.26604L9.5 1Z"
                      stroke="white"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Col>
                <Col className="col">
                  <h6 className="font-size-16 mb-5 text-white">Google Fonts</h6>
                </Col>
              </Row>
              <Row className="gh-xs mt-25">
                <Col className="col-auto">
                  <svg
                    className="mt-n4"
                    width="19"
                    height="18"
                    viewBox="0 0 19 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.5 1L12.1265 6.26604L18 7.11567L13.75 11.2124L14.753 17L9.5 14.266L4.247 17L5.25 11.2124L1 7.11567L6.8735 6.26604L9.5 1Z"
                      stroke="white"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Col>
                <Col className="col">
                  <h6 className="font-size-16 mb-5 text-white">
                    Included gener/ated version (ready to use without developer
                    tools)
                  </h6>
                </Col>
              </Row>
              <Row className="gh-xs mt-25">
                <Col className="col-auto">
                  <svg
                    className="mt-n4"
                    width="19"
                    height="18"
                    viewBox="0 0 19 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.5 1L12.1265 6.26604L18 7.11567L13.75 11.2124L14.753 17L9.5 14.266L4.247 17L5.25 11.2124L1 7.11567L6.8735 6.26604L9.5 1Z"
                      stroke="white"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Col>
                <div className="col">
                  <h6 className="font-size-16 mb-5 text-white">Google Maps</h6>
                </div>
              </Row>
            </Col>
          </Row>
          <div className="text-center mt-70 pt-3 mb-n8" data-aos="fade-up">
            <a
              href="/#"
              className="text-white font-size-18 fw-medium text-decoration-none"
            >
              and more... 🔥
            </a>
          </div>
        </Container>
      </div>
      <div className="pt-100 mt-3 pb-130 text-center text-md-start">
        <Container>
          <Row className="gv-1 align-items-center justify-content-center justify-content-md-between">
            <Col md={10} className="me-md-auto">
              <div className="interactive-links">
                <img
                  className="interactive-links-image"
                  src={Themebau}
                  width="230"
                  alt=""
                />
                <a
                  href="https://themes.getbootstrap.com/product/themebau/"
                  className="nav-link display-4"
                >
                  <u>Get Themebau</u>
                </a>
              </div>
            </Col>
            <Col className="col-auto">
              <a href="/home" className="btn btn-clean me-xl-100">
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
              </a>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Features;
