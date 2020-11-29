import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import heart from "../../../../assets/icons/heart.svg";

import { useDispatch, useSelector } from "react-redux";

import {
  getLikes,
  createLike,
  createUnlike,
} from "../../../../store/actions/likes.actions";

const Likebutton = ({ user, initiativeId }) => {
  const dispatch = useDispatch();
  const [like, setLike] = useState(0);
  const [isLiked, setIsLiked] = useState(null);

  useEffect(() => {
    dispatch(getLikes(initiativeId));
  }, [dispatch, initiativeId]);
  const { likes } = useSelector((state) => state.likes);

  // like and unlike initiative
  useEffect(() => {
    if (likes.likes) {
      setLike(likes.likes.length);
      likes.likes.map(
        (item) => item.author === user._id && setIsLiked("liked")
      );
    }
  }, [likes.likes, user._id]);

  const setLikeUnlike = () => {
    if (isLiked === null) {
      dispatch(createLike(initiativeId));
      setLike(like + 1);
      setIsLiked("liked");
    } else {
      dispatch(createUnlike(initiativeId));
      setLike(like - 1);
      setIsLiked(null);
    }
  };
  return (
    <Button onClick={setLikeUnlike} className="btns" variant="outlined">
      <div>
        <img
          src={heart}
          alt=""
          widt="16px"
          height="14px"
          style={{ marginLeft: "5px" }}
        />
        <span>{like} </span>
      </div>
    </Button>
  );
};

export default Likebutton;
