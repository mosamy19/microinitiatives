import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import qMark from "../../assets/icons/release-two/q-mark/sq.png";
import samiBold from "../../assets/samim-fonts/ArbFONTS-Samim-Bold-FD-WOL.ttf";

import { makeStyles } from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import { getLandingPageInitiatives } from "../../store/actions/initiative-actions";
import Nicewords from "../../components/Nicewords";
import LovedInitiatives from "./components/loved-initiatives";
import WhatIsMicroinitiatives from "./components/what-is-microinitiatives";
import HowDoseNoiiWork from "./components/how-dose-noii-work";

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
}));

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [landingPageInitiatives, setLandingPageInitiatives] = useState([]);
  useEffect(() => {
    dispatch(getLandingPageInitiatives("newest"));
  }, [dispatch]);

  const { initiatives } = useSelector((state) => state.initiatives);
  useEffect(() => {
    if (initiatives.length > 0) {
      setLandingPageInitiatives(initiatives);
    }
  }, [initiatives]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let basedInitiatives = landingPageInitiatives.filter(
    (item) => item.based === true
  );

  const mostClonedInitiatives = basedInitiatives
    .sort((a, b) => b.clones - a.clones)
    .slice(0, 3);

  const mostLikedInitiatives = landingPageInitiatives
    .sort((a, b) => b.loved - a.loved)
    .slice(0, 5);

  return (
    <Wrapper>
      <div>
        <div className="text-center">
          <div
            style={{ margin: "32px 0 16px 0", position: "relative" }}
            className="d-flex flex-column align-items-center sami-font"
          >
            <h1
              style={{ margin: "25px 0", fontSize: "48px", fontWeight: "bold" }}
            >
              نوْي
            </h1>
            <div style={{ position: "absolute", top: "32%", right: "0" }}>
              <img src={qMark} alt="" width="53" height="130" />
            </div>
            <h1
              style={{
                fontSize: "22px",
                fontWeight: "bold",
                marginBottom: "20px",
                color: "rgba(16, 24, 32, 0.65)",
              }}
            >
              نغير العالم بخطوات صغيرة
            </h1>
            <p
              style={{
                margin: "0 0 26px 0",
                color: "rgba(16, 24, 32, 0.65)",
                fontSize: "14px",
                fontWeight: "bold",
                wordSpacing: "1.5px",
                lineHeight: "1.8",
              }}
              className="mb-style"
            >
              لا تحتاج ملايين 💵 ومؤسسات ضخمة 🏢 كي تغير وتساهم في تحسين العالم
              🌎 كل ما تحتاجه هو قلب حي ❤️ وروح وثّابة 💪
            </p>
          </div>
          <div
            className="container"
            style={{ background: "#f2f1fb", padding: "24px" }}
          >
            <p
              style={{
                fontSize: "16px",
                fontWeight: "500",
                margin: "0 0 16px",
                color: "rgba(16, 24, 32, 0.65)",
                wordSpacing: "1.5px",
              }}
            >
              نوي هو مجتمع المبادرات المتناهية الصغر حيث يصمم المبادرون وينفذون
              ويشاركون مبادراتهم من أي مكان وفي أي وقت .
            </p>
            <Button
              size="medium"
              className={classes.btn}
              onClick={() => history.push("/signup")}
            >
              أنشئ مبادرتك
            </Button>
          </div>
        </div>

        {/* Loved Initiatives */}
        <LovedInitiatives initiatives={mostLikedInitiatives} />

        {/* what is microinitiatives */}
        <WhatIsMicroinitiatives />

        {/* How dose noii work */}
        <HowDoseNoiiWork />
      </div>
      <Nicewords />
    </Wrapper>
  );
};

export default Home;
const Wrapper = styled.div`
  overflow: hidden;
  .sami-font {
    h1 {
      font-family: Samim-Bold-FD-WOL !important;
      @font-face {
        font-family: Samim-Bold-FD-WOL;
        src: url(${samiBold});
      }
    }
  }
  .steps {
    min-height: 100px;
    max-width: 74px;
    margin: 0 auto;
    position: relative;
    .oval {
      position: absolute;
      top: 0;
      left: 0;
    }
    .count {
      font-size: 72px !important;
      font-weight: bold;
      line-height: 70px;
      color: #2a4069;
      opacity: 45%;
      position: absolute;
      top: 0%;
      right: -24%;
    }
    .step {
      margin-top: 16px;
      position: absolute;
      top: 10%;
      left: -28%;
    }
    .step3 {
      left: -10% !important;
    }
  }
  .line {
    width: 0;
    height: 36px;
    margin: 1px 60.3px 1px 10.7px;
    transform: rotate(-1deg);
    border-right: dashed 3px #f7b500;
  }

  @media screen and (max-width: 760px) {
    .mb-style {
      max-width: 245px;
    }
    .mb-shape {
      img {
        width: 106px;
        height: 68px;
      }
    }
    .mb-qmark {
      top: -15px !important;
      left: 38% !important;
      img {
        width: 106px;
        height: 106px;
      }
    }
  }
`;
