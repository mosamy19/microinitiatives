import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import user from "../../../../assets/images/user.svg";
const Authorinfo = ({ author, date }) => {
  return (
    <div>
      {author &&
        author.map((item, index) => (
          <div className="d-flex align-items-center" key={index}>
            <img
              src={item.avatar ? item.avatar : user}
              alt=""
              width="18px"
              height="18px"
              style={{
                borderRadius: "100%",
                background: "rgba(0, 0, 0, 0.1)",
                marginLeft: "5px",
              }}
            />
            <Link
              to={`/public-profile/${item._id}`}
              style={{
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "500",
                color: "#6236ff",
              }}
            >
              {item.firstName + " " + item.familyName}
            </Link>
          </div>
        ))}
      <p
        className="cloneCount"
        style={{
          fontSize: "12px",
          color: "rgba(0, 0, 0, 0.5)",
          marginRight: "27px",
        }}
      >
        {date ? moment(date).format("MM-DD-YYYY") : null}
      </p>
    </div>
  );
};

export default Authorinfo;
