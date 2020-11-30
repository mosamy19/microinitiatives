import { Button, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import users_black from "../../../../assets/icons/users_black.svg";
import pic from "../../../../assets/images/pic.svg";
import { useDispatch, useSelector } from "react-redux";
import { getClonedtInitiatives } from "../../../../store/actions/initiative-actions";
import Imageslider from "./Imageslider";

const Clonedinitiatives = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [clonedInitiatives, setClonedInitiatives] = useState([]);

  useEffect(() => {
    dispatch(getClonedtInitiatives());
  }, [dispatch]);

  const { initiatives } = useSelector((state) => state.initiatives);

  useEffect(() => {
    if (initiatives.length > 0) {
      setClonedInitiatives(initiatives);
    }
  }, [initiatives]);

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
      <Grid container spacing={3}>
        {clonedInitiatives.length === 0 ? (
          <span>No Cloned Initiatives Yet..!</span>
        ) : (
          clonedInitiatives.map((item) => (
            <Grid item xs={12} sm={6} md={4}>
              <div
                className="d-flex justify-content-center align-items-center"
                style={{
                  background: "#fff",
                }}
              >
                <Imageslider images={item.thumbnail} imgHeight="170px" />
              </div>
              <p style={{ marginTop: "24px" }}>
                {item.title}
                <Link
                  to={`/single-initiative/${item._id}`}
                  style={{ textDecoration: "none" }}
                >
                 {" "} اقرأ المزيد ..
                </Link>
              </p>
            </Grid>
          ))
        )}
      </Grid>
      <Grid container spacing={3}>
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
  );
};

export default Clonedinitiatives;
