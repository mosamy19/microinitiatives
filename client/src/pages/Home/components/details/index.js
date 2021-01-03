import React from "react";
import styled from "styled-components";
// import Button from "@material-ui/core/Button";
import oval_1 from "../../../../assets/icons/oval_1.svg";
import step_1 from "../../../../assets/icons/step_1.svg";
import oval_2 from "../../../../assets/icons/oval_2.svg";
import step_2 from "../../../../assets/icons/step_2.svg";
import oval_3 from "../../../../assets/icons/oval_3.svg";
import step_3 from "../../../../assets/icons/step_3.svg";
import bond from "../../../../assets/icons/bonds/bond.png";
// import { makeStyles } from "@material-ui/core";
import Nicewords from "../../../../components/Nicewords";
import Noistory from "./components/Noistory";
import { useEffect } from "react";

// const useStyles = makeStyles((theme) => ({
//   btn: {
//     background: "#f7b500",
//     color: "#fff",
//     fontFamily: "inherit",
//     fontSize: "16px",
//     padding: "6px 40px",
//     "&:hover": {
//       background: "#f7b500",
//       color: "#fff",
//     },
//     "&:focus": {
//       outline: "none",
//     },
//   },
// }));

const Details = () => {
  // const classes = useStyles();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Wrapper className="text-center">
      <div className="container" style={{ maxWidth: "760px" }}>
        <h2 style={{ margin: "0px", fontSize: "36px", fontWeight: "bold" }}>
          قصة نوي
        </h2>
        <Noistory />
        <div className="bond">
          <img src={bond} width="106px" height="106px" alt="" />
        </div>
        <div style={{ margin: "67px 0" }}>
          <h2
            style={{ margin: "36px 0px", fontSize: "36px", fontWeight: "bold" }}
          >
            كيف تعمل نوي؟
          </h2>
          <div style={{ margin: "20px" }}>
            <div className="steps">
              <img className="oval" src={oval_1} alt="" />
              <span className="count cloneCount">1</span>
              <img className="step" src={step_1} alt="" />
            </div>
            <div>
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "rgba(0, 0, 0, 0.85)",
                  margin: "18px 0",
                }}
              >
                صمّم المبادرة
              </h2>
              <div>
                <div
                  style={{
                    background: "#fff",
                    marginTop: "18px",
                    padding: "16px 13px",
                    borderRadius: "4px",
                  }}
                >
                  <p>
                    جوهر المبادرة المتناهية الصغر في أن تكون ٣ أو أقل، القراءة
                    لثلاثة أطفال، توزيع ثلاث وجبات ترجمة مقالة في ثلاثة أيام
                    وهكذا. يمكنك تصميم مبادرتك لتكون في أي مجال تحبه أو تهتم به
                    أو تحسنه. كما يمكنك تقديم مبادرتك لمن تشاء، عائلتك أو
                    أصدقاءك أو معارفك أو جيرانك أو لأي أحد تعرفه أو لا تعرفه.
                  </p>
                </div>
                {/* <div className="line"></div>
                <div
                  style={{
                    background: "#fff",
                    padding: "16px 13px",
                    borderRadius: "4px",
                  }}
                >
                  <p> حدد الفئة المستهدفة</p>
                  <p>
                    هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم
                    توليد هذا النص من مولد النص العربى، التى.
                  </p>
                </div> */}
                {/* <div className="line"></div>
                <div
                  style={{
                    background: "#fff",
                    padding: "16px 13px",
                    borderRadius: "4px",
                  }}
                >
                  <p> حدد الفئة المستهدفة</p>
                  <p>
                    هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم
                    توليد هذا النص من مولد النص العربى، التى.
                  </p>
                </div>
                <div className="line"></div> */}
                {/* <div
                  style={{
                    background: "#fff",
                    marginBottom: "18px",
                    padding: "16px 13px",
                    borderRadius: "4px",
                  }}
                >
                  <p> حدد الفئة المستهدفة</p>
                  <p>
                    هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم
                    توليد هذا النص من مولد النص العربى، التى.
                  </p>
                </div> */}
              </div>
            </div>
          </div>
          <div>
            <div className="steps">
              <img className="oval" src={oval_2} alt="" />
              <span className="count cloneCount">2</span>
              <img className="step" src={step_2} alt="" />
            </div>
            <div>
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "rgba(0, 0, 0, 0.85)",
                  margin: "18px 0",
                }}
              >
                نفّذ المبادرة
              </h2>
              <div>
                <div
                  style={{
                    background: "#fff",
                    margin: "18px 0",
                    padding: "16px 13px",
                    borderRadius: "4px",
                  }}
                >
                  {/* <p> حدد الفئة المستهدفة</p> */}
                  <p>
                    بعد تصميم المبادرة، انطلق وطبقها على أرض الواقع، تأكد أنك
                    توثق تجربتك لتقوم بمشاركتها على نوي
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="steps">
              <img className="oval" src={oval_3} alt="" />
              <span className="count cloneCount">3</span>
              <img className="step step3" src={step_3} alt="" />
            </div>
            <div>
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "rgba(0, 0, 0, 0.85)",
                  margin: "18px 0",
                }}
              >
                شارك المبادرة
              </h2>
              <div>
                <div
                  style={{
                    background: "#fff",
                    margin: "18px 0",
                    padding: "16px 13px",
                    borderRadius: "4px",
                  }}
                >
                  {/* <p> حدد الفئة المستهدفة</p> */}
                  <p>
                    بعد أن أكملت تنفيذ مبادرتك، حان الآن وقت مشاركتها على نوي :)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Nicewords />
    </Wrapper>
  );
};

export default Details;
const Wrapper = styled.div`
  margin: 64px auto 0;
  .steps {
    min-height: 100px;
    max-width: 74px;
    margin: 0 auto;
    position: relative;
    .oval {
      position: absolute;
      top: 0;
      left: 0;
    }
    .count {
      font-size: 72px !important;
      font-weight: bold;
      line-height: 70px;
      color: #2a4069;
      opacity: 45%;
      position: absolute;
      top: 0%;
      right: -24%;
    }
    .step {
      position: absolute;
      top: 10%;
      left: -28%;
    }
    .step3 {
      left: -10% !important;
    }
  }
  .line {
    width: 0;
    height: 36px;
    margin: 1px 60.3px 1px 10.7px;
    transform: rotate(-1deg);
    border-right: dashed 3px #f7b500;
  }
  .read-more {
    width: 55px !important;
    height: 23px !important;
    font-family: inherit;
    font-size: 10px;
    letter-spacing: 0.5px;
    font-weight: normal;
    line-height: 1;
    padding: 5px 8px;
    border-radius: 10px;
    border: solid 1px rgba(0, 0, 0, 0.1);
    background: #ffffff;
    color: rgba(0, 0, 0, 0.25);
    outline: none;
    position: absolute;
    bottom: -10px;
    left: 45%;
  }
  .bond {
    position: absolute;
    bottom: 275px;
    left: 36%;
    z-index: -1;
  }
  @media screen and (max-width: 1440px) {
    .bond {
      bottom: 160px;
      left: 35%;
    }
  }
  @media screen and (max-width: 1140px) {
    .bond {
      bottom: 160px;
      left: 30%;
    }
  }
  @media screen and (max-width: 960px) {
    .bond {
      bottom: 135px;
      left: 28%;
    }
  }
  @media screen and (max-width: 760px) {
    .bond {
      bottom: 115px;
      left: 15%;
    }
  }
  @media screen and (max-width: 560px) {
    .bond {
      bottom: 90px;
      left: 25px;
    }
  }
`;
