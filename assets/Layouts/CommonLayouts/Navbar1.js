import React, { useCallback, useEffect, useState } from "react";
import { Col, Container, Row, UncontrolledCollapse } from "reactstrap";
import { Link, useLocation } from "react-router-dom";

//Images
import Logo from "../../assets/images/logo-white.svg";
import navManu from "./data";

const Navbar = () => {
  const [isClick, setIsClick] = useState(false);
  const location = useLocation();
  const [navbarCollapseHome, setNavbarCollapseHome] = useState(false);
  const [navbarCollapseProjects, setNavbarCollapseProjects] = useState(false);
  const [navbarCollapseContact, setNavbarCollapseContact] = useState(false);
  const [navbarCollapsePages, setNavbarCollapsePages] = useState(false);

  const [collapse, setCollapse] = useState(false);
  const [collapse1, setCollapse1] = useState(false);
  const [collapse2, setCollapse2] = useState(false);
  const [collapse3, setCollapse3] = useState(false);
  const [collapse4, setCollapse4] = useState(false);
  const [collapse5, setCollapse5] = useState(false);
  const [collapse6, setCollapse6] = useState(false);
  const [collapse7, setCollapse7] = useState(false);

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    const navbar = document.getElementById("navBar");
    const menu = navbar.querySelectorAll(".nav-link");

    menu.forEach(ele => {
      ele.classList.remove("active");
      if (ele.href === window.location.href || "/" === window.location.href) {
        ele.classList.add("active");
        const parent = ele.closest("div").previousSibling;
        if (parent) {
          parent.classList.add("active");
          const parentofparent = parent.closest("div").previousSibling;
          if (parentofparent) {
            parentofparent.classList.add("active");
          }
        }
      }
    });
  }, []);

  const toggleMenu = () => {
    document.body.style.overflow = "hidden";
    document.body.classList.add("fancybox-active", "compensate-for-scrollbar", "fancybox-open");
    document.getElementById("navbar-mobile-style-2").style.display = "block";
    document.getElementById("content-wrap").classList.add("d-none");
  };

  const toggleRemove = useCallback(() => {
    setIsClick(isClick);
    document.body.style.overflow = "";
    document.body.classList.remove("fancybox-active", "compensate-for-scrollbar", "fancybox-open");
    document.getElementById("navbar-mobile-style-2").style.display = "none";
    document.getElementById("content-wrap").classList.remove("d-none");
  }, [isClick]);

  useEffect(() => {
    toggleRemove();
  }, [location, toggleRemove]);

  useEffect(() => {
    window.addEventListener("scroll", scrollNavigation, true);
    window.addEventListener("scroll", scrollUpward, false);
  });

  let lastScrollTop = 0;
  const scrollUpward = () => {
    const element = document.getElementsByTagName("body")[0];
    let st = window.pageYOffset || document.documentElement.scrollTop;
    if (st < lastScrollTop) {
      element.classList.remove("navbar-hide");
      element.classList.add("navbar-show");
    }
    lastScrollTop = st <= 0 ? 0 : st;
  };

  const scrollNavigation = () => {
    const element = document.getElementsByTagName("body")[0];
    const scrollup = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollup / height);

    if (scrollup > 100) {
      element.classList.add("navbar-scroll", "navbar-show");
      element.classList.remove("navbar-hide");

      if (scrollup > 530 && scrolled < 1) {
        element.classList.remove("navbar-show");
        element.classList.remove("navbar-end");
        element.classList.add("navbar-hide");
      } else {
        element.classList.remove("navbar-hide");
        element.classList.add("navbar-show");
        element.classList.add("navbar-end");
      }
    } else {
      element.classList.remove("navbar-scroll");
    }
  };

  useEffect(() => {
    document.getElementById("btn-purchase").addEventListener("mouseenter", function () {
      document.getElementById("btn-ball").style.transform = "translateY(-24px)";
      document.getElementById("btn-ball").style.transitionDuration = "300ms";
      // document.getElementById("btn-purchase").classList.remove("btn-white");
    });
    document.getElementById("btn-purchase").addEventListener("mouseleave", function () {
      document.getElementById("btn-ball").style.transform = "translateY(0px)";
      // document.getElementById("btn-purchase").classList.add("btn-white");
    });
  }, []);

  return (
    <React.Fragment>
      <header
        className="navbar 111 navbar-top navbar-expand-lg navbar-dark navbar-fixed"
      >
        <Container className="justify-content-between">
          <Link className="navbar-brand order-1" to="/">
            <img width="107" src={Logo} alt="" />
          </Link>
          <div
            className="navbar-toggle order-4"
            onClick={() => {
              toggleMenu();
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <ul className="nav navbar-nav order-2">
            <li className="nav-item navbar-dropdown navbar-dropdown-mega">
              <Link to="/home" className="nav-link">
                <span className="nav-link-name">home</span>
                <svg
                  width="6"
                  height="10"
                  viewBox="0 0 6 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 9L5 5L1 1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <div className="dropdown-menu">
                <Container>
                  <ul role="menu" className="navbar-nav row gh-1 gv-3">
                    {navManu.map((item, key) => (
                      <li className="col-md-6 col-lg-3 col-xl-2" key={key}>
                        <span className="nav-item">
                          <Link to={item.path} className="nav-link">
                            <span className="nav-link-image">
                              <img src={item.img} alt="" />
                            </span>
                            <span className="nav-link-name">{item.lable}</span>
                          </Link>
                        </span>
                      </li>
                    ))}
                  </ul>
                </Container>
              </div>
            </li>
            <li className="nav-item navbar-dropdown">
              <Link to="/portfolio-col-1-style-1" className="nav-link">
                <span className="nav-link-name">projects</span>
                <svg
                  width="6"
                  height="10"
                  viewBox="0 0 6 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 9L5 5L1 1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <div className="dropdown-menu">
                <ul className="nav navbar-nav">
                  <li className="nav-item navbar-dropdown">
                    <Link to="/portfolio-col-1-style-1" className="nav-link">
                      <span className="nav-link-name">1 column</span>
                      <svg
                        width="6"
                        height="10"
                        viewBox="0 0 6 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 9L5 5L1 1"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                    <div className="dropdown-menu">
                      <ul className="nav navbar-nav">
                        <li className="nav-item">
                          <Link
                            to="/portfolio-col-1-style-1"
                            className="nav-link"
                          >
                            <span className="nav-link-name">Style 1</span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            to="/portfolio-col-1-style-2"
                            className="nav-link"
                          >
                            <span className="nav-link-name">Style 2</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item navbar-dropdown">
                    <Link to="/portfolio-col-2-style-1" className="nav-link">
                      <span className="nav-link-name">2 column</span>
                      <svg
                        width="6"
                        height="10"
                        viewBox="0 0 6 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 9L5 5L1 1"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                    <div className="dropdown-menu">
                      <ul className="nav navbar-nav">
                        <li className="nav-item">
                          <Link
                            to="/portfolio-col-2-style-1"
                            className="nav-link"
                          >
                            <span className="nav-link-name">Style 1</span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            to="/portfolio-col-2-style-2"
                            className="nav-link"
                          >
                            <span className="nav-link-name">Style 2</span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            to="/portfolio-col-2-style-3"
                            className="nav-link"
                          >
                            <span className="nav-link-name">Style 3</span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            to="/portfolio-col-2-style-4"
                            className="nav-link"
                          >
                            <span className="nav-link-name">Style 4</span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            to="/portfolio-col-2-style-5"
                            className="nav-link"
                          >
                            <span className="nav-link-name">Style 5</span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            to="/portfolio-col-2-style-6"
                            className="nav-link"
                          >
                            <span className="nav-link-name">Style 6</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item navbar-dropdown">
                    <Link to="/portfolio-col-3-style-1" className="nav-link">
                      <span className="nav-link-name">3 column</span>
                      <svg
                        width="6"
                        height="10"
                        viewBox="0 0 6 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 9L5 5L1 1"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                    <div className="dropdown-menu">
                      <ul className="nav navbar-nav">
                        <li className="nav-item">
                          <Link
                            to="/portfolio-col-3-style-1"
                            className="nav-link"
                          >
                            <span className="nav-link-name">Style 1</span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            to="/portfolio-col-3-style-2"
                            className="nav-link"
                          >
                            <span className="nav-link-name">Style 2</span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            to="/portfolio-col-3-style-3"
                            className="nav-link"
                          >
                            <span className="nav-link-name">Style 3</span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            to="/portfolio-col-3-style-4"
                            className="nav-link"
                          >
                            <span className="nav-link-name">Style 4</span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            to="/portfolio-col-3-style-5"
                            className="nav-link"
                          >
                            <span className="nav-link-name">Style 5</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item navbar-dropdown">
                    <Link to="/portfolio-col-4-style-1" className="nav-link">
                      <span className="nav-link-name">4 column</span>
                      <svg
                        width="6"
                        height="10"
                        viewBox="0 0 6 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 9L5 5L1 1"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                    <div className="dropdown-menu">
                      <ul className="nav navbar-nav">
                        <li className="nav-item">
                          <Link
                            to="/portfolio-col-4-style-1"
                            className="nav-link"
                          >
                            <span className="nav-link-name">Style 1</span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            to="/portfolio-col-4-style-2"
                            className="nav-link"
                          >
                            <span className="nav-link-name">Style 2</span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            to="/portfolio-col-4-style-3"
                            className="nav-link"
                          >
                            <span className="nav-link-name">Style 3</span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            to="/portfolio-col-4-style-4"
                            className="nav-link"
                          >
                            <span className="nav-link-name">Style 4</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item navbar-dropdown">
                    <Link
                      to="/portfolio-single-style-1"
                      className="nav-link"
                    >
                      <span className="nav-link-name">Single Works</span>
                      <svg
                        width="6"
                        height="10"
                        viewBox="0 0 6 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 9L5 5L1 1"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                    <div className="dropdown-menu">
                      <ul className="nav navbar-nav">
                        <li className="nav-item">
                          <Link
                            to="/portfolio-single-style-1"
                            className="nav-link"
                          >
                            <span className="nav-link-name">Style 1</span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            to="/portfolio-single-style-2"
                            className="nav-link"
                          >
                            <span className="nav-link-name">Style 2</span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            to="/portfolio-single-style-3"
                            className="nav-link"
                          >
                            <span className="nav-link-name">Style 3</span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            to="/portfolio-single-style-4"
                            className="nav-link"
                          >
                            <span className="nav-link-name">Style 4</span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            to="/portfolio-single-style-5"
                            className="nav-link"
                          >
                            <span className="nav-link-name">Style 5</span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            to="/portfolio-single-style-6"
                            className="nav-link"
                          >
                            <span className="nav-link-name">Style 6</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item navbar-dropdown">
              <Link to="/about-us" className="nav-link">
                <span className="nav-link-name">pages</span>
                <svg
                  width="6"
                  height="10"
                  viewBox="0 0 6 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 9L5 5L1 1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <div className="dropdown-menu">
                <ul className="nav navbar-nav">
                  <li className="nav-item navbar-dropdown">
                    <Link to="/about-us" className="nav-link">
                      <span className="nav-link-name">About Us</span>
                      <svg
                        width="6"
                        height="10"
                        viewBox="0 0 6 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 9L5 5L1 1"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                    <div className="dropdown-menu">
                      <ul className="nav navbar-nav">
                        <li className="nav-item">
                          <Link to="/about-us" className="nav-link">
                            <span className="nav-link-name">About Us</span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/about-us-2" className="nav-link">
                            <span className="nav-link-name">About Us 2</span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/about-me" className="nav-link">
                            <span className="nav-link-name">About Me</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item navbar-dropdown">
                    <Link to="/services" className="nav-link">
                      <span className="nav-link-name">Services</span>
                      <svg
                        width="6"
                        height="10"
                        viewBox="0 0 6 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 9L5 5L1 1"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                    <div className="dropdown-menu">
                      <ul className="nav navbar-nav">
                        <li className="nav-item">
                          <Link to="/services" className="nav-link">
                            <span className="nav-link-name">Services</span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/single-service" className="nav-link">
                            <span className="nav-link-name">
                              Single Service
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item navbar-dropdown">
                    <Link to="/blog3" className="nav-link">
                      <span className="nav-link-name">Blog</span>
                      <svg
                        width="6"
                        height="10"
                        viewBox="0 0 6 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 9L5 5L1 1"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                    <div className="dropdown-menu">
                      <ul className="nav navbar-nav">
                        <li className="nav-item">
                          <Link to="/blog3" className="nav-link">
                            <span className="nav-link-name">3 column</span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/blog1" className="nav-link">
                            <span className="nav-link-name">1 column</span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/singlepost" className="nav-link">
                            <span className="nav-link-name">Single Post</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item">
                    <Link to="/coming-soon" className="nav-link">
                      <span className="nav-link-name">Coming Soon</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/404" className="nav-link">
                      <span className="nav-link-name">404</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item navbar-dropdown">
              <Link to="/contact1" className="nav-link">
                <span className="nav-link-name">contact</span>
                <svg
                  width="6"
                  height="10"
                  viewBox="0 0 6 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 9L5 5L1 1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <div className="dropdown-menu">
                <ul className="nav navbar-nav">
                  <li className="nav-item">
                    <Link to="/contact1" className="nav-link">
                      <span className="nav-link-name">Contact 1</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/contact2" className="nav-link">
                      <span className="nav-link-name">Contact 2</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <a
            className="d-none d-sm-inline-block btn btn-white btn-with-ball ms-auto me-40 ms-lg-60 me-lg-0 order-2 order-lg-3"
            href="https://themes.getbootstrap.com/product/themebau/"
            id="btn-purchase"
          >
            {" "}
            purchase{" "}
            <span className="btn-ball" style={{ transform: "translateY(0px)" }} id="btn-ball"></span>
          </a>
          <a
            className="btn btn-white btn-link btn-clean d-sm-none order-2 ms-auto me-40 ms-lg-60 me-lg-0 text-decoration-none"
            href="https://themes.getbootstrap.com/product/themebau/"
          >
            {" "}
            purchase{" "}
          </a>
        </Container>
      </header>
      <div
        className="navbar navbar-mobile navbar-mobile-style-2 navbar-dark"
        style={{ height: "100vh", overflowY: "auto" }}
        id="navbar-mobile-style-2"
      >
        <div className="shape justify-content-end">
          <svg
            data-rellax-speed="0"
            width="544"
            height="362"
            viewBox="0 0 544 362"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="320.5" cy="41.5" r="320.5" fill=" #202020" />
          </svg>
        </div>
        <div className="navbar-head">
          <Container className="justify-content-between">
            <Link className="navbar-brand" to="/home">
              <img width="107" src={Logo} alt="logo" />
            </Link>
            <div className="navbar-toggle" onClick={toggleRemove}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </Container>
        </div>
        <Container>
          <Row className="gh-1 justify-content-center">
            <Col md={7} lg={5} xl={4} className="col-12">
              <div className="navbar-body">
                <ul className="nav navbar-nav navbar-nav-collapse" id="navBar">
                  <li className="nav-item navbar-collapse">
                    <Link
                      to="#navbarCollapseHome"
                      id="navbarCollapseHome"
                      className="nav-link collapsed"
                      role="button"
                      data-bs-toggle="collapse"
                      aria-expanded={navbarCollapseHome}
                      aria-controls="navbarCollapseHome"
                      onClick={() => setNavbarCollapseHome(!navbarCollapseHome)}
                    >
                      <span className="nav-link-name">home</span>
                      <svg
                        className="collapse-icon"
                        width="7"
                        height="12"
                        viewBox="0 0 7 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 11L6 6L1 1"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                    <UncontrolledCollapse toggler="#navbarCollapseHome" className="navbar-collapse-menu">
                      <ul className="nav navbar-nav">
                        <li className="nav-item">
                          <Link to="/home" className="nav-link">
                            <span className="nav-link-name">main home</span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/simple-portfolio" className="nav-link">
                            <span className="nav-link-name">
                              simple portofolio
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/creative-agency" className="nav-link">
                            <span className="nav-link-name">
                              creative agency
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            to="/freelancer-portfolio"
                            className="nav-link"
                          >
                            <span className="nav-link-name">
                              freelancer portfolio
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            to="/interactive-links-dark"
                            className="nav-link"
                          >
                            <span className="nav-link-name">
                              interactive dark
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            to="/interactive-links-light"
                            className="nav-link"
                          >
                            <span className="nav-link-name">
                              interactive light
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/left-menu" className="nav-link">
                            <span className="nav-link-name">left menu</span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/digital-agency" className="nav-link">
                            <span className="nav-link-name">
                              digital agency
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/carousel-dark" className="nav-link">
                            <span className="nav-link-name">carousel dark</span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/carousel-light" className="nav-link">
                            <span className="nav-link-name">
                              carousel light
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            to="/fullscreen-showcase"
                            className="nav-link"
                          >
                            <span className="nav-link-name">
                              fullscreen showcase
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </UncontrolledCollapse>
                  </li>
                  <li className="nav-item navbar-collapse">
                    <Link
                      to="#navbarCollapseProjects"
                      id="navbarCollapseProjects"
                      className="nav-link collapsed"
                      role="button"
                      data-bs-toggle="collapse"
                      aria-expanded={navbarCollapseProjects}
                      aria-controls="navbarCollapseProjects"
                      onClick={() => setNavbarCollapseProjects(!navbarCollapseProjects)}
                    >
                      <span className="nav-link-name">projects</span>
                      <svg
                        className="collapse-icon"
                        width="7"
                        height="12"
                        viewBox="0 0 7 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 11L6 6L1 1"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                    <UncontrolledCollapse toggler="#navbarCollapseProjects" className="navbar-collapse-menu">
                      <ul className="nav navbar-nav">
                        <li className="nav-item navbar-collapse">
                          <Link
                            to="#navbarCollapse1Column"
                            id="navbarCollapse1Column"
                            className="nav-link collapsed"
                            role="button"
                            data-bs-toggle="collapse"
                            aria-expanded={collapse}
                            aria-controls="navbarCollapse1Column"
                            onClick={() => setCollapse(!collapse)}
                          >
                            <span className="nav-link-name">1 column</span>
                            <svg
                              className="collapse-icon"
                              width="7"
                              height="12"
                              viewBox="0 0 7 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 11L6 6L1 1"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </Link>
                          <UncontrolledCollapse toggler="#navbarCollapse1Column" className="navbar-collapse-menu">
                            <ul className="nav navbar-nav">
                              <li className="nav-item">
                                <Link
                                  to="/portfolio-col-1-style-1"
                                  className="nav-link"
                                >
                                  <span className="nav-link-name">Style 1</span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link
                                  to="/portfolio-col-1-style-2"
                                  className="nav-link"
                                >
                                  <span className="nav-link-name">Style 2</span>
                                </Link>
                              </li>
                            </ul>
                          </UncontrolledCollapse>
                        </li>
                        <li className="nav-item navbar-collapse">
                          <Link
                            to="#navbarCollapse2Column"
                            id="navbarCollapse2Column"
                            className="nav-link collapsed"
                            role="button"
                            data-bs-toggle="collapse"
                            aria-expanded={collapse1}
                            aria-controls="navbarCollapse2Column"
                            onClick={() => setCollapse1(!collapse1)}
                          >
                            <span className="nav-link-name">2 column</span>
                            <svg
                              className="collapse-icon"
                              width="7"
                              height="12"
                              viewBox="0 0 7 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 11L6 6L1 1"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </Link>
                          <UncontrolledCollapse toggler="#navbarCollapse2Column" className="navbar-collapse-menu">
                            <ul className="nav navbar-nav">
                              <li className="nav-item">
                                <Link
                                  to="/portfolio-col-2-style-1"
                                  className="nav-link"
                                >
                                  <span className="nav-link-name">Style 1</span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link
                                  to="/portfolio-col-2-style-2"
                                  className="nav-link"
                                >
                                  <span className="nav-link-name">Style 2</span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link
                                  to="/portfolio-col-2-style-3"
                                  className="nav-link"
                                >
                                  <span className="nav-link-name">Style 3</span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link
                                  to="/portfolio-col-2-style-4"
                                  className="nav-link"
                                >
                                  <span className="nav-link-name">Style 4</span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link
                                  to="/portfolio-col-2-style-5"
                                  className="nav-link"
                                >
                                  <span className="nav-link-name">Style 5</span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link
                                  to="/portfolio-col-2-style-6"
                                  className="nav-link"
                                >
                                  <span className="nav-link-name">Style 6</span>
                                </Link>
                              </li>
                            </ul>
                          </UncontrolledCollapse>
                        </li>
                        <li className="nav-item navbar-collapse">
                          <Link
                            to="#navbarCollapse3Column"
                            id="navbarCollapse3Column"
                            className="nav-link collapsed"
                            role="button"
                            data-bs-toggle="collapse"
                            aria-expanded={collapse2}
                            aria-controls="navbarCollapse3Column"
                            onClick={() => setCollapse2(!collapse2)}
                          >
                            <span className="nav-link-name">3 column</span>
                            <svg
                              className="collapse-icon"
                              width="7"
                              height="12"
                              viewBox="0 0 7 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 11L6 6L1 1"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </Link>
                          <UncontrolledCollapse toggler="#navbarCollapse3Column" className="navbar-collapse-menu">
                            <ul className="nav navbar-nav">
                              <li className="nav-item">
                                <Link
                                  to="/portfolio-col-3-style-1"
                                  className="nav-link"
                                >
                                  <span className="nav-link-name">Style 1</span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link
                                  to="/portfolio-col-3-style-2"
                                  className="nav-link"
                                >
                                  <span className="nav-link-name">Style 2</span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link
                                  to="/portfolio-col-3-style-3"
                                  className="nav-link"
                                >
                                  <span className="nav-link-name">Style 3</span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link
                                  to="/portfolio-col-3-style-4"
                                  className="nav-link"
                                >
                                  <span className="nav-link-name">Style 4</span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link
                                  to="/portfolio-col-3-style-5"
                                  className="nav-link"
                                >
                                  <span className="nav-link-name">Style 5</span>
                                </Link>
                              </li>
                            </ul>
                          </UncontrolledCollapse>
                        </li>
                        <li className="nav-item navbar-collapse">
                          <Link
                            to="#navbarCollapse4Column"
                            id="navbarCollapse4Column"
                            className="nav-link collapsed"
                            role="button"
                            data-bs-toggle="collapse"
                            aria-expanded={collapse3}
                            aria-controls="navbarCollapse4Column"
                            onClick={() => setCollapse3(!collapse3)}
                          >
                            <span className="nav-link-name">4 column</span>
                            <svg
                              className="collapse-icon"
                              width="7"
                              height="12"
                              viewBox="0 0 7 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 11L6 6L1 1"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </Link>
                          <UncontrolledCollapse toggler="#navbarCollapse4Column" className="navbar-collapse-menu">
                            <ul className="nav navbar-nav">
                              <li className="nav-item">
                                <Link
                                  to="/portfolio-col-4-style-1"
                                  className="nav-link"
                                >
                                  <span className="nav-link-name">Style 1</span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link
                                  to="/portfolio-col-4-style-2"
                                  className="nav-link"
                                >
                                  <span className="nav-link-name">Style 2</span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link
                                  to="/portfolio-col-4-style-3"
                                  className="nav-link"
                                >
                                  <span className="nav-link-name">Style 3</span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link
                                  to="/portfolio-col-4-style-4"
                                  className="nav-link"
                                >
                                  <span className="nav-link-name">Style 4</span>
                                </Link>
                              </li>
                            </ul>
                          </UncontrolledCollapse>
                        </li>
                        <li className="nav-item navbar-collapse">
                          <Link
                            to="#navbarCollapseSingleWorks"
                            id="navbarCollapseSingleWorks"
                            className="nav-link collapsed"
                            role="button"
                            data-bs-toggle="collapse"
                            aria-expanded={collapse4}
                            aria-controls="navbarCollapseSingleWorks"
                            onClick={() => setCollapse4(!collapse4)}
                          >
                            <span className="nav-link-name">Single Works</span>
                            <svg
                              className="collapse-icon"
                              width="7"
                              height="12"
                              viewBox="0 0 7 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 11L6 6L1 1"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </Link>
                          <UncontrolledCollapse toggler="#navbarCollapseSingleWorks" className="navbar-collapse-menu">
                            <ul className="nav navbar-nav">
                              <li className="nav-item">
                                <Link
                                  to="/portfolio-single-style-1"
                                  className="nav-link"
                                >
                                  <span className="nav-link-name">Style 1</span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link
                                  to="/portfolio-single-style-2"
                                  className="nav-link"
                                >
                                  <span className="nav-link-name">Style 2</span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link
                                  to="/portfolio-single-style-3"
                                  className="nav-link"
                                >
                                  <span className="nav-link-name">Style 3</span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link
                                  to="/portfolio-single-style-4"
                                  className="nav-link"
                                >
                                  <span className="nav-link-name">Style 4</span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link
                                  to="/portfolio-single-style-5"
                                  className="nav-link"
                                >
                                  <span className="nav-link-name">Style 5</span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link
                                  to="/portfolio-single-style-6"
                                  className="nav-link"
                                >
                                  <span className="nav-link-name">Style 6</span>
                                </Link>
                              </li>
                            </ul>
                          </UncontrolledCollapse>
                        </li>
                      </ul>
                    </UncontrolledCollapse>
                  </li>
                  <li className="nav-item navbar-collapse ">
                    <Link
                      to="#navbarCollapsePages"
                      id="navbarCollapsePages"
                      className="nav-link collapsed"
                      role="button"
                      data-bs-toggle="collapse"
                      aria-expanded={navbarCollapsePages}
                      aria-controls="navbarCollapsePages"
                      onClick={() => setNavbarCollapsePages(!navbarCollapsePages)}
                    >
                      <span className="nav-link-name">pages</span>
                      <svg
                        className="collapse-icon"
                        width="7"
                        height="12"
                        viewBox="0 0 7 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 11L6 6L1 1"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                    <UncontrolledCollapse toggler="#navbarCollapsePages" className="navbar-collapse-menu">
                      <ul className="nav navbar-nav">
                        <li className="nav-item navbar-collapse ">
                          <Link
                            to="#navbarCollapseAboutUs"
                            id="navbarCollapseAboutUs"
                            className="nav-link collapsed"
                            role="button"
                            data-bs-toggle="collapse"
                            aria-expanded={collapse5}
                            aria-controls="navbarCollapseAboutUs"
                            onClick={() => setCollapse5(!collapse5)}
                          >
                            <span className="nav-link-name">About Us</span>
                            <svg
                              className="collapse-icon"
                              width="7"
                              height="12"
                              viewBox="0 0 7 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 11L6 6L1 1"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </Link>
                          <UncontrolledCollapse toggler="#navbarCollapseAboutUs" className="navbar-collapse-menu">
                            <ul className="nav navbar-nav">
                              <li className="nav-item ">
                                <Link to="/about-us" className="nav-link">
                                  <span className="nav-link-name">
                                    About Us
                                  </span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link to="/about-us-2" className="nav-link">
                                  <span className="nav-link-name">
                                    About Us 2
                                  </span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link to="/about-me" className="nav-link">
                                  <span className="nav-link-name">
                                    About Me
                                  </span>
                                </Link>
                              </li>
                            </ul>
                          </UncontrolledCollapse>
                        </li>
                        <li className="nav-item navbar-collapse">
                          <Link
                            to="#navbarCollapseServices"
                            id="navbarCollapseServices"
                            className="nav-link collapsed"
                            role="button"
                            data-bs-toggle="collapse"
                            aria-expanded={collapse6}
                            aria-controls="navbarCollapseServices"
                            onClick={() => setCollapse6(!collapse6)}
                          >
                            <span className="nav-link-name">Services</span>
                            <svg
                              className="collapse-icon"
                              width="7"
                              height="12"
                              viewBox="0 0 7 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 11L6 6L1 1"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </Link>
                          <UncontrolledCollapse toggler="#navbarCollapseServices" className="navbar-collapse-menu">
                            <ul className="nav navbar-nav">
                              <li className="nav-item">
                                <Link to="/services" className="nav-link">
                                  <span className="nav-link-name">
                                    Services
                                  </span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link
                                  to="/single-service"
                                  className="nav-link"
                                >
                                  <span className="nav-link-name">
                                    Single Service
                                  </span>
                                </Link>
                              </li>
                            </ul>
                          </UncontrolledCollapse>
                        </li>
                        <li className="nav-item navbar-collapse">
                          <Link
                            to="#navbarCollapseBlog"
                            id="navbarCollapseBlog"
                            className="nav-link collapsed"
                            role="button"
                            data-bs-toggle="collapse"
                            aria-expanded={collapse7}
                            aria-controls="navbarCollapseBlog"
                            onClick={() => setCollapse7(!collapse7)}
                          >
                            <span className="nav-link-name">Blog</span>
                            <svg
                              className="collapse-icon"
                              width="7"
                              height="12"
                              viewBox="0 0 7 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 11L6 6L1 1"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </Link>
                          <UncontrolledCollapse toggler="#navbarCollapseBlog" className="navbar-collapse-menu">
                            <ul className="nav navbar-nav">
                              <li className="nav-item">
                                <Link to="/blog3" className="nav-link">
                                  <span className="nav-link-name">
                                    3 column
                                  </span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link to="/blog1" className="nav-link">
                                  <span className="nav-link-name">
                                    1 column
                                  </span>
                                </Link>
                              </li>
                              <li className="nav-item">
                                <Link to="/singlepost" className="nav-link">
                                  <span className="nav-link-name">
                                    Single Post
                                  </span>
                                </Link>
                              </li>
                            </ul>
                          </UncontrolledCollapse>
                        </li>
                        <li className="nav-item">
                          <Link to="/coming-soon" className="nav-link">
                            <span className="nav-link-name">Coming Soon</span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/404" className="nav-link">
                            <span className="nav-link-name">404</span>
                          </Link>
                        </li>
                      </ul>
                    </UncontrolledCollapse>
                  </li>
                  <li className="nav-item navbar-collapse">
                    <Link
                      to="#navbarCollapseContact"
                      id="navbarCollapseContact"
                      className="nav-link collapsed"
                      role="button"
                      data-bs-toggle="collapse"
                      aria-expanded={navbarCollapseContact}
                      aria-controls="navbarCollapseContact"
                      onClick={() => setNavbarCollapseContact(!navbarCollapseContact)}
                    >
                      <span className="nav-link-name">contact</span>
                      <svg
                        className="collapse-icon"
                        width="7"
                        height="12"
                        viewBox="0 0 7 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 11L6 6L1 1"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                    <UncontrolledCollapse toggler="#navbarCollapseContact" className="navbar-collapse-menu">
                      <ul className="nav navbar-nav">
                        <li className="nav-item">
                          <Link to="/contact1" className="nav-link">
                            <span className="nav-link-name">Contact 1</span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/contact2" className="nav-link">
                            <span className="nav-link-name">Contact 2</span>
                          </Link>
                        </li>
                      </ul>
                    </UncontrolledCollapse>
                  </li>
                </ul>
              </div>
            </Col>
            <Col className="col-md-1 d-none d-md-block"></Col>
            <Col md={4} lg={4} xl={3} className="col-12">
              <div className="navbar-footer">
                <div className="mb-60 text-white">
                  <p className="lead mb-17 fw-medium">Contact info:</p>
                  <ul className="list-group borderless font-size-17">
                    <li className="list-group-item">
                      Email:{" "}
                      <Link
                        to="/mailto:hello@themebau.com?subject=Test%20Address%20Email"
                        className="text-decoration-none text-white"
                      >
                        hello@themebau.com
                      </Link>
                    </li>
                    <li className="list-group-item">
                      Phone:{" "}
                      <Link
                        to="/callto:+1 202-358-0309"
                        className="text-decoration-none text-white"
                      >
                        +1 202-358-0309
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="mb-60 text-white">
                  <p className="lead mb-17 fw-medium">Address:</p>
                  <ul className="list-group borderless font-size-17">
                    <li className="list-group-item">2260 Lady Bug Drive,</li>
                    <li className="list-group-item">New York, NY 10011</li>
                  </ul>
                </div>
                <ul className="nav nav-gap-sm navbar-nav nav-social align-items-center mt-n10 text-white">
                  <li className="nav-item">
                    <Link
                      to="//facebook.com/runwebrun"
                      className="nav-link"
                    >
                      <svg
                        width="8"
                        viewBox="0 0 10 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.17421 3.65234H9.99996V0.154687C9.68557 0.107422 8.60224 0 7.34088 0C4.70831 0 2.90529 1.82188 2.90529 5.16914V8.25H0V12.1602H2.90529V22H6.46588V12.1602H9.25375L9.69693 8.25H6.46588V5.55586C6.46588 4.42578 6.7424 3.65234 8.17421 3.65234Z"
                          fill="currentColor"
                        />
                      </svg>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="//twitter.com/runwebrun"
                      className="nav-link"
                    >
                      <svg
                        width="20"
                        viewBox="0 0 25 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22.0706 5.51356C22.086 5.73504 22.086 5.95656 22.086 6.17804C22.086 12.9334 17.0783 20.7172 7.92575 20.7172C5.10601 20.7172 2.48661 19.8787 0.283203 18.4232C0.683835 18.4707 1.069 18.4865 1.48505 18.4865C3.81167 18.4865 5.95347 17.6797 7.6638 16.3033C5.47581 16.2558 3.64221 14.7845 3.01046 12.7594C3.31865 12.8069 3.6268 12.8385 3.9504 12.8385C4.39723 12.8385 4.84411 12.7752 5.2601 12.6645C2.97968 12.1898 1.2693 10.1332 1.2693 7.64935V7.58609C1.93183 7.96579 2.70231 8.20309 3.5189 8.2347C2.17837 7.31709 1.30013 5.75086 1.30013 3.97894C1.30013 3.02972 1.54661 2.15959 1.97807 1.40019C4.42801 4.50103 8.11063 6.52604 12.24 6.74756C12.163 6.36787 12.1168 5.97239 12.1168 5.57687C12.1168 2.76076 14.3356 0.466797 17.0937 0.466797C18.5266 0.466797 19.8209 1.0838 20.73 2.0805C21.8548 1.85902 22.9334 1.43184 23.8887 0.846495C23.5189 2.03307 22.7331 3.02977 21.7008 3.66255C22.7023 3.55186 23.673 3.26702 24.5667 2.87155C23.8888 3.88403 23.0413 4.78577 22.0706 5.51356Z"
                          fill="currentColor"
                        />
                      </svg>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="//instagram.com/runwebrun"
                      className="nav-link"
                    >
                      <svg
                        width="18"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.2827 5.3166C8.24087 5.3166 5.78732 7.8148 5.78732 10.912C5.78732 14.0092 8.24087 16.5074 11.2827 16.5074C14.3245 16.5074 16.7781 14.0092 16.7781 10.912C16.7781 7.8148 14.3245 5.3166 11.2827 5.3166ZM11.2827 14.5497C9.31698 14.5497 7.70998 12.9183 7.70998 10.912C7.70998 8.90563 9.3122 7.27425 11.2827 7.27425C13.2532 7.27425 14.8554 8.90563 14.8554 10.912C14.8554 12.9183 13.2484 14.5497 11.2827 14.5497ZM18.2846 5.08772C18.2846 5.81331 17.7107 6.39282 17.0029 6.39282C16.2902 6.39282 15.7211 5.80844 15.7211 5.08772C15.7211 4.36699 16.295 3.78261 17.0029 3.78261C17.7107 3.78261 18.2846 4.36699 18.2846 5.08772ZM21.9243 6.4123C21.843 4.66404 21.4508 3.11545 20.1929 1.83956C18.9399 0.563678 17.419 0.164355 15.7019 0.0766992C13.9323 -0.0255664 8.62827 -0.0255664 6.85865 0.0766992C5.14643 0.159486 3.62552 0.558809 2.36766 1.83469C1.10979 3.11058 0.722392 4.65917 0.636302 6.40743C0.535865 8.20925 0.535865 13.6098 0.636302 15.4117C0.717609 17.1599 1.10979 18.7085 2.36766 19.9844C3.62552 21.2603 5.14165 21.6596 6.85865 21.7473C8.62827 21.8495 13.9323 21.8495 15.7019 21.7473C17.419 21.6645 18.9399 21.2652 20.1929 19.9844C21.446 18.7085 21.8382 17.1599 21.9243 15.4117C22.0247 13.6098 22.0247 8.21412 21.9243 6.4123ZM19.6381 17.345C19.2651 18.2995 18.5429 19.0348 17.6007 19.4195C16.1898 19.9893 12.8419 19.8578 11.2827 19.8578C9.72352 19.8578 6.37081 19.9844 4.96469 19.4195C4.02727 19.0397 3.30507 18.3043 2.92724 17.345C2.36766 15.9084 2.49679 12.4995 2.49679 10.912C2.49679 9.32443 2.37244 5.91071 2.92724 4.47899C3.30029 3.52451 4.02248 2.78917 4.96469 2.40446C6.37559 1.83469 9.72352 1.96618 11.2827 1.96618C12.8419 1.96618 16.1946 1.83956 17.6007 2.40446C18.5381 2.7843 19.2603 3.51964 19.6381 4.47899C20.1977 5.91558 20.0686 9.32443 20.0686 10.912C20.0686 12.4995 20.1977 15.9133 19.6381 17.345Z"
                          fill="currentColor"
                        />
                      </svg>
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Navbar;
