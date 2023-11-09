import React, { useEffect } from "react";
import Navbar from "../../../Layouts/CommonLayouts/Navbar4";
import AboutSwiper from "./AboutSwiper";
import Features from "./Features";
import Footer from "./Footer";
import Main from "./Main";
// add bg-dark in body
const Index = () => {

  useEffect(() => {
    document.body.classList.add("bg-dark");
    return () => {
      document.body.classList.remove("bg-dark");
    };
  });

  //meta title
  document.title = "Themebau | About Us 2";
  return (
    <React.Fragment>
      <Navbar navClass="navbar-dark navbar-fixed" styleClass="2" />
      <div className="content-wrap bg-dark" id="content-wrap">
        <Main />
        <AboutSwiper />
        <Features />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Index;
