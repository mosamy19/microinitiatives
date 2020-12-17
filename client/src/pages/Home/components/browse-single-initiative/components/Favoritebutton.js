import { Button } from "@material-ui/core";
import React from "react";
import bookmark from "../../../../../assets/icons/bookmark.svg";
import Popup from "../../pop-up";
import { useHistory } from "react-router-dom";

const Favoritebutton = ({ favorites }) => {
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
      <Button
        className="btns fv-btn"
        variant="outlined"
        onClick={handleOnClick}
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
      <Popup
        isOpen={open}
        handleClose={handleClose}
        handleClick={handleClick}
      />
    </>
  );
};

export default Favoritebutton;
