import React from "react";
import MainFooter from "../../components/partials/MainFooter";
import Mainnavigation from "../../components/partials/Mainnavigation";
import samimFont from "../../assets/samim-fonts/ArbFONTS-Samim-FD-WOL.ttf";
import styled from "styled-components";

const MainLayout = (props) => {
  return (
    <Wrapper>
      <div style={{ minHeight: "90vh", direction: "rtl" }}>
        <Mainnavigation />
        <div className="container">{props.children}</div>
      </div>
      <MainFooter />
    </Wrapper>
  );
};

export default MainLayout;
const Wrapper = styled.div`
  font-family: Samim-FD-WOL !important;
  @font-face {
    font-family: Samim-FD-WOL;
    src: url(${samimFont});
  }
`;
