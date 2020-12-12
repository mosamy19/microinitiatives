import { Grid } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import samimFont from "../../../../assets/samim-fonts/ArbFONTS-Samim-FD-WOL.ttf";
import Initiativecard from "../../component/Initiativecard";

const Completedinitiatives = ({ myinitiatives }) => {
  const history = useHistory();
  const completedInitiatives = myinitiatives.filter(
    (item) => item.draft !== true && item.cloned !== true
  );

  return (
    <Wrapper>
      <Grid container spacing={3}>
        {completedInitiatives.length === 0 ? (
          <span>No initiative yet..!</span>
        ) : (
          completedInitiatives.map((initiative) => (
            <Grid item xs={12} sm={6} md={4}>
              <div
                onClick={() =>
                  history.push(`single-initiative/${initiative._id}`)
                }
              >
                <Initiativecard initiative={initiative} />
              </div>
              <div
                className="edit"
                onClick={() =>
                  history.push(
                    `edit-initiative/${initiative._id}/${initiative.title}/${
                      initiative.category
                    }/${
                      initiative.description
                        ? initiative.description
                        : "add-a-description"
                    }`
                  )
                }
              >
                <p
                  style={{
                    marginBottom: "0",
                    fontSize: "12px",
                    color: "rgba(0, 0, 0, 0.25)",
                    textAlign: "center",
                  }}
                >
                  تعديل المبادرة
                </p>
              </div>
            </Grid>
          ))
        )}
      </Grid>
    </Wrapper>
  );
};

export default Completedinitiatives;
const Wrapper = styled.div`
  font-family: Samim-FD-WOL;
  font-size: 18px;
  .edit {
    background: #fff;
    padding: 12px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    transition: all 0.5s ease-in-out;
    cursor: pointer;
    &:hover {
      p {
        color: rgba(0, 0, 0, 0.85) !important;
      }
    }
  }
  @font-face {
    font-family: Samim-FD-WOL;
    src: url(${samimFont});
  }
`;
