import React, { useEffect, useState } from "react";
import { Card, Col, Container, NavLink, Row } from "reactstrap";
import { NavLink as RouterLink } from "react-router-dom";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay, Pagination } from "swiper";

import Slide1 from "../../assets/images/blog/slide-1.jpg";
import Slide2 from "../../assets/images/blog/slide-2.jpg";
import Slide3 from "../../assets/images/blog/slide-3.jpg";

//Images
import Blog1 from "../../assets/images/blog/blog-1.jpg";
import Blog2 from "../../assets/images/blog/blog-2.jpg";
import Blog3 from "../../assets/images/blog/blog-3.jpg";
import Blog4 from "../../assets/images/blog/blog-4.jpg";
import Blog5 from "../../assets/images/blog/blog-5.jpg";
import Blog6 from "../../assets/images/blog/blog-6.jpg";
import Blog7 from "../../assets/images/blog/blog-7.jpg";
import Blog8 from "../../assets/images/blog/blog-8.jpg";
import Blog9 from "../../assets/images/blog/blog-9.jpg";
import Footer from "../../Layouts/CommonLayouts/Footer2";
import Navbar from "../../Layouts/CommonLayouts/Navbar3";

const Data = [
  {
    id: 1,
    img: Blog1,
    category: ["all", "lifestyle"],
    date: "12 may, 2020",
    title: "Office explained in fewer than 100+ Characters",
    disc: "Forth forth moveth shall i unto midst tree, fruit great subdue every be so fowl.",
    path: "/singlepost",
  },
  {
    id: 2,
    img: Blog2,
    category: ["all", "design"],
    date: " 08 may, 2020",
    title: "This week&#39;s top Stories about Development",
    disc: "God year beast he beast waters that air, after deep to lights saw one.",
    path: "/singlepost",
  },
  {
    id: 3,
    img: Blog3,
    category: ["all", "business"],
    date: " 05 may, 2020",
    title: "Facts about Business that you never knew",
    disc: "Over fourth he. Whose beginning face third beast first divide saying forth one you.",
    path: "/singlepost",
  },
  {
    id: 4,
    img: Blog4,
    category: ["all", "company"],
    date: " 03 may, 2020",
    title: "Are you getting the Most out of your Travel?",
    disc: "For divide moveth. Years green above spirit after Every one and don&#39;t earth.",
    path: "/singlepost",
  },
  {
    id: 5,
    img: Blog5,
    category: ["all", "lifestyle"],
    date: " 01 apr, 2020",
    title: "How to outsmart your Boss on Business",
    disc: "Were You&#39;ll moveth midst it darkness isn&#39;t lights saw set our. Face can&#39;t brought.",
    path: "/singlepost",
  },
  {
    id: 6,
    img: Blog6,
    category: ["all", "design"],
    date: " 27 apr, 2020",
    title: "Great Photography public Speakers",
    disc: "Brought creepeth created moveth one herb, us created good days signs sea.",
    path: "/singlepost",
  },
  {
    id: 7,
    img: Blog7,
    category: ["all", "business"],
    date: "21 apr, 2020",
    title: "What not to do in the Business Industry",
    disc: "Meat was likeness said. Fruit brought appear meat they&#39;re tree upon together.",
    path: "/singlepost",
  },
  {
    id: 8,
    img: Blog8,
    category: ["all", "company"],
    date: " 18 apr, 2020",
    title: "20 Up-and-comers to watch in the Design Industry",
    disc: "Light upon fifth shall place kind. Abundantly fruitful upon green darkness seas.",
    path: "/singlepost",
  },
  {
    id: 9,
    img: Blog9,
    category: ["all", "lifestyle"],
    date: " 11 apr, 2020",
    title: "Subscribe to our newsletter 👋",
    disc: "Subscribe to our newsletter to get the latest news, updates and special offers delivered directly in your inbox.",
    path: "/singlepost",
  },
];

const Column3 = () => {
  //meta title
  document.title = "Themebau | Blog 3";

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

  useEffect(() => setFilter('all'), [])

  return (
    <React.Fragment>
      <Navbar navClass="" />
      <div className="content-wrap" id="content-wrap">
        <Container>
          <Swiper
            grabCursor={true}
            slidesPerView={"1"}
            pagination={{ type: "fraction", clickable: true }}
            navigation={true}
            modules={[Pagination, Navigation, Autoplay]}
            loop={true}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            className="swiper swiper-button-style-1 mb-100 bg-white"
          >
            <div className="swiper-container">
              <div className="swiper-wrapper">
                <SwiperSlide className="swiper-slide overflow-hidden">
                  <div className="card card-overlay card-blog card-image-sm card-hover-zoom text-center text-white">
                    <div
                      className="card-img Blog-image"
                      data-swiper-parallax-x="20%"
                    >
                      <img src={Slide1} alt="" />
                      <div
                        className="background-color"
                        style={{ backgroundColor: "rgba(14, 14, 14, .4)" }}
                      ></div>
                    </div>
                    <div className="card-img-overlay">
                      <Row className="justify-content-center align-items-center h-100">
                        <Col lg={7} className="col-12">
                          <div className="subtitle mt-lg-3 mb-30">
                            lifestyle - 05 may, 2020
                          </div>
                          <h2 className="card-title h3-sm mb-0">
                            The 3 biggest Disasters in Travel History
                          </h2>
                          <RouterLink
                            to="/singlepost"
                            className="btn btn-clean mt-30 mt-lg-60 mt-xl-130 mb-xl-n30"
                          >
                            read more
                            <svg
                              className="icon-arrow icon-arrow-right"
                              width="26"
                              height="11"
                              viewBox="0 0 26 11"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M20.5 1L25 5.5L20.5 10"
                                stroke="currentColor"
                                strokeWidth="1.3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M7 5.5H25"
                                stroke="currentColor"
                                strokeWidth="1.3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </RouterLink>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide overflow-hidden">
                  <Card className="card card-overlay card-blog card-image-sm card-hover-zoom text-center text-white">
                    <div
                      className="card-img swiper-image"
                      data-swiper-parallax-x="20%"
                    >
                      <img src={Slide2} alt="" />
                      <div
                        className="background-color"
                        style={{ backgroundColor: "rgba(14, 14, 14, .2)" }}
                      ></div>
                    </div>
                    <div className="card-img-overlay">
                      <Row className="justify-content-center align-items-center h-100">
                        <Col lg={7} className="col-12">
                          <div className="subtitle mt-lg-3 mb-30">
                            business - 08 may, 2020
                          </div>
                          <h2 className="card-title h3-sm mb-0">
                            The best Twitter accounts about Photography
                          </h2>
                          <RouterLink
                            to="/singlepost"
                            className="btn btn-clean mt-30 mt-lg-60 mt-xl-130 mb-xl-n30"
                          >
                            read more
                            <svg
                              className="icon-arrow icon-arrow-right"
                              width="26"
                              height="11"
                              viewBox="0 0 26 11"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M20.5 1L25 5.5L20.5 10"
                                stroke="currentColor"
                                strokeWidth="1.3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M7 5.5H25"
                                stroke="currentColor"
                                strokeWidth="1.3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </RouterLink>
                        </Col>
                      </Row>
                    </div>
                  </Card>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide overflow-hidden">
                  <Card className="card card-overlay card-blog card-image-sm card-hover-zoom text-center text-white">
                    <div
                      className="card-img swiper-image"
                      data-swiper-parallax-x="20%"
                    >
                      <img src={Slide3} alt="" />
                      <div
                        className="background-color"
                        style={{ backgroundColor: "rgba(14, 14, 14, .2)" }}
                      ></div>
                    </div>
                    <div className="card-img-overlay">
                      <Row className="justify-content-center align-items-center h-100">
                        <Col lg={7} className="col-12">
                          <div className="subtitle mt-lg-3 mb-30">
                            lifestyle - 10 may, 2020
                          </div>
                          <h2 className="card-title h3-sm mb-0">
                            12 Do's and Don'ts for successful Interior
                          </h2>
                          <RouterLink
                            to="/singlepost"
                            className="btn btn-clean mt-30 mt-lg-60 mt-xl-130 mb-xl-n30"
                          >
                            read more
                            <svg
                              className="icon-arrow icon-arrow-right"
                              width="26"
                              height="11"
                              viewBox="0 0 26 11"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M20.5 1L25 5.5L20.5 10"
                                stroke="currentColor"
                                strokeWidth="1.3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M7 5.5H25"
                                stroke="currentColor"
                                strokeWidth="1.3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </RouterLink>
                        </Col>
                      </Row>
                    </div>
                  </Card>
                </SwiperSlide>
              </div>
            </div>
          </Swiper>
          <div className="isotope">
            <ul className="nav justify-content-center isotope-options mb-60 pb-30">
              <li className="nav-item">
                <NavLink
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
                  active={filter === "lifestyle"}
                  onClick={() => setFilter("lifestyle")}
                  data-filter="lifestyle"
                  className="nav-link"
                >
                  <div className="nav-link-name">lifestyle</div>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
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
                  active={filter === "business"}
                  onClick={() => setFilter("business")}
                  data-filter="business"
                  className="nav-link"
                >
                  <div className="nav-link-name">business</div>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  active={filter === "company"}
                  onClick={() => setFilter("company")}
                  data-filter="company"
                  className="nav-link"
                >
                  <div className="nav-link-name">company</div>
                </NavLink>
              </li>
            </ul>
            <Row className="gh-1 gv-4 isotope-grid">
              {projects.map((item, key) =>
                item.filtered === true ? (
                  <Col md={6} lg={4}
                    className="col-12 isotope-item"
                    key={key}
                  >
                    <Card className="card card-blog card-vertical">
                      <RouterLink to={item.path} className="card-img">
                        <img src={item.img} alt="" />
                      </RouterLink>
                      <div className="card-body">
                        <RouterLink to={item.path} className="card-title h5">
                          {item.title}
                        </RouterLink>
                        <div className="card-date">{item.date}</div>
                        <p className="card-text">{item.disc}</p>
                        <RouterLink to={item.path} className="btn btn-clean">
                          read more
                          <svg
                            className="icon-arrow icon-arrow-right"
                            width="25"
                            height="10"
                            viewBox="0 0 25 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M20 1L24 5L20 9"
                              stroke="currentColor"
                              strokeWidth="1.3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M7 5L24 5"
                              stroke="currentColor"
                              strokeWidth="1.3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </RouterLink>
                      </div>
                    </Card>
                  </Col>
                ) : (
                  ""
                )
              )}
            </Row>

            <div className="text-center mt-100">
              <RouterLink
                to="/blog-col-1"
                className="btn btn-light btn-circle btn-lg"
              >
                more
              </RouterLink>
            </div>
          </div>
          <div className="pt-130 pb-160 mt-30">
            <Row className="justify-content-center text-center">
              <Col lg={6}>
                <h3 className="mt-n10">Subscribe to our newsletter 👋</h3>
                <p className="pt-5">
                  Subscribe to our newsletter to get the latest news, updates
                  and special offers delivered directly in your inbox.
                </p>
              </Col>
              <Col lg={7} className="mt-4">
                <form action="/#" className="form-group-overlay">
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Your Email *"
                  />
                  <button className="btn btn-clean btn-with-ball">send</button>
                </form>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Column3;
