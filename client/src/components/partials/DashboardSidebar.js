import React from "react";
import { Layout, Menu } from "antd";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { FiHome } from "react-icons/fi";
import { GoCommentDiscussion } from "react-icons/go";
import {
  UserOutlined,
  MailOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import logo from "../../assets/images/Project-Logo.png";
import avatar from "../../assets/images/avatar.png";
const { Sider } = Layout;
const { SubMenu } = Menu;

const rootSubmenuKeys = ["sub1", "sub2"];

const DashboardSidebar = ({ collapsed }) => {
  const history = useHistory();
  const [openKeys, setOpenKeys] = React.useState(["sub1"]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Sider
      style={{ background: "#161537" }}
      width="240"
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <Wrapper>
        <div className="d-flex justify-content-start align-items-center logo">
          <img src={logo} width="50px" height="50px" alt="" />
          <div className="d-flex flex-column">
            <span className="title">Noi</span>
            <span className="sub-title">Micro Initiatives</span>
          </div>
        </div>
        <div className="d-flex justify-content-start align-items-center logo">
          <img src={avatar} width="36px" height="36px" alt="" />
          <div className="d-flex flex-column" style={{ marginLeft: "12px" }}>
            <span style={{ color: "#fff" }}>Simon Chowdery</span>
            <span style={{ color: "#786fa4", fontSize: "12px" }}>
              Administrator
            </span>
          </div>
        </div>
        <div
          style={{
            margin: "0 24px",
            color: "#786fa4",
            fontSize: "12px",
            fontWeight: "300",
            letterSpacing: "2px",
          }}
        >
          <span>DASHBOARDS</span>
        </div>
        <Menu
          mode="inline"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          defaultSelectedKeys={["1"]}
        >
          <Menu.Item key="1" icon={<FiHome />}>
            Home
          </Menu.Item>
          <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Initiatives">
            <Menu.Item key="2">Tom</Menu.Item>
            <Menu.Item key="3">Bill</Menu.Item>
            <Menu.Item key="4">Alex</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<UserOutlined />} title="Users">
            <Menu.Item key="5" onClick={() => history.push("/all-users")}>
              All Users
            </Menu.Item>
            <Menu.Item key="6">Bill</Menu.Item>
            <Menu.Item key="7">Alex</Menu.Item>
          </SubMenu>
          <Menu.Item key="8" icon={<GoCommentDiscussion />}>
            Comments
          </Menu.Item>
          <Menu.Item key="9" icon={<MailOutlined />}>
            Email
          </Menu.Item>
        </Menu>
      </Wrapper>
    </Sider>
  );
};

export default DashboardSidebar;
const Wrapper = styled.div`
  .logo {
    margin: 16px;
    .title {
      font-size: 20px;
      font-weight: bolder;
      color: #fff;
      line-height: 1;
      letter-spacing: 1.5px;
    }
    .sub-title {
      color: #aca6cc;
      line-height: 1;
      letter-spacing: 1.5px;
      font-siz: 14px;
    }
  }
  .ant-menu-submenu-arrow,
  .ant-menu {
    background: #161537;
    color: #aca6cc;
  }
  .ant-menu-item-selected {
    background: rgb(27 85 227) !important;
    color: #fff;
  }
  .ant-menu-submenu-title:hover,
  .ant-menu-item:hover {
    color: #fff;
    .ant-menu-submenu-arrow {
      color: #fff;
    }
  }

  .ant-menu-submenu-open {
    background: #100f28;
    color: #aca6cc;
    &:hover {
      color: #fff;
    }
    .ant-menu {
      background: #100f28;
      color: #aca6cc;
    }
  }
  .ant-menu-inline,
  .ant-menu-item::after {
    border-color: #aca6cc !important;
  }
`;
