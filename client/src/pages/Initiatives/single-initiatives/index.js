import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import moment from "moment";

import styled from "styled-components";
import people from "../../../assets/images/people.svg";
import pic from "../../../assets/images/pic.svg";
import heart from "../../../assets/icons/heart.svg";
import bookmark from "../../../assets/icons/bookmark.svg";
import shareIcon from "../../../assets/icons/share.svg";

import user from "../../../assets/images/user.svg";
import { Button } from "@material-ui/core";
import Clonedinitiatives from "./components/Clonedinitiatives";
import Comments from "./components/Comments";
import Cloneinitiative from "./components/Cloneinitiative";
import Imageslider from "./components/Imageslider";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleInitiatives } from "../../../store/actions/initiative-actions";
import {
  getLikes,
  createLike,
  createUnlike,
} from "../../../store/actions/likes.actions";
import {
  getFavorites,
  makeFavorite,
  setUnfavorite,
} from "../../../store/actions/favorite-actions";
import { getShares, makeShare } from "../../../store/actions/share-actions";

const Singleinitiative = () => {
  const dispatch = useDispatch();
  const { initiativeId } = useParams();

  useEffect(() => {
    dispatch(getSingleInitiatives(initiativeId));
    dispatch(getLikes(initiativeId));
    dispatch(getFavorites(initiativeId));
    dispatch(getShares(initiativeId));
  }, [dispatch, initiativeId]);

  const [like, setLike] = useState(0);
  const [isLiked, setIsLiked] = useState(null);

  const [favorite, setFavorite] = useState(0);
  const [isFavorite, setIsFavorite] = useState(null);

  const [share, setShare] = useState(0);
  const [isShared, setIsShared] = useState(null);

  const { initiatives } = useSelector((state) => state.initiatives);
  const { user } = useSelector((state) => state.auth);
  const { likes } = useSelector((state) => state.likes);
  const { favorites } = useSelector((state) => state.favorites);
  const { shares } = useSelector((state) => state.shares);

  console.log(favorites);

  useEffect(() => {
    if (likes.likes) {
      setLike(likes.likes.length);
      likes.likes.map(
        (item) => item.author === user._id && setIsLiked("liked")
      );
    }
  }, [likes.likes, user._id]);

  useEffect(() => {
    if (favorites.favorites) {
      setFavorite(favorites.favorites.length);
      favorites.favorites.map(
        (item) => item.author === user._id && setIsFavorite("favorite")
      );
    }
  }, [favorites.favorites, user._id]);

  useEffect(() => {
    if (shares.shares) {
      setShare(shares.shares.length);
    }
  }, [shares.shares]);

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
  const setFavoriteUnfavorite = () => {
    if (isFavorite === null) {
      dispatch(makeFavorite(initiativeId));
      setFavorite(favorite + 1);
      setIsFavorite("favorite");
    } else {
      dispatch(setUnfavorite(initiativeId));
      setFavorite(favorite - 1);
      setIsFavorite(null);
    }
  };

  const shareInitiative = () => {
    dispatch(makeShare(initiativeId));
    setShare(share + 1);
    setIsShared("shared");
  };

  return (
    <Wrapper>
      <div style={{ maxWidth: "783px", margin: "auto" }}>
        <h2 className="mb-show"> {initiatives.title}</h2>
        <div className="mb-hide">
          <Link
            to="/all-initiatives"
            style={{
              textDecoration: "none",
              fontSize: "12px",
              color: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <MdKeyboardArrowRight />
            <span>كل المبادرات</span>
          </Link>
        </div>
        <div className="d-flex justify-content-between align-items-center my-3">
          <h2 className="mb-hide">{initiatives.title} </h2>
          <div className="mb-show">
            {initiatives.author
              ? initiatives.author.map((item) => (
                  <div className="d-flex align-items-center">
                    <img
                      src={item.avatar ? item.avatar : user}
                      alt=""
                      width="18px"
                      height="18px"
                      style={{
                        borderRadius: "100%",
                        background: "rgba(0, 0, 0, 0.1)",
                        marginLeft: "5px",
                      }}
                    />
                    <Link
                      to="/public-profile"
                      style={{
                        textDecoration: "none",
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#6236ff",
                      }}
                    >
                      {item.firstName + " " + item.familyName}
                    </Link>
                  </div>
                ))
              : null}

            <p
              className="cloneCount"
              style={{
                fontSize: "12px",
                color: "rgba(0, 0, 0, 0.5)",
                marginRight: "27px",
              }}
            >
              {initiatives.createdAt
                ? moment(initiatives.createdAt).format("MM-DD-YYYY")
                : null}
            </p>
          </div>
          <div
            style={{
              color: "#b620e0",
              background: "rgba(182, 32, 224, 0.08",
              padding: "10px 12px",
              borderRadius: "3px",
            }}
          >
            <img src={people} alt="" width="19px" height="12px" />
            <span
              className="cloneCount"
              style={{
                margin: "0 3px",
                fontSize: "14px",
                fontWeight: "normal",
              }}
            >
              232
            </span>
            <span
              className="mb-hide"
              style={{ fontSize: "14px", fontWeight: "normal" }}
            >
              شخص نفّذوا مثل هذا المبادرة
            </span>
          </div>
        </div>
        <div style={{ marginBottom: "48px" }}>
          <Imageslider images={initiatives.thumbnail} />
        </div>

        <div className="d-flex justify-content-between align-items-center my-3">
          <div className="mb-hide">
            {initiatives.author &&
              initiatives.author.map((item) => (
                <div className="d-flex align-items-center">
                  <img
                    src={item.avatar ? item.avatar : user}
                    alt=""
                    width="18px"
                    height="18px"
                    style={{
                      borderRadius: "100%",
                      background: "rgba(0, 0, 0, 0.1)",
                      marginLeft: "5px",
                    }}
                  />
                  <Link
                    to="/public-profile"
                    style={{
                      textDecoration: "none",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#6236ff",
                    }}
                  >
                    {item.firstName + " " + item.familyName}
                  </Link>
                </div>
              ))}
            <p
              className="cloneCount"
              style={{
                fontSize: "12px",
                color: "rgba(0, 0, 0, 0.5)",
                marginRight: "27px",
              }}
            >
              {initiatives.createdAt
                ? moment(initiatives.createdAt).format("MM-DD-YYYY")
                : null}
            </p>
          </div>
          <div className="cloneCount mb-hide">
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
            <Button
              onClick={setFavoriteUnfavorite}
              className="btns"
              variant="outlined"
              style={{ margin: "0 36px" }}
            >
              <div>
                <img
                  src={bookmark}
                  alt=""
                  width="12px"
                  height="14px"
                  style={{ marginLeft: "5px" }}
                />
                <span>{favorite}</span>
              </div>
            </Button>
            <Button
              onClick={shareInitiative}
              className="btns"
              variant="outlined"
            >
              <div>
                <img
                  src={shareIcon}
                  alt=""
                  width="15px"
                  height="15px"
                  style={{ marginLeft: "5px" }}
                />
                <span>{share}</span>
              </div>
            </Button>
          </div>
        </div>
        <div>
          <p>
            {initiatives.description
              ? initiatives.description
              : "No description"}
          </p>
          {/* <p>
            هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا
            النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد
            من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.
          </p>
          <p>
            هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا
            النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد
            من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.
          </p> */}
        </div>
        <div className="cloneCount mb-show">
          <div className="d-flex justify-content-between my-3">
            <Button className="btns" variant="outlined">
              <div>
                <img
                  src={heart}
                  alt=""
                  widt="16px"
                  height="14px"
                  style={{ marginLeft: "5px" }}
                />
                <span>
                  <span>88</span>
                </span>
              </div>
            </Button>
            <Button
              className="btns"
              variant="outlined"
              style={{ margin: "0 36px" }}
            >
              <div>
                <img
                  src={bookmark}
                  alt=""
                  width="12px"
                  height="14px"
                  style={{ marginLeft: "5px" }}
                />
                <span>23</span>
              </div>
            </Button>
            <Button className="btns" variant="outlined">
              <div>
                <img
                  src={shareIcon}
                  alt=""
                  width="15px"
                  height="15px"
                  style={{ marginLeft: "5px" }}
                />
                <span>23</span>
              </div>
            </Button>
          </div>
        </div>

        <Cloneinitiative />
        <Comments />
        <Clonedinitiatives />
      </div>
    </Wrapper>
  );
};

export default React.memo(Singleinitiative);
const Wrapper = styled.div`
  margin: 96px 0;
  text-align: right;
  p {
    margin-bottom: 0;
    font-size: 14px;
    font-weight: normal;
    color: rgba(16, 24, 32, 0.65);
  }
  h2 {
    font-size: 16px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.85);
  }
  .btns {
    font-family: inherit;
    outline: none;
    color: rgba(0, 0, 0, 0.25);
    background: #fff;
    border-color: rgba(0, 0, 0, 0.1);
    text-align: center;
    div {
      padding-bottom: 2.5px;
    }
  }
  .mb-show {
    display: none;
  }
  @media screen and (max-width: 760px) {
    .mb-hide {
      display: none;
    }
    .mb-show {
      display: block;
    }
  }
`;
