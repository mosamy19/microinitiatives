import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FiFlag } from "react-icons/fi";
import Imageslider from "./Imageslider";
import Cloneinitiative from "./Cloneinitiative";
import { useSelector, useDispatch } from "react-redux";
import { getBaseInitiative } from "../../../../store/actions/initiative-actions";

const Baseinitiative = ({ baseInitiativeId }) => {
  const dispatch = useDispatch();
  const [base_initiative, set_base_initiative] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(getBaseInitiative(baseInitiativeId));
    }, 100);
  }, [dispatch, baseInitiativeId]);

  const { baseInitiative } = useSelector((state) => state.initiatives);

  useEffect(() => {
    if (baseInitiative) {
      set_base_initiative(baseInitiative);
    }
  }, [baseInitiative]);
  console.log(base_initiative);
  return (
    <Wrapper>
      <Grid container>
        <Grid item xs={12} sm={6} md={4}>
          <div
            className="d-flex align-items-center"
            style={{ margin: "13px 0" }}
          >
            <FiFlag />
            <p
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                margin: "0 8px",
              }}
            >
              المبادرة الأساسية
            </p>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Imageslider images={base_initiative.thumbnail} />
        </Grid>
        <Grid item xs={12}>
          <Cloneinitiative
            initiativeId={base_initiative._id}
            initiativeAuthor={base_initiative.author}
          />
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default Baseinitiative;
const Wrapper = styled.div`
  svg {
    font-size: 16px;
    font-weight: bold;
    color: rgba(16, 24, 32, 0.65);
  }
`;
