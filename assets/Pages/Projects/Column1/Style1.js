import React, { useEffect, useState, useMemo } from "react";
import Navbar from "../../../Layouts/CommonLayouts/Navbar2";
import { NavLink as RouterLink } from "react-router-dom";
//Images
import Happy from "../../../assets/images/portfolio/happy-moments-1920-1080.jpg";
import Luxury from "../../../assets/images/portfolio/luxury-car-1920-1080.jpg";
import BagDesign from "../../../assets/images/portfolio/bag-design-1920-1080.jpg";
import Creative from "../../../assets/images/portfolio/creative-branding-1340-860.jpg";
import { Col, Row, NavLink, Container, NavItem } from "reactstrap";
import Footer from "../../../Layouts/CommonLayouts/Footer2";

const Style1 = () => {
  //meta title
  document.title = "Themebau | An Award-winning digital Studio";
  const [filter, setFilter] = useState();
  const [projects, setProjects] = useState([]);

  const Data = useMemo(
    () =>
      [
        {
          id: 1,
          img: Happy,
          title: "Happy Moments Photoset",
          subtitle: "photography",
          category: ["all", "photography"],
          path: "/portfolio-single-style-2",
        },
        {
          id: 2,
          img: Luxury,
          title: "Luxury Car Website",
          subtitle: "design",
          category: ["all", "design"],
          path: "/portfolio-single-style-3",
        },
        {
          id: 3,
          img: BagDesign,
          title: "Bag Design",
          subtitle: "branding",
          category: ["all", "branding"],
          path: "/portfolio-single-style-1",
        },
        {
          id: 4,
          img: Creative,
          title: "Creative Branding",
          subtitle: "brandingpath",
          category: ["all", "brandingpath"],
          path: "/portfolio-single-style-5",
        },
      ]
    , []);

  useEffect(() => {
    setProjects(Data);
  }, [Data]);

  useEffect(() => {
    setProjects([]);

    const filtered = Data.map((p) => ({
      ...p,
      filtered: p.category.includes(filter),
    }));
    setProjects(filtered);
  }, [filter, Data]);

  const toggleVertical = (tab) => {
    if (filter !== tab) {
      setFilter(tab);
    }
  };

  useEffect(() => {
    setFilter("all")
  }, [])

  return (
    <React.Fragment>
      <Navbar navClass="light navbar-fixed" />
      <div className="content-wrap" id="content-wrap">
        <Container className="isotope mt-130">
          <ul
            className="nav justify-content-center isotope-options mb-60"
            data-show-duration="500"
          >
            <NavItem>
              <NavLink
                href="#"
                className="test nav-link"
                active={filter === "all"}
                onClick={() => {
                  toggleVertical("all");
                }}
              >
                <div className="nav-link-name">all projects</div>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="#"
                className="nav-link"
                active={filter === "branding"}
                onClick={() => {
                  toggleVertical("branding");
                }}
              >
                <div className="nav-link-name">branding</div>
              </NavLink>
            </NavItem>
            <li className="nav-item" data-aos="fade-up">
              <NavLink
                href="#"
                className="nav-link"
                active={filter === "design"}
                onClick={() => {
                  setFilter("design");
                }}
              >
                <div className="nav-link-name">design</div>
              </NavLink>
            </li>
            <li className="nav-item" data-aos="fade-up">
              <NavLink
                href="#"
                data-filter="photography"
                className="nav-link"
                active={filter === "photography"}
                onClick={() => {
                  toggleVertical("photography");
                }}
              >
                <div className="nav-link-name">photography</div>
              </NavLink>
            </li>
            <li className="nav-item" data-aos="fade-up">
              <NavLink
                href="#"
                data-filter="marketing"
                className="nav-link"
                active={filter === "marketing"}
                onClick={() => {
                  toggleVertical("marketing");
                }}
              >
                <div className="nav-link-name">marketing</div>
              </NavLink>
            </li>
          </ul>
          <div className="pt-30" data-show-duration="800">
            <Row className="gv-1 isotope-grid">
              {projects.map((item, key) =>
                item.filtered === true ? (
                  <Col
                    key={key}
                    className="col-12 isotope-item"
                    data-cursor-style="cursor-circle"
                    data-cursor-text="view"
                    data-aos="fade-up"
                  >
                    <RouterLink
                      className="card card-portfolio card-overlay card-image-sm card-hover-zoom card-bg-show text-white"
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
                        <svg
                          className="card-logo"
                          width="80"
                          height="40"
                          viewBox="0 0 80 40"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M21.0712 17.9257L11.4132 4.25223V12.1966C11.4132 14.2345 11.5409 17.697 15.2818 17.697V17.9257H7.13409V17.697C10.6703 17.697 11.1821 14.2084 11.1821 12.1966V3.94696L9.97803 2.24048C8.51458 0.325337 7.53847 0.25704 6.87359 0.210518C6.84037 0.208194 6.80793 0.205924 6.77624 0.203481V0H14.9484L23.6587 12.5028V5.70386C23.6587 3.33548 22.8388 0.203481 19.9948 0.203481V0H27.7575V0.203481C24.581 0.203481 23.8888 3.33548 23.8888 5.70386V17.9257H21.0712ZM43.8432 12.936V17.9257H28.8814V17.697C29.9578 17.697 30.3682 16.1688 30.3682 14.4371V3.51379C30.3682 1.93518 30.0094 0.203481 28.8814 0.203481V0H43.5098V5.21936H43.2797C43.2797 0.254823 36.2853 0.229645 36.2853 0.229645H35.3639V8.75841H37.4387L37.4405 8.75843C37.5246 8.75975 40.1825 8.80133 40.4611 5.75428H40.6921V11.9931H40.4611C40.1817 8.96366 37.5101 8.98742 37.4399 8.98804L37.4387 8.98805H35.3639V17.697H36.2853C36.2853 17.697 43.6122 17.9771 43.6122 12.936H43.8432ZM74.5589 0.203481V0H67.2818V0.203481C69.8957 0.203481 70.4592 3.66689 69.8187 5.47422L67.5138 11.9166L63.6705 3.1572C63.6705 3.1572 62.3641 0.203481 64.003 0.203481V0H56.0102V0.203481L56.0611 0.207332C56.695 0.254895 57.0574 0.282088 57.9065 2.2666C57.9065 2.2666 58.0596 2.59708 59.6225 6.21266L57.5731 11.8914L53.7044 3.1572C53.7044 3.1572 52.398 0.203481 54.0379 0.203481V0H46.0451V0.203481L46.0959 0.207327C46.7298 0.254893 47.0913 0.282023 47.9405 2.2666C47.9405 2.2666 48.2739 2.92757 54.7292 17.9257H55.6515L59.7512 6.51792C60.7569 8.79308 62.2558 12.2689 64.5641 17.6216L64.5663 17.6267L64.5664 17.627L64.5683 17.6315L64.5689 17.6328L64.6952 17.9257H65.6175L70.1004 5.47422C71.9704 0.992314 73.5333 0.203481 74.5589 0.203481ZM28.5138 22.0736V22.2771C27.4882 22.2771 25.9253 23.0659 24.0553 27.5478L19.5724 39.9993H18.6501L18.5285 39.7173C16.2149 34.3521 14.7132 30.8698 13.7051 28.5915L9.60636 39.9993H8.68406C2.22879 25.0012 1.89536 24.3402 1.89536 24.3402C1.04713 22.3557 0.684728 22.3285 0.0508518 22.2809L0 22.2771V22.0736H7.99278V22.2771C6.3529 22.2771 7.65935 25.2308 7.65935 25.2308L11.528 33.9649L13.5774 28.2862C12.0145 24.6707 11.8614 24.3402 11.8614 24.3402C11.0122 22.3556 10.6507 22.3285 10.016 22.2809L9.96515 22.2771V22.0736H17.9579V22.2771C16.319 22.2771 17.6254 25.2308 17.6254 25.2308L21.4678 33.9902L23.7736 27.5478C24.4141 25.7405 23.8506 22.2771 21.2377 22.2771V22.0736H28.5138ZM31.4576 34.831L33.7381 29.1019L36.2993 34.831H31.4576ZM36.4533 22.0743H36.3247L31.1505 35.0607C29.1772 39.5416 27.7937 39.7452 27.0254 39.7965V40H34.404V39.7965C31.3289 39.7965 30.8678 36.2323 31.3806 35.0607H36.4017L37.2216 36.8176C37.2216 36.8176 38.7591 39.7965 36.7097 39.7965V40H45.6755V39.7965L45.6294 39.792C45.1123 39.7419 44.2649 39.6599 43.3698 37.683C43.3698 37.683 42.9349 36.8428 36.4533 22.0743ZM63.7349 22.0743V22.2778C62.6332 22.2778 60.9933 23.0666 58.9956 27.5485L53.9482 40H53.2053C46.3396 25.0019 45.9808 24.3409 45.9808 24.3409C45.0821 22.3562 44.6944 22.3292 44.0114 22.2816L43.9568 22.2778V22.0743H52.4877V22.2778C50.7201 22.2778 52.1299 25.2315 52.1299 25.2315L56.1009 34.0161L58.7392 27.5485C59.5075 25.6646 59.0463 22.2778 55.9722 22.2778V22.0743H63.7349ZM80 40V35.0103H79.769C79.769 40.0513 72.4421 39.7713 72.4421 39.7713H71.5198V31.0623H73.5955L73.5967 31.0623C73.6669 31.0617 76.3394 31.0379 76.6179 34.0674H76.8489V27.8286H76.6179C76.3402 30.8759 73.6809 30.835 73.5973 30.8337L73.5955 30.8336H71.5198V22.3039H72.4421C72.4421 22.3039 79.4365 22.3291 79.4365 27.2936H79.6666V22.0743H65.0382V22.2778C66.1653 22.2778 66.525 24.0095 66.525 25.5881V36.5114C66.525 38.2431 66.1146 39.7713 65.0382 39.7713V40H80Z"
                            fill="currentColor"
                          />
                        </svg>
                        <span className="card-title h3">{item.title}</span>
                        <span className="card-category subtitle">
                          {item.subtitle}
                        </span>
                      </span>
                    </RouterLink>
                  </Col>
                ) : (
                  ""
                )
              )}
            </Row>
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

export default Style1;
