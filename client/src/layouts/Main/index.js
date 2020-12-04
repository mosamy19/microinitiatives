import React from "react";
import MainFooter from "../../components/partials/MainFooter";
import Mainnavigation from "../../components/partials/Mainnavigation";
// import Navigation from "../../components/partials/Navigation";

const MainLayout = (props) => {
  return (
    <div>
     <Mainnavigation />
      <div className="container">{props.children}</div>
      <MainFooter />
    </div>
  );
};

export default MainLayout;
