import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import mb_clock from "../../assets/icons/mb_clock.svg";
import mb_hands from "../../assets/icons/mb_hands.svg";

const MainFooter = () => {
  return (
    <Wrapper>
      <div className="d-flex justify-content-between align-items-center">
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
const Wrapper = styled.div`
  background: #6236ff;
  height: 48px;
  padding: 0 26px;
  display: none;
  .line {
    width: 1px;
    height: 48px;
    margin: 0 40px 0 48px;
    opacity: 0.3;
    border: solid 1px #ffffff;
  }
  @media screen and (max-width: 760px) {
    display: block;
  }
`;
