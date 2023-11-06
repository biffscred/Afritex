import React, { useEffect, useState } from "react";
import { Container, NavLink } from "reactstrap";
import Navbar from "../../../Layouts/CommonLayouts/Navbar3";
import Footer from "../../../Layouts/CommonLayouts/Footer2";
import { NavLink as RouterLink } from "react-router-dom";

//Images
import AppDesign from "../../../assets/images/portfolio/app-design-1200-856.jpg";
import Creative from "../../../assets/images/portfolio/creative-branding-1200-865.jpg";
import Package from "../../../assets/images/portfolio/package-design-1200-856.jpg";
import Mobile from "../../../assets/images/portfolio/mobile-app-1200-865.jpg";
import FunnyDog from "../../../assets/images/portfolio/funny-dog-1200-865.jpg";
import Identity from "../../../assets/images/portfolio/identity-design-1200-865.jpg";

const Data = [
  {
    id: 1,
    img: AppDesign,
    category: ["all", "photography"],
    title: "App Design",
    subtitle: "photography",
    path: "/portfolio-single-style-6",
    size: "lg"
  },
  {
    id: 2,
    img: Creative,
    category: ["all", "branding"],
    title: "Creative Branding",
    subtitle: "branding",
    path: "/portfolio-single-style-4",
    size: "md"
  },
  {
    id: 3,
    img: Mobile,
    category: ["all", "design"],
    title: "Mobile App",
    subtitle: "design",
    path: "/portfolio-single-style-1",
    size: "lg"
  },
  {
    id: 4,
    img: Package,
    category: ["all", "branding"],
    title: "Package Design",
    subtitle: "branding",
    path: "/portfolio-single-style-1",
    size: "md"
  },
  {
    id: 5,
    img: FunnyDog,
    category: ["all", "photography"],
    title: "Funny Dog",
    subtitle: "photography",
    path: "/portfolio-single-style-3",
    size: "lg"
  },
  {
    id: 6,
    img: Identity,
    category: ["all", "marketing"],
    title: "Identity Design",
    subtitle: "marketing",
    path: "/portfolio-single-style-5",
    size: "md"
  },
];
const Style2 = () => {
  //meta title
  document.title = "Themebau | An Award-winning digital Studio";

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

  useEffect(() => setFilter("all"), [])

  return (
    <React.Fragment>
      <Navbar navClass="navbar-fixed" />
      <div className="content-wrap" id="content-wrap">
        <Container className="isotope mt-130">
          <ul
            className="nav justify-content-center isotope-options mb-60 "
            data-show-duration="500"
          >
            <li className="nav-item">
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
            <li className="nav-item ">
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
            <li className="nav-item ">
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
            <li className="nav-item ">
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
            <li className="nav-item ">
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
          <div className="pt-30 " data-show-duration="800">
            <div className="row gh-1 gv-1 isotope-grid">
              {projects.map((item, key) =>
                item.filtered === true ? (
                  <div
                    className="col-12 col-sm-6 isotope-item"
                    key={key}
                    data-filters="photography"
                    data-aos="fade-up"
                  >
                    <RouterLink
                      className={
                        "card card-portfolio card-overlay card-hover-appearance text-white text-center card-image-" +
                        item.size
                      }
                      to={item.path}
                    >
                      <span className="card-img">
                        <img src={item.img} alt="" />
                        <span
                          className="background-color"
                          style={{ backgroundColor: "rgba(14, 14, 14, 0.7)" }}
                        ></span>
                      </span>
                      <span className="card-img-overlay">
                        <span className="card-title h4">{item.title}</span>
                        <span className="card-category subtitle">
                          {item.subtitle}
                        </span>
                      </span>
                    </RouterLink>
                  </div>
                ) : (
                  ""
                )
              )}
            </div>
          </div>
          <div className="text-center mt-100 mb-160">
            <RouterLink to="/#" className="btn btn-circle btn-light btn-lg">
              more
            </RouterLink>
          </div>
        </Container>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Style2;
