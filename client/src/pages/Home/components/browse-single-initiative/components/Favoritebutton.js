import { Button } from "@material-ui/core";
import React from "react";
import bookmark from "../../../../../assets/icons/bookmark.svg";

const Favoritebutton = ({ favorites }) => {
  return (
    <Button
      className="btns fv-btn"
      variant="outlined"
      onClick={() => alert("hi")}
    >
      <div>
        <img
          src={bookmark}
          alt=""
          width="12px"
          height="14px"
          style={{ marginLeft: "5px" }}
        />
        <span>{favorites}</span>
      </div>
    </Button>
  );
};

export default Favoritebutton;
