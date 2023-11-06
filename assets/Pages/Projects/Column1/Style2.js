import React, { useEffect, useState } from "react";
import { NavLink } from "reactstrap";
import Navbar from "../../../Layouts/CommonLayouts/Navbar3";
import Footer from "../../../Layouts/CommonLayouts/Footer2";
import { NavLink as RouterLink } from "react-router-dom";

//Images
import Happy from "../../../assets/images/portfolio/cool-photography-1920-1080.jpg";
import Luxury from "../../../assets/images/portfolio/breakfast-1920-1080.jpg";
import BagDesign from "../../../assets/images/portfolio/amazing-nature-1920-1080.jpg";
import Creative from "../../../assets/images/portfolio/colibri-project-1920-1080.jpg";

const Data = [
  {
    id: 1,
    img: Happy,
    title: "Cool Photography",
    subtitle: "photography",
    category: ["all", "photography"],
    path: "/portfolio-single-style-1",
  },
  {
    id: 2,
    img: Luxury,
    title: "Breakfast",
    subtitle: "branding",
    category: ["all", "branding"],
    path: "/portfolio-single-style-5",
  },
  {
    id: 3,
    img: BagDesign,
    title: "Amazing Nature",
    subtitle: "photography",
    category: ["all", "photography"],
    path: "/portfolio-single-style-6",
  },
  {
    id: 4,
    img: Creative,
    title: "Colibri Project",
    subtitle: "marketing",
    category: ["all", "marketing"],
    path: "/portfolio-single-style-1",
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

  useEffect(() => {
    setFilter("all")
  }, [])
  return (
    <React.Fragment>
      <Navbar navClass="navbar-fixed" />
      <div className="content-wrap" id="content-wrap">
        <div className="container isotope">
          <h1
            className="mt-160 py-10 mb-100 text-center"
            data-show-duration="500"
            data-show-distance="10"
          >
            Our projects
          </h1>
          <ul
            className="nav justify-content-center isotope-options mb-60"
            data-show-duration="500"
          >
            <li className="nav-active">
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
            <div className="row gv-1 isotope-grid">
              {projects.map((item, key) =>
                item.filtered === true ? (
                  <div
                    key={key}
                    className="col-12 isotope-item"
                    data-filters="photography"
                    data-cursor-style="cursor-circle"
                    data-cursor-text="view"
                    data-aos="fade-up"
                  >
                    <RouterLink
                      className="card card-portfolio card-overlay card-image-sm card-hover-zoom card-bg-show text-white text-center"
                      to={item.path}
                    >
                      <span className="card-img">
                        <img src={item.img} alt="" />
                        <span
                          className="background-color"
                          style={{ backgroundColor: "rgba(14, 14, 14, .2)" }}
                        ></span>
                      </span>
                      <span className="card-img-overlay">
                        <span className="card-title h2">{item.title}</span>
                        <span className="card-category subtitle">
                          {item.subtitle}{" "}
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
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Style2;
