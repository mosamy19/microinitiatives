import { Button, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import users_black from "../../../../../assets/icons/users_black.svg";
import pic from "../../../../../assets/images/pic.svg";
import { useDispatch, useSelector } from "react-redux";
import { getLandingPageInitiatives } from "../../../../../store/actions/initiative-actions";

import Clonedslider from "./Clonedslider";

const Clonedinitiatives = () => {
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(3);
  const [size, setSize] = useState(0);

  const [clonedInitiatives, setClonedInitiatives] = useState([]);

  useEffect(() => {
    dispatch(getLandingPageInitiatives());
  }, [dispatch]);

  const { initiatives } = useSelector((state) => state.initiatives);

  useEffect(() => {
    if (initiatives.length > 0) {
      let allCloned = initiatives.filter((item) => item.cloned === true);
      setSize(allCloned.length);
      setClonedInitiatives(allCloned);
    }
  }, [initiatives]);

  const handleOnClick = () => {
    setLimit((prevValue) => prevValue + 3);
  };

  return (
    <div>
      <div className="d-flex align-items-center" style={{ margin: "16px 0" }}>
        <img src={users_black} alt="" />
        <p style={{ fontSize: "16px", fontWeight: "bold", margin: "0 8px" }}>
          المبادرات المنفّذة مثل هذا المبادرة
        </p>
        <p
          className="cloneCount"
          style={{ fontSize: "16px", fontWeight: "bold" }}
        >
          ({size})
        </p>
      </div>
      <Grid container spacing={3}>
        {clonedInitiatives.length === 0 ? (
          <span>No Cloned Initiatives Yet..!</span>
        ) : (
          clonedInitiatives.slice(0, limit).map((item) => (
            <Grid item xs={12} sm={6} md={4}>
              <div>
                <Clonedslider images={item.thumbnail} />
              </div>
              <p style={{ marginTop: "24px" }}>
                {item.title}
                <Link
                  to={`/single-initiative/${item._id}`}
                  style={{ textDecoration: "none" }}
                >
                  {" "}
                  اقرأ المزيد ..
                </Link>
              </p>
            </Grid>
          ))
        )}
      </Grid>
      {size > limit && (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              onClick={handleOnClick}
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
      )}
    </div>
  );
};

export default Clonedinitiatives;
