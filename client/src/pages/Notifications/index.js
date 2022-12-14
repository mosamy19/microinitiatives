import React, { useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { Spin, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "../../store/actions/notification-actions";
import { getLoggedinUser } from "../../store/actions/auth-actions";
import Todaynotifications from "./component/Todaynotifications";
import Yesterdaysnotifications from "./component/Yesterdaysnotifications";
import Oldernotifications from "./component/Oldernotifications";
import message_notification from "../../assets/images/message_notification.png";

const Notifications = () => {
  const dispatch = useDispatch();
  const [all_notification, set_all_notification] = useState([]);

  useEffect(() => {
    dispatch(getNotifications());

    setTimeout(() => {
      dispatch(getLoggedinUser());
    }, 200);
  }, [dispatch]);

  const { notifications } = useSelector((state) => state.notifications);
  const { isLoading } = useSelector((state) => state.loader);

  console.log(isLoading);

  useEffect(() => {
    if (notifications.length > 0) {
      set_all_notification(notifications);
    }
  }, [notifications]);

  const todaysNotification = all_notification.filter(
    (item) => moment(item.createdAt).format("LL") === moment().format("LL")
  );

  const yesterdaysNotification = all_notification.filter(
    (item) =>
      moment(item.createdAt).format("LL") ===
      moment().add(-1, "day").format("LL")
  );

  const olderNotification = all_notification.filter(
    (item) =>
      moment(item.createdAt).format("MM-DD-YYYY") <
      moment().add(-1, "day").format("MM-DD-YYYY")
  );

  return isLoading ? (
    <div style={{ maxWidth: "80px", margin: "0 auto" }}>
      <Space size="middle">
        <Spin size="large" />
      </Space>
    </div>
  ) : (
    <Wrapper>
      <h2
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          color: "rgba(0, 0, 0, 0.85)",
        }}
      >
        التنبيهات
      </h2>
      {all_notification.length > 0 && (
        <div>
          <Todaynotifications todaysNotification={todaysNotification} />
          <Yesterdaysnotifications
            yesterdaysNotification={yesterdaysNotification}
          />
          <Oldernotifications olderNotification={olderNotification} />
        </div>
      )}
      {all_notification.length === 0 && (
        <div className="d-flex flex-column align-items-center my-5">
          <div style={{ margin: "15px 0" }}>
            <img src={message_notification} alt="" />
          </div>
          <p
            style={{
              color: "rgba(16, 24, 32, 0.5)",
              fontSize: "14px",
              maxWidth: "200px",
              textAlign: "center",
            }}
          >
            لا يوجد لديك تنبيهات بعد
          </p>
        </div>
      )}
    </Wrapper>
  );
};

export default Notifications;
const Wrapper = styled.div`
  margin-top: 64px;
  margin-bottom: 50px;
  text-align: right;
  max-width: 460px;
  .list-group {
    border-radius: 0;
    .list-group-item {
      border: none;
      border-top: solid 1px rgba(0, 0, 0, 0.1);
      font-size: 14px;
      color: rgba(16, 24, 32, 0.65);
      line-height: 24px;
      &:nth-child(1) {
        border: none;
      }
    }
  }
  p {
    fontsize: "14px";
    fontweight: "500";
    color: "rgba(16, 24, 32, 0.65)";
    margin: 10px 0;
  }
  .ntBtn {
    dispaly: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: none;
    outline: none;
    margin-left: 4px;
  }
`;
