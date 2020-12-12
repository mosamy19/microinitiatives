import React, { useEffect, useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import samimFont from "../../../../assets/samim-fonts/ArbFONTS-Samim-FD-WOL.ttf";

import { CircularProgress, Grid, makeStyles } from "@material-ui/core";
import Initiativecard from "../../../Initiatives/component/Initiativecard";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getLandingPageInitiatives } from "../../../../store/actions/initiative-actions";

const useStyles = makeStyles((theme) => ({
  btn3: {
    borderColor: "rgba(0, 0, 0, 0.1)",
    background: "#fff",
    color: "rgba(16, 24, 32, 0.65)",
    fontFamily: "inherit",
    fontSize: "12px",
    marginRight: "15px",
    padding: "11px 18px",
    "&:hover": {
      color: "rgba(16, 24, 32, 0.65)",
      background: "#fff",
    },
    "&:focus": {
      outline: "none",
    },
  },
}));

const Browseallinitiatives = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [landingPageInitiatives, setLandingPageInitiatives] = useState([]);
  const [cloneCount, setCloneCount] = useState(0);
  useEffect(() => {
    dispatch(getLandingPageInitiatives());
  }, [dispatch]);

  const { initiatives } = useSelector((state) => state.initiatives);
  useEffect(() => {
    if (initiatives.length > 0) {
      setLandingPageInitiatives(initiatives);
      let allClone = initiatives.filter((item) => item.cloned === true);
      setCloneCount(allClone.length);
    }
  }, [initiatives]);

  return (
    <Wrapper className="container">
      <div>
        <div className="d-flex align-items-center mb-style">
          <h2
            style={{
              marginBottom: "0",
              fontSize: "18px",
              fontWeight: "bold",
              color: "rgba(0, 0, 0, 0.85)",
            }}
          >
            كل المبادرات
          </h2>
          <Button variant="outlined" className={classes.btn3}>
            <span className="ml-1">الأحدث</span>
            <RiArrowDownSLine />
          </Button>
        </div>
        <div className="my-4">
          <Grid container spacing={3}>
            {landingPageInitiatives.length === 0 ? (
              <div style={{ maxWidth: "100px", margin: "0 auto" }}>
                <CircularProgress />
              </div>
            ) : (
              landingPageInitiatives.map((initiative) => (
                <Grid item xs={12} sm={6} md={4} key={initiative._id}>
                  <div
                    onClick={() =>
                      history.push(
                        `/browse-single-initiative/${initiative._id}/${cloneCount}`
                      )
                    }
                  >
                    <Initiativecard initiative={initiative} />
                  </div>
                </Grid>
              ))
            )}
          </Grid>
        </div>
      </div>
    </Wrapper>
  );
};

export default Browseallinitiatives;
const Wrapper = styled.div`
  margin: 50px auto;
  text-align: right;
  font-family: Samim-FD-WOL;
  @font-face {
    font-family: Samim-FD-WOL;
    src: url(${samimFont});
  }
  @media screen and (max-width: 760px) {
    .mb-style {
      justify-content: space-between;
    }
  }
`;
