import React from "react";
import styled from "styled-components";
import samimFont from "../../assets/samim-fonts/ArbFONTS-Samim-FD-WOL.ttf";

import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Basicinfo from "./basicinfo";
import ChangePassword from "./change-password";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "20px",
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
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
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Tabs
            className={classes.root}
            value={value}
            onChange={handleChange}
            TabIndicatorProps={{ style: { background: "#6236ff" } }}
          >
            <Tab label="المعلومات الأساسية" />
            <Tab label="تغيير كلمة المرور" />
          </Tabs>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          {value === 0 && <Basicinfo />}
          {value === 1 && <ChangePassword />}
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default Settings;
const Wrapper = styled.div`
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
  .MuiTabs-root {
    min-height: auto;
  }
  .MuiTabs-flexContainer {
    display: flex;
    justify-content: space-between;
  }
  .MuiTab-root {
    padding: 12px 0 4px 12px;
  }
  .Mui-selected {
    .MuiTab-wrapper {
      color: #6236ff;
    }
  }
  @media (min-width: 600px) {
    .MuiTab-root {
      min-width: 65px;
    }
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
