import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Initiativecard from "../../component/Initiativecard";
import samimFont from "../../../../assets/samim-fonts/ArbFONTS-Samim-FD-WOL.ttf";
import { useDispatch, useSelector } from "react-redux";
import { getMyInitiatives } from "../../../../store/actions/initiative-actions";

const Favoriteinitiatives = () => {
  const dispatch = useDispatch();
  const [myInitiatives, setMyInitiatives] = useState([]);

  useEffect(() => {
    dispatch(getMyInitiatives());
  }, [dispatch]);

  const { initiatives } = useSelector((state) => state.initiatives);
  useEffect(() => {
    if (initiatives.length > 0) {
      setMyInitiatives(initiatives);
    }
  }, [initiatives]);
  return (
    <Wrapper>
      <Grid container spacing={3}>
        {myInitiatives.map((initiative) => (
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
