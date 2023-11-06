import React, { useEffect, useState } from "react";
import { Col, Container, NavLink, Row } from "reactstrap";
import { NavLink as RouterLink } from "react-router-dom";
import Footer from "../Layouts/CommonLayouts/Footer1";
import Navbar from "../Layouts/CommonLayouts/Navbar2";

//Images
import Happy from "../assets/images/portfolio/watch-design-740-540.jpg";
import Luxury from "../assets/images/portfolio/happy-moments-740-860.jpg";
import BagDesign from "../assets/images/portfolio/mobile-app-740-540.jpg";
import Creative from "../assets/images/portfolio/bag-design-740-860.jpg";
import Branding from "../assets/images/portfolio/creative-branding-740-860.jpg";
import Package from "../assets/images/portfolio/package-design-740-540.jpg";
import video from "../assets/images/portfolio/video-tutorial-740-540.jpg";
import Identity from "../assets/images/portfolio/identity-design-740-860.jpg";
import Breakfast from "../assets/images/portfolio/breakfast-740-540.jpg";

const Data = [
  {
    id: 1,
    img: Happy,
    title: "Watch Design",
    category: ["all", "branding"],
    path: "/portfolio-single-style-2",
  },
  {
    id: 2,
    img: Luxury,
    title: "Happy Moments Photoset",
    category: ["all", "photography"],
    path: "/portfolio-single-style-5",
  },
  {
    id: 3,
    img: BagDesign,
    title: "Mobile App",
    category: ["all", "design"],
    path: "/portfolio-single-style-6",
  },
  {
    id: 4,
    img: Creative,
    title: "Bag Design",
    category: ["all", "branding"],
    path: "/portfolio-single-style-2",
  },
  {
    id: 5,
    img: Branding,
    title: "Creative Branding",
    category: ["all", "branding"],
    path: "/portfolio-single-style-1",
  },
  {
    id: 6,
    img: Package,
    title: "Package Design",
    category: ["all", "design"],
    path: "/portfolio-single-style-3",
  },
  {
    id: 7,
    img: video,
    title: "Video Tutorial",
    category: ["all", "marketing"],
    path: "/portfolio-single-style-4",
  },
  {
    id: 8,
    img: Identity,
    title: "Identity Design",
    category: ["all", "design"],
    path: "/portfolio-single-style-5",
  },
  {
    id: 9,
    img: Breakfast,
    title: "Breakfast",
    category: ["all", "design"],
    path: "/portfolio-single-style-6",
  },
];
const SimplePortfolio = () => {
  //meta title
  document.title = "Themebau | Simple Portfolio";
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
    setFilter("all");
  }, [])

  return (
    <React.Fragment>
      <Navbar navClass="light navbar-fixed" />
      <div className="content-wrap" id="content-wrap">
        <div className="pt-160 pb-130 mt-10 shape-parent">
          <Container className="text-center">
            <Row className="justify-content-center text-center">
              <Col lg={10} xl={8} className="col-12">
                <h1 className="mb-60" data-aos="fade-up">
                  An award-winning digital studio ✌️
                </h1>
                <RouterLink
                  to="/contact1"
                  className="btn btn-dark btn-with-ball"
                  data-aos="fade-up"
                >
                  let’s work
                  <span className="btn-ball" style={{ transform: "translateY(0px)" }}></span>
                </RouterLink>
              </Col>
            </Row>
          </Container>
          <div className="shape mt-n160">
            <svg
              data-rellax-speed="-1"
              width="518"
              height="641"
              viewBox="0 0 518 641"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="197.5" cy="320.5" r="320.5" fill="#F5F5F5" />
            </svg>
          </div>
        </div>
        <Container className="isotope">
          <ul
            className="nav justify-content-center isotope-options mb-60"
            data-aos="fade-up"
          >
            <li
              className="nav-item"
              data-show-duration="400"
              data-show-distance="10"
            >
              <NavLink
                href="#"
                active={filter === "all"}
                onClick={() => setFilter("all")}
                data-filter="all"
                className="nav-link"
              >
                <div className="nav-link-name">all projects</div>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                href="#"
                active={filter === "branding"}
                onClick={() => setFilter("branding")}
                data-filter="branding"
                className="nav-link"
              >
                <div className="nav-link-name">branding</div>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                href="#"
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
                href="#"
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
                href="#"
                active={filter === "marketing"}
                onClick={() => setFilter("marketing")}
                data-filter="marketing"
                className="nav-link"
              >
                <div className="nav-link-name">marketing</div>
              </NavLink>
            </li>
          </ul>
          <div className="pt-30">
            <Row className="align-items-end gh-1 gv-1 isotope-grid">
              {projects.map((item, key) =>
                item.filtered === true ? (
                  <Col
                    sm={6} lg={4}
                    className="col-12 isotope-item"
                    data-filters="branding"
                    key={key}
                  >
                    <RouterLink
                      to="/portfolio-single-style-1"
                      className="d-block"
                      data-cursor-style="cursor-text"
                      data-cursor-text={item.category}
                      data-aos="fade-up"
                    >
                      <img
                        className="mw-100"
                        src={item.img}
                        alt=""
                        data-aos="fade-up"
                      />
                    </RouterLink>
                  </Col>
                ) : (
                  ""
                )
              )}
            </Row>
          </div>
          <div className="text-center mt-100">
            <RouterLink href="/#" className="btn btn-circle btn-light btn-lg">
              more
            </RouterLink>
          </div>
          <div className="py-160 mt-n10 text-center">
            <h3 className="mb-60">
              Do you have project?
              <br />
              Send us message and let's connect 👋
            </h3>
            <RouterLink
              to="/contact1"
              className="btn btn-dark btn-with-ball mt-n10"
            >
              let’s work
              <span className="btn-ball" style={{ transform: "translateY(0px)" }}></span>
            </RouterLink>
          </div>
        </Container>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default SimplePortfolio;
