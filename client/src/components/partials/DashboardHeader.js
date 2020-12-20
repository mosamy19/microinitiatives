import React from "react";
import { Layout } from "antd";
import styled from "styled-components";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
const { Header } = Layout;

const DashboardHeader = ({ collapsed, toggle }) => {
  return (
    <Wrapper>
      <Header
        className="site-layout-background"
        style={{ padding: 0, background: "#fff" }}
      >
        {React.createElement(
          collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: "trigger",
            onClick: toggle,
          }
        )}
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
`;
