import React from "react";
import people from "../../../../../assets/images/people.svg";

const Cloneinfobtn = ({ cloneCount }) => {
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
