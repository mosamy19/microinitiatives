import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import shareIcon from "../../../../assets/icons/share.svg";
import blue_share from "../../../../assets/icons/blue_share.svg";

import { getShares, makeShare } from "../../../../store/actions/share-actions";
import { getLoggedinUser } from "../../../../store/actions/auth-actions";
import { useDispatch, useSelector } from "react-redux";
import Sharemodal from "./Sharemodal";

const Sharebutton = ({ user, initiativeId, title }) => {
  const dispatch = useDispatch();
  const { shares } = useSelector((state) => state.shares);
  useEffect(() => {
    dispatch(getShares(initiativeId));
  }, [dispatch, initiativeId]);

  const [share, setShare] = useState(0);
  const [isShared, setIsShared] = useState(null);

  // share initiative
  useEffect(() => {
    if (shares.shares) {
      setShare(shares.shares.length);
      shares.shares.map(
        (item) => item.author === user._id && setIsShared("shared")
      );
    }
  }, [shares.shares, user._id]);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleShare = () => {
    dispatch(makeShare(initiativeId));
    setShare(share + 1);
    setIsShared("shared");
    setTimeout(() => {
      dispatch(getLoggedinUser());
    }, 200);
    setAnchorEl(null);
  };

  return (
    <>
      <Button onClick={handleClick} className="btns" variant="outlined">
        <div>
          <img
            src={isShared === "shared" ? blue_share : shareIcon}
            alt=""
            width="15px"
            height="15px"
            style={{ marginLeft: "5px" }}
          />
          <span className={isShared === "shared" ? "sharedStyle" : null}>
            {share}
          </span>
        </div>
      </Button>
      <Sharemodal
        handleClose={handleClose}
        anchorEl={anchorEl}
        title={title}
        handleShare={handleShare}
      />
    </>
  );
};

export default Sharebutton;
