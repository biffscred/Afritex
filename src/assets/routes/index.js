import React from "react";
import { Routes, Route } from "react-router-dom";
import routes from "./allroute";

const Index = () => {
  return (
    <React.Fragment>
      <Routes>
        {routes.map((route, id) => (
          <React.Fragment key={id}>
            <Route element={route.element} path={route.path} />
          </React.Fragment>
        ))}
      </Routes>
    </React.Fragment>
  );
};

export default Index;
