import React from "react";
import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../../store/actions/auth-actions";
import { getAllInitiativesByAdmin } from "../../../../store/actions/initiative-actions";
import { getAllComments } from "../../../../store/actions/comment-actions";
import { useState } from "react";
import { useEffect } from "react";
import {
  UserOutlined,
  AppstoreOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import cloneIcon from "../../../../assets/icons/user_white.svg";
import Customcard from "../Card";

const FourbaseInfo = () => {
  const dispatch = useDispatch();

  const [userCount, setUserCount] = useState(0);
  const [initiativesCount, setInitiativesCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [cloneCount, setCloneCount] = useState(0);

  // setting the data source
  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllInitiativesByAdmin());
    dispatch(getAllComments());
  }, [dispatch]);

  const { allUsers } = useSelector((state) => state.auth);
  const { initiatives } = useSelector((state) => state.initiatives);
  const { comments } = useSelector((state) => state.comments);
  useEffect(() => {
    if (allUsers) {
      setUserCount(allUsers.length);
    }
    if (initiatives.length > 0) {
      setInitiativesCount(initiatives.length);
      let clonedInitiatives = initiatives.filter(
        (item) => item.cloned === true
      );
      setCloneCount(clonedInitiatives.length);
    }
    if (comments) {
      setCommentCount(comments.length);
    }
  }, [allUsers, initiatives, comments]);

  return (
    <div className="mb-3">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Customcard count={userCount} bgColor="#41b883" textColor="#fff">
            <UserOutlined />
            <span style={{ margin: "0 3px" }}>Users</span>
          </Customcard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Customcard
            count={initiativesCount}
            bgColor="#2ecc71"
            textColor="#fff"
          >
            <AppstoreOutlined />
            <span style={{ margin: "0 3px" }}>Initiatives</span>
          </Customcard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Customcard count={commentCount} bgColor="#52a7e0" textColor="#fff">
            <CommentOutlined />
            <span style={{ margin: "0 3px" }}>Comment</span>
          </Customcard>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Customcard count={cloneCount} bgColor="#f7b500" textColor="#fff">
            <img src={cloneIcon} alt="" width="20px" height="20px" />
            <span style={{ margin: "0 3px" }}>Clones</span>
          </Customcard>
        </Grid>
      </Grid>
    </div>
  );
};

export default FourbaseInfo;
