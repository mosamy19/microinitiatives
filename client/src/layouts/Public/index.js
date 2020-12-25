import React from "react";
import PublicFooter from "../../components/partials/PublicFooter";
import Publicnavigation from "../../components/partials/Publicnavigation";
import samimFont from "../../assets/samim-fonts/ArbFONTS-Samim-FD-WOL.ttf";
import styled from 'styled-components'

const PublicLayout = (props) => {
  return (
    <Wrapper style={{direction: "rtl"}}>
      <div style={{ minHeight: "92vh" }}>
        <Publicnavigation />
        <div>{props.children}</div>
      </div>
      <PublicFooter />
    </Wrapper>
  );
};

export default PublicLayout;
const Wrapper = styled.div`
  font-family: Samim-FD-WOL !important;
  @font-face {
    font-family: Samim-FD-WOL;
    src: url(${samimFont});
  }
`;
