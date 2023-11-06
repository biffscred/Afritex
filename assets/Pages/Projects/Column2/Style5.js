import React, { useEffect, useState } from "react";
import { Container, NavLink } from "reactstrap";
import { NavLink as RouterLink } from "react-router-dom";
import Navbar from "../../../Layouts/CommonLayouts/Navbar3";
import Footer from "../../../Layouts/CommonLayouts/Footer2";

//Images
import AppDesign from "../../../assets/images/portfolio/cool-photography-1200-856.jpg";
import Creative from "../../../assets/images/portfolio/app-design-1200-856.jpg";
import Package from "../../../assets/images/portfolio/boxed-water-1200-856.jpg";
import Mobile from "../../../assets/images/portfolio/creative-branding-1200-865.jpg";
import FunnyDog from "../../../assets/images/portfolio/mobile-app-1200-865.jpg";
import Identity from "../../../assets/images/portfolio/package-design-1200-856.jpg";

const Data = [
  {
    id: 1,
    img: AppDesign,
    category: ["all", "photography"],
    title: "Cool Photography",
    subtitle: "Photography",
    path: "/portfolio-single-style-6",
  },
  {
    id: 2,
    img: Creative,
    category: ["all", "marketing"],
    title: "App Design",
    subtitle: "Design",
    path: "/portfolio-single-style-4",
  },
  {
    id: 3,
    img: Package,
    category: ["all", "design"],
    title: "Boxed Water",
    subtitle: "design",
    path: "/portfolio-single-style-1",
  },
  {
    id: 4,
    img: Mobile,
    category: ["all", "branding"],
    title: "Creative Branding",
    subtitle: "branding",
    path: "/portfolio-single-style-1",
  },
  {
    id: 5,
    img: FunnyDog,
    category: ["all", "design"],
    title: "Mobile App",
    subtitle: "design",
    path: "/portfolio-single-style-3",
  },
  {
    id: 6,
    img: Identity,
    category: ["all", "design"],
    title: "Package Design",
    subtitle: "design",
    path: "/portfolio-single-style-5",
  },
];

const Style5 = () => {
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
    <>
      <Navbar navClass="navbar-fixed" />
      <div className="content-wrap" id="content-wrap">
        <Container className="isotope mt-130">
          <ul
            className="nav justify-content-center isotope-options mb-60"
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
          <div className="pt-30" data-show-duration="800">
            <div className="row gv-5 isotope-grid">
              {projects.map((item, key) =>
                item.filtered === true ? (
                  <div
                    key={key}
                    className="col-12 col-md-6 isotope-item"
                    data-filters="photography"
                    data-aos="fade-up"
                  >
                    <RouterLink
                      tag={RouterLink}
                      className="card card-portfolio card-default card-image-md card-hover-zoom text-center"
                      to={item.path}
                    >
                      <span
                        className="card-img"
                        data-cursor-style="cursor-circle"
                        data-cursor-text="view"
                      >
                        <img src={item.img} alt="" />
                      </span>
                      <span className="card-body">
                        <span className="card-title h4">{item.title} </span>
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
            <RouterLink
              tag={RouterLink}
              to="/#"
              className="btn btn-circle btn-light btn-lg"
            >
              more
            </RouterLink>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Style5;
