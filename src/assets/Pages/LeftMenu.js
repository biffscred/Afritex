import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../images/logo.png";
import LogoCircle from "../images/logo-circle.svg";
import Identity from "../images/portfolio/identity-design-1200-865.jpg";
import App from "../images/portfolio/app-photography-1200-1330.jpg";
import Creative from "../images/portfolio/creative-branding-1200-865.jpg";
import Package from "../images/portfolio/package-design-1200-1330.jpg";
import Watch from "../images/portfolio/watch-design-1200-1330.jpg";
import Gobe from "../images/portfolio/gobe-mockup-1200-865.jpg";
import Bag from "../images/portfolio/bag-design-1200-865.jpg";
import AppDesign from "../images/portfolio/app-design-1200-1330.jpg";
import Socks from "../images/portfolio/creative-socks-1200-865.jpg";
import Boxed from "../images/portfolio/boxed-water-1200-1330.jpg";
import Funny from "../images/portfolio/funny-dog-1200-1330.jpg";
import Sport from "../images/portfolio/sport-today-1200-865.jpg";
import { Container, UncontrolledCollapse } from "reactstrap";

const LeftMenu = () => {
  //meta title
  document.title = "Themebau | Left Menu";

  const [isClick, setIsClick] = useState(false);

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    var menu = document.querySelectorAll(".nav-link");

    menu.forEach(ele => {
      ele.classList.remove("active");
      if (ele.href === window.location.href) {
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


  //Navbar Toggle
  const toggleMenu = () => {
    setIsClick(!isClick);
    document.body.style.overflow = "hidden";
    document.body.classList.add(
      "fancybox-active",
      "compensate-for-scrollbar",
      "fancybox-open"
    );
    document.getElementById("navbar-mobile-style-4").style.display = "block";
    document.getElementById("header").classList.add("d-none");
    document.getElementById("content-wrap").classList.add("d-none");
    document.getElementById("footer").classList.add("d-none");
  };
  const toggleRemove = () => {
    setIsClick(isClick);
    document.body.style.overflow = "";
    document.body.classList.remove(
      "fancybox-active",
      "compensate-for-scrollbar",
      "fancybox-open"
    );
    document.getElementById("navbar-mobile-style-4").style.display = "none";
    document.getElementById("header").classList.remove("d-none");
    document.getElementById("content-wrap").classList.remove("d-none");
    document.getElementById("footer").classList.remove("d-none");
  };


  return (
    <React.Fragment>
      <header className="navbar navbar-left navbar-expand-lg" id="header">
        <Container className="justify-content-between">
          <NavLink className="navbar-brand" to="/">
            <img width="80" src={LogoCircle} alt="" />
          </NavLink>
          <NavLink
            className="navbar-toggle"
            to="/left-menu"
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </NavLink>

          <ul className="nav navbar-nav navbar-nav-collapse">
            <li className="nav-item navbar-collapse">
              <NavLink
                to="/#"
                id="navbarCollapseHome"
                className="nav-link collapsed"
                role="button"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="navbarCollapseHome"
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
              </NavLink>
              <UncontrolledCollapse toggler="#navbarCollapseHome" className="navbar-collapse-menu">
                <ul className="nav navbar-nav">
                  <li className="nav-item">
                    <NavLink to="/home" className="nav-link">
                      <span className="nav-link-name">main home</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/simple-portfolio" className="nav-link">
                      <span className="nav-link-name">
                        simple portofolio
                      </span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/creative-agency" className="nav-link">
                      <span className="nav-link-name">
                        creative agency
                      </span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/freelancer-portfolio"
                      className="nav-link"
                    >
                      <span className="nav-link-name">
                        freelancer portfolio
                      </span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/interactive-links-dark"
                      className="nav-link"
                    >
                      <span className="nav-link-name">
                        interactive dark
                      </span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/interactive-links-light"
                      className="nav-link"
                    >
                      <span className="nav-link-name">
                        interactive light
                      </span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/left-menu" className="nav-link">
                      <span className="nav-link-name">left menu</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/digital-agency" className="nav-link">
                      <span className="nav-link-name">
                        digital agency
                      </span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/carousel-dark" className="nav-link">
                      <span className="nav-link-name">carousel dark</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/carousel-light" className="nav-link">
                      <span className="nav-link-name">
                        carousel light
                      </span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/fullscreen-showcase"
                      className="nav-link"
                    >
                      <span className="nav-link-name">
                        fullscreen showcase
                      </span>
                    </NavLink>
                  </li>
                </ul>
              </UncontrolledCollapse>
            </li>
            <li className="nav-item navbar-collapse">
              <NavLink
                to="/#"
                id="navbarCollapseProjects"
                className="nav-link collapsed"
                role="button"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="navbarCollapseProjects"
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
              </NavLink>
              <UncontrolledCollapse toggler="#navbarCollapseProjects" className="navbar-collapse-menu">
                <ul className="nav navbar-nav">
                  <li className="nav-item navbar-collapse">
                    <NavLink
                      to="/#"
                      id="navbarCollapse1Column"
                      className="nav-link collapsed"
                      role="button"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="navbarCollapse1Column"
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
                    </NavLink>
                    <UncontrolledCollapse toggler="#navbarCollapse1Column" className="navbar-collapse-menu">
                      <ul className="nav navbar-nav">
                        <li className="nav-item">
                          <NavLink
                            to="/portfolio-col-1-style-1"
                            className="nav-link"
                          >
                            <span className="nav-link-name">Style 1</span>
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink
                            to="/portfolio-col-1-style-2"
                            className="nav-link"
                          >
                            <span className="nav-link-name">Style 2</span>
                          </NavLink>
                        </li>
                      </ul>
                    </UncontrolledCollapse>
                  </li>
                  <li className="nav-item navbar-collapse">
                    <NavLink
                      to="/#"
                      id="navbarCollapse2Column"
                      className="nav-link collapsed"
                      role="button"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="navbarCollapse2Column"
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
                    </NavLink>
                    <UncontrolledCollapse toggler="#navbarCollapse2Column" className="navbar-collapse-menu">
                      <ul className="nav navbar-nav">
                        <li className="nav-item">
                          <NavLink
                            to="/portfolio-col-2-style-1"
                            className="nav-link"
                          >
                            <span className="nav-link-name">Style 1</span>
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink
                            to="/portfolio-col-2-style-2"
                            className="nav-link"
                          >
                            <span className="nav-link-name">Style 2</span>
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink
                            to="/portfolio-col-2-style-3"
                            className="nav-link"
                          >
                            <span className="nav-link-name">Style 3</span>
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink
                            to="/portfolio-col-2-style-4"
                            className="nav-link"
                          >
                            <span className="nav-link-name">Style 4</span>
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink
                            to="/portfolio-col-2-style-5"
                            className="nav-link"
                          >
                            <span className="nav-link-name">Style 5</span>
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink
                            to="/portfolio-col-2-style-6"
                            className="nav-link"
                          >
                            <span className="nav-link-name">Style 6</span>
                          </NavLink>
                        </li>
                      </ul>
                    </UncontrolledCollapse>
                  </li>
                  <li className="nav-item navbar-collapse">
                    <NavLink
                      to="/#"
                      id="navbarCollapse3Column"
                      className="nav-link collapsed"
                      role="button"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="navbarCollapse3Column"
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
                    </NavLink>
                    <UncontrolledCollapse toggler="#navbarCollapse3Column" className="navbar-collapse-menu">
                      <ul className="nav navbar-nav">
                        <li className="nav-item">
                          <NavLink
                            to="/portfolio-col-3-style-1"
                            className="nav-link"
                          >
                            <span className="nav-link-name">Style 1</span>
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink
                            to="/portfolio-col-3-style-2"
                            className="nav-link"
                          >
                            <span className="nav-link-name">Style 2</span>
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink
                            to="/portfolio-col-3-style-3"
                            className="nav-link"
                          >
                            <span className="nav-link-name">Style 3</span>
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink
                            to="/portfolio-col-3-style-4"
                            className="nav-link"
                          >
                            <span className="nav-link-name">Style 4</span>
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink
                            to="/portfolio-col-3-style-5"
                            className="nav-link"
                          >
                            <span className="nav-link-name">Style 5</span>
                          </NavLink>
                        </li>
                      </ul>
                    </UncontrolledCollapse>
                  </li>
                  <li className="nav-item navbar-collapse">
                    <NavLink
                      to="/#"
                      id="navbarCollapse4Column"
                      className="nav-link collapsed"
                      role="button"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="navbarCollapse4Column"
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
                    </NavLink>
                    <UncontrolledCollapse toggler="#navbarCollapse4Column" className="navbar-collapse-menu">
                      <ul className="nav navbar-nav">
                        <li className="nav-item">
                          <NavLink
                            to="/portfolio-col-4-style-1"
                            className="nav-link"
                          >
                            <span className="nav-link-name">Style 1</span>
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink
                            to="/portfolio-col-4-style-2"
                            className="nav-link"
                          >
                            <span className="nav-link-name">Style 2</span>
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink
                            to="/portfolio-col-4-style-3"
                            className="nav-link"
                          >
                            <span className="nav-link-name">Style 3</span>
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink
                            to="/portfolio-col-4-style-4"
                            className="nav-link"
                          >
                            <span className="nav-link-name">Style 4</span>
                          </NavLink>
                        </li>
                      </ul>
                    </UncontrolledCollapse>
                  </li>
                  <li className="nav-item navbar-collapse">
                    <NavLink
                      to="/#"
                      id="navbarCollapseSingleWorks"
                      className="nav-link collapsed"
                      role="button"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="navbarCollapseSingleWorks"
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
                    </NavLink>
                    <UncontrolledCollapse toggler="#navbarCollapseSingleWorks" className="navbar-collapse-menu">
                      <ul className="nav navbar-nav">
                        <li className="nav-item">
                          <NavLink
                            to="/portfolio-single-style-1"
                            className="nav-link"
                          >
                            <span className="nav-link-name">Style 1</span>
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink
                            to="/portfolio-single-style-2"
                            className="nav-link"
                          >
                            <span className="nav-link-name">Style 2</span>
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink
                            to="/portfolio-single-style-3"
                            className="nav-link"
                          >
                            <span className="nav-link-name">Style 3</span>
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink
                            to="/portfolio-single-style-4"
                            className="nav-link"
                          >
                            <span className="nav-link-name">Style 4</span>
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink
                            to="/portfolio-single-style-5"
                            className="nav-link"
                          >
                            <span className="nav-link-name">Style 5</span>
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink
                            to="/portfolio-single-style-6"
                            className="nav-link"
                          >
                            <span className="nav-link-name">Style 6</span>
                          </NavLink>
                        </li>
                      </ul>
                    </UncontrolledCollapse>
                  </li>
                </ul>
              </UncontrolledCollapse>
            </li>
            <li className="nav-item navbar-collapse ">
              <NavLink
                to="/#"
                id="navbarCollapsePages"
                className="nav-link collapsed"
                role="button"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="navbarCollapsePages"
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
              </NavLink>
              <UncontrolledCollapse toggler="#navbarCollapsePages" className="navbar-collapse-menu">
                <ul className="nav navbar-nav">
                  <li className="nav-item navbar-collapse ">
                    <NavLink
                      to="/#"
                      id="navbarCollapseAboutUs"
                      className="nav-link collapsed"
                      role="button"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="navbarCollapseAboutUs"
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
                    </NavLink>
                    <UncontrolledCollapse toggler="#navbarCollapseAboutUs" className="navbar-collapse-menu">
                      <ul className="nav navbar-nav">
                        <li className="nav-item ">
                          <NavLink to="/about-us" className="nav-link">
                            <span className="nav-link-name">
                              About Us
                            </span>
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink to="/about-us-2" className="nav-link">
                            <span className="nav-link-name">
                              About Us 2
                            </span>
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink to="/about-me" className="nav-link">
                            <span className="nav-link-name">
                              About Me
                            </span>
                          </NavLink>
                        </li>
                      </ul>
                    </UncontrolledCollapse>
                  </li>
                  <li className="nav-item navbar-collapse">
                    <NavLink
                      to="/#"
                      id="navbarCollapseServices"
                      className="nav-link collapsed"
                      role="button"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="navbarCollapseServices"
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
                    </NavLink>
                    <UncontrolledCollapse toggler="#navbarCollapseServices" className="navbar-collapse-menu">
                      <ul className="nav navbar-nav">
                        <li className="nav-item">
                          <NavLink to="/services" className="nav-link">
                            <span className="nav-link-name">
                              Services
                            </span>
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink
                            to="/single-service"
                            className="nav-link"
                          >
                            <span className="nav-link-name">
                              Single Service
                            </span>
                          </NavLink>
                        </li>
                      </ul>
                    </UncontrolledCollapse>
                  </li>
                  <li className="nav-item navbar-collapse">
                    <NavLink
                      to="/#"
                      id="navbarCollapseBlog"
                      className="nav-link collapsed"
                      role="button"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      aria-controls="navbarCollapseBlog"
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
                    </NavLink>
                    <UncontrolledCollapse toggler="#navbarCollapseBlog" className="navbar-collapse-menu">
                      <ul className="nav navbar-nav">
                        <li className="nav-item">
                          <NavLink to="/blog3" className="nav-link">
                            <span className="nav-link-name">
                              3 column
                            </span>
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink to="/blog1" className="nav-link">
                            <span className="nav-link-name">
                              1 column
                            </span>
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink to="/singlepost" className="nav-link">
                            <span className="nav-link-name">
                              Single Post
                            </span>
                          </NavLink>
                        </li>
                      </ul>
                    </UncontrolledCollapse>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/coming-soon" className="nav-link">
                      <span className="nav-link-name">Coming Soon</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/404" className="nav-link">
                      <span className="nav-link-name">404</span>
                    </NavLink>
                  </li>
                </ul>
              </UncontrolledCollapse>
            </li>
            <li className="nav-item navbar-collapse">
              <NavLink
                to="/#"
                id="navbarCollapseContact"
                className="nav-link collapsed"
                role="button"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="navbarCollapseContact"
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
              </NavLink>
              <UncontrolledCollapse toggler="#navbarCollapseContact" className="navbar-collapse-menu">
                <ul className="nav navbar-nav">
                  <li className="nav-item">
                    <NavLink to="/contact1" className="nav-link">
                      <span className="nav-link-name">Contact 1</span>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/contact2" className="nav-link">
                      <span className="nav-link-name">Contact 2</span>
                    </NavLink>
                  </li>
                </ul>
              </UncontrolledCollapse>
            </li>
          </ul>
          <ul className="nav nav-gap-sm navbar-nav nav-social align-items-center">
            <li className="nav-item">
              <NavLink
                to="/https://facebook.com/runwebrun"
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
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/https://twitter.com/runwebrun" className="nav-link">
                <svg
                  width="17"
                  height="14"
                  viewBox="0 0 25 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.0706 5.51356C22.086 5.73504 22.086 5.95656 22.086 6.17804C22.086 12.9334 17.0783 20.7172 7.92575 20.7172C5.10601 20.7172 2.48661 19.8787 0.283203 18.4232C0.683835 18.4707 1.069 18.4865 1.48505 18.4865C3.81167 18.4865 5.95347 17.6797 7.6638 16.3033C5.47581 16.2558 3.64221 14.7845 3.01046 12.7594C3.31865 12.8069 3.6268 12.8385 3.9504 12.8385C4.39723 12.8385 4.84411 12.7752 5.2601 12.6645C2.97968 12.1898 1.2693 10.1332 1.2693 7.64935V7.58609C1.93183 7.96579 2.70231 8.20309 3.5189 8.2347C2.17837 7.31709 1.30013 5.75086 1.30013 3.97894C1.30013 3.02972 1.54661 2.15959 1.97807 1.40019C4.42801 4.50103 8.11063 6.52604 12.24 6.74756C12.163 6.36787 12.1168 5.97239 12.1168 5.57687C12.1168 2.76076 14.3356 0.466797 17.0937 0.466797C18.5266 0.466797 19.8209 1.0838 20.73 2.0805C21.8548 1.85902 22.9334 1.43184 23.8887 0.846495C23.5189 2.03307 22.7331 3.02977 21.7008 3.66255C22.7023 3.55186 23.673 3.26702 24.5667 2.87155C23.8888 3.88403 23.0413 4.78577 22.0706 5.51356Z"
                    fill="currentColor"
                  />
                </svg>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/https://instagram.com/runwebrun"
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
              </NavLink>
            </li>
          </ul>
          <p className="navbar-copyright text-muted">
            © 2020-2023 | Themebau by RunWebRun.
          </p>
        </Container>
      </header>
      <div
        className="navbar navbar-mobile navbar-mobile-style-4"
        style={{ height: "100vh", overflowY: "auto" }}
        id="navbar-mobile-style-4"
      >
        <div className="navbar-wrapper">
          <div className="navbar-head">
            <div className="container justify-content-between">
              <NavLink className="navbar-brand" to="/">
                <img width="107" src={Logo} alt="" />
              </NavLink>
              <NavLink className="navbar-toggle" to="#" onClick={() => toggleRemove()}>
                <span></span>
                <span></span>
                <span></span>
              </NavLink>
            </div>
          </div>
          <div className="navbar-body container">
            <ul className="nav navbar-nav navbar-nav-collapse">
              <li className="nav-item navbar-collapse">
                <NavLink
                  to="/#"
                  id="navbarCollapseHome"
                  className="nav-link collapsed"
                  role="button"
                  data-bs-toggle="collapse"
                  aria-expanded="false"
                  aria-controls="navbarCollapseHome"
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
                </NavLink>
                <UncontrolledCollapse toggler="#navbarCollapseHome" className="navbar-collapse-menu">
                  <ul className="nav navbar-nav">
                    <li className="nav-item">
                      <NavLink to="/home" className="nav-link">
                        <span className="nav-link-name">main home</span>
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/simple-portfolio" className="nav-link">
                        <span className="nav-link-name">
                          simple portofolio
                        </span>
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/creative-agency" className="nav-link">
                        <span className="nav-link-name">
                          creative agency
                        </span>
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        to="/freelancer-portfolio"
                        className="nav-link"
                      >
                        <span className="nav-link-name">
                          freelancer portfolio
                        </span>
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        to="/interactive-links-dark"
                        className="nav-link"
                      >
                        <span className="nav-link-name">
                          interactive dark
                        </span>
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        to="/interactive-links-light"
                        className="nav-link"
                      >
                        <span className="nav-link-name">
                          interactive light
                        </span>
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/left-menu" className="nav-link">
                        <span className="nav-link-name">left menu</span>
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/digital-agency" className="nav-link">
                        <span className="nav-link-name">
                          digital agency
                        </span>
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/carousel-dark" className="nav-link">
                        <span className="nav-link-name">carousel dark</span>
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/carousel-light" className="nav-link">
                        <span className="nav-link-name">
                          carousel light
                        </span>
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        to="/fullscreen-showcase"
                        className="nav-link"
                      >
                        <span className="nav-link-name">
                          fullscreen showcase
                        </span>
                      </NavLink>
                    </li>
                  </ul>
                </UncontrolledCollapse>
              </li>
              <li className="nav-item navbar-collapse">
                <NavLink
                  to="/#"
                  id="navbarCollapseProjects"
                  className="nav-link collapsed"
                  role="button"
                  data-bs-toggle="collapse"
                  aria-expanded="false"
                  aria-controls="navbarCollapseProjects"
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
                </NavLink>
                <UncontrolledCollapse toggler="#navbarCollapseProjects" className="navbar-collapse-menu">
                  <ul className="nav navbar-nav">
                    <li className="nav-item navbar-collapse">
                      <NavLink
                        to="/#"
                        id="navbarCollapse1Column"
                        className="nav-link collapsed"
                        role="button"
                        data-bs-toggle="collapse"
                        aria-expanded="false"
                        aria-controls="navbarCollapse1Column"
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
                      </NavLink>
                      <UncontrolledCollapse toggler="#navbarCollapse1Column" className="navbar-collapse-menu">
                        <ul className="nav navbar-nav">
                          <li className="nav-item">
                            <NavLink
                              to="/portfolio-col-1-style-1"
                              className="nav-link"
                            >
                              <span className="nav-link-name">Style 1</span>
                            </NavLink>
                          </li>
                          <li className="nav-item">
                            <NavLink
                              to="/portfolio-col-1-style-2"
                              className="nav-link"
                            >
                              <span className="nav-link-name">Style 2</span>
                            </NavLink>
                          </li>
                        </ul>
                      </UncontrolledCollapse>
                    </li>
                    <li className="nav-item navbar-collapse">
                      <NavLink
                        to="/#"
                        id="navbarCollapse2Column"
                        className="nav-link collapsed"
                        role="button"
                        data-bs-toggle="collapse"
                        aria-expanded="false"
                        aria-controls="navbarCollapse2Column"
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
                      </NavLink>
                      <UncontrolledCollapse toggler="#navbarCollapse2Column" className="navbar-collapse-menu">
                        <ul className="nav navbar-nav">
                          <li className="nav-item">
                            <NavLink
                              to="/portfolio-col-2-style-1"
                              className="nav-link"
                            >
                              <span className="nav-link-name">Style 1</span>
                            </NavLink>
                          </li>
                          <li className="nav-item">
                            <NavLink
                              to="/portfolio-col-2-style-2"
                              className="nav-link"
                            >
                              <span className="nav-link-name">Style 2</span>
                            </NavLink>
                          </li>
                          <li className="nav-item">
                            <NavLink
                              to="/portfolio-col-2-style-3"
                              className="nav-link"
                            >
                              <span className="nav-link-name">Style 3</span>
                            </NavLink>
                          </li>
                          <li className="nav-item">
                            <NavLink
                              to="/portfolio-col-2-style-4"
                              className="nav-link"
                            >
                              <span className="nav-link-name">Style 4</span>
                            </NavLink>
                          </li>
                          <li className="nav-item">
                            <NavLink
                              to="/portfolio-col-2-style-5"
                              className="nav-link"
                            >
                              <span className="nav-link-name">Style 5</span>
                            </NavLink>
                          </li>
                          <li className="nav-item">
                            <NavLink
                              to="/portfolio-col-2-style-6"
                              className="nav-link"
                            >
                              <span className="nav-link-name">Style 6</span>
                            </NavLink>
                          </li>
                        </ul>
                      </UncontrolledCollapse>
                    </li>
                    <li className="nav-item navbar-collapse">
                      <NavLink
                        to="/#"
                        id="navbarCollapse3Column"
                        className="nav-link collapsed"
                        role="button"
                        data-bs-toggle="collapse"
                        aria-expanded="false"
                        aria-controls="navbarCollapse3Column"
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
                      </NavLink>
                      <UncontrolledCollapse toggler="#navbarCollapse3Column" className="navbar-collapse-menu">
                        <ul className="nav navbar-nav">
                          <li className="nav-item">
                            <NavLink
                              to="/portfolio-col-3-style-1"
                              className="nav-link"
                            >
                              <span className="nav-link-name">Style 1</span>
                            </NavLink>
                          </li>
                          <li className="nav-item">
                            <NavLink
                              to="/portfolio-col-3-style-2"
                              className="nav-link"
                            >
                              <span className="nav-link-name">Style 2</span>
                            </NavLink>
                          </li>
                          <li className="nav-item">
                            <NavLink
                              to="/portfolio-col-3-style-3"
                              className="nav-link"
                            >
                              <span className="nav-link-name">Style 3</span>
                            </NavLink>
                          </li>
                          <li className="nav-item">
                            <NavLink
                              to="/portfolio-col-3-style-4"
                              className="nav-link"
                            >
                              <span className="nav-link-name">Style 4</span>
                            </NavLink>
                          </li>
                          <li className="nav-item">
                            <NavLink
                              to="/portfolio-col-3-style-5"
                              className="nav-link"
                            >
                              <span className="nav-link-name">Style 5</span>
                            </NavLink>
                          </li>
                        </ul>
                      </UncontrolledCollapse>
                    </li>
                    <li className="nav-item navbar-collapse">
                      <NavLink
                        to="/#"
                        id="navbarCollapse4Column"
                        className="nav-link collapsed"
                        role="button"
                        data-bs-toggle="collapse"
                        aria-expanded="false"
                        aria-controls="navbarCollapse4Column"
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
                      </NavLink>
                      <UncontrolledCollapse toggler="#navbarCollapse4Column" className="navbar-collapse-menu">
                        <ul className="nav navbar-nav">
                          <li className="nav-item">
                            <NavLink
                              to="/portfolio-col-4-style-1"
                              className="nav-link"
                            >
                              <span className="nav-link-name">Style 1</span>
                            </NavLink>
                          </li>
                          <li className="nav-item">
                            <NavLink
                              to="/portfolio-col-4-style-2"
                              className="nav-link"
                            >
                              <span className="nav-link-name">Style 2</span>
                            </NavLink>
                          </li>
                          <li className="nav-item">
                            <NavLink
                              to="/portfolio-col-4-style-3"
                              className="nav-link"
                            >
                              <span className="nav-link-name">Style 3</span>
                            </NavLink>
                          </li>
                          <li className="nav-item">
                            <NavLink
                              to="/portfolio-col-4-style-4"
                              className="nav-link"
                            >
                              <span className="nav-link-name">Style 4</span>
                            </NavLink>
                          </li>
                        </ul>
                      </UncontrolledCollapse>
                    </li>
                    <li className="nav-item navbar-collapse">
                      <NavLink
                        to="/#"
                        id="navbarCollapseSingleWorks"
                        className="nav-link collapsed"
                        role="button"
                        data-bs-toggle="collapse"
                        aria-expanded="false"
                        aria-controls="navbarCollapseSingleWorks"
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
                      </NavLink>
                      <UncontrolledCollapse toggler="#navbarCollapseSingleWorks" className="navbar-collapse-menu">
                        <ul className="nav navbar-nav">
                          <li className="nav-item">
                            <NavLink
                              to="/portfolio-single-style-1"
                              className="nav-link"
                            >
                              <span className="nav-link-name">Style 1</span>
                            </NavLink>
                          </li>
                          <li className="nav-item">
                            <NavLink
                              to="/portfolio-single-style-2"
                              className="nav-link"
                            >
                              <span className="nav-link-name">Style 2</span>
                            </NavLink>
                          </li>
                          <li className="nav-item">
                            <NavLink
                              to="/portfolio-single-style-3"
                              className="nav-link"
                            >
                              <span className="nav-link-name">Style 3</span>
                            </NavLink>
                          </li>
                          <li className="nav-item">
                            <NavLink
                              to="/portfolio-single-style-4"
                              className="nav-link"
                            >
                              <span className="nav-link-name">Style 4</span>
                            </NavLink>
                          </li>
                          <li className="nav-item">
                            <NavLink
                              to="/portfolio-single-style-5"
                              className="nav-link"
                            >
                              <span className="nav-link-name">Style 5</span>
                            </NavLink>
                          </li>
                          <li className="nav-item">
                            <NavLink
                              to="/portfolio-single-style-6"
                              className="nav-link"
                            >
                              <span className="nav-link-name">Style 6</span>
                            </NavLink>
                          </li>
                        </ul>
                      </UncontrolledCollapse>
                    </li>
                  </ul>
                </UncontrolledCollapse>
              </li>
              <li className="nav-item navbar-collapse ">
                <NavLink
                  to="/#"
                  id="navbarCollapsePages"
                  className="nav-link collapsed"
                  role="button"
                  data-bs-toggle="collapse"
                  aria-expanded="false"
                  aria-controls="navbarCollapsePages"
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
                </NavLink>
                <UncontrolledCollapse toggler="#navbarCollapsePages" className="navbar-collapse-menu">
                  <ul className="nav navbar-nav">
                    <li className="nav-item navbar-collapse ">
                      <NavLink
                        to="/#"
                        id="navbarCollapseAboutUs"
                        className="nav-link collapsed"
                        role="button"
                        data-bs-toggle="collapse"
                        aria-expanded="false"
                        aria-controls="navbarCollapseAboutUs"
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
                      </NavLink>
                      <UncontrolledCollapse toggler="#navbarCollapseAboutUs" className="navbar-collapse-menu">
                        <ul className="nav navbar-nav">
                          <li className="nav-item ">
                            <NavLink to="/about-us" className="nav-link">
                              <span className="nav-link-name">
                                About Us
                              </span>
                            </NavLink>
                          </li>
                          <li className="nav-item">
                            <NavLink to="/about-us-2" className="nav-link">
                              <span className="nav-link-name">
                                About Us 2
                              </span>
                            </NavLink>
                          </li>
                          <li className="nav-item">
                            <NavLink to="/about-me" className="nav-link">
                              <span className="nav-link-name">
                                About Me
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </UncontrolledCollapse>
                    </li>
                    <li className="nav-item navbar-collapse">
                      <NavLink
                        to="/#"
                        id="navbarCollapseServices"
                        className="nav-link collapsed"
                        role="button"
                        data-bs-toggle="collapse"
                        aria-expanded="false"
                        aria-controls="navbarCollapseServices"
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
                      </NavLink>
                      <UncontrolledCollapse toggler="#navbarCollapseServices" className="navbar-collapse-menu">
                        <ul className="nav navbar-nav">
                          <li className="nav-item">
                            <NavLink to="/services" className="nav-link">
                              <span className="nav-link-name">
                                Services
                              </span>
                            </NavLink>
                          </li>
                          <li className="nav-item">
                            <NavLink
                              to="/single-service"
                              className="nav-link"
                            >
                              <span className="nav-link-name">
                                Single Service
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </UncontrolledCollapse>
                    </li>
                    <li className="nav-item navbar-collapse">
                      <NavLink
                        to="/#"
                        id="navbarCollapseBlog"
                        className="nav-link collapsed"
                        role="button"
                        data-bs-toggle="collapse"
                        aria-expanded="false"
                        aria-controls="navbarCollapseBlog"
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
                      </NavLink>
                      <UncontrolledCollapse toggler="#navbarCollapseBlog" className="navbar-collapse-menu">
                        <ul className="nav navbar-nav">
                          <li className="nav-item">
                            <NavLink to="/blog3" className="nav-link">
                              <span className="nav-link-name">
                                3 column
                              </span>
                            </NavLink>
                          </li>
                          <li className="nav-item">
                            <NavLink to="/blog1" className="nav-link">
                              <span className="nav-link-name">
                                1 column
                              </span>
                            </NavLink>
                          </li>
                          <li className="nav-item">
                            <NavLink to="/singlepost" className="nav-link">
                              <span className="nav-link-name">
                                Single Post
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </UncontrolledCollapse>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/coming-soon" className="nav-link">
                        <span className="nav-link-name">Coming Soon</span>
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/404" className="nav-link">
                        <span className="nav-link-name">404</span>
                      </NavLink>
                    </li>
                  </ul>
                </UncontrolledCollapse>
              </li>
              <li className="nav-item navbar-collapse">
                <NavLink
                  to="/#"
                  id="navbarCollapseContact"
                  className="nav-link collapsed"
                  role="button"
                  data-bs-toggle="collapse"
                  aria-expanded="false"
                  aria-controls="navbarCollapseContact"
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
                </NavLink>
                <UncontrolledCollapse toggler="#navbarCollapseContact" className="navbar-collapse-menu">
                  <ul className="nav navbar-nav">
                    <li className="nav-item">
                      <NavLink to="/contact1" className="nav-link">
                        <span className="nav-link-name">Contact 1</span>
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/contact2" className="nav-link">
                        <span className="nav-link-name">Contact 2</span>
                      </NavLink>
                    </li>
                  </ul>
                </UncontrolledCollapse>
              </li>
            </ul>
          </div>
          <div className="navbar-footer">
            <div className="container">
              <ul className="nav nav-gap-sm navbar-nav nav-social align-items-center">
                <li className="nav-item">
                  <NavLink
                    to="/https://facebook.com/runwebrun"
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
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/https://twitter.com/runwebrun"
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
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/https://instagram.com/runwebrun"
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
                  </NavLink>
                </li>
              </ul>
              <p className="navbar-copyright font-size-14 text-muted">
                © 2020 - Themebau by RunWebRun.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-wrap" id="content-wrap">
        <div className="isotope">
          <div className="row isotope-grid">
            <div className="col-12 col-sm-6 col-lg-4 isotope-item">
              <span
                className="d-block"
                data-show-delay="50"
                data-show-duration="400"
                data-show-distance="10"
              >
                <NavLink
                  className="card card-portfolio card-overlay card-image-md text-dark text-center card-hover-appearance"
                  to="/portfolio-single-style-2"
                >
                  <span className="card-img">
                    <img src={Identity} alt="" />
                    <span
                      className="background-color"
                      style={{ backgroundColor: "#fff" }}
                    ></span>
                  </span>
                  <span className="card-img-overlay">
                    <span className="card-title h4">Identity Design</span>
                    <span className="card-category subtitle">marketing</span>
                  </span>
                </NavLink>
              </span>
            </div>
            <div className="col-12 col-sm-6 col-lg-4 isotope-item">
              <span
                className="d-block"
                data-show-delay="100"
                data-show-duration="400"
                data-show-distance="10"
              >
                <NavLink
                  className="card card-portfolio card-overlay card-image-lg text-dark text-center card-hover-appearance"
                  to="/portfolio-single-style-5"
                >
                  <span className="card-img">
                    <img src={App} alt="" />
                    <span
                      className="background-color"
                      style={{ backgroundColor: "#fff" }}
                    ></span>
                  </span>
                  <span className="card-img-overlay">
                    <span className="card-title h4">App Photography</span>
                    <span className="card-category subtitle">marketing</span>
                  </span>
                </NavLink>
              </span>
            </div>
            <div className="col-12 col-sm-6 col-lg-4 isotope-item">
              <span
                className="d-block"
                data-show-delay="150"
                data-show-duration="400"
                data-show-distance="10"
              >
                <NavLink
                  className="card card-portfolio card-overlay card-image-md text-dark text-center card-hover-appearance"
                  to="/portfolio-single-style-5"
                >
                  <span className="card-img">
                    <img src={Creative} alt="" />
                    <span
                      className="background-color"
                      style={{ backgroundColor: "#fff" }}
                    ></span>
                  </span>
                  <span className="card-img-overlay">
                    <span className="card-title h4">Creative Branding</span>
                    <span className="card-category subtitle">branding</span>
                  </span>
                </NavLink>
              </span>
            </div>
            <div className="col-12 col-sm-6 col-lg-4 isotope-item">
              <span
                className="d-block"
                data-show-delay="200"
                data-show-duration="400"
                data-show-distance="10"
              >
                <NavLink
                  className="card card-portfolio card-overlay card-image-lg text-dark text-center card-hover-appearance"
                  to="/portfolio-single-style-3"
                >
                  <span className="card-img">
                    <img src={Package} alt="" />
                    <span
                      className="background-color"
                      style={{ backgroundColor: "#fff" }}
                    ></span>
                  </span>
                  <span className="card-img-overlay">
                    <span className="card-title h4">Package Design</span>
                    <span className="card-category subtitle">branding</span>
                  </span>
                </NavLink>
              </span>
            </div>
            <div className="col-12 col-sm-6 col-lg-4 isotope-item">
              <span
                className="d-block"
                data-show-delay="250"
                data-show-duration="400"
                data-show-distance="10"
              >
                <NavLink
                  className="card card-portfolio card-overlay card-image-lg text-dark text-center card-hover-appearance"
                  to="/portfolio-single-style-1"
                >
                  <span className="card-img">
                    <img src={Watch} alt="" />
                    <span
                      className="background-color"
                      style={{ backgroundColor: "#fff" }}
                    ></span>
                  </span>
                  <span className="card-img-overlay">
                    <span className="card-title h4">Watch Design</span>
                    <span className="card-category subtitle">design</span>
                  </span>
                </NavLink>
              </span>
            </div>
            <div className="col-12 col-sm-6 col-lg-4 isotope-item">
              <span
                className="d-block"
                data-show-delay="300"
                data-show-duration="400"
                data-show-distance="10"
              >
                <NavLink
                  className="card card-portfolio card-overlay card-image-md text-dark text-center card-hover-appearance"
                  to="/portfolio-single-style-6"
                >
                  <span className="card-img">
                    <img src={Gobe} alt="" />
                    <span
                      className="background-color"
                      style={{ backgroundColor: "#fff" }}
                    ></span>
                  </span>
                  <span className="card-img-overlay">
                    <span className="card-title h4">Gobe Mockup</span>
                    <span className="card-category subtitle">branding</span>
                  </span>
                </NavLink>
              </span>
            </div>
            <div className="col-12 col-sm-6 col-lg-4 isotope-item">
              <span
                className="d-block"
                data-show-delay="350"
                data-show-duration="400"
                data-show-distance="10"
              >
                <NavLink
                  className="card card-portfolio card-overlay card-image-md text-dark text-center card-hover-appearance"
                  to="/portfolio-single-style-1"
                >
                  <span className="card-img">
                    <img src={Bag} alt="" />
                    <span
                      className="background-color"
                      style={{ backgroundColor: "#fff" }}
                    ></span>
                  </span>
                  <span className="card-img-overlay">
                    <span className="card-title h4">Bag Design</span>
                    <span className="card-category subtitle">branding</span>
                  </span>
                </NavLink>
              </span>
            </div>
            <div className="col-12 col-sm-6 col-lg-4 isotope-item">
              <span
                className="d-block"
                data-show-delay="400"
                data-show-duration="400"
                data-show-distance="10"
              >
                <NavLink
                  className="card card-portfolio card-overlay card-image-lg text-dark text-center card-hover-appearance"
                  to="/portfolio-single-style-5"
                >
                  <span className="card-img">
                    <img src={AppDesign} alt="" />
                    <span
                      className="background-color"
                      style={{ backgroundColor: "#fff" }}
                    ></span>
                  </span>
                  <span className="card-img-overlay">
                    <span className="card-title h4">App Design</span>
                    <span className="card-category subtitle">marketing</span>
                  </span>
                </NavLink>
              </span>
            </div>
            <div className="col-12 col-sm-6 col-lg-4 isotope-item">
              <span
                className="d-block"
                data-show-delay="450"
                data-show-duration="400"
                data-show-distance="10"
              >
                <NavLink
                  className="card card-portfolio card-overlay card-image-md text-dark text-center card-hover-appearance"
                  to="/portfolio-single-style-2"
                >
                  <span className="card-img">
                    <img src={Socks} alt="" />
                    <span
                      className="background-color"
                      style={{ backgroundColor: "#fff" }}
                    ></span>
                  </span>
                  <span className="card-img-overlay">
                    <span className="card-title h4">Creative Socks</span>
                    <span className="card-category subtitle">branding</span>
                  </span>
                </NavLink>
              </span>
            </div>
            <div className="col-12 col-sm-6 col-lg-4 isotope-item">
              <span
                className="d-block"
                data-show-delay="500"
                data-show-duration="400"
                data-show-distance="10"
              >
                <NavLink
                  className="card card-portfolio card-overlay card-image-lg text-dark text-center card-hover-appearance"
                  to="/portfolio-single-style-2"
                >
                  <span className="card-img">
                    <img src={Boxed} alt="" />
                    <span
                      className="background-color"
                      style={{ backgroundColor: "#fff" }}
                    ></span>
                  </span>
                  <span className="card-img-overlay">
                    <span className="card-title h4">Boxed Water</span>
                    <span className="card-category subtitle">design</span>
                  </span>
                </NavLink>
              </span>
            </div>
            <div className="col-12 col-sm-6 col-lg-4 isotope-item">
              <span
                className="d-block"
                data-show-delay="550"
                data-show-duration="400"
                data-show-distance="10"
              >
                <NavLink
                  className="card card-portfolio card-overlay card-image-lg text-dark text-center card-hover-appearance"
                  to="/portfolio-single-style-4"
                >
                  <span className="card-img">
                    <img src={Funny} alt="" />
                    <span
                      className="background-color"
                      style={{ backgroundColor: "#fff" }}
                    ></span>
                  </span>
                  <span className="card-img-overlay">
                    <span className="card-title h4">Funny Dog</span>
                    <span className="card-category subtitle">photography</span>
                  </span>
                </NavLink>
              </span>
            </div>
            <div className="col-12 col-sm-6 col-lg-4 isotope-item">
              <span
                className="d-block"
                data-show-delay="600"
                data-show-duration="400"
                data-show-distance="10"
              >
                <NavLink
                  className="card card-portfolio card-overlay card-image-md text-dark text-center card-hover-appearance"
                  to="/portfolio-single-style-6"
                >
                  <span className="card-img">
                    <img src={Sport} alt="" />
                    <span
                      className="background-color"
                      style={{ backgroundColor: "#fff" }}
                    ></span>
                  </span>
                  <span className="card-img-overlay">
                    <span className="card-title h4">Sport Today</span>
                    <span className="card-category subtitle">photography</span>
                  </span>
                </NavLink>
              </span>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer bg-dark text-white shape-parent overflow-hidden text-center pt-160 pb-60" id="footer">
        <div className="shape align-items-end justify-content-center">
          <svg
            data-rellax-speed="2"
            width="641"
            height="371"
            viewBox="0 0 641 371"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="320.5" cy="320.5" r="320.5" fill=" #202020" />
          </svg>
        </div>
        <div className="container pt-4">
          <ul className="nav align-items-center flex-column text-white mb-100">
            <li className="nav-item">
              <NavLink
                to="/mailto:hello@themebau.com?subject=Test%20Address%20Email"
                className="nav-link h2 mb-8 mb-md-30 d-none d-md-flex"
              >
                hello@themebau.com
              </NavLink>
              <NavLink
                to="/mailto:hello@themebau.com?subject=Test%20Address%20Email"
                className="nav-link h4 mb-8 mb-md-30 d-md-none"
              >
                hello@themebau.com
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/callto:+1 202-358-0309"
                className="nav-link h4 mt-8 mt-md-0"
              >
                +1 202-358-0309
              </NavLink>
            </li>
          </ul>
          <ul className="nav nav-social nav-gap-sm align-items-center justify-content-center mb-30 text-white">
            <li className="nav-item">
              <NavLink
                to="/https://facebook.com/runwebrun"
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
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/https://twitter.com/runwebrun" className="nav-link">
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
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/https://instagram.com/runwebrun"
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
              </NavLink>
            </li>
          </ul>
          <div className="footer-copyright mb-5">
            © 2020-2023 | Themebau by RunWebRun.
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default LeftMenu;
