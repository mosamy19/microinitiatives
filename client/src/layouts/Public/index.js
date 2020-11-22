import React from "react";
import Navigation from "../../components/partials/Navigation";
import PublicFooter from "../../components/partials/PublicFooter";

const PublicLayout = (props) => {
  return (
    <div>
      <Navigation />
      <div className="container">{props.children}</div>
      <PublicFooter />
    </div>
  );
};

export default PublicLayout;
