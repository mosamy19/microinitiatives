import { Grid } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import samimFont from "../../../../assets/samim-fonts/ArbFONTS-Samim-Bold-FD-WOL.ttf";
import Initiativecard from "../../component/Initiativecard";

const Completedinitiatives = () => {
  return (
    <Wrapper>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Initiativecard isCompleted={true} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Initiativecard isCompleted={true} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Initiativecard isCompleted={true} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Initiativecard isCompleted={true} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Initiativecard isCompleted={true} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Initiativecard isCompleted={true} />
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default Completedinitiatives;
const Wrapper = styled.div`
  font-family: Samim-FD-WOL;
  font-size: 18px;
  cursor: pointer;
  @font-face {
    font-family: Samim-FD-WOL;
    src: url(${samimFont});
  }
`;
