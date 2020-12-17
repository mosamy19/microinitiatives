import { Button } from "@material-ui/core";
import React from "react";
import shareIcon from "../../../../../assets/icons/share.svg";
import Popup from "../../pop-up";
import { useHistory } from "react-router-dom";

const Sharebutton = ({ shares }) => {
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
            src={shareIcon}
            alt=""
            width="15px"
            height="15px"
            style={{ marginLeft: "5px" }}
          />
          <span>{shares}</span>
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

export default Sharebutton;
