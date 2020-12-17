import React from "react";
import styled from "styled-components";
import resetImg from "../../../assets/images/reset.JPG";

const Successmsg = () => {
  return (
    <Wrapper>
      <div className="reset">
        <img src={resetImg} alt="" style={{ marginBottom: "18px" }} />
        <h2>رسالتك وصلتنا بنجاح سنرد عليك قريباً</h2>
      </div>
    </Wrapper>
  );
};

export default Successmsg;
const Wrapper = styled.div`
  text-align: center;
  .reset {
    text-aling: center;
    margin: 50px auto;
    max-width: 600px;
    h2 {
      font-size: 18px;
      color: rgba(0, 0, 0, 0.85);
      max-width: 150px;
      margin: 0 auto;
      font-weight: bold;
    }
  }
`;
