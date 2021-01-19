import React from "react";
import { Layout, Menu } from "antd";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { FiHome } from "react-icons/fi";
import { MdViewList } from "react-icons/md";
import { GoCommentDiscussion } from "react-icons/go";
import {
  UserOutlined,
  MailOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/images/Project-Logo.png";
import defaultAvatar from "../../assets/images/avatar.png";
import { useEffect } from "react";
import { getLoggedinUser } from "../../store/actions/auth-actions";
const { Sider } = Layout;
const { SubMenu } = Menu;

const rootSubmenuKeys = ["sub1", "sub2"];

const DashboardSidebar = ({ collapsed }) => {
  const history = useHistory();
  console.log(global.window.innerWidth);
  const dispatch = useDispatch();
  const [openKeys, setOpenKeys] = React.useState(["sub1"]);
  const clpWidth = global.window.innerWidth < 768 ? 0 : 80;
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  useEffect(() => {
    dispatch(getLoggedinUser());
  }, dispatch);

  const { logedinUser } = useSelector((state) => state.auth);
  const { firstName, familyName, avatar } = logedinUser;

  return (
    <Sider
      style={{ background: "#161537" }}
      width="240"
      trigger={null}
      collapsible
      collapsed={collapsed}
      collapsedWidth={clpWidth}
    >
      <Wrapper>
        <div className="d-flex justify-content-start align-items-center logo">
          <img src={logo} width="50px" height="50px" alt="" />
          <div className={`d-flex flex-column ${collapsed ? "hide" : ""}`}>
            <span className="title">Noi</span>
            <span className="sub-title">Micro Initiatives</span>
          </div>
        </div>
        <div className="d-flex justify-content-start align-items-center logo">
          <img
            src={avatar ? avatar : defaultAvatar}
            width="32px"
            height="32px"
            alt=""
            className={` ${collapsed ? "collepse" : ""}`}
          />
          <div
            className={`d-flex flex-column ${collapsed ? "hide" : ""}`}
            style={{ marginLeft: "12px" }}
          >
            <span style={{ color: "#fff", textTransform: "capitalize" }}>
              {firstName + " " + familyName}
            </span>
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
          className={`${collapsed ? "hide" : ""}`}
        >
          <span>DASHBOARDS</span>
        </div>
        <Menu
          mode="inline"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          defaultSelectedKeys={["1"]}
        >
          <Menu.Item
            key="1"
            icon={<FiHome />}
            onClick={() => history.push("/dashboard")}
          >
            Home
          </Menu.Item>
          <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Initiatives">
            <Menu.Item
              key="2"
              onClick={() => history.push("/dashboard/initiatives")}
            >
              All Initiatives
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<UserOutlined />} title="Users">
            <Menu.Item key="3" onClick={() => history.push("/dashboard/users")}>
              All Users
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<MailOutlined />} title="Email">
            <Menu.Item
              key="4"
              onClick={() => history.push("/dashboard/email-inbox")}
            >
              Inbox
            </Menu.Item>
            <Menu.Item
              key="5"
              onClick={() => history.push("/dashboard/set-email-rules")}
            >
              Email Rules
            </Menu.Item>
          </SubMenu>
          <Menu.Item
            key="6"
            icon={<GoCommentDiscussion />}
            onClick={() => history.push("/dashboard/comments")}
          >
            Comments
          </Menu.Item>
          <Menu.Item
            key="7"
            icon={<MdViewList />}
            onClick={() => history.push("/dashboard/categories")}
          >
            Categories
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
  .ant-menu-submenu-title,
  .ant-menu-item {
    display: flex;
    justify-content: start;
    align-items: center;
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
  .hide {
    display: none !important;
  }
  .collepse {
    margin-left: 8px;
  }
`;
