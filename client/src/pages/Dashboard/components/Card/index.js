import React from "react";
import { makeStyles, Paper } from "@material-ui/core";
import styled from "styled-components";
const useStyles = makeStyles((theme) => ({
  paper: {
    height: 90,
    width: "100%",
    padding: "22px",
  },
  count: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  title: {
    textTransform: "uppercase",
    letterSpacing: "1.5px",
    fontWeight: "500",
  },
}));
const Customcard = ({ count, ...props }) => {
  const classes = useStyles();
  return (
    <Wrapper
      bgColor={props.bgColor}
      textColor={props.textColor}
      cMargin={props.cMargin}
      cBorder={props.cBorder}
      cColor={props.cColor}
    >
      <Paper className={`peper ${classes.paper}`}>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex flex-column">
            <span className={classes.title}>
              <div className="d-flex justify-content-start align-items-center">
                {props.children}
              </div>
            </span>
            <span>it's counted from datatbase</span>
          </div>
          <div className={`c-color ${classes.count}`}>{count}+</div>
        </div>
      </Paper>
    </Wrapper>
  );
};

export default Customcard;
const Wrapper = styled.div.attrs((props) => ({
  bgColor: props.bgColor || "#fff",
  textColor: props.textColor || "rgba(0, 0, 0, 0.85)",
  cMargin: props.cMargin || null,
  cBorder: props.cBorder || null,
  cColor: props.cColor || null,
}))`
  .peper {
    color: ${(props) => props.textColor};
    background: ${(props) => props.bgColor};
    margin: ${(props) => props.cMargin};
    border-left: ${(props) => props.cBorder};
  }
  .c-color {
    color: ${(props) => props.cColor};
  }
`;
