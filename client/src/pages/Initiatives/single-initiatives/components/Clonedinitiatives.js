import { Button, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import users_black from "../../../../assets/icons/users_black.svg";
import pic from "../../../../assets/images/pic.svg";
import { useDispatch, useSelector } from "react-redux";
import { getClonedtInitiatives } from "../../../../store/actions/initiative-actions";

import Clonedslider from "./Clonedslider";

const Clonedinitiatives = ({ baseInitiativeId, cloneCount }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [limit, setLimit] = useState(3);

  useEffect(() => {
    dispatch(getClonedtInitiatives(baseInitiativeId));
  }, [dispatch, baseInitiativeId]);

  const { clonedInitiatives } = useSelector((state) => state.initiatives);

  const handleOnClick = () => {
    setLimit((prevValue) => prevValue + 3);
  };

  const goToTop = (id) => {
    history.push(`/single-initiative/${id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <div className="d-flex align-items-center" style={{ margin: "16px 0" }}>
        <img src={users_black} alt="" />
        <p style={{ fontSize: "18px", fontWeight: "bold", margin: "0 8px" }}>
          المبادرات المنفّذة مثل هذا المبادرة
        </p>
        <p
          className="cloneCount"
          style={{ fontSize: "18px", fontWeight: "bold" }}
        >
          ({cloneCount})
        </p>
      </div>
      <Grid container spacing={3}>
        {clonedInitiatives.length > 0 &&
          clonedInitiatives.slice(0, limit).map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <div>
                <Clonedslider images={item.thumbnail} />
              </div>
              <p style={{ marginTop: "24px" }}>
                {item.description}
                <Link
                  onClick={() => goToTop(item._id)}
                  style={{ textDecoration: "none" }}
                >
                  {" "}
                  اقرأ المزيد ..
                </Link>
              </p>
            </Grid>
          ))}
        {cloneCount === 0 && (
          <Grid item xs={12} sm={6} md={4}>
            <p
              style={{
                color: "rgba(16, 24, 32, 0.5)",
                fontSize: "14px",
                textAlign: "center",
                maxWidth: "200px",
                margin: "0 0 60px",
              }}
            >
              لا يوجد مبادرات مماثلة منفذة بعد كن أول المبادرين
            </p>
          </Grid>
        )}
      </Grid>
      {cloneCount > limit && (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              onClick={handleOnClick}
              fullWidth={true}
              className="btns"
              style={{
                color: "#3b86fb",
                background: "rgba(59, 134, 251, 0.08)",
                margin: "24px 0 50px",
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
