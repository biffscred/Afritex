import React from "react";
import Navbar from "../../Layouts/CommonLayouts/Navbar2";

import Slider from "./Slider";
import WhoWeAre from "./WhoWeAre";
import FeaturedWork from "./FeaturedWork";
import WorkProcess from "./WorkProcess";
import Service from "./Service";
import OurClients from "./OurClients";
import Footer from "../../Layouts/CommonLayouts/Footer1";

const Home = () => {
  //meta title
  document.title = "Themebau | Minimal Portfolio & Agency Template ";
  return (
    <React.Fragment>
      <Navbar navClass="dark" />
      <Slider />
      <div className="content-wrap" id="content-wrap">
        <WhoWeAre />
        <FeaturedWork />
        <WorkProcess />
        <Service />
        <OurClients />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Home;
