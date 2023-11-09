import React from "react";
import { Container } from "reactstrap";
import Footer from "../Layouts/CommonLayouts/Footer2";
import Navbar from "../Layouts/CommonLayouts/Navbar4";
import { Link } from "react-router-dom";
const Page404 = () => {
  //meta title
  document.title = "Themebau | 404";
  return (
    <React.Fragment>
      <Navbar navClass="navbar-fixed" styleClass="2" />
      <div className="content-wrap" id="content-wrap">
        <div className="py-160 text-center">
          <Container className="shape-parent">
            <div className="shape mt-n160 ms-30">
              <svg
                className="mt-n160"
                width="500"
                height="318"
                viewBox="0 0 500 318"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="250" cy="68" r="250" fill="#F5F5F5" />
              </svg>
            </div>
            <div className="lines-style-6">
              <div className="line" data-show-origin="right"></div>
              <div className="line"></div>
            </div>
            <h1 className="display-3 mb-12 mt-2" data-aos="fade-up">
              404
            </h1>
            <p className="h3 mb-10" data-aos="fade-up">
              Page not found 😿
            </p>
            <p className="mb-40 pb-2" data-aos="fade-up">
              Perhaps you would like to go to our home page?
            </p>
            <Link
              to="/home"
              className="btn btn-dark btn-with-ball mb-15"
              data-aos="fade-up"
            >
              go to home
              <span className="btn-ball" style={{ transform: "translateY(0px)" }}></span>
            </Link>
          </Container>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Page404;
