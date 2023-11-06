import React, { useEffect, useState } from "react";
import { Container, NavLink } from "reactstrap";
import Navbar from "../../../Layouts/CommonLayouts/Navbar3";
import Footer from "../../../Layouts/CommonLayouts/Footer2";

//Images
import Package from "../../../assets/images/portfolio/boxed-water-740-860.jpg";
import Creative from "../../../assets/images/portfolio/creative-branding-740-860.jpg";
import AppDesign from "../../../assets/images/portfolio/package-design-740-540.jpg";
import Identity from "../../../assets/images/portfolio/app-design-740-860.jpg";
import BoxedWater from "../../../assets/images/portfolio/brand-design-740-860.jpg";
import Mobile from "../../../assets/images/portfolio/watch-design-740-860.jpg";
const Data = [
  {
    id: 1,
    img: AppDesign,
    category: ["all", "photography"],
    title: "Boxed Water",
    subtitle: "photography",
    path: "/portfolio-single-style-2",
  },
  {
    id: 2,
    img: Creative,
    category: ["all", "branding"],
    title: "Creative Branding",
    subtitle: "branding",
    path: "/portfolio-single-style-5",
  },
  {
    id: 3,
    img: Package,
    category: ["all", "branding"],
    title: "Package Design",
    subtitle: "branding",
    path: "/portfolio-single-style-3",
  },
  {
    id: 4,
    img: Mobile,
    category: ["all", "marketing"],
    title: "App Design",
    subtitle: "marketing",
    path: "/portfolio-single-style-5",
  },
  {
    id: 5,
    img: BoxedWater,
    category: ["all", "branding"],
    title: "Brand Design",
    subtitle: "branding",
    path: "/portfolio-single-style-4",
  },
  {
    id: 6,
    img: Identity,
    category: ["all", "design"],
    title: "Watch Design",
    subtitle: "design",
    path: "/portfolio-single-style-1",
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

  useEffect(() => setFilter('all'), [])

  return (
    <React.Fragment>
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
            <div className="row gh-1 gv-3 isotope-grid">
              {projects.map((item, key) =>
                item.filtered === true ? (
                  <div
                    key={key}
                    className="col-12 col-sm-6 col-md-4 isotope-item"
                    data-aos="fade-up"
                  >
                    <a
                      className="card card-portfolio card-default card-image-xl card-hover-frame"
                      href={item.path}
                    >
                      <span
                        className="card-img"
                        data-cursor-style="cursor-circle"
                        data-cursor-text="view"
                      >
                        <img src={item.img} alt="" />
                      </span>
                      <span className="card-body">
                        <span className="card-title h4">{item.title}</span>
                        <span className="card-category subtitle">
                          {item.subtitle}
                        </span>
                      </span>
                    </a>
                  </div>
                ) : (
                  ""
                )
              )}
            </div>
          </div>
          <div className="text-center mt-100 mb-160">
            <a href="/#" className="btn btn-circle btn-light btn-lg">
              more
            </a>
          </div>
        </Container>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Style5;
