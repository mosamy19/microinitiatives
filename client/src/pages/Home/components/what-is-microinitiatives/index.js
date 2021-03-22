import React from "react";

import qmark2 from "../../../../assets/icons/release-two/q-mark/q-mark1.png";
import shape1 from "../../../../assets/icons/release-two/icons/shape1.png";

import circle1 from "../../../../assets/icons/release-two/icons/circle1.png";
import ghandi from "../../../../assets/images/ghandi.png";

const WhatIsMicroinitiatives = () => {
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center mb-shape"
        style={{ position: "relative", margin: "16px 0 48px" }}
      >
        <img src={shape1} alt="" width="206px" height="136px" />
        <div
          className="mb-qmark"
          style={{ position: "absolute", top: "-20px", left: "44%" }}
        >
          <img src={qmark2} alt="" width="206px" height="206px" />
        </div>
      </div>

      <div
        className="d-flex flex-column align-items-center"
        style={{ textAlign: "center", padding: "16px", marginBottom: "30px" }}
      >
        <h1
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            marginBottom: "16px",
            color: "rgba(16, 24, 32, 0.65)",
          }}
        >
          ماهي المبادرات المتناهية الصغر؟
        </h1>
        <p
          style={{
            color: "rgba(16, 24, 32, 0.65)",
            fontSize: "14px",
            fontWeight: "bold",
            wordSpacing: "1.5px",
            maxWidth: "750px",
          }}
        >
          جوهر المبادرة المتناهية الصغر في أن تكون ٣ أو أقل، القراءة لثلاثة
          أطفال، توزيع ثلاث وجبات ترجمة مقالة في ثلاثة أيام وهكذا. يمكنك تصميم
          مبادرتك لتكون في أي مجال تحبه أو تهتم به أو تحسنه. كما يمكنك تقديم
          مبادرتك لمن تشاء، عائلتك أو أصدقاءك أو معارفك أو جيرانك أو لأي أحد
          تعرفه أو لا تعرفه.
        </p>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <div
          className="container"
          style={{
            background: "#f2f1fb",
            margin: "90px 20px 134px 20px",
            position: "relative",
          }}
        >
          <img
            src={circle1}
            alt=""
            width="78px"
            height="74px"
            style={{
              position: "absolute",
              top: "-45px",
              right: "42px",
              zIndex: "-1",
            }}
          />
          <img
            src={ghandi}
            alt=""
            width="97px"
            height="101px"
            style={{ position: "absolute", top: "-40%", right: "0" }}
          />
          <div>
            <p
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                color: "#2a4069",
                padding: "16px",
                margin: "50px 0 0",
                textAlign: "right",
              }}
            >
              يصبح الإنسان عظيماً تماماً بالقدر الذي يعمل فيه من أجل رعاية أخيه
              الإنسان
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhatIsMicroinitiatives;
