import React from "react";
import PropTypes from "prop-types";
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
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/images/Project-Logo.png";
import defaultAvatar from "../../assets/images/avatar.png";
import { useEffect } from "react";
import { getLoggedinUser } from "../../store/actions/auth-actions";

import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support

// import logo from "../../../../assets/images/Project-Logo.png";
// import { useHistory } from "react-router-dom";

const { Sider } = Layout;
const { SubMenu } = Menu;

const rootSubmenuKeys = ["sub1", "sub2", "sub3"];

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#f6faffa1",
  },
  modal: {
    display: "flex",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

const Dashboardmobilesidebar = ({ collapsed, toggle }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [openKeys, setOpenKeys] = React.useState(["sub1"]);
  // const clpWidth = global.window.innerWidth < 768 ? 0 : 80;

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
    <Wrapper>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={collapsed}
        onClose={toggle}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          className: classes.root,
        }}
      >
        <Fade in={collapsed}>
          <Sider
            style={{ background: "#161537", minHeight: "100vh" }}
            width="240"
            // trigger={null}
            // collapsible
            // collapsed={collapsed}
            // collapsedWidth={clpWidth}
          >
            <Wrapper>
              <div className="d-flex justify-content-end align-items-center">
                <CloseCircleOutlined
                  style={{ color: "#fff", fontSize: "24px", cursor: "pointer" }}
                  onClick={toggle}
                />
              </div>
              <div className="d-flex justify-content-start align-items-center logo">
                <img
                  src={logo}
                  width="50px"
                  height="50px"
                  alt=""
                  style={{ marginLeft: "-8px" }}
                />
                <div className={`d-flex flex-column`}>
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
                />
                <div
                  className={`d-flex flex-column`}
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
                <SubMenu
                  key="sub1"
                  icon={<AppstoreOutlined />}
                  title="Initiatives"
                >
                  <Menu.Item
                    key="2"
                    onClick={() => history.push("/dashboard/initiatives")}
                  >
                    All Initiatives
                  </Menu.Item>
                  <Menu.Item
                    key="3"
                    onClick={() => history.push("/dashboard/pined-initiatives")}
                  >
                    Pined Initiatives
                  </Menu.Item>
                  <Menu.Item
                    key="4"
                    onClick={() => history.push("/dashboard/loved-initiatives")}
                  >
                    Loved Initiatives
                  </Menu.Item>
                  <Menu.Item
                    key="5"
                    onClick={() => history.push("/dashboard/draft-initiatives")}
                  >
                    Draft Initiatives
                  </Menu.Item>
                  <Menu.Item
                    key="6"
                    onClick={() =>
                      history.push("/dashboard/cloned-initiatives")
                    }
                  >
                    Cloned Initiatives
                  </Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<UserOutlined />} title="Users">
                  <Menu.Item
                    key="7"
                    onClick={() => history.push("/dashboard/users")}
                  >
                    All Users
                  </Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" icon={<MailOutlined />} title="Email">
                  <Menu.Item
                    key="8"
                    onClick={() => history.push("/dashboard/set-email-rules")}
                  >
                    Email Rules
                  </Menu.Item>
                </SubMenu>
                <Menu.Item
                  key="9"
                  icon={<GoCommentDiscussion />}
                  onClick={() => history.push("/dashboard/comments")}
                >
                  Comments
                </Menu.Item>
                <Menu.Item
                  key="10"
                  icon={<MdViewList />}
                  onClick={() => history.push("/dashboard/categories")}
                >
                  Categories
                </Menu.Item>
              </Menu>
            </Wrapper>
          </Sider>
        </Fade>
      </Modal>
    </Wrapper>
  );
};

export default Dashboardmobilesidebar;
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
