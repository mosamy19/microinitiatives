import { Grid } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";
import styled from "styled-components";
import samimFont from "../../../../assets/samim-fonts/ArbFONTS-Samim-FD-WOL.ttf";

const Currentinitiatives = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4}>
        <Wrapper
          className="d-flex align-items-center justify-content-center"
          style={{
            border: "2px dashed #f7b500",
            height: "200px",
          }}
        >
          <Link
            to="/new-initiative"
            style={{ textDecoration: "none", color: "#f7b500" }}
            className="d-flex align-items-center"
          >
            <AiFillPlusCircle />
            <p
              style={{
                marginBottom: "0",
                marginRight: "5px",
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              أنشئ مبادرة جديدة
            </p>
          </Link>
        </Wrapper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "#fff", height: "200px" }}
        >
          <p className="text-right px-3">تصوير ٣ فيديوهات ونشرها على يويتوب</p>
        </div>
      </Grid>
    </Grid>
  );
};

export default Currentinitiatives;

const Wrapper = styled.div`
  font-family: Samim-FD-WOL;
  font-size: 18px;
  cursor: pointer;
  @font-face {
    font-family: Samim-FD-WOL;
    src: url(${samimFont});
  }
  @media screen and (max-width: 760px) {
    max-height: 60px !important;
  }
`;
