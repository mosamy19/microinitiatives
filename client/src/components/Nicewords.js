import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

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

const Nicewords = () => {
  const classes = useStyles();
  return (
    <div
      style={{
        background: "#6236ff",
        margin: "32px 0px 0px",
        padding: "20px",
      }}
    >
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{
          paddingTop: "12px",
          paddingBottom: "32px",
        }}
      >
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            marginBottom: "0",
            marginLeft: "10px",
            color: "#fff",
          }}
        >
          جدّد إنسانيتك
        </h2>
        <p
          style={{
            textAlign: "center",
            fontSize: "16px",
            fontWeight: "normal",
            color: "#ffffff",
            margin: "16px 0",
            maxWidth: "600px",
          }}
        >
          كلنا نود جعل العالم أكثر إنسانية، والإنسانية تزداد بالمشاركة والعطاء.
          لا تستحقر الصغائر، فبداية الغيث قطرة. حقق التغيير الذي تود أن تراه في
          العالم، بداية الرحلة خطوة وخطوتك الأولى مبادرة متناهية في الصغر
        </p>
        <Link style={{ textDecoration: "none" }} to="/signup">
          <Button size="medium" className={classes.btn}>
            أنشئ مبادرتك
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Nicewords;
