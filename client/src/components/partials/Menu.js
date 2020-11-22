import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../store/actions/auth-actions";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import user from "../../assets/images/user.svg";
import { RiArrowDownSLine } from "react-icons/ri";
import styled from "styled-components";

const Menu = (props) => {
  const history = useHistory();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <Wrapper>
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle
          tag="span"
          data-toggle="dropdown"
          aria-expanded={dropdownOpen}
        >
          <div className="d-flex align-items-center">
            <img
              src={user}
              alt=""
              width="26px"
              height="26px"
              style={{
                borderRadius: "100%",
                background: "rgba(0, 0, 0, 0.1)",
              }}
            />
            <p style={{ margin: "0 3px" }}>سارة القحطاني</p>
            <RiArrowDownSLine />
          </div>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>
            <Link to="/settings">إعدادات</Link>
          </DropdownItem>
          <DropdownItem>
            <Link to="#" onClick={() => props.logout(history)}>
              تسجيل خروج
            </Link>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Wrapper>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Menu);
const Wrapper = styled.div`
  .dropdown-menu {
    border: none;
    top: -9px !important;
    min-width: 138px;
    padding: 0;s
    border-radius: 0;
    .dropdown-item {
      text-align: right;
      &:nth-child(1) {
        border-bottom: solid 1px rgba(0, 0, 0, 0.1);
      }
      a {
        text-decoration: none;
        font-size: 14px;
        font-weight: normal;
        color: rgba(16, 24, 32, 0.65);
      }
    }
  }
`;
