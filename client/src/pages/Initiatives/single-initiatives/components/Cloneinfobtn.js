import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import people from "../../../../assets/images/people.svg";
import { getAllInitiatives } from "../../../../store/actions/initiative-actions";

const Cloneinfobtn = () => {
  const dispatch = useDispatch();
  const [cloneCount, setCloneCount] = useState(0);

  useEffect(() => {
    dispatch(getAllInitiatives());
  }, [dispatch]);

  const { initiatives } = useSelector((state) => state.initiatives);

  useEffect(() => {
    if (initiatives.length > 0) {
      let allClone = initiatives.filter((item) => item.cloned === true);
      setCloneCount(allClone.length);
    }
  }, [initiatives]);

  return (
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
        {cloneCount}
      </span>
      <span
        className="mb-hide"
        style={{ fontSize: "14px", fontWeight: "normal" }}
      >
        شخص نفّذوا مثل هذا المبادرة
      </span>
    </div>
  );
};

export default Cloneinfobtn;
