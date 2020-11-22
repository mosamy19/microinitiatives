import { Button, Grid } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import users_black from "../../../../assets/icons/users_black.svg";
import pic from "../../../../assets/images/pic.svg";

const Clonedinitiatives = () => {
  return (
    <div>
      <div className="d-flex align-items-center" style={{ margin: "16px 0" }}>
        <img src={users_black} alt="" />
        <p style={{ fontSize: "14px", fontWeight: "bold", margin: "0 8px" }}>
          المبادرات المنفّذة مثل هذا المبادرة
        </p>
        <p
          className="cloneCount"
          style={{ fontSize: "14px", fontWeight: "bold" }}
        >
          (78)
        </p>
      </div>
      <div className="d-flex">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                minHeight: "170px",
                background: "#fff",
              }}
            >
              <img src={pic} alt="" />
            </div>
            <p style={{ marginTop: "24px" }}>
              هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد
              هذا النص من مولد{" "}
              <Link style={{ textDecoration: "none" }}>اقرأ المزيد ..</Link>
            </p>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                minHeight: "170px",
                background: "#fff",
              }}
            >
              <img src={pic} alt="" />
            </div>
            <p style={{ marginTop: "24px" }}>
              هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد
              هذا النص من مولد{" "}
              <Link style={{ textDecoration: "none" }}>اقرأ المزيد ..</Link>
            </p>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                minHeight: "170px",
                background: "#fff",
              }}
            >
              <img src={pic} alt="" />
            </div>
            <p style={{ marginTop: "24px" }}>
              هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد
              هذا النص من مولد{" "}
              <Link style={{ textDecoration: "none" }}>اقرأ المزيد ..</Link>
            </p>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              fullWidth={true}
              className="btns"
              style={{
                color: "#3b86fb",
                background: "rgba(59, 134, 251, 0.08)",
                marginTop: "24px",
                border: "none",
              }}
              variant="outlined"
            >
              تحميل المزيد من المبادرات
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Clonedinitiatives;
