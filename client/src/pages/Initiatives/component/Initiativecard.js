import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import { AiOutlineVideoCamera } from "react-icons/ai";
import { GrPin } from "react-icons/gr";

import pic from "../../../assets/images/pic.svg";
import people from "../../../assets/images/people.svg";
import bookmark from "../../../assets/images/bookmark.svg";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
    ".MuiTypography-body2": {
      fontFamily: "inherit",
    },
  },
  avatar: {
    marginRight: "0px",
  },
  iconBtn: {
    fontSize: "16px",
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

const Initiativecard = ({ isCompleted }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ padding: "12px" }}
      >
        <IconButton className={classes.iconBtn}>
          <AiOutlineVideoCamera />
        </IconButton>

        <IconButton className={classes.iconBtn}>
          <GrPin />
        </IconButton>
      </div>
      <CardContent style={{ padding: "12px" }}>
        <Link
          to="/single-initiative"
          style={{
            textDecoration: "none",
            fontSize: "16px",
            fontWeight: "bold",
            color: "rgba(0, 0, 0, 0.85)",
          }}
        >
          <p style={{ marginBottom: "0px", textAlign: "right" }}>
            تصوير ٣ فيديوهات ونشرها على يويتوب
          </p>
        </Link>
      </CardContent>
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ padding: "12px" }}
      >
        <div>
          <Button className={classes.btn1}>
            <div>
              <img src={pic} alt="" width="26px" height="100%" />
            </div>
          </Button>
        </div>
        <div>
          <Button className={classes.btn2}>
            <div className="d-flex justify-content-between align-items-center">
              <img src={people} alt="" />
              <p style={{ margin: "0", paddingRight: "3px", color: "#b620e0" }}>
                15
              </p>
            </div>
          </Button>
          <Button className={classes.btn3}>
            <div className="d-flex justify-content-between align-items-center">
              <img src={bookmark} alt="" />
              <p style={{ margin: "0", paddingRight: "3px", color: "#32c5ff" }}>
                16
              </p>
            </div>
          </Button>
        </div>
      </div>
      {isCompleted ? (
        <div
          style={{
            padding: "12px",
            borderTop: "1px solid rgba(0, 0, 0, 0.1)",
          }}
        >
          <p
            style={{
              marginBottom: "0",
              fontSize: "12px",
              color: "rgba(0, 0, 0, 0.25)",
              textAlign: "center",
            }}
          >
            تعديل المبادرة
          </p>
        </div>
      ) : null}
    </Card>
  );
};

export default Initiativecard;
