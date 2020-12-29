import React from "react";
import MainFooter from "../../components/partials/MainFooter";
import Mainnavigation from "../../components/partials/Mainnavigation";
import samimFont from "../../assets/samim-fonts/ArbFONTS-Samim-FD-WOL.ttf";
import styled from "styled-components";

const MainLayout = (props) => {
  return (
    <Wrapper>
      <div style={{ minHeight: "90vh" }}>
        <Mainnavigation />
        <div className="container" style={{ paddingBottom: "40px" }}>
          {props.children}
        </div>
      </div>
      <MainFooter />
    </Wrapper>
  );
};

export default MainLayout;
const Wrapper = styled.div`
  direction: rtl;
  font-family: Samim-FD-WOL !important;
  @font-face {
    font-family: Samim-FD-WOL;
    src: url(${samimFont});
  }
`;
