import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const LovedInitiativesCard = (props) => {
  const history = useHistory();
  let dropzoneStyle = {
    backgroundImage: `${props.gradiant}, url(${props.img})`,
    paddingTop: `${props.paddingTop}%`,
  };
  return (
    <Wrapper bgColor={props.bgColor} deg={props.deg} opacity={props.opacity}>
      <div
      style={dropzoneStyle}
        className="item-container"
        onClick={() => history.push(`/browse-single-initiative/${props.id}`)}
      >
        {/* <img
          src={props.img}
          alt=""
          width="100%"
          height="400px"
          className="mb-size"
        /> */}
        <div className=" item-content">
          <p
            className="text-right"
            style={{ fontSize: "14px",  color: "#ffffff", fontWeight: "bold" }}
          >
            {props.title}
          </p>
          <div className="text-right" style={{ fontSize: "10px" }}>
            <span style={{ color: "#ffffff" }}>{props.name}</span>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default LovedInitiativesCard;
const Wrapper = styled.div.attrs((props) => ({
  // bgColor: props.bgColor,
  // deg: props.deg || "to top",
  img: props.img
  
}))`
  .item-container {
    // padding-top: 100%;
    position: relative;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    
  }
  .item-content {
    position: absolute;
    bottom: 16px;
    right: 16px;
    left: 16px;
  }
`;
