import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import styled from "styled-components";
import samimFont from "../../../../assets/samim-fonts/ArbFONTS-Samim-Bold-FD-WOL.ttf";
import Initiativecard from "../../component/Initiativecard";
import { useSelector, useDispatch } from "react-redux";
import { getAllInitiatives } from "../../../../store/actions/initiative-actions";

const Completedinitiatives = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllInitiatives());
  }, [dispatch]);

  // const { initiatives } = useSelector((state) => state.initiatives);
  // const { _id } = useSelector((state) => state.auth.user);
  // let completedInitiatives = initiatives.filter((initiative) =>  initiative._id === _id);


  // console.log(completedInitiatives);
  return (
    <Wrapper>
      <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              {/* <Initiativecard  /> */}
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
