import React from "react";

import oval1 from "../../../../assets/icons/release-two/icons/oval1.svg";
import oval2 from "../../../../assets/icons/release-two/icons/oval2.svg";
import step1screen3x from "../../../../assets/icons/release-two/icons/setp1screen3x.png";
import step2sc3x from "../../../../assets/icons/release-two/icons/step2sc3x.png";
import oval_1 from "../../../../assets/icons/oval_1.svg";
import step_1 from "../../../../assets/icons/step_1.svg";
import oval_2 from "../../../../assets/icons/oval_2.svg";
import step_2 from "../../../../assets/icons/step_2.svg";
import oval_3 from "../../../../assets/icons/oval_3.svg";
import step_3 from "../../../../assets/icons/step_3.svg";

const HowDoseNoiiWork = () => {
  return (
    <div className="container">
      <div className="d-flex flex-column align-items-center">
        <h2
          style={{
            margin: "0 0 33px",
            fontSize: "24px",
            fontWeight: "bold",
            color: "rgba(0, 0, 0, 0.85)",
          }}
        >
          كيف تعمل نوي؟
        </h2>
        <div style={{ margin: "0px 20px 20px 20px" }}>
          <div className="steps">
            <img className="oval" src={oval_1} alt="" />
            <span className="count cloneCount">1</span>
            <img className="step" src={step_1} alt="" />
          </div>
          <div className="d-flex flex-column align-items-center">
            <div className="d-flex flex-column align-items-center">
              <h1
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "rgba(0, 0, 0, 0.85)",
                  margin: "25px 0 8px",
                }}
              >
                حدد فكرة مبادرتك
              </h1>
              <h2
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "rgba(16, 24, 32, 0.65)",
                }}
              >
                هناك طريقتين لتحديد فكرة المبادرة
              </h2>
            </div>
            <div className="d-flex flex-column align-items-center">
              <h2
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "rgba(0, 0, 0, 0.85)",
                  margin: "24px 0 16px",
                }}
              >
                الأولى : اخترع فكرة مبادرة جديدة
              </h2>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "normal",
                  color: "rgba(16, 24, 32, 0.65)",
                  textAlign: "center",
                  marginBottom: "16px",
                }}
              >
                اذا كان لديك فكرة مبادرة تريد تطبيقها بإمكانك بكل سهولة إنشاءها
                عن طريق الضغط على زر إنشاء مبادرة جديدة
              </p>
              <div style={{ position: "relative" }}>
                <img
                  src={oval1}
                  alt=""
                  width="115%"
                  height="100%"
                  style={{
                    position: "absolute",
                    top: "-10px",
                    right: "-10%",
                    zIndex: "-1",
                  }}
                />
                <img src={step1screen3x} alt="" width="98%" height="98%" />
              </div>
            </div>
            <div className="d-flex flex-column align-items-center">
              <h2
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "rgba(0, 0, 0, 0.85)",
                  margin: "24px 0 16px",
                }}
              >
                الثانية: انسخ مبادرة قائمة
              </h2>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "normal",
                  color: "rgba(16, 24, 32, 0.65)",
                  textAlign: "center",
                  marginBottom: "16px",
                }}
              >
                في حال كنت محتار في فكرة المبادرة التي ستنشئها، تصفح المبادرات
                التي قام بإنشاءها المبادرون الآخرون على نوي، وستجد بالتأكيد
                مبادرة تعجبك وتستحق وقتك واهتمامك .. حين تجدها اضغط فقط على زر
                نفّذ مثل هذه المبادرة
              </p>
              <div style={{ position: "relative" }}>
                <img
                  src={oval2}
                  alt=""
                  width="115%"
                  height="200%"
                  style={{
                    position: "absolute",
                    top: "-43%",
                    right: "-10%",
                    zIndex: "-1",
                  }}
                />
                <img src={step2sc3x} alt="" width="100%" height="100%" />
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
          <div className="d-flex flex-column align-items-center">
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "rgba(0, 0, 0, 0.85)",
                margin: "25px 0 8px",
              }}
            >
              نفّذ المبادرة
            </h2>
            <p
              style={{
                fontSize: "14px",
                fontWeight: "normal",
                color: "rgba(16, 24, 32, 0.65)",
                textAlign: "center",
                marginBottom: "16px",
              }}
            >
              بعد أن تحدد فكرة المبادرة، انطلق وطبقها على أرض الواقع، تأكد أنك
              توثق تجربتك لتقوم بمشاركتها على نوي
            </p>
          </div>
        </div>
        <div style={{ margin: "57px auto 0" }}>
          <div className="steps">
            <img className="oval" src={oval_3} alt="" />
            <span className="count cloneCount">3</span>
            <img className="step step3" src={step_3} alt="" />
          </div>
          <div className="d-flex flex-column align-items-center">
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "rgba(0, 0, 0, 0.85)",
                margin: "25px 0 8px",
              }}
            >
              شارك المبادرة
            </h2>
            <p
              style={{
                fontSize: "14px",
                fontWeight: "normal",
                color: "rgba(16, 24, 32, 0.65)",
                textAlign: "center",
                marginBottom: "16px",
              }}
            >
              بعد أن أكملت تنفيذ مبادرتك، حان الآن وقت مشاركتها على نوي، احكي
              قصة المبادرة، شارك صورها، وألهم العالم
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowDoseNoiiWork;
