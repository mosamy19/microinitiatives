import { Button } from "@material-ui/core";
import React from "react";
import heart from "../../../../../assets/icons/heart.svg";

const Likebutton = ({ likes }) => {
  return (
    <Button className="btns" variant="outlined" onClick={()=> alert('hi')}>
      <div>
        <img
          src={heart}
          alt=""
          widt="16px"
          height="14px"
          style={{ marginLeft: "5px" }}
        />
        <span>{likes} </span>
      </div>
    </Button>
  );
};

export default Likebutton;
