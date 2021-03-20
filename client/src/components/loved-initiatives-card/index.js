import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const LovedInitiativesCard = (props) => {
  const history = useHistory();
  return (
    <Wrapper bgColor={props.bgColor} deg={props.deg} opacity={props.opacity}>
      <div
        className="love-card d-flex align-items-center justify-content-center"
        onClick={() => history.push(`/browse-single-initiative/${props.id}`)}
      >
        <img
          src={props.img}
          alt=""
          width="100%"
          height="400px"
          className="mb-size"
        />
        <div className="d-flex align-items-start flex-column overlay">
          <div
            className="mt-auto"
            style={{ fontSize: "14px", fontWeight: "bold", zIndex: 99 }}
          >
            {props.title}
          </div>
          <div className="d-fex" style={{ fontSize: "10px" }}>
            <span style={{ color: "#fbfcff", opacity: 1 }}>{props.name}</span>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default LovedInitiativesCard;
const Wrapper = styled.div.attrs((props) => ({
  bgColor: props.bgColor,
  deg: props.deg || "to top",
  opacity: props.opacity || "0.46",
}))`
  width: 100%;
  cursor: pointer;
  .love-card {
    position: relative;
    width: 100%;
    z-index: 1;
    overflow: hidden;
    .overlay {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 100%;
      z-index: 98;
      opacity: ${(props) => props.opacity};
      color: #fff;
      background-image: linear-gradient(
        ${(props) => props.deg},
        ${(props) => props.bgColor}
      );

      padding: 24px;
    }
  }

  @media screen and (max-width: 760px) {
    .overlay {
      padding: 10px;
    }
    .mb-size {
      width: 200px;
      height: 134px;
    }
  }
`;
