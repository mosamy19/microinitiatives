import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import oval_1 from "../../assets/icons/oval_1.svg";
import step_1 from "../../assets/icons/step_1.svg";
import oval_2 from "../../assets/icons/oval_2.svg";
import step_2 from "../../assets/icons/step_2.svg";
import oval_3 from "../../assets/icons/oval_3.svg";
import step_3 from "../../assets/icons/step_3.svg";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  btn: {
    background: "#f7b500",
    color: "#fff",
    fontFamily: "inherit",
    fontSize: "16px",
    padding: "6px 40px",
    "&:hover": {
      background: "#f7b500",
      color: "#fff",
    },
    "&:focus": {
      outline: "none",
    },
  },
}));

const Details = () => {
  const classes = useStyles();
  return (
    <Wrapper className="text-center">
      <h2 style={{ margin: "0px", fontSize: "36px", fontWeight: "bold" }}>
        قصة قطرة
      </h2>
      <div
        style={{
          background: "#ffffff",
          padding: "16px 14px",
          margin: "16px 0",
        }}
      >
        <p style={{ textAlign: "right" }}>
          كنت أقدّم دورة في أحد البرامج الصيفية في الرياض عن “التفكير التصميمي
          وبناء المبادرات”.  كانت في القاعة حوالي ١٥ فتاة. ثلاث منهن كنّ مهتمات
          بشكل حقيقي بالمحاضرة أو هذا ما ظننته على الأقل. أتذكر أني قلت لنفسي:
          لا بأس، سيكون رائعاً أن يفهمن ما أقول ويحاولن تطبيقه يوماً ما. (يتمحور
          التفكير التصميمي حول التفاعل مع المستفيدين ومحاولة فهم احتياجاتهم
          لتصميم حلول فعّالة من خلال التجريب والتحسين المتكرر.) ثم أتت الصدمة.
          سألتني إحدى الفتيات الثلاث: أستاذة في شركات ممكن تسوي لنا هذي الأبحاث؟
           
        </p>
        <Button variant="outlined">أقرأ أكثر</Button>
      </div>
      <div style={{ margin: "34px 0" }}>
        <h2
          style={{ margin: "36px 0px", fontSize: "36px", fontWeight: "bold" }}
        >
          كيف تعمل قطرة؟
        </h2>
        <div>
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
                <p>حدد الهدف</p>
                <p>
                  هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم
                  توليد هذا النص من مولد النص العربى، التى.
                </p>
              </div>
              <div className="line"></div>
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
              <div className="line"></div>
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
              <div className="line"></div>
              <div
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
              </div>
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
                <p> حدد الفئة المستهدفة</p>
                <p>
                  هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم
                  توليد هذا النص من مولد النص العربى، التى.
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
                <p> حدد الفئة المستهدفة</p>
                <p>
                  هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم
                  توليد هذا النص من مولد النص العربى، التى.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          background: "#6236ff",
          marginTop: "32px",
          padding: "20px",
        }}
      >
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{
            paddingTop: "12px",
            paddingBottom: "32px",
          }}
        >
          <h2
            style={{
              fontSize: "22px",
              fontWeight: "bold",
              marginBottom: "0",
              marginLeft: "10px",
              color: "#fff",
            }}
          >
            هنا كلام لطيف وتشجيعي
          </h2>
          <p
            style={{
              textAlign: "right",
              fontSize: "16px",
              fontWeight: "normal",
              color: "#ffffff",
              margin: "16px 0",
            }}
          >
            هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا
            النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد
            من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.
          </p>
          <Link style={{ textDecoration: "none" }} to="/signup">
            <Button size="medium" className={classes.btn}>
              انضم لقطرة الآن
            </Button>
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

export default Details;
const Wrapper = styled.div`
  margin: 64px auto 0;
  max-width: 760px;
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
`;
