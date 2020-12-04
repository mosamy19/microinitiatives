import React from "react";
import { useHistory } from "react-router-dom";
import user_white from "../../../../assets/icons/user_white.svg";
import styled from "styled-components";

const Cloneinitiative = ({
  initiativeId,
  title,
  category,
  initiativeAuthor,
}) => {
  const history = useHistory();

  return (
    <div>
      {initiativeAuthor &&
        initiativeAuthor.map((item) => (
          <Wrapper
            onClick={() =>
              history.push(
                `/clone-initiative/${initiativeId}/${item._id}/${title}/${category}`
              )
            }
            className="text-center"
            style={{
              background: "#f7b500",
              border: "none",
              borderRadius: "8px",
              margin: "48px 0",
              padding: "18px 0",
              cursor: "pointer",
            }}
          >
            <div className="d-flex justify-content-center align-items-center mb-style">
              <img src={user_white} alt="" width="24.8px" height="16px" />
              <span
                className="cloneCount"
                style={{
                  margin: "0 5px",
                  color: "#fff",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                34
              </span>
              <p style={{ fontSize: "16px", fontWeight: "500", color: "#fff" }}>
                شخص نفّذوا مثل هذا المبادرة
              </p>
            </div>
            <h2
              className="m-link"
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              نفّذ مثل هذه المبادرة
            </h2>
          </Wrapper>
        ))}
    </div>
  );
};

export default Cloneinitiative;
const Wrapper = styled.div`
  @media screen and (max-width: 760px) {
    .mb-style {
      p,
      span {
        font-size: 12px !important;
        font-wieght: normal !important;
      }
      img {
        width: 19px;
        height: 12px;
      }
    }
    .m-link {
      font-size: 16px !important;
    }
  }
`;
