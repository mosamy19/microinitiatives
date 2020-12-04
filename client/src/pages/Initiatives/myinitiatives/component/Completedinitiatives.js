import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import samimFont from "../../../../assets/samim-fonts/ArbFONTS-Samim-FD-WOL.ttf";
import Initiativecard from "../../component/Initiativecard";
import { useSelector, useDispatch } from "react-redux";
import { getMyInitiatives } from "../../../../store/actions/initiative-actions";

const Completedinitiatives = ({ myinitiatives }) => {
  // const dispatch = useDispatch();
  // const [myInitiatives, setMyInitiatives] = useState([]);

  // useEffect(() => {
  //   dispatch(getMyInitiatives());
  // }, [dispatch]);

  // const { initiatives } = useSelector((state) => state.initiatives);
  // useEffect(() => {
  //   if (initiatives.length > 0) {
  //     setMyInitiatives(initiatives);
  //   }
  // }, [initiatives]);
  const completedInitiatives = myinitiatives.filter(
    (item) => item.draft !== true && item.cloned !== true
  );
  console.log(completedInitiatives);

  return (
    <Wrapper>
      <Grid container spacing={3}>
        {completedInitiatives.length === 0 ? (
          <span>No initiative yet..!</span>
        ) : (
          completedInitiatives.map((initiative) => (
            <Grid item xs={12} sm={6} md={4}>
              <Initiativecard initiative={initiative} />
            </Grid>
          ))
        )}
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
