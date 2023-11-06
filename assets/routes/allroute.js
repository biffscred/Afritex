import Index from "../Pages/Index";

import Home from "../Pages/Home";
import SimplePortfolio from "../Pages/SimplePortfolio";

//Projects
import C1Style1 from "../Pages/Projects/Column1/Style1";
import C1Style2 from "../Pages/Projects/Column1/Style2";

import C2Style1 from "../Pages/Projects/Column2/Style1";
import C2Style2 from "../Pages/Projects/Column2/Style2";
import C2Style3 from "../Pages/Projects/Column2/Style3";
import C2Style4 from "../Pages/Projects/Column2/Style4";
import C2Style5 from "../Pages/Projects/Column2/Style5";
import C2Style6 from "../Pages/Projects/Column2/Style6";

import C3Style1 from "../Pages/Projects/Column3/Style1";
import C3Style2 from "../Pages/Projects/Column3/Style2";
import C3Style3 from "../Pages/Projects/Column3/Style3";
import C3Style4 from "../Pages/Projects/Column3/Style4";
import C3Style5 from "../Pages/Projects/Column3/Style5";

import C4Style1 from "../Pages/Projects/Column4/Style1";
import C4Style2 from "../Pages/Projects/Column4/Style2";
import C4Style3 from "../Pages/Projects/Column4/Style3";
import C4Style4 from "../Pages/Projects/Column4/Style4";

import PortfolioStyle1 from "../Pages/Projects/SingleWorks/Style1";
import PortfolioStyle2 from "../Pages/Projects/SingleWorks/Style2";
import PortfolioStyle3 from "../Pages/Projects/SingleWorks/Style3";
import PortfolioStyle4 from "../Pages/Projects/SingleWorks/Style4";
import PortfolioStyle5 from "../Pages/Projects/SingleWorks/Style5";
import PortfolioStyle6 from "../Pages/Projects/SingleWorks/Style6";

//Pages
import Aboutus1 from "../Pages/About/AboutUs1";
import Aboutus2 from "../Pages/About/AboutUs2";
import AbouteMe from "../Pages/About/AbouteMe/AbouteMe";
import Services from "../Pages/Services/Services";
import SingleService from "../Pages/Services/SingleService";
import Column3 from "../Pages/Blog/Column3";
import Column1 from "../Pages/Blog/Column1";
import SinglePost from "../Pages/Blog/SinglePost";
import ComingSoon from "../Pages/ComingSoon";
import Page404 from "../Pages/404";

import Contact1 from "../Pages/Contact/Contact1";
import Contact2 from "../Pages/Contact/Contact2";
import CreativeAgency from "../Pages/CreativeAgency";
import FreelancerPortfolio from "../Pages/FreelancerPortfolio";
import InteractiveDark from "../Pages/InteractiveDark";
import InteractiveLight from "../Pages/InteractiveLight";
import LeftMenu from "../Pages/LeftMenu";
import DigitalAgency from "../Pages/DigitalAgency";
import CarouselDark from "../Pages/CarouselDark";
import CarouselLight from "../Pages/CarouselLight";
import FullScreenShowcase from "../Pages/FullScreenShowcase";

const routes = [
  { path: "/", element: <Index /> },
  { path: "/home", element: <Home /> },
  { path: "/simple-portfolio", element: <SimplePortfolio /> },
  { path: "/creative-agency", element: <CreativeAgency /> },
  { path: "/freelancer-portfolio", element: <FreelancerPortfolio /> },
  { path: "/interactive-links-dark", element: <InteractiveDark /> },
  { path: "/interactive-links-light", element: <InteractiveLight /> },
  { path: "/left-menu", element: <LeftMenu /> },
  { path: "/digital-agency", element: <DigitalAgency /> },
  { path: "/carousel-dark", element: <CarouselDark /> },
  { path: "/carousel-light", element: <CarouselLight /> },
  { path: "/fullscreen-showcase", element: <FullScreenShowcase /> },

  { path: "/portfolio-col-1-style-1", element: <C1Style1 /> },
  { path: "/portfolio-col-1-style-2", element: <C1Style2 /> },

  { path: "/portfolio-col-2-style-1", element: <C2Style1 /> },
  { path: "/portfolio-col-2-style-2", element: <C2Style2 /> },
  { path: "/portfolio-col-2-style-3", element: <C2Style3 /> },
  { path: "/portfolio-col-2-style-4", element: <C2Style4 /> },
  { path: "/portfolio-col-2-style-5", element: <C2Style5 /> },
  { path: "/portfolio-col-2-style-6", element: <C2Style6 /> },

  { path: "/portfolio-col-3-style-1", element: <C3Style1 /> },
  { path: "/portfolio-col-3-style-2", element: <C3Style2 /> },
  { path: "/portfolio-col-3-style-3", element: <C3Style3 /> },
  { path: "/portfolio-col-3-style-4", element: <C3Style4 /> },
  { path: "/portfolio-col-3-style-5", element: <C3Style5 /> },

  { path: "/portfolio-col-4-style-1", element: <C4Style1 /> },
  { path: "/portfolio-col-4-style-2", element: <C4Style2 /> },
  { path: "/portfolio-col-4-style-3", element: <C4Style3 /> },
  { path: "/portfolio-col-4-style-4", element: <C4Style4 /> },

  { path: "/portfolio-single-style-1", element: <PortfolioStyle1 /> },
  { path: "/portfolio-single-style-2", element: <PortfolioStyle2 /> },
  { path: "/portfolio-single-style-3", element: <PortfolioStyle3 /> },
  { path: "/portfolio-single-style-4", element: <PortfolioStyle4 /> },
  { path: "/portfolio-single-style-5", element: <PortfolioStyle5 /> },
  { path: "/portfolio-single-style-6", element: <PortfolioStyle6 /> },

  { path: "/about-us", element: <Aboutus1 /> },
  { path: "/about-us-2", element: <Aboutus2 /> },
  { path: "/about-me", element: <AbouteMe /> },

  { path: "/services", element: <Services /> },
  { path: "/single-service", element: <SingleService /> },

  { path: "/blog3", element: <Column3 /> },
  { path: "/blog1", element: <Column1 /> },
  { path: "/singlepost", element: <SinglePost /> },

  { path: "/coming-soon", element: <ComingSoon /> },
  { path: "/404", element: <Page404 /> },

  { path: "/contact1", element: <Contact1 /> },
  { path: "/contact2", element: <Contact2 /> },
];

export default routes;
