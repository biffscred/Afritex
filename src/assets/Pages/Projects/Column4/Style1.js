import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Col, Container, NavLink, Row } from "reactstrap";
import Navbar from "../../../Layouts/CommonLayouts/Navbar3";
import Footer from "../../../Layouts/CommonLayouts/Footer2";
import { NavLink as RouterLink } from "react-router-dom";

const Style1 = () => {
  document.title = "Afritex | Tissus";
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('https://127.0.0.1:8000/product') // Remplacez par l'URL appropriée de votre API
      .then(response => {
        // Filtrer pour obtenir uniquement les produits de la catégorie "tissus"
        const tissusProducts = response.data.filter(product => product.category.name === 'fabrics');
        setProjects(tissusProducts);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  return (
    <React.Fragment>
      <Navbar navClass="navbar-fixed" />
      <div className="content-wrap" id="content-wrap">
        <Container className="isotope">
          <h1 className="mt-160 py-10 mb-100 text-center" data-aos="fade-up">
            Nos tissus
          </h1>
          {/* Reste du code HTML et JSX... */}
          <Row className="gh-1 gv-1 isotope-grid">
            {projects.map((item, key) => (
              <Col
                sm={6} md={4} lg={3}
                key={key}
                className="col-12 isotope-item"
                data-aos="fade-up"
                data-cursor-style="cursor-text"
                data-cursor-text={item.title}
              >
                <RouterLink
                  className="card card-portfolio card-overlay card-image-lg card-hover-zoom text-center"
                  to={`/product/${item.id}`} // Assurez-vous que le chemin est correct
                >
                  <span className="card-img">
                  <img src={`/images/products/${item.images}`} alt={item.name} /> {/* Remplacez par le chemin correct de l'image */}
                  </span>
                </RouterLink>
              </Col>
            ))}
          </Row>
          {/* Reste du code HTML et JSX... */}
        </Container>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Style1;
