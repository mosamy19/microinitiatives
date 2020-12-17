import { Button } from "@material-ui/core";
import React from "react";
import heart from "../../../../../assets/icons/heart.svg";
import Popup from "../../pop-up";
import { useHistory } from "react-router-dom";

const Likebutton = ({ likes }) => {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const handleOnClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    history.push("/signup");
    setOpen(false);
  };

  return (
    <>
      <Button className="btns" variant="outlined" onClick={handleOnClick}>
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
      <Popup
        isOpen={open}
        handleClose={handleClose}
        handleClick={handleClick}
      />
    </>
  );
};

export default Likebutton;
