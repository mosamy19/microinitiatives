import React from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import samimFont from "../../../assets/samim-fonts/ArbFONTS-Samim-FD-WOL.ttf";
import current_initiatives from "../../../assets/icons/current_initiatives.svg";
import completed_initiatives from "../../../assets/icons/completed_initiatives.svg";
import saved_initiatives from "../../../assets/icons/saved_initiatives.svg";
import bookmark from "../../../assets/icons/bookmark.svg";

import Currentinitiatives from "./component/Currentinitiatives";
import Favoriteinitiatives from "./component/Favoriteinitiatives";
import Completedinitiatives from "./component/Completedinitiatives";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 500,
    marginBottom: "32px",
  },
}));

const Myinitiatives = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Wrapper>
      <Tabs
        className={classes.root}
        value={value}
        onChange={handleChange}
        TabIndicatorProps={{
          style: { background: "#6236ff" },
        }}
      >
        <Tab icon={<img src={current_initiatives} alt="" />} label="الحالية" />
        <Tab
          icon={<img src={completed_initiatives} alt="" />}
          label="المكتملة"
        />
        <Tab icon={<img src={bookmark} alt="" />} label="المفضلة" />
      </Tabs>
      {value === 0 && <Currentinitiatives />}
      {value === 1 && <Completedinitiatives />}
      {value === 2 && <Favoriteinitiatives />}
    </Wrapper>
  );
};

export default Myinitiatives;
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
