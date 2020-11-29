import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import logo from "../../assets/images/Project-Logo.png";
import bellIcon from "../../assets/images/bell.svg";
import my_initiatives from "../../assets/icons/my_initiatives.svg";
import browse from "../../assets/icons/browse.svg";
import blue_clock from "../../assets/icons/blue_clock.svg";
import blue_hands from "../../assets/icons/blue_hands.svg";

import styled from "styled-components";

import { Badge, makeStyles, withStyles } from "@material-ui/core";
import Menu from "./Menu";
import { useState } from "react";
import { useEffect } from "react";

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
  const location = useLocation();
  const [isMyInitiative, setIsMyInitiative] = useState(false);
  const [isAllInitiative, setIsAllInitiative] = useState(false);

  useEffect(() => {
    if (location.pathname === "/my-initiatives") {
      setIsMyInitiative(true);
    } else {
      setIsMyInitiative(false);
    }
    if (location.pathname === "/all-initiatives") {
      setIsAllInitiative(true);
    } else {
      setIsAllInitiative(false);
    }
  }, [location.pathname]);

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
                <img src={logo} width="50px" height="50px" alt="" />
              </Link>
            </li>
            <div>
              {props.auth.isAuthenticated ? (
                <div style={{ display: "flex", position: "relative" }}>
                  <NavLink
                    className="mb-menu"
                    style={{
                      textDecoration: "none",
                      color: "rgba(16, 24, 32, 0.65)",
                    }}
                    to="/all-initiatives"
                    activeClassName="active"
                  >
                    <img
                      src={isAllInitiative ? blue_clock : browse}
                      alt=""
                      width="18px"
                      height="18px"
                    />{" "}
                    تصفح المبادرات
                    <span className="line1"></span>
                  </NavLink>
                  <NavLink
                    className="mb-menu"
                    style={{
                      textDecoration: "none",
                      margin: "0 40px",
                      color: "rgba(16, 24, 32, 0.65)",
                    }}
                    to="/my-initiatives"
                    activeClassName="active"
                  >
                    <img
                      src={isMyInitiative ? blue_hands : my_initiatives}
                      alt=""
                      width="12px"
                      height="18px"
                    />{" "}
                    مبادراتي
                    <span className="line2"></span>
                  </NavLink>
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
  .line1 {
    position: absolute;
    bottom: -80%;
    right: 0;
    width: 25%;
    height: 1.5px;
    background: #6236ff;
    display: none;
  }
  .line2 {
    position: absolute;
    bottom: -80%;
    right: 37%;
    width: 19%;
    height: 1.5px;
    background: #6236ff;
    display: none;
  }
  .active {
    color: #6236ff !important;
    .line1 {
      display: block;
    }
    .line2 {
      display: block;
    }
  }
  @media screen and (max-width: 760px) {
    .mb-menu {
      display: none;
    }
  }
`;
