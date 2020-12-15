import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import bookmarkbtn from "../../../assets/icons/notification/bookmarkbtn.svg";
import bluehands from "../../../assets/icons/notification/bluehands.svg";
import lovebtn from "../../../assets/icons/lovebtn.svg";
import blueshare from "../../../assets/icons/blueshare.svg";
import yellow_comment from "../../../assets/icons/notification/yellow_comment.svg";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeIsCheckedTrue } from "../../../store/actions/notification-actions";
import moment from "moment";

const Todaynotifications = ({ todaysNotification }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(null);

  const { notifications } = useSelector((state) => state.notifications);

  const handleOnClick = (id) => {
    dispatch(makeIsCheckedTrue());
    history.push(`single-initiative/${id}`);
  };
  useEffect(() => {
    if (notifications.length > 0) {
      notifications.map(
        (item) => item.isChecked === true && setIsChecked("ckecked")
      );
    }
  });
  console.log(notifications);
  console.log(isChecked);

  return (
    <div>
      {todaysNotification.length !== 0 ? (
        <div>
          <p>اليوم</p>
          <ListGroup style={{ cursor: "pointer" }}>
            {todaysNotification.length !== 0
              ? todaysNotification.map((item) => (
                  <ListGroupItem onClick={() => handleOnClick(item.initiative)}>
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

export default Todaynotifications;
