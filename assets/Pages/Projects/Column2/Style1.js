import React, { useEffect, useState } from "react";
import { NavLink } from "reactstrap";
import Navbar from "../../../Layouts/CommonLayouts/Navbar3";
import Footer from "../../../Layouts/CommonLayouts/Footer2";
import { NavLink as RouterLink } from "react-router-dom";

//Images
import SportToday from "../../../assets/images/portfolio/sport-today-1200-865.jpg";
import FunnyDog from "../../../assets/images/portfolio/funny-dog-1200-865.jpg";
import WatchDesign from "../../../assets/images/portfolio/watch-design-1200-865.jpg";
import CoolPhotography from "../../../assets/images/portfolio/cool-photography-1200-856.jpg";
import Package from "../../../assets/images/portfolio/package-design-1200-856.jpg";
import CreativeImg from "../../../assets/images/portfolio/creative-branding-1200-865.jpg";

const Data = [
  {
    id: 1,
    img: SportToday,
    category: ["all", "photography"],
    path: "/portfolio-single-style-6",
  },
  {
    id: 2,
    img: FunnyDog,
    category: ["all", "photography"],
    path: "/portfolio-single-style-4",
  },
  {
    id: 3,
    img: WatchDesign,
    category: ["all", "design"],
    path: "/portfolio-single-style-1",
  },
  {
    id: 4,
    img: CoolPhotography,
    category: ["all", "photography"],
    path: "/portfolio-single-style-1",
  },
  {
    id: 5,
    img: Package,
    category: ["all", "branding"],
    path: "/portfolio-single-style-3",
  },
  {
    id: 6,
    img: CreativeImg,
    category: ["all", "branding"],
    path: "/portfolio-single-style-5",
  },
];
const Style1 = () => {
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
        <div className="container isotope mt-130">
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
                className={`nav-link ${filter === 'all' ? 'active' : ''}`}
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
                className={`nav-link ${filter === 'branding' ? 'active' : ''}`}
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
            <div className="row gh-1 gv-1 isotope-grid">
              {projects.map((item, key) =>
                item.filtered === true ? (
                  <div
                    key={key}
                    className="col-12 col-sm-6 isotope-item"
                    data-cursor-style="cursor-circle"
                    data-cursor-text="view"
                    data-aos="fade-up"
                  >
                    <RouterLink
                      className="card card-portfolio card-overlay card-image-lg card-hover-zoom text-white text-center"
                      to={item.path}
                    >
                      <span className="card-img">
                        <img src={item.img} alt="" />
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

export default Style1;
