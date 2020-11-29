import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import shareIcon from "../../../../assets/icons/share.svg";

import { getShares, makeShare } from "../../../../store/actions/share-actions";
import { useDispatch, useSelector } from "react-redux";

const Sharebutton = ({ user, initiativeId }) => {
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
    }
  }, [shares.shares]);

  const shareInitiative = () => {
    dispatch(makeShare(initiativeId));
    setShare(share + 1);
    setIsShared("shared");
  };
  return (
    <Button onClick={shareInitiative} className="btns" variant="outlined">
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
  );
};

export default Sharebutton;
