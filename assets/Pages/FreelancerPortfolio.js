import React, { useEffect, useState } from "react";
import { Col, Container, NavLink, Row } from "reactstrap";
import { NavLink as RouterLink } from "react-router-dom";
import Footer from "../Layouts/CommonLayouts/Footer2";
import Navbar from "../Layouts/CommonLayouts/Navbar4";

import Avatar from "../assets/images/avatar/avatar-freelancer.jpg";
import Cool from "../assets/images/portfolio/cool-photography-1200-856.jpg";
import AppDesign from "../assets/images/portfolio/app-design-1200-856.jpg";
import BoxedWater from "../assets/images/portfolio/boxed-water-1200-856.jpg";
import Creative from "../assets/images/portfolio/creative-branding-1200-865.jpg";
import Mobile from "../assets/images/portfolio/mobile-app-1200-865.jpg";
import Package from "../assets/images/portfolio/package-design-1200-856.jpg";

const Data = [
  {
    id: 1,
    img: Cool,
    category: ["all", "branding"],
    title: "Cool Photography",
  },
  {
    id: 2,
    img: AppDesign,
    category: ["all", "design"],
    title: "App Design",
  },
  {
    id: 3,
    img: BoxedWater,
    category: ["all", "photography"],
    title: "Boxed Water",
  },
  {
    id: 4,
    img: Creative,
    category: ["all", "marketing"],
    title: "Creative Branding",
  },
  {
    id: 5,
    img: Mobile,
    category: ["all", "branding"],
    title: "Mobile App",
  },
  {
    id: 6,
    img: Package,
    category: ["all", "design"],
    title: "Package Design",
  },
];

const FreelancerPortfolio = () => {
  //meta title
  document.title = "Themebau | Freelancer Portfolio";
  const [filter, setFilter] = useState();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(Data);
  }, []);

  useEffect(() => {
    setProjects([]);

    const filtered = Data.map((p) => ({
      ...p,
      filtered: p.category.includes(filter),
    }));
    setProjects(filtered);
  }, [filter]);


  useEffect(() => {
    setFilter("all")
  }, [])
  return (
    <React.Fragment>
      <Navbar navClass="navbar-fixed" styleClass="3" />
      <div className="content-wrap" id="content-wrap">
        <Container>
          <div className="pt-60 pb-130 mt-30">
            <Row className="gh-1 gv-5 align-items-center justify-content-center text-center text-lg-start">
              <Col className="col-auto order-1 order-lg-3">
                <div className="shape-parent lines-style-2">
                  <div className="line text-dark"></div>
                  <div className="shape mt-n30 ms-n30 me-100 me-lg-0 d-block">
                    <svg
                      data-rellax-speed="-1"
                      width="90"
                      height="90"
                      viewBox="0 0 90 90"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="45" cy="45" r="45" fill="#F5F5F5" />
                    </svg>
                  </div>
                  <img
                    className="position-relative rounded-circle"
                    width="180"
                    src={Avatar}
                    alt=""
                    data-aos="fade"
                  />
                </div>
              </Col>
              <div className="d-none d-lg-block col order-lg-2"></div>
              <Col className="col-12 col-lg-6 order-3 order-lg-1">
                <p className="subtitle" data-aos="fade-up">
                  Brian Newton
                </p>
                <h1 className="h2" data-aos="fade-up">
                  I’m freelance product designer based in LA.
                </h1>
                <RouterLink
                  to="/contact1"
                  className="btn btn-dark btn-with-ball mt-5"
                  data-aos="fade-up"
                >
                  let’s work
                  <span className="btn-ball" style={{ transform: "translateY(0px)" }}></span>
                </RouterLink>
              </Col>
              <Col className="col-12 col-lg-2 text-center text-lg-end order-2 order-lg-4 mt-n60 mt-lg-0">
                <ul className="nav nav-gap-sm d-inline-flex align-items-center flex-lg-column">
                  <li className="nav-item">
                    <RouterLink
                      data-aos="fade-up"
                      to="//facebook.com/runwebrun"
                      className="nav-link"
                    >
                      <svg
                        width="7"
                        height="15"
                        viewBox="0 0 10 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.17421 3.65234H9.99996V0.154687C9.68557 0.107422 8.60224 0 7.34088 0C4.70831 0 2.90529 1.82188 2.90529 5.16914V8.25H0V12.1602H2.90529V22H6.46588V12.1602H9.25375L9.69693 8.25H6.46588V5.55586C6.46588 4.42578 6.7424 3.65234 8.17421 3.65234Z"
                          fill="currentColor"
                        />
                      </svg>
                    </RouterLink>
                  </li>
                  <li className="nav-item">
                    <RouterLink
                      data-aos="fade-up"
                      to="//twitter.com/runwebrun"
                      className="nav-link"
                    >
                      <svg
                        width="17"
                        height="15"
                        viewBox="0 0 25 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22.0706 5.51356C22.086 5.73504 22.086 5.95656 22.086 6.17804C22.086 12.9334 17.0783 20.7172 7.92575 20.7172C5.10601 20.7172 2.48661 19.8787 0.283203 18.4232C0.683835 18.4707 1.069 18.4865 1.48505 18.4865C3.81167 18.4865 5.95347 17.6797 7.6638 16.3033C5.47581 16.2558 3.64221 14.7845 3.01046 12.7594C3.31865 12.8069 3.6268 12.8385 3.9504 12.8385C4.39723 12.8385 4.84411 12.7752 5.2601 12.6645C2.97968 12.1898 1.2693 10.1332 1.2693 7.64935V7.58609C1.93183 7.96579 2.70231 8.20309 3.5189 8.2347C2.17837 7.31709 1.30013 5.75086 1.30013 3.97894C1.30013 3.02972 1.54661 2.15959 1.97807 1.40019C4.42801 4.50103 8.11063 6.52604 12.24 6.74756C12.163 6.36787 12.1168 5.97239 12.1168 5.57687C12.1168 2.76076 14.3356 0.466797 17.0937 0.466797C18.5266 0.466797 19.8209 1.0838 20.73 2.0805C21.8548 1.85902 22.9334 1.43184 23.8887 0.846495C23.5189 2.03307 22.7331 3.02977 21.7008 3.66255C22.7023 3.55186 23.673 3.26702 24.5667 2.87155C23.8888 3.88403 23.0413 4.78577 22.0706 5.51356Z"
                          fill="currentColor"
                        />
                      </svg>
                    </RouterLink>
                  </li>
                  <li className="nav-item">
                    <RouterLink
                      data-aos="fade-up"
                      to="//instagram.com/runwebrun"
                      className="nav-link"
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.2827 5.3166C8.24087 5.3166 5.78732 7.8148 5.78732 10.912C5.78732 14.0092 8.24087 16.5074 11.2827 16.5074C14.3245 16.5074 16.7781 14.0092 16.7781 10.912C16.7781 7.8148 14.3245 5.3166 11.2827 5.3166ZM11.2827 14.5497C9.31698 14.5497 7.70998 12.9183 7.70998 10.912C7.70998 8.90563 9.3122 7.27425 11.2827 7.27425C13.2532 7.27425 14.8554 8.90563 14.8554 10.912C14.8554 12.9183 13.2484 14.5497 11.2827 14.5497ZM18.2846 5.08772C18.2846 5.81331 17.7107 6.39282 17.0029 6.39282C16.2902 6.39282 15.7211 5.80844 15.7211 5.08772C15.7211 4.36699 16.295 3.78261 17.0029 3.78261C17.7107 3.78261 18.2846 4.36699 18.2846 5.08772ZM21.9243 6.4123C21.843 4.66404 21.4508 3.11545 20.1929 1.83956C18.9399 0.563678 17.419 0.164355 15.7019 0.0766992C13.9323 -0.0255664 8.62827 -0.0255664 6.85865 0.0766992C5.14643 0.159486 3.62552 0.558809 2.36766 1.83469C1.10979 3.11058 0.722392 4.65917 0.636302 6.40743C0.535865 8.20925 0.535865 13.6098 0.636302 15.4117C0.717609 17.1599 1.10979 18.7085 2.36766 19.9844C3.62552 21.2603 5.14165 21.6596 6.85865 21.7473C8.62827 21.8495 13.9323 21.8495 15.7019 21.7473C17.419 21.6645 18.9399 21.2652 20.1929 19.9844C21.446 18.7085 21.8382 17.1599 21.9243 15.4117C22.0247 13.6098 22.0247 8.21412 21.9243 6.4123ZM19.6381 17.345C19.2651 18.2995 18.5429 19.0348 17.6007 19.4195C16.1898 19.9893 12.8419 19.8578 11.2827 19.8578C9.72352 19.8578 6.37081 19.9844 4.96469 19.4195C4.02727 19.0397 3.30507 18.3043 2.92724 17.345C2.36766 15.9084 2.49679 12.4995 2.49679 10.912C2.49679 9.32443 2.37244 5.91071 2.92724 4.47899C3.30029 3.52451 4.02248 2.78917 4.96469 2.40446C6.37559 1.83469 9.72352 1.96618 11.2827 1.96618C12.8419 1.96618 16.1946 1.83956 17.6007 2.40446C18.5381 2.7843 19.2603 3.51964 19.6381 4.47899C20.1977 5.91558 20.0686 9.32443 20.0686 10.912C20.0686 12.4995 20.1977 15.9133 19.6381 17.345Z"
                          fill="currentColor"
                        />
                      </svg>
                    </RouterLink>
                  </li>
                </ul>
              </Col>
            </Row>
          </div>
          <div className="pb-160 isotope text-center">
            <ul className="nav justify-content-center isotope-options mb-60 pb-30">
              <li className="nav-item">
                <NavLink
                  data-aos="fade-up"
                  active={filter === "all"}
                  onClick={() => setFilter("all")}
                  data-filter="all"
                  className="nav-link"
                >
                  <div className="nav-link-name">all posts</div>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  data-aos="fade-up"
                  active={filter === "branding"}
                  onClick={() => setFilter("branding")}
                  data-filter="lifestyle"
                  className="nav-link"
                >
                  <div className="nav-link-name">branding</div>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  data-aos="fade-up"
                  active={filter === "design"}
                  onClick={() => setFilter("design")}
                  data-filter="design"
                  className="nav-link"
                >
                  <div className="nav-link-name">design</div>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  data-aos="fade-up"
                  active={filter === "photography"}
                  onClick={() => setFilter("photography")}
                  data-filter="photography"
                  className="nav-link"
                >
                  <div className="nav-link-name">photography</div>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  data-aos="fade-up"
                  active={filter === "marketing"}
                  onClick={() => setFilter("marketing")}
                  data-filter="marketing"
                  className="nav-link"
                >
                  <div className="nav-link-name">marketing</div>
                </NavLink>
              </li>
            </ul>
            <Row className="gv-5 isotope-grid mb-n7">
              {projects.map((item, key) =>
                item.filtered === true ? (
                  <Col
                    md={6}
                    key={key}
                    className="col-12 isotope-item"
                    data-filters="branding"
                  >
                    <span className="d-block">
                      <RouterLink
                        className="card card-portfolio card-default card-image-md card-hover-zoom"
                        to="/portfolio-single-style-1"
                      >
                        <span
                          className="card-img"
                          data-cursor-style="cursor-circle"
                          data-cursor-text="view"
                        >
                          <img src={item.img} alt="" data-aos="fade-up" />
                        </span>
                        <span className="card-body">
                          <span className="card-title h4">{item.title}</span>
                          <span className="card-category subtitle">
                            {item.category}
                          </span>
                        </span>
                      </RouterLink>
                    </span>
                  </Col>
                ) : (
                  ""
                )
              )}
            </Row>
            <RouterLink
              to="/portfolio-col-2-style-3"
              className="btn btn-circle btn-light btn-lg mt-100"
            >
              more
            </RouterLink>
          </div>
        </Container>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default FreelancerPortfolio;
