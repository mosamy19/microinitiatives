import React from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";

const PublicFooter = (props) => {
  const history = useHistory();
  return (
    <Wrapper bgColor={props.bgColor}>
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ width: "100%", height: "100%" }}
      >
        <div>
          <Link
            className="mb-menu"
            style={{
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "normal",
              color: "rgba(16, 24, 32, 0.65)",
            }}
            to="/contact-us"
          >
            اتصل بنا
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

export default PublicFooter;
const Wrapper = styled.div.attrs((props) => ({
  bgColor: props.bgColor || "#ffffff",
}))`
  background: ${(props) => props.bgColor};
  height: 48px;
  padding: 0 26px;
  margin-bottom: 0;
  .line {
    width: 1px;
    height: 48px;
    opacity: 0.3;
    border: solid 1px rgba(0, 0, 0, 0.1);
  }
  @media screen and (max-width: 760px) {
    display: block;
    .mb-menu {
      margin: 0 auto !important;
    }
  }
`;
