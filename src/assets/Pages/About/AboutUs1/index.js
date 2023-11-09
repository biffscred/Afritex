import React from "react";
import Navbar from "../../../Layouts/CommonLayouts/Navbar4";
import Footer from "../../../Layouts/CommonLayouts/Footer2";
import Main from "./Main";
import AboutSlider from "./AboutSlider";
import CreativeTeam from "./CreativeTeam";
import Testimonial from "./Testimonial";

const index = () => {
  //meta title
  document.title = "Themebau | About Us 1";
  return (
    <React.Fragment>
      <Navbar navClass="navbar-dark navbar-fixed" styleClass="2" />
      <div className="content-wrap" id="content-wrap">
        <Main />
        <AboutSlider />
        <CreativeTeam />
        <Testimonial />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default index;
