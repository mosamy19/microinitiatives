import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import no_initiative_yet from "../../../assets/icons/no_initiative_yet.svg";
import { useHistory } from "react-router-dom";

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

const Noinitiativeyet = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Wrapper className="d-flex flex-column justify-content-center align-items-center">
      <img src={no_initiative_yet} alt="" width="90px" height="110px" />
      <h2
        style={{
          fontSize: "16px",
          fontWeight: "bold",
          color: "rgba(0, 0, 0, 0.85)",
          marginTop: "18px",
          marginBottom: "12px",
        }}
      >
        لم تبدأ أي مبادرة بعد
      </h2>
      <p
        style={{
          fontSize: "14px",
          fontWeight: "500",
          color: "rgba(16, 24, 32, 0.65)",
        }}
      >
        هذا العالم ينتظر توهجك
      </p>
      <Button
        onClick={() => history.push("new-initiative")}
        size="medium"
        className={classes.btn}
      >
        أنشئ مبادرتك الأولى
      </Button>
    </Wrapper>
  );
};

export default Noinitiativeyet;
const Wrapper = styled.div``;
