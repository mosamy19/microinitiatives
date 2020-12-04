import React from "react";
import PublicFooter from "../../components/partials/PublicFooter";
import Publicnavigation from "../../components/partials/Publicnavigation";

const PublicLayout = (props) => {
  return (
    <div>
      <Publicnavigation />
      <div className="container">{props.children}</div>
      <PublicFooter />
    </div>
  );
};

export default PublicLayout;
