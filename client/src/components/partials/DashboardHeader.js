import React from "react";
import { Layout, Menu } from "antd";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/actions/auth-actions";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
const { Header } = Layout;

const DashboardHeader = ({ collapsed, toggle }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const hadnleLogout = () => {
    dispatch(logout(history));
    window.location.reload();
  };

  return (
    <Wrapper>
      <Header style={{ padding: 0, background: "#fff" }}>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex justify-content-center align-items-center">
            {collapsed ? (
              <MenuUnfoldOutlined className="trigger" onClick={toggle} />
            ) : (
              <MenuFoldOutlined className="trigger" onClick={toggle} />
            )}
            <ul
              className="d-flex justify-content-center align-items-center mb-hide"
              style={{ marginBottom: "0" }}
            >
              <li style={{ margin: "0 20px" }}>Home</li>
              <li style={{ margin: "0 20px" }}>Initiatives</li>
              <li style={{ margin: "0 20px" }}>Users</li>
              <li style={{ margin: "0 20px" }}>Categories</li>
            </ul>
          </div>
          <div
            className="d-flex justify-content-center align-items-center mx-3"
            style={{ cursor: "pointer" }}
            onClick={hadnleLogout}
          >
            <LogoutOutlined />
            <span style={{ margin: "0 5px" }}>Logout</span>
          </div>
        </div>
      </Header>
    </Wrapper>
  );
};

export default DashboardHeader;
const Wrapper = styled.div`
  z-index: 1;
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
    z-index: 1;
  }
  .trigger:hover {
    color: #1890ff;
  }
  @media screen and (max-width: 760px) {
    .mb-hide {
      display: none !important;
    }
  }
`;
