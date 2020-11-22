import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import logo from "../../assets/images/Project-Logo.png";
import bellIcon from "../../assets/images/bell.svg";
import my_initiatives from "../../assets/icons/my_initiatives.svg";
import browse from "../../assets/icons/browse.svg";

import styled from "styled-components";

import { Badge, makeStyles, withStyles } from "@material-ui/core";
import Menu from "./Menu";

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

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 6,
    padding: "0 2px",
    background: "#f7b500",
    color: "#ffffff",
    fontSize: "10px",
    fontWeight: "normal",
  },
}))(Badge);

const Navigation = (props) => {
  const classes = useStyles();

  console.log(props);

  return (
    <Wrapper>
      <nav className="mynav">
        <div className="container">
          <ul className="d-flex justify-content-between align-items-center mb-0">
            <li>
              <Link
                style={{ textDecoration: "none", cursor: "pointer" }}
                to="/"
              >
                <img src={logo} width="55px" height="55px" alt="" />
              </Link>
            </li>
            <div>
              {props.auth.isAuthenticated ? (
                <div style={{ display: "flex" }}>
                  <Link
                    className="mb-menu"
                    style={{
                      textDecoration: "none",
                      color: "rgba(16, 24, 32, 0.65)",
                    }}
                    to="/all-initiatives"
                  >
                    <img src={browse} alt="" width="18px" height="18px" /> تصفح
                    المبادرات
                  </Link>
                  <Link
                    className="mb-menu"
                    style={{
                      textDecoration: "none",
                      margin: "0 40px",
                      color: "rgba(16, 24, 32, 0.65)",
                    }}
                    to="/my-initiatives"
                  >
                    <img
                      src={my_initiatives}
                      alt=""
                      width="12px"
                      height="18px"
                    />{" "}
                    مبادراتي
                  </Link>
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "rgba(16, 24, 32, 0.65)",
                    }}
                    to="/notifications"
                  >
                    <StyledBadge badgeContent={21}>
                      <img src={bellIcon} alt="" />
                    </StyledBadge>
                  </Link>
                  <Link
                    style={{
                      textDecoration: "none",
                      marginRight: "40px",
                      color: "rgba(16, 24, 32, 0.65)",
                    }}
                    to="#"
                  >
                    <Menu />
                  </Link>
                </div>
              ) : (
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
              )}
            </div>
          </ul>
        </div>
      </nav>
    </Wrapper>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(Navigation);

const Wrapper = styled.div`
  @media screen and (max-width: 760px) {
    .mb-menu {
      display: none;
    }
  }
`;
