import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import logo from "../../assets/images/Project-Logo.png";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  btn: {
    background: "#f7b500",
    color: "#fff",
    fontFamily: "inherit",
    fontSize: "16px",
    padding: "6px 20px",
    "&:hover": {
      background: "#f7b500",
      color: "#fff",
    },
    "&:focus": {
      outline: "none",
    },
  },
  btn2: {
    color: "rgba(16, 24, 32, 0.65)",
    fontFamily: "inherit",
    fontSize: "16px",
    marginRight: "15px",
    padding: "6px 20px",
    "&:hover": {
      background: "#fafbfb",
      color: "rgba(16, 24, 32, 0.65)",
    },
    "&:focus": {
      outline: "none",
    },
  },
}));

const Publicnavigation = (props) => {
  const classes = useStyles();
  return (
    <Wrapper>
      <nav className="mynav">
        <div className="container">
          <ul className="d-flex justify-content-between align-items-center mb-0">
            <li>
              <img src={logo} width="50px" height="50px" alt="" />
            </li>
            <div>
              <div>
                <Link style={{ textDecoration: "none" }} to="/signup">
                  <Button size="medium" className={classes.btn}>
                    تسجيل
                  </Button>
                </Link>
                <Link style={{ textDecoration: "none" }} to="/login">
                  <Button size="medium" className={classes.btn2}>
                    دخول
                  </Button>
                </Link>
              </div>
            </div>
          </ul>
        </div>
      </nav>
    </Wrapper>
  );
};

export default Publicnavigation;

const Wrapper = styled.div`
  //   @media screen and (max-width: 760px) {
  //     .mb-menu {
  //       display: none;
  //     }
  //   }
`;
