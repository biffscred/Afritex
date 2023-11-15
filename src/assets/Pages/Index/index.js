import React from "react";
import Navbar from "../../Layouts/CommonLayouts/Navbar1";

import ThemebauMain from "./ThemebauMain";
// import Work from "./Work";
// import ProjectShowcase from "./ProjectShowcase";
// import InnerPages from "./InnerPages";
// import Features from "./Features";
// import ManuStyle from "./ManuStyle";
import Footer from "../../Layouts/CommonLayouts/Footer2";

const Index = () => {
  //meta title
  document.title = "Afritex ";
  return (
    <React.Fragment>
      <Navbar />
      <div className="content-wrap" id="content-wrap">
        <ThemebauMain />
        <Footer />
        {/* <Work />
        <ProjectShowcase />
        <InnerPages />
        <ManuStyle />
        <Features /> */}
      </div>
    </React.Fragment>
  );
};

export default Index;
