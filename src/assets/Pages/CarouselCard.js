// Card.js
import React from "react";
import { NavLink } from "react-router-dom";

const Card = ({ imageUrl, title }) => (
  <div className="card">
    <NavLink to={imageUrl}>
      <img className="card-img-top" src={imageUrl} alt={title} />
    </NavLink>
    <div className="card-body">
      <h5 className="card-title">{title}</h5>
      <p className="card-text">Description ou d'autres informations ici...</p>
    </div>
  </div>
);

export default Card;
