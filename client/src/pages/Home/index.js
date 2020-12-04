import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import party from "../../assets/icons/party.svg";

import { Grid, makeStyles } from "@material-ui/core";
import Initiativecard from "../Initiatives/component/Initiativecard";

import { useDispatch, useSelector } from "react-redux";
import { getLandingPageInitiatives } from "../../store/actions/initiative-actions";
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
  const [landingPageInitiatives, setLandingPageInitiatives] = useState([]);
  useEffect(() => {
    dispatch(getLandingPageInitiatives());
  }, [dispatch]);

  const { initiatives } = useSelector((state) => state.initiatives);
  useEffect(() => {
    if (initiatives.length > 0) {
      setLandingPageInitiatives(initiatives);
    }
  }, [initiatives]);

  const mostClonedInitiatives = landingPageInitiatives
    .sort((a, b) => b.clones - a.clones)
    .slice(0, 9);

  const mostLikedInitiatives = landingPageInitiatives
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 9);

  return (
    <Wrapper>
      <div className="text-center my-5">
        <h2 style={{ margin: "0px", fontSize: "36px", fontWeight: "bold" }}>
          قطرة
        </h2>
        <h2 style={{ fontSize: "30px", fontWeight: "bold" }}>
          على هذه الأرض مايستحق الحياة
        </h2>
        <p style={{ fontSize: "16px", fontWeight: "500" }}>
          قطرة هي مجتمع المبادرات المتناهية الصغر حيث يصمم المبادرون وينفذون
          ويشاركون مبادراتهم .
        </p>
        <Link to="/details" style={{ textDecoration: "none" }}>
          <Button variant="outlined" className={classes.btn3}>
            أعرف أكثر
          </Button>
        </Link>
      </div>
      <div
        style={{
          background: "rgba(98, 54, 255, 0.05)",
          padding: "20px",
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
              <Grid item xs={12} sm={6} md={4}>
                <Initiativecard initiative={initiative} />
              </Grid>
            ))}
        </Grid>
      </div>
      <div
        style={{
          margin: "32px 0",
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
            مبادرات نحبها
          </h2>
          <span>😍</span>
        </div>
        <Grid container spacing={3}>
          {mostLikedInitiatives.length > 0 &&
            mostLikedInitiatives.map((initiative) => (
              <Grid item xs={12} sm={6} md={4}>
                <Initiativecard initiative={initiative} />
              </Grid>
            ))}
        </Grid>
      </div>
      <div
        style={{
          background: "#6236ff",
          margin: "32px 0",
          padding: "20px",
        }}
      >
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{
            paddingTop: "12px",
            paddingBottom: "32px",
          }}
        >
          <h2
            style={{
              fontSize: "22px",
              fontWeight: "bold",
              marginBottom: "0",
              marginLeft: "10px",
              color: "#fff",
            }}
          >
            هنا كلام لطيف وتشجيعي
          </h2>
          <p
            style={{
              textAlign: "center",
              fontSize: "16px",
              fontWeight: "normal",
              color: "#ffffff",
              margin: "16px 0",
              maxWidth: "600px",
            }}
          >
            هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا
            النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد
            من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.
          </p>
          <Link style={{ textDecoration: "none" }} to="/signup">
            <Button size="medium" className={classes.btn}>
              انضم لقطرة الآن
            </Button>
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

export default Home;
const Wrapper = styled.div``;
