import React from "react";
import MainFooter from "../../components/partials/MainFooter";
import Navigation from "../../components/partials/Navigation";

const MainLayout = (props) => {
  return (
    <div>
      <Navigation />
      <div className="container">{props.children}</div>
      <MainFooter />
    </div>
  );
};

export default MainLayout;
