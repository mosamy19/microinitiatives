import { Button, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import users_black from "../../../../../assets/icons/users_black.svg";
import pic from "../../../../../assets/images/pic.svg";
import { useDispatch, useSelector } from "react-redux";
import { getLandingPageClonedInitiative } from "../../../../../store/actions/initiative-actions";

import Clonedslider from "./Clonedslider";

const Clonedinitiatives = ({ initiativeId, cloneCount }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [limit, setLimit] = useState(3);

  console.log(initiativeId);

  // const [clonedInitiatives, setClonedInitiatives] = useState([]);

  useEffect(() => {
    dispatch(getLandingPageClonedInitiative(initiativeId));
  }, [dispatch, initiativeId]);

  const { clonedInitiatives } = useSelector((state) => state.initiatives);
  console.log(clonedInitiatives);

  // useEffect(() => {
  //   if (initiatives.length > 0) {
  //     let allCloned = initiatives.filter(
  //       (item) => item.clonedInitiativeId === initiativeId
  //     );

  //     setClonedInitiatives(allCloned);
  //   }
  // }, [initiatives, initiativeId]);

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
          ({cloneCount})
        </p>
      </div>
      <Grid container spacing={3}>
        {clonedInitiatives.length > 0 &&
          clonedInitiatives.slice(0, limit).map((item) => (
            <Grid item xs={12} sm={6} md={4}>
              <div>
                <Clonedslider images={item.thumbnail} />
              </div>
              <p style={{ marginTop: "24px" }}>
                {item.description}
                <Link
                  onClick={() => {
                    history.push(`/browse-single-initiative/${item._id}`);
                    window.scrollTo(0, 0);
                  }}
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
