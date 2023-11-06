import React from "react";
import { NavLink } from "react-router-dom";
//Images
import Aboutus1 from "../../assets/images/demos/about-us-540-460.jpg";
import Aboutus2 from "../../assets/images/demos/about-us-2-540-460.jpg";
import Abouteme from "../../assets/images/demos/about-me-540-460.jpg";
import Service from "../../assets/images/demos/services-540-460.jpg";
import SingleService from "../../assets/images/demos/single-service-540-460.jpg";
import Contact1 from "../../assets/images/demos/contact-us-540-460.jpg";
import Contact2 from "../../assets/images/demos/contact-us-2-540-460.jpg";
import Blog1 from "../../assets/images/demos/404-540-460.jpg";
import Blog2 from "../../assets/images/demos/blog-540-460.jpg";
import Blog3 from "../../assets/images/demos/blog-2-540-460.jpg";
import SinglePost from "../../assets/images/demos/single-post-540-460.jpg";
import CommingSoon from "../../assets/images/demos/coming-soon-540-264.jpg";
import { Col, Container, Row } from "reactstrap";

const InnerPages = () => {
  return (
    <React.Fragment>
      <div className="py-160 overflow-hidden">
        <Container>
          <Row className="gh-1 mb-90">
            <Col lg={1}></Col>
            <Col lg={5} xl={4}>
              <h2 className="h3 mt-n9" data-aos="fade-right">
                Practical Inner pages for everything you may need.
              </h2>
            </Col>
            <Col className="col-lg-2 d-none d-xl-block"></Col>
            <Col lg={5} xl={4}>
              <p className="mt-n6 mb-0" data-aos="fade-left">
                Themebau is packed with set of practical inner pages for various
                uses. Choose your favorites & customize them to your needs.
              </p>
            </Col>
          </Row>
          <Row className="gh-1 gv-3 text-center">
            <Col
              sm={6} md={4} lg={3}
              className="col-6"
              data-aos="fade-up"
            >
              <NavLink to="/about-us" className="card card-demo">
                <span className="card-img box-shadow">
                  <img src={Aboutus1} alt="" />
                </span>
                <span className="card-body">
                  <span className="card-title h5">About Us</span>
                </span>
              </NavLink>
            </Col>
            <Col
              sm={6} md={4} lg={3}
              className="col-6"
              data-aos="fade-up"
            >
              <NavLink to="/about-us-2" className="card card-demo">
                <span className="card-img box-shadow">
                  <img src={Aboutus2} alt="" />
                </span>
                <span className="card-body">
                  <span className="card-title h5">About Us V.2</span>
                </span>
              </NavLink>
            </Col>
            <Col
              sm={6} md={4} lg={3}
              className="col-6"
              data-aos="fade-up"
            >
              <NavLink to="/about-me" className="card card-demo">
                <span className="card-img box-shadow">
                  <img src={Abouteme} alt="" />
                </span>
                <span className="card-body">
                  <span className="card-title h5">About Me</span>
                </span>
              </NavLink>
            </Col>
            <Col
              sm={6} md={4} lg={3}
              className="col-6"
              data-aos="fade-up"
            >
              <NavLink to="/services" className="card card-demo">
                <span className="card-img box-shadow">
                  <img src={Service} alt="" />
                </span>
                <span className="card-body">
                  <span className="card-title h5">Services</span>
                </span>
              </NavLink>
            </Col>
            <Col
              sm={6} md={4} lg={3}
              className="col-6"
              data-aos="fade-up"
            >
              <NavLink to="/single-service" className="card card-demo">
                <span className="card-img box-shadow">
                  <img src={SingleService} alt="" />
                </span>
                <span className="card-body">
                  <span className="card-title h5">Single Service</span>
                </span>
              </NavLink>
            </Col>
            <Col
              sm={6} md={4} lg={3}
              className="col-6"
              data-aos="fade-up"
            >
              <NavLink to="/contact1" className="card card-demo">
                <span className="card-img box-shadow">
                  <img src={Contact1} alt="" />
                </span>
                <span className="card-body">
                  <span className="card-title h5">Contact Us</span>
                </span>
              </NavLink>
            </Col>
            <Col
              sm={6} md={4} lg={3}
              className="col-6"
              data-aos="fade-up"
            >
              <NavLink to="/contact2" className="card card-demo">
                <span className="card-img box-shadow">
                  <img src={Contact2} alt="" />
                </span>
                <span className="card-body">
                  <span className="card-title h5">Contact Us V.2</span>
                </span>
              </NavLink>
            </Col>
            <Col
              sm={6} md={4} lg={3}
              className="col-6"
              data-aos="fade-up"
            >
              <NavLink to="/404" className="card card-demo">
                <span className="card-img box-shadow">
                  <img src={Blog1} alt="" />
                </span>
                <span className="card-body">
                  <span className="card-title h5">404 Page</span>
                </span>
              </NavLink>
            </Col>
            <Col
              sm={6} md={4} lg={3}
              className="col-6"
              data-aos="fade-up"
            >
              <NavLink to="/blog-col-3" className="card card-demo">
                <span className="card-img box-shadow">
                  <img src={Blog2} alt="" />
                </span>
                <span className="card-body">
                  <span className="card-title h5">Blog</span>
                </span>
              </NavLink>
            </Col>
            <Col
              sm={6} md={4} lg={3}
              className="col-6"
              data-aos="fade-up"
            >
              <NavLink to="/blog-col-1" className="card card-demo">
                <span className="card-img box-shadow">
                  <img src={Blog3} alt="" />
                </span>
                <span className="card-body">
                  <span className="card-title h5">Blog V.2</span>
                </span>
              </NavLink>
            </Col>
            <Col
              sm={6} md={4} lg={3}
              className="col-6"
              data-aos="fade-up"
            >
              <NavLink to="/singlepost" className="card card-demo">
                <span className="card-img box-shadow">
                  <img src={SinglePost} alt="" />
                </span>
                <span className="card-body">
                  <span className="card-title h5">Single Post</span>
                </span>
              </NavLink>
            </Col>
            <Col
              sm={6} md={4} lg={3}
              className="col-6"
              data-aos="fade-up"
            >
              <NavLink to="/coming-soon" className="card card-demo">
                <span className="card-img box-shadow">
                  <img src={CommingSoon} alt="" />
                </span>
                <span className="card-body">
                  <span className="card-title h5">Coming Soon</span>
                </span>
              </NavLink>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default InnerPages;
