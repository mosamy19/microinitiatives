import { Grid } from "@material-ui/core";
import React from "react";
import Customcard from "./components/Card";
import Userchart from "./components/Charts/Userchart";
import blue_bookmark from "../../assets/images/bookmark.svg";
import love from "../../assets/icons/love.svg";
import blue_share from "../../assets/icons/blue_share.svg";
import { useDispatch, useSelector } from "react-redux";
import { getAllLikes } from "../../store/actions/likes.actions";
import { getAllFavorites } from "../../store/actions/favorite-actions";
import { getAllShares } from "../../store/actions/share-actions";

import FourbaseInfo from "./components/Four-baseinfo";
import { useEffect } from "react";
import { useState } from "react";

const Dashboard = () => {
  // const classes = useStyles();
  const dispatch = useDispatch();
  const [likeCount, setLikeCount] = useState(0);
  const [saveCount, setSaveCount] = useState(0);
  const [shareCount, setShareCount] = useState(0);

  useEffect(() => {
    dispatch(getAllLikes());
    dispatch(getAllFavorites());
    dispatch(getAllShares());
  }, [dispatch]);

  const { likes } = useSelector((state) => state.likes);
  const { favorites } = useSelector((state) => state.favorites);
  const { shares } = useSelector((state) => state.shares);

  useEffect(() => {
    if (likes) {
      setLikeCount(likes.length);
    }
    if (favorites) {
      setSaveCount(favorites.length);
    }
    if (shares) {
      setShareCount(shares.length);
    }
  }, [likes, favorites, shares]);

  return (
    <div>
      <FourbaseInfo />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={9}>
          <Userchart />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Customcard
            count={likeCount}
            cBorder="6px solid #e9446b"
            cColor="#e9446b"
          >
            <img src={love} alt="" width="10px" height="14px" />
            <span style={{ margin: "0 3px" }}>Likes</span>
          </Customcard>
          <Customcard
            count={saveCount}
            cMargin="15px 0"
            cBorder="6px solid #32c5ff"
            cColor="#32c5ff"
          >
            <img src={blue_bookmark} alt="" width="8px" height="11px" />
            <span style={{ margin: "0 3px" }}>Saves</span>
          </Customcard>
          <Customcard
            count={shareCount}
            cBorder="6px solid #3b86fb"
            cColor="#3b86fb"
          >
            <img src={blue_share} alt="" width="12px" height="11px" />
            <span style={{ margin: "0 3px" }}>Shares</span>
          </Customcard>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
