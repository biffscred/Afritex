import React, { useEffect, useState } from "react";
import { Card, Col, Container, NavLink, Row } from "reactstrap";
import { NavLink as RouterLink } from "react-router-dom";
//Images
import Blog1 from "../../assets/images/blog/blog-1.jpg";
import Blog2 from "../../assets/images/blog/blog-2.jpg";
import Blog3 from "../../assets/images/blog/blog-3.jpg";
import Blog4 from "../../assets/images/blog/blog-4.jpg";
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
];

const Column1 = () => {
  //meta title
  document.title = "Themebau | Blog 1";

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
      <Navbar navClass="sticky" />
      <div className="content-wrap" id="content-wrap">
        <Container>
          <div className="pt-60 pb-60 mt-10 mb-2 text-center">
            <h1
              className="mt-10 "
              data-show-duration="600"
              data-show-distance="10"
            >
              Our blog
            </h1>
          </div>
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
            <Row
              className="justify-content-center gh-1 "
              data-show-duration="700"
              data-show-delay="250"
            >
              {projects.map((item, key) =>
                item.filtered === true ? (
                  <Col lg={10} className="col-12 isotope-grid" key={key}>
                    <Card
                      className="card card-blog card-horizontal card-md isotope-item"
                      data-filters="lifestyle"
                    >
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
                to="/blog-col-3"
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
                <form action="#" className="form-group-overlay">
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Your Email *"
                  />
                  <button className="btn btn-clean btn-with-ball">send
                    <span className="btn-ball" style={{ transform: "translateY(0px)" }}></span>
                  </button>
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

export default Column1;
