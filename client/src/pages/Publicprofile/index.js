import React from "react";
import user from "../../assets/images/user.svg";
import styled from "styled-components";
import { Grid } from "@material-ui/core";
import Initiativecard from "../Initiatives/component/Initiativecard";

const Publicprofile = () => {
  return (
    <Wrapper>
      <div
        className="d-flex align-items-center"
        style={{ marginBottom: "26px" }}
      >
        <img
          src={user}
          alt=""
          width="28px"
          height="28px"
          style={{
            borderRadius: "100%",
            background: "rgba(0, 0, 0, 0.1)",
            marginLeft: "5px",
          }}
        />
        <p
          style={{
            marginBottom: "0",
            fontSize: "16px",
            fontWeight: "bold",
            color: "rgba(0, 0, 0, 0.85)",
          }}
        >
          غادة فهد
        </p>
      </div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Initiativecard />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Initiativecard />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Initiativecard />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Initiativecard />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Initiativecard />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Initiativecard />
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default Publicprofile;
const Wrapper = styled.div`
  margin-top: 41px;
  margin-bottom: 26px;
`;
