import React, { useEffect, useState } from "react";
import { Spin, Space } from "antd";
import styled from "styled-components";
import samimFont from "../../../../assets/samim-fonts/ArbFONTS-Samim-FD-WOL.ttf";
import Initiativecard from "../../../Initiatives/component/Initiativecard";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getLandingPageInitiatives } from "../../../../store/actions/initiative-actions";
import Filterbutton from "./components/Filterbutton";
import { Grid } from "@material-ui/core";

const Browseallinitiatives = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [value, setValue] = useState("newest");

  const getTheValue = (val) => {
    setValue(val);
  };

  const [landingPageInitiatives, setLandingPageInitiatives] = useState([]);

  useEffect(() => {
    dispatch(getLandingPageInitiatives(value));
  }, [dispatch, value]);

  const { isLoading } = useSelector((state) => state.loader);
  const { initiatives } = useSelector((state) => state.initiatives);
  useEffect(() => {
    if (initiatives.length > 0) {
      setLandingPageInitiatives(initiatives);
    }
  }, [initiatives]);

  return (
    <Wrapper className="container">
      <div>
        <div className="d-flex align-items-center mb-style">
          <h2
            style={{
              marginBottom: "0",
              fontSize: "18px",
              fontWeight: "bold",
              color: "rgba(0, 0, 0, 0.85)",
            }}
          >
            كل المبادرات
          </h2>
          <Filterbutton getTheValue={getTheValue} />
        </div>
        <div className="my-4">
          {isLoading ? (
            <div style={{ maxWidth: "20px", margin: "0 auto" }}>
              <Space size="middle">
                <Spin size="large" />
              </Space>
            </div>
          ) : (
            <Grid container spacing={3}>
              {landingPageInitiatives.map((initiative) => (
                <Grid item xs={12} sm={6} md={4} key={initiative._id}>
                  <div
                    onClick={() =>
                      history.push(
                        `/browse-single-initiative/${initiative._id}`
                      )
                    }
                  >
                    <Initiativecard initiative={initiative} />
                  </div>
                </Grid>
              ))}
            </Grid>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default Browseallinitiatives;
const Wrapper = styled.div`
  margin: 50px auto;
  text-align: right;
  font-family: Samim-FD-WOL;
  @font-face {
    font-family: Samim-FD-WOL;
    src: url(${samimFont});
  }
  @media screen and (max-width: 760px) {
    .mb-style {
      justify-content: space-between;
    }
  }
`;
