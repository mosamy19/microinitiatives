import { Button } from "@material-ui/core";
import React from "react";
import shareIcon from "../../../../../assets/icons/share.svg";

const Sharebutton = ({ shares }) => {
  return (
    <>
      <Button className="btns" variant="outlined" onClick={() => alert("hi")}>
        <div>
          <img
            src={shareIcon}
            alt=""
            width="15px"
            height="15px"
            style={{ marginLeft: "5px" }}
          />
          <span>{shares}</span>
        </div>
      </Button>
    </>
  );
};

export default Sharebutton;
