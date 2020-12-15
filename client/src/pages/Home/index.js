import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import party from "../../assets/icons/party.svg";

import { Grid, makeStyles } from "@material-ui/core";
import Initiativecard from "../Initiatives/component/Initiativecard";

import { useDispatch, useSelector } from "react-redux";
import { getLandingPageInitiatives } from "../../store/actions/initiative-actions";
import Nicewords from "../../components/Nicewords";
const useStyles = makeStyles((theme) => ({
  btn: {
    background: "#f7b500",
    color: "#fff",
    fontFamily: "inherit",
    fontSize: "16px",
    padding: "6px 40px",
    "&:hover": {
      background: "#f7b500",
      color: "#fff",
    },
    "&:focus": {
      outline: "none",
    },
  },
  btn3: {
    borderColor: "#f7b500",
    color: "#f7b500",
    fontFamily: "inherit",
    fontSize: "16px",
    marginTop: "15px",
    padding: "6px 20px",
    "&:hover": {
      color: "#f7b500",
    },
    "&:focus": {
      outline: "none",
    },
  },
}));

const Home = () => {
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const mostClonedInitiatives = landingPageInitiatives
    .sort((a, b) => b.clones - a.clones)
    .slice(0, 3);

  const mostLikedInitiatives = landingPageInitiatives
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 3);

  return (
    <Wrapper>
      <div className="container">
        <div className="text-center my-5">
          <h2 style={{ margin: "0px", fontSize: "36px", fontWeight: "bold" }}>
            نوي
          </h2>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "500",
              margin: "24px 0 9px",
            }}
          >
            نوي هو مجتمع المبادرات المتناهية الصغر حيث يصمم المبادرون وينفذون
            ويشاركون مبادراتهم من أي مكان وفي أي وقت .
          </p>
          <Button
            variant="outlined"
            className={classes.btn3}
            onClick={() => history.push("/details")}
          >
            أعرف أكثر
          </Button>
          <Button
            variant="outlined"
            style={{ marginRight: "15px" }}
            className={classes.btn3}
            onClick={() => history.push("/browse-all-initiatives")}
          >
            تصفح المبادرات
          </Button>
        </div>
        <div
          style={{
            background: "rgba(98, 54, 255, 0.05)",
            padding: "20px 20px 60px",
          }}
        >
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              paddingTop: "12px",
              paddingBottom: "32px",
            }}
          >
            <h2
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                marginBottom: "0",
                marginLeft: "10px",
              }}
            >
              أكثر المبادرات تنفيذاً
            </h2>
            <img src={party} alt="" />
          </div>
          <Grid container spacing={3}>
            {mostClonedInitiatives.length > 0 &&
              mostClonedInitiatives.map((initiative) => (
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
              ))}
          </Grid>
        </div>
        <div className="loved-initiatives">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              paddingTop: "12px",
              paddingBottom: "32px",
            }}
          >
            <h2
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                marginBottom: "0",
                marginLeft: "10px",
              }}
            >
              مبادرات نحبها
            </h2>
            <span>😍</span>
          </div>
          <Grid container spacing={3}>
            {mostLikedInitiatives.length > 0 &&
              mostLikedInitiatives.map((initiative) => (
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
              ))}
          </Grid>
        </div>
      </div>
      <Nicewords />
    </Wrapper>
  );
};

export default Home;
const Wrapper = styled.div`
  .loved-initiatives {
    margin: 60px 0 80px;
  }
  @media screen and (max-width: 760px) {
    .loved-initiatives {
      padding: 20px;
    }
  }
`;
