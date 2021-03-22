import React, { useEffect, useState } from "react";
import { Spin, Space } from "antd";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import samimFont from "../../../assets/samim-fonts/ArbFONTS-Samim-FD-WOL.ttf";
import current_initiatives from "../../../assets/icons/current_initiatives.svg";
import completed_initiatives from "../../../assets/icons/completed_initiatives.svg";
import bookmark from "../../../assets/icons/bookmark.svg";
import blue_bookmark from "../../../assets/icons/blue_bookmark.svg";
import blue_current_initiative from "../../../assets/icons/blue_current_initiative.svg";
import blue_completed_initiative from "../../../assets/icons/blue_completed_initiative.svg";

import { useSelector, useDispatch } from "react-redux";
import { getMyInitiatives } from "../../../store/actions/initiative-actions";

import Currentinitiatives from "./component/Currentinitiatives";
import Favoriteinitiatives from "./component/Favoriteinitiatives";
import Completedinitiatives from "./component/Completedinitiatives";
import { Grid } from "@material-ui/core";
import Noinitiativeyet from "./Noinitiativeyet";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "20px",
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
  },
}));

const MyAllinitiatives = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [isCurrent, setIsCurrent] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const dispatch = useDispatch();
  const [my_initiatives, set_my_initiatives] = useState([]);

  useEffect(() => {
    dispatch(getMyInitiatives());
  }, [dispatch]);

  const { myInitiatives } = useSelector((state) => state.initiatives);
  const { isLoading } = useSelector((state) => state.loader);
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    if (myInitiatives.length > 0) {
      set_my_initiatives(myInitiatives);
    }
  }, [myInitiatives]);

  useEffect(() => {
    if (value === 0) {
      setIsCurrent(true);
    } else {
      setIsCurrent(false);
    }
    if (value === 1) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
    if (value === 2) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [value]);

  return isLoading ? (
    <div style={{ maxWidth: "80px", margin: "0 auto" }}>
      <Space size="middle">
        <Spin size="large" />
      </Space>
    </div>
  ) : (
    <Wrapper>
      {my_initiatives.length > 0 && (
        <div>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Tabs
                className={classes.root}
                value={value}
                onChange={handleChange}
                TabIndicatorProps={{
                  style: { background: "#6236ff" },
                }}
              >
                <Tab
                  icon={
                    <img
                      width="12px"
                      height="12px"
                      src={
                        isCurrent
                          ? blue_current_initiative
                          : current_initiatives
                      }
                      alt=""
                    />
                  }
                  label="المسودة"
                />
                <Tab
                  icon={
                    <img
                      width="12px"
                      height="12px"
                      src={
                        isCompleted
                          ? blue_completed_initiative
                          : completed_initiatives
                      }
                      alt=""
                    />
                  }
                  label="المنشورة"
                />
                <Tab
                  icon={
                    <img
                      width="10px"
                      height="11.2px"
                      src={isFavorite ? blue_bookmark : bookmark}
                      alt=""
                    />
                  }
                  label="المفضلة"
                />
              </Tabs>
            </Grid>
          </Grid>
          {value === 0 && <Currentinitiatives myinitiatives={my_initiatives} />}
          {value === 1 && (
            <Completedinitiatives myinitiatives={my_initiatives} />
          )}
          {value === 2 && <Favoriteinitiatives user={user} />}
        </div>
      )}
      {my_initiatives.length === 0 && <Noinitiativeyet />}
    </Wrapper>
  );
};

export default MyAllinitiatives;
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
