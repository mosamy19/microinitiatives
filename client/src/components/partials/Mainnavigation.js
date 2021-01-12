import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/images/Project-Logo.png";
import bellIcon from "../../assets/images/bell.svg";
import my_initiatives from "../../assets/icons/my_initiatives.svg";
import browse from "../../assets/icons/browse.svg";
import blue_clock from "../../assets/icons/blue_clock.svg";
import blue_hands from "../../assets/icons/blue_hands.svg";

import styled from "styled-components";
import { Badge, withStyles } from "@material-ui/core";
import Menu from "./Menu";
import { getLoggedinUser } from "../../store/actions/auth-actions";

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

const Mainnavigation = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isMyInitiative, setIsMyInitiative] = useState(false);
  const [isAllInitiative, setIsAllInitiative] = useState(false);

  useEffect(() => {
    dispatch(getLoggedinUser());
  }, [dispatch]);

  const { isLoading } = useSelector((state) => state.loader);
  const { logedinUser } = useSelector((state) => state.auth);
  const { firstName, familyName, avatar, notifications, isAdmin } = logedinUser;

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
              <img src={logo} width="50px" height="50px" alt="" />
            </li>
            <div>
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
                  {notifications === 0 ? (
                    <img src={bellIcon} alt="" />
                  ) : (
                    <StyledBadge badgeContent={notifications}>
                      <img src={bellIcon} alt="" />
                    </StyledBadge>
                  )}
                </Link>
                <Link
                  style={{
                    textDecoration: "none",
                    marginRight: "40px",
                    color: "rgba(16, 24, 32, 0.65)",
                  }}
                  to="#"
                >
                  <Menu
                    admin={isAdmin}
                    name={
                      firstName && familyName
                        ? firstName + " " + familyName
                        : null
                    }
                    avatar={avatar}
                  />
                </Link>
              </div>
            </div>
          </ul>
        </div>
      </nav>
    </Wrapper>
  );
};

export default Mainnavigation;

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
    right: 158px;
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
