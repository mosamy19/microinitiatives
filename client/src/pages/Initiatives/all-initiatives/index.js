import React, { useEffect, useState } from "react";
import styled from "styled-components";
import samimFont from "../../../assets/samim-fonts/ArbFONTS-Samim-FD-WOL.ttf";
import { Spin, Space } from "antd";
import Initiativecard from "../component/Initiativecard";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllInitiatives } from "../../../store/actions/initiative-actions";
import Filterbutton from "./components/Filterbutton";
import { Grid } from "@material-ui/core";

const Allinitiatives = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [value, setValue] = useState("pined");
  const [all_initiatives, set_all_initiative] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getTheValue = (val) => {
    setValue(val);
  };

  useEffect(() => {
    dispatch(getAllInitiatives(value));
  }, [dispatch, value]);

  const { isLoading } = useSelector((state) => state.loader);
  const { initiatives } = useSelector((state) => state.initiatives);

  useEffect(() => {
    if (initiatives.length > 0) {
      set_all_initiative(initiatives);
    }
  }, [initiatives]);

  console.log(all_initiatives);

  return (
    <Wrapper>
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
              {all_initiatives.length > 0 &&
                all_initiatives.map((initiative) => (
                  <Grid item xs={12} sm={6} md={4} key={initiative._id}>
                    <div
                      onClick={() =>
                        history.push(`/single-initiative/${initiative._id}`)
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

export default React.memo(Allinitiatives);
const Wrapper = styled.div`
  margin: 50px 0;
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
