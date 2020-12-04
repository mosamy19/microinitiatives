import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import bookmarkbtn from "../../../assets/icons/bookmarkbtn.svg";
import bluehands from "../../../assets/icons/bluehands.svg";
import lovebtn from "../../../assets/icons/lovebtn.svg";
import blueshare from "../../../assets/icons/blueshare.svg";
import yellow_comment from "../../../assets/icons/yellow_comment.svg";
import moment from "moment";

const Oldernotifications = ({ olderNotification }) => {
  return (
    <div>
      {olderNotification.length !== 0 ? (
        <div>
          <p>التنبيهات القديمة </p>
          <ListGroup>
            {olderNotification.length !== 0
              ? olderNotification.map((item) => (
                  <ListGroupItem>
                    <button className="ntBtn">
                      <img
                        src={
                          item.type === "like"
                            ? lovebtn
                            : item.type === "save"
                            ? bookmarkbtn
                            : item.type === "comment"
                            ? yellow_comment
                            : item.type === "share"
                            ? blueshare
                            : item.type === "clone"
                            ? bluehands
                            : null
                        }
                        alt=""
                        width="100%"
                        height="100%"
                      />
                    </button>
                    <span>{item.body}</span>
                    <p
                      className="cloneCount"
                      style={{
                        fontSize: "14px",
                        fontWeight: "normal",
                        marginBottom: "0",
                      }}
                    >
                      {moment(item.createdAt).calendar()}
                    </p>
                  </ListGroupItem>
                ))
              : null}
          </ListGroup>
        </div>
      ) : null}
    </div>
  );
};

export default Oldernotifications;
