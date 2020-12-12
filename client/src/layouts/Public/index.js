import React from "react";
import PublicFooter from "../../components/partials/PublicFooter";
import Publicnavigation from "../../components/partials/Publicnavigation";

const PublicLayout = (props) => {
  return (
    <div>
      <Publicnavigation />
      <div>{props.children}</div>
      <PublicFooter />
    </div>
  );
};

export default PublicLayout;
