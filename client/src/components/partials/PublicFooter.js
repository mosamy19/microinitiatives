import React from "react";

import styled from "styled-components";
import { Link } from "react-router-dom";

const PublicFooter = () => {
  return (
    <Wrapper>
      <div className="container d-flex justify-content-center align-items-center">
        <Link
          className="mb-menu"
          style={{
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: "normal",
            color: "rgba(16, 24, 32, 0.65)",
          }}
          to="/"
        >
          عن قطرة
        </Link>
        <div className="line"></div>
        <Link
          className="mb-menu"
          style={{
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: "normal",
            color: "rgba(16, 24, 32, 0.65)",
          }}
          to="/"
        >
          اتصل بنا
        </Link>
      </div>
    </Wrapper>
  );
};

export default PublicFooter;
const Wrapper = styled.div`
  background: #ffffff;
  height: 48px;
  padding: 0 26px;
  .line {
    width: 1px;
    height: 48px;
    margin: 0 55px 0 55px;
    opacity: 0.3;
    border: solid 1px rgba(0, 0, 0, 0.1);
  }
  @media screen and (max-width: 760px) {
    display: block;
  }
`;
