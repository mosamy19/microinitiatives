import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import bookmark from "../../../../assets/icons/bookmark.svg";
import blue_bookmark from "../../../../assets/images/bookmark.svg";
import { useDispatch, useSelector } from "react-redux";

import {
  getFavorites,
  makeFavorite,
  setUnfavorite,
} from "../../../../store/actions/favorite-actions";

const Favoritebutton = ({ user, initiativeId }) => {
  const dispatch = useDispatch();
  const [favorite, setFavorite] = useState(0);
  const [isFavorite, setIsFavorite] = useState(null);

  useEffect(() => {
    dispatch(getFavorites(initiativeId));
  }, [dispatch, initiativeId]);

  const { favorites } = useSelector((state) => state.favorites);

  // make initiative favprite, unfavorite
  useEffect(() => {
    if (favorites.favorites) {
      setFavorite(favorites.favorites.length);
      favorites.favorites.map(
        (item) => item.author === user._id && setIsFavorite("favorite")
      );
    }
  }, [favorites.favorites, user._id]);

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
  return (
    <Button
      onClick={setFavoriteUnfavorite}
      className="btns fv-btn"
      variant="outlined"
      // style={{ margin: "0 auto" }}
    >
      <div>
        <img
          src={isFavorite === "favorite" ? blue_bookmark : bookmark}
          alt=""
          width="12px"
          height="14px"
          style={{ marginLeft: "5px" }}
        />
        <span className={isFavorite === "favorite" ? "favoriteStyle" : null}>
          {favorite}
        </span>
      </div>
    </Button>
  );
};

export default Favoritebutton;
