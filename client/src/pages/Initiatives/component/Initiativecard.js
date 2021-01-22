import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import { GrPin } from "react-icons/gr";

import pic from "../../../assets/images/pic.svg";
import userIcon from "../../../assets/images/user.svg";
import people from "../../../assets/images/people.svg";
import bookmark from "../../../assets/images/bookmark.svg";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
    cursor: "pointer",
    ".MuiTypography-body2": {
      fontFamily: "inherit",
    },
  },
  avatar: {
    marginRight: "0px",
  },
  iconBtn: {
    fontSize: "18px",
    padding: "8px",
    border: "solid 1px rgba(0, 0, 0, 0.1)",
    "&:focus": {
      outline: "none",
    },
  },
  btn1: {
    background: "rgba(23, 17, 101, 0.08)",
    minWidth: "100%",
    "&:hover": {
      background: "rgba(23, 17, 101, 0.08)",
    },
    "&:focus": {
      outline: "none",
    },
  },
  btn2: {
    background: "rgba(182, 32, 224, 0.08)",
    "&:hover": {
      background: "rgba(182, 32, 224, 0.08)",
    },
    "&:focus": {
      outline: "none",
    },
  },
  btn3: {
    marginRight: "15px",
    background: "rgba(50, 197, 255, 0.08)",
    "&:hover": {
      background: "#fafbfb",
    },
    "&:focus": {
      outline: "none",
    },
  },
}));

const Initiativecard = ({ initiative }) => {
  const classes = useStyles();
  const icon = initiative.category;
  return (
    <Card className={classes.root}>
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ padding: "12px" }}
      >
        <IconButton className={classes.iconBtn}>
          <img
            src={icon ? icon.icon : null}
            alt=""
            width="18px"
            height="18px"
          />
        </IconButton>
        <div>
          <Button className={classes.btn2}>
            <div className="d-flex justify-content-between align-items-center">
              <img src={people} alt="" />
              <p style={{ margin: "0", paddingRight: "3px", color: "#b620e0" }}>
                {initiative.clones}
              </p>
            </div>
          </Button>
          <Button className={classes.btn3}>
            <div className="d-flex justify-content-between align-items-center">
              <img src={bookmark} alt="" />
              <p style={{ margin: "0", paddingRight: "3px", color: "#32c5ff" }}>
                {initiative.favorites}
              </p>
            </div>
          </Button>
        </div>
      </div>
      <CardContent style={{ padding: "12px" }}>
        <p
          style={{
            marginBottom: "0px",
            textAlign: "right",
            fontSize: "16px",
            fontWeight: "bold",
            color: "rgba(0, 0, 0, 0.85)",
          }}
        >
          {initiative.title}
        </p>
      </CardContent>
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ padding: "12px" }}
      >
        <div>
          {initiative.author &&
            initiative.author.map((item, index) => (
              <div className="d-flex align-items-center" key={index}>
                <img
                  src={item.avatar ? item.avatar : userIcon}
                  alt=""
                  width="34px"
                  height="34px"
                  style={{
                    borderRadius: "50%",
                    background: "rgba(0, 0, 0, 0.1)",
                    marginLeft: "5px",
                  }}
                />
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: "500",
                    color: "rgba(16, 24, 32, 0.65)",
                  }}
                >
                  {item.firstName + " " + item.familyName}
                </span>
              </div>
            ))}
        </div>
        <div>
          {initiative.pined === true && (
            <IconButton className={classes.iconBtn}>
              <GrPin />
            </IconButton>
          )}
        </div>
      </div>
    </Card>
  );
};

export default Initiativecard;
