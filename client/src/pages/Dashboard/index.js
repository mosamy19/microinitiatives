import { Grid, Paper } from "@material-ui/core";
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
import Linechart from "./components/Charts/Linechart";
import Initiativechart from "./components/Charts/Initiativechart";
import InitiativesPieChart from "./components/Charts/InitiativesPieChart";
import LikeShareSaveLineChart from "./components/Charts/LikeShareSaveLineChart";
import LikeSaveSharePie from "./components/Charts/LikeSaveSharePie";

const Dashboard = () => {
  // const classes = useStyles();
  const dispatch = useDispatch();
  const [likeCount, setLikeCount] = useState(0);
  const [saveCount, setSaveCount] = useState(0);
  const [shareCount, setShareCount] = useState(0);
  const [all_like, set_all_like] = useState([]);
  const [all_save, set_All_save] = useState([]);
  const [all_share, set_all_share] = useState([]);

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
      set_all_like(likes);
    }
    if (favorites) {
      set_All_save(favorites);
    }
    if (shares) {
      set_all_share(shares);
    }
  }, [likes, favorites, shares]);

  useEffect(() => {
    if (all_like.length > 0) {
      setLikeCount(all_like.length);
    }
    if (all_save.length > 0) {
      setSaveCount(all_save.length);
    }
    if (all_share.length > 0) {
      setShareCount(all_share.length);
    }
  }, [all_like, all_save, all_share]);

  return (
    <div style={{ overflow: "hidden" }}>
      <FourbaseInfo />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={9}>
          <Paper style={{ padding: "20px" }}>
            <Userchart />
          </Paper>
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
        <Grid item xs={12} sm={6} md={9}>
          <Paper style={{ padding: "20px" }}>
            <Initiativechart />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper style={{ padding: "10px" }}>
            <InitiativesPieChart />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={9}>
          <Paper style={{ padding: "20px" }}>
            <LikeShareSaveLineChart />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper style={{ padding: "10px" }}>
            <LikeSaveSharePie
              likeCount={likeCount}
              saveCount={saveCount}
              shareCount={shareCount}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
