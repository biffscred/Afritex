import React from "react";
import Navbar from "../../../Layouts/CommonLayouts/Navbar4";
import Footer from "../../../Layouts/CommonLayouts/Footer2";
import Main from "./Main";




const index = () => {
  //meta title
  document.title = "Afritex | A propos de nous ";
  return (
    <React.Fragment>
      <Navbar navClass="navbar-dark navbar-fixed" styleClass="2" />
      <div className="content-wrap" id="content-wrap">
        <Main />
       
        
     
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default index;
