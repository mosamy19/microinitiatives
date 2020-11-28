import { Grid } from "@material-ui/core";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";
import plusIcon from "../../../../assets/icons/Add_new_initiative.svg";
import styled from "styled-components";
import samimFont from "../../../../assets/samim-fonts/ArbFONTS-Samim-FD-WOL.ttf";

const Currentinitiatives = () => {
  const history = useHistory();
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4}>
        <Wrapper
          onClick={() => history.push("/new-initiative")}
          className="d-flex align-items-center justify-content-center"
          style={{
            border: "2px dashed #f7b500",
            height: "200px",
          }}
        >
          <img src={plusIcon} alt="" />
          <p
            style={{
              marginBottom: "0",
              marginRight: "5px",
              fontSize: "14px",
              fontWeight: "bold",
              color: "#f7b500",
            }}
          >
            أنشئ مبادرة جديدة
          </p>
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
