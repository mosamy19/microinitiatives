import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import mb_clock from "../../assets/icons/mb_clock.svg";
import mb_hands from "../../assets/icons/mb_hands.svg";

const MainFooter = () => {
  return (
    <Wrapper>
      <div className="d-flex justify-content-center align-items-center">
        <Link
          className="mb-menu"
          style={{
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: "normal",
            color: "#ffffff",
          }}
          to="/all-initiatives"
        >
          <img src={mb_clock} alt="" width="18px" height="18px" /> تصفح
          المبادرات
        </Link>
        <div className="line"></div>
        <Link
          className="mb-menu"
          style={{
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: "normal",
            color: "#ffffff",
          }}
          to="/my-initiatives"
        >
          <img src={mb_hands} alt="" width="12px" height="18px" /> مبادراتي
        </Link>
      </div>
    </Wrapper>
  );
};

export default MainFooter;
const Wrapper = styled.footer`
  background: #6236ff;
  // max-height: 48px;
  // margin-top: auto !important;
  // margin-bottom: 0;
  // position: sticky;
  // left: 0;
  // bottom: 0;
  // width: 100%;
  // padding: 5px 0;
  display: none;

  margin-top: 1rem;
  // padding: 1rem;
  // background-color: rgb(235, 195, 64);
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  .line {
    width: 1px;
    height: 48px;
    margin: 0 55px 0 55px;
    opacity: 0.3;
    border: solid 1px #ffffff;
  }
  @media screen and (max-width: 760px) {
    display: block;
  }
`;
