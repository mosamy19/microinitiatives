import React from "react";
import styled from "styled-components";
import resetImg from "../../assets/images/reset.JPG";

const Resetmessage = () => {
  return (
    <Wrapper>
      <div className="reset">
        <img src={resetImg} alt="" />
        <h2>تم إرسال بريد إعادة تعيين كلمة السر بنجاح</h2>
        <p>من فضلك أضغط على الرابط المرسل لبريدك الإلكتروني</p>
      </div>
    </Wrapper>
  );
};

export default Resetmessage;
const Wrapper = styled.div`
  text-align: center;
  .reset {
    text-aling: center;
    margin: 50px auto;
    max-width: 600px;
    h2 {
      font-size: 22px;
      max-width: 300px;
      margin: 0 auto;
      word-spacing: 2px;
    }
    p {
      font-size: 18px;
      max-width: 350px;
      margin: 0 auto;
      word-spacing: 2px;
    }
  }
`;
