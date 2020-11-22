import React from "react";
import logo from "../../assets/images/Project-Logo.png";
import { Link } from "react-router-dom";

const AuthLayout = (props) => {
  return (
    <div>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ marginTop: "64px" }}
      >
        <Link style={{ textDecoration: "none", cursor: "pointer" }} to="/">
          <img src={logo} width="50px" height="50px" alt="" />
        </Link>
        <h2 style={{ margin: "0px", fontSize: "36px", fontWeight: "bold" }}>
          قطرة
        </h2>
      </div>
      <div className="container">{props.children}</div>
    </div>
  );
};

export default AuthLayout;
