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
          هنا كلام لطيف وتشجيعي
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
          هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا
          النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من
          النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.
        </p>
        <Link style={{ textDecoration: "none" }} to="/signup">
          <Button size="medium" className={classes.btn}>
            انضم لنوي الآن
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Nicewords;
