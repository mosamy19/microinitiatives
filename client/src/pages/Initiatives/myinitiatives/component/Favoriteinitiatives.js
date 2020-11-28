import { Grid } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import Initiativecard from "../../component/Initiativecard";
import samimFont from "../../../../assets/samim-fonts/ArbFONTS-Samim-Bold-FD-WOL.ttf";
import { useSelector } from "react-redux";

const Favoriteinitiatives = () => {
  const { initiatives } = useSelector((state) => state.initiatives);
  return (
    <Wrapper>
      <Grid container spacing={3}>
        {initiatives.length > 0 &&
          initiatives.map((initiative) => (
            <Grid item xs={12} sm={6} md={4}>
              <Initiativecard initiative={initiative} />
            </Grid>
          ))}
      </Grid>
    </Wrapper>
  );
};

export default Favoriteinitiatives;
const Wrapper = styled.div`
  font-family: Samim-FD-WOL;
  font-size: 18px;
  cursor: pointer;
  @font-face {
    font-family: Samim-FD-WOL;
    src: url(${samimFont});
  }
`;
