import React from "react";
import PublicFooter from "../../components/partials/PublicFooter";
import Publicnavigation from "../../components/partials/Publicnavigation";

const PublicLayout = (props) => {
  return (
    <div>
      <div style={{ minHeight: "92vh" }}>
        <Publicnavigation />
        <div>{props.children}</div>
      </div>
      <PublicFooter />
    </div>
  );
};

export default PublicLayout;
