import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import styled from "styled-components";
import bookmark from "../../assets/images/bookmark.svg";
import hands from "../../assets/images/hands.svg";
import { BsFillHeartFill } from "react-icons/bs";

const Notifications = () => {
  return (
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
      <div>
        <p>اليوم</p>
        <ListGroup>
          <ListGroupItem>
            <button
              className="ntBtn"
              style={{ background: "rgba(50, 197, 255, 0.08)" }}
            >
              <img src={bookmark} alt="" />
            </button>
            <span>تم حفظ مبادرتك “ تصوير فيديو يوتيوب ونشره</span>
          </ListGroupItem>
          <ListGroupItem>
            <button
              className="ntBtn"
              style={{ background: "rgba(233, 68, 107, 0.08)" }}
            >
              <BsFillHeartFill style={{ color: "#e9446b" }} />
            </button>
            <span>تم حفظ مبادرتك “ تصوير فيديو يوتيوب ونشره</span>
          </ListGroupItem>
          <ListGroupItem>
            <button
              className="ntBtn"
              style={{ background: "rgba(98, 54, 255, 0.08)" }}
            >
              <img src={hands} alt="" style={{ color: "#6236ff" }} />
            </button>
            <span>تم حفظ مبادرتك “ تصوير فيديو يوتيوب ونشره</span>
          </ListGroupItem>
        </ListGroup>
      </div>
      <div>
        <p>أمس</p>
        <ListGroup>
          <ListGroupItem>
            <button
              className="ntBtn"
              style={{ background: "rgba(50, 197, 255, 0.08)" }}
            >
              <img src={bookmark} alt="" />
            </button>
            <span>تم حفظ مبادرتك “ تصوير فيديو يوتيوب ونشره</span>
          </ListGroupItem>
          <ListGroupItem>
            <button
              className="ntBtn"
              style={{ background: "rgba(233, 68, 107, 0.08)" }}
            >
              <BsFillHeartFill style={{ color: "#e9446b" }} />
            </button>
            <span>تم حفظ مبادرتك “ تصوير فيديو يوتيوب ونشره</span>
          </ListGroupItem>
          <ListGroupItem>
            <button
              className="ntBtn"
              style={{ background: "rgba(98, 54, 255, 0.08)" }}
            >
              <img src={hands} alt="" style={{ color: "#6236ff" }} />
            </button>
            <span>تم حفظ مبادرتك “ تصوير فيديو يوتيوب ونشره</span>
          </ListGroupItem>
        </ListGroup>
      </div>
      <div>
        <p>الخميس </p>
        <ListGroup>
          <ListGroupItem>
            <button
              className="ntBtn"
              style={{ background: "rgba(50, 197, 255, 0.08)" }}
            >
              <img src={bookmark} alt="" />
            </button>
            <span>تم حفظ مبادرتك “ تصوير فيديو يوتيوب ونشره</span>
          </ListGroupItem>
          <ListGroupItem>
            <button
              className="ntBtn"
              style={{ background: "rgba(233, 68, 107, 0.08)" }}
            >
              <BsFillHeartFill style={{ color: "#e9446b" }} />
            </button>
            <span>تم حفظ مبادرتك “ تصوير فيديو يوتيوب ونشره</span>
          </ListGroupItem>
          <ListGroupItem>
            <button
              className="ntBtn"
              style={{ background: "rgba(98, 54, 255, 0.08)" }}
            >
              <img src={hands} alt="" style={{ color: "#6236ff" }} />
            </button>
            <span>تم حفظ مبادرتك “ تصوير فيديو يوتيوب ونشره</span>
          </ListGroupItem>
        </ListGroup>
      </div>
    </Wrapper>
  );
};

export default Notifications;
const Wrapper = styled.div`
  margin-top: 64px;
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
    width: 24px;
    height: 24px;
    border-radius: 100%;
    border: none;
    outline: none;
    margin-left: 4px;
    img {
      width: 10px;
      height: 16px;
    }
  }
`;
