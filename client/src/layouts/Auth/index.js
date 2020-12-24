import React from "react";
import logo from "../../assets/images/Project-Logo.png";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PublicFooter from "../../components/partials/PublicFooter";

const AuthLayout = (props) => {
  return (
    <Wrapper style={{direction: "rtl"}}>
      <div style={{ minHeight: "92vh" }}>
        <div className="d-flex justify-content-center align-items-center mb-hide">
          <Link style={{ textDecoration: "none", cursor: "pointer" }} to="/">
            <img src={logo} width="50px" height="50px" alt="" />
          </Link>
          <h2 style={{ margin: "0px", fontSize: "36px", fontWeight: "bold" }}>
            نوي
          </h2>
        </div>
        <div className="container">{props.children}</div>
      </div>
      <div>
        <PublicFooter bgColor="transparrent" />
      </div>
    </Wrapper>
  );
};

export default AuthLayout;
const Wrapper = styled.div`
  .mb-hide {
    margin-top: 64px;
  }
  @media screen and (max-width: 760px) {
    .mb-hide {
      margin-top: 0;
      background: #fff;
      img {
        width: 50px;
        height: 50px;
      }
      h2 {
        font-size: 24px !important;
        font-weight: bold !important;
      }
    }
  }
`;
