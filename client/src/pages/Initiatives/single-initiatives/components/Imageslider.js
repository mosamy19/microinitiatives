import React from "react";
import Slider from "react-slick";
import styled from "styled-components";

const Imageslider = ({ images }) => {
  const state = {
    cssEase: "ease-in-out",
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    dots: true,
  };
  return (
    <Wrapper>
      <Slider {...state}>
        {images &&
          images.map((item, index) => (
            <div key={index}>
              <img src={item} alt="" />
            </div>
          ))}
      </Slider>
    </Wrapper>
  );
};

export default Imageslider;
const Wrapper = styled.div`
  img {
    width: 100%;
    height: 410px;
  }
  .slick-dots li button:before {
    position: absolute;
    top: 0;
    left: 0;
    width: 6px;
    height: 6px;
    content: "";
    border-radius: 100%;
    text-align: center;
    background: #000;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .slick-dots li.slick-active button:before {
    width: 12px;
    border-radius: 3px;
    background: #6236ff;
  }
  .slick-dots li {
    width: 0;
  }
  .slick-dots li button {
    width: 5px;
    height: 5px;
    padding: 5px;
  }
  @media screen and (max-width: 760px) {
    img {
      width: 100%;
      height: 205px;
    }
  }
`;
