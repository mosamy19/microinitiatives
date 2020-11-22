import React from "react";
import styled from "styled-components";
import samimFont from "../../assets/samim-fonts/ArbFONTS-Samim-FD-WOL.ttf";

import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Basicinfo from "./basicinfo";
import ChangePassword from "./change-password";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 460,
    marginBottom: "32px",
  },
}));
const Settings = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Wrapper>
      <h2
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          color: "rgba(0, 0, 0, 0.85)",
          marginBottom: "20px",
        }}
        className="text-right"
      >
        الإعدادات
      </h2>
      <Tabs
        className={classes.root}
        value={value}
        onChange={handleChange}
        TabIndicatorProps={{ style: { background: "#6236ff" } }}
      >
        <Tab label="المعلومات الأساسية" />
        <Tab label="تغيير كلمة المرور" />
      </Tabs>
      {value === 0 && <Basicinfo />}
      {value === 1 && <ChangePassword />}
    </Wrapper>
  );
};

export default Settings;
const Wrapper = styled.div`
  max-width: 460px;
  margin: 64px 0;
  text-alieng: right;
  font-family: Samim-FD-WOL !important;
  @font-face {
    font-family: Samim-FD-WOL;
    src: url(${samimFont});
  }
  button {
    outline: none;
  }
  .MuiTab-root {
    padding: 12px 0 12px 12px;
  }
  .MuiTab-labelIcon {
    min-height: auto;
  }
  .MuiTab-wrapper {
    font-family: Samim-FD-WOL !important;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: start;
  }
  .MuiTab-labelIcon .MuiTab-wrapper > *:first-child {
    margin-bottom: 0px;
    margin-left: 5px;
  }
`;
