import { Button } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { Collapse } from "reactstrap";
import styled from "styled-components";

const Noistory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Wrapper style={{}}>
      <p>
        كنت أقدّم دورة في أحد البرامج الصيفية في الرياض عن “التفكير التصميمي
        وبناء المبادرات”.  كانت في القاعة حوالي ١٥ فتاة. ثلاث منهن كنّ مهتمات
        بشكل حقيقي بالمحاضرة أو هذا ما ظننته على الأقل. أتذكر أني قلت لنفسي: لا
        بأس، سيكون رائعاً أن يفهمن ما أقول ويحاولن تطبيقه يوماً ما. (يتمحور
        التفكير التصميمي حول التفاعل مع المستفيدين ومحاولة فهم احتياجاتهم لتصميم
        حلول فعّالة من خلال التجريب والتحسين المتكرر.) ثم أتت الصدمة. سألتني
        إحدى الفتيات الثلاث: أستاذة في شركات ممكن تسوي لنا هذي الأبحاث؟  
      </p>
      <Button onClick={toggle} variant="outlined" className="read-more">
        {isOpen ? "أقرأ أقل" : "أقرأ أكثر"}
      </Button>
      <Collapse isOpen={isOpen}>
        <div>
          <h2>
            استنتجت من سؤالها أن هناك فكرتين أساسيتين قد تكون راسخة في أذهان
            الكثيرين عن المبادرات:
          </h2>
          <ul>
            <li>
              الأولى: أن المبادرات عليها أن تكون ضخمة أو تستهدف التحول لمبادرة
              ضخمة إن بدأت بحجم متواضع.
            </li>
            <li>
              الثانية: نتيجة للفكرة الأولى، فإننا لا نستطيع أن نقوم بصناعة أي
              مبادرة لأن أي مبادرة عليها أن تكون ضخمة ونحن ليس لدينا الثقة
              الكافية أو الوقت الكافِ أو الموارد الكافية لبنائها.{" "}
            </li>
          </ul>
          <p>
            لذلك فإن دورنا غالباً يكون محصوراً في انتظار الآخرين ليصنعوا هذه
            المبادرات، فالحديث حولها لا يعنينا حتى لو كنا من اختار أن يسجل في
            محاضرة عن بناء المبادرات و اقتطعنا من يومنا عدة ساعات من أجل ذلك.
            نعم تبدو الفكرة راسخة إلى هذا الحد.
          </p>
          <h2>
            لكني لم استطع التوقف عن التفكير .. لماذا سجلت هذه الفتاة لحضور هذه
            الدورة؟
          </h2>
          <p>
            أظن – والله أعلم – أن هذه الفتاة مهتمة بصدق بعمل شيءٍ ما، بإنجاز
            شيءٍ ما في هذا العالم. هذا الشعور الداخلي الطاغي لا يتركها تهمل هذا
            النوع من الدورات، ولكن في الوقت نفسه هي لا تستطيع صناعة مبادرة لأن
            المبادرة الضخمة هي الخيار الوحيد لفعل ذلك. المؤلم في الأمر أن هذه
            الفتاة ومن يشبهها سيستسلمن يوماً ما، وسينطفىء فيهن هذا الشعور. حينها
            يخسر المجتمع شخصاً آخرآ كان مهتماً جداً ثم ذهب.{" "}
          </p>
          <h2>ما الحل ؟</h2>
          <p>
            أظن أن علينا توفير خيارات أخرى لبناء المبادرات غير المبادرات الضخمة.
            نقترح المبادرات المتناهية الصغر، وعلامتها ثلاثة. ساعد ثلاثة أشخاص.
            اكتب مقالاً واحداً وشجع ثلاثة أشخاص لقراءته. اكتب ثلاثة مقالات. لخّص
            ثلاثة كتب. اصنع فيديو من ثلاثة دقائق. احكي قصة لثلاثة أطفال. وزّع
            ثلاثة وجبات. اسقِ ثلاثة قطط .. وهكذا.{" "}
          </p>
          <h2>لماذا المبادرات المتناهية الصغر؟</h2>
          <p>
            يقول الدكتور عبدالكريم بكار ” الأشياء الصغيرة تظل دائمًا قابلة
            للتنفيذ، لأنها قابلة للتصديق، والأشياء الكبرى كثيرًا ما تبقى في حيز
            الأمنيات، لأننا نشك عادة في قدرتنا على القيام بها”{" "}
          </p>
          <p>
            المبادرات المتناهية الصغر تكلفتها قليلة سواء على الصعيد النفسي أو
            الزمني. هذا يكسر حاجز البدء، وهي المرحلة الأصعب، ويجعل الانطلاق
            ممكناً. هذا النوع من المبادرات ينقل العمل لنفع الآخرين من دوائر
            الاهتمام إلى دوائر التأثير. سيتنقل آلاف البشر من مقعد المتفرج إلى
            الفاعل. وهذا كله يزيد من خيرية المجتمع وبركته.{" "}
          </p>
          <h2>كيف تصنع مبادرة متناهية الصغر؟</h2>
          <div>
            <h5>أولاً : اختيار موضوع المبادرة</h5>
            <p>
              قد تكون مشكلة تؤرقك وتريد أن تكون من الفاعلين في حلّها، أو مهارة
              تتميز بها وتحب أن تنقلها وتعلّمها، أو اهتمام تحب أن تشاركه.{" "}
            </p>
            <h5>
              ثانياً: حدّد ماتنوي فعله في موضوع المبادرة. مثلاً في حالة المشكلة
              قرّر كيف تريد حلّها. لنفترض أنك تريد حل مشكلة ضعف القراءة عند
              الأطفال فبإمكانك حلهّا عن طريق:
            </h5>
            <ul>
              <li>قراءة قصة لثلاثة أطفال.</li>
              <li>
                مشاركة مقالة جيدة عن تطوير عادة القراءة للأطفال مع ثلاثة أمهات.{" "}
              </li>
              <li>شراء ثلاث قصص لثلاثة أطفال.</li>
              <li>تسجيل قصة صوتية للأطفال مدتها ثلاثة دقائق.</li>
              <li>
                تكوين قائمة تشغيل في اليوتيوب مكوّنة من ثلاث فيديوهات ونشرها.
              </li>
              <li>مشاركة ثلاث منصات جيدة عن القراءة مع ثلاث أمهات.</li>
            </ul>
            <p>وينطبق الأمر نفسه على المهارة والاهتمام. </p>
            <h5>ثالثاً: نفّذ.</h5>
            <h5>رابعاً: نفذّ المبادرة مرة أخرى أو اصنع مبادرة جديدة. </h5>
          </div>
          <h2>سؤال أخير قد تواجهنا أنفسنا به: </h2>
          <span>
            كيف يمكن لقراءة قصة واحدة لثلاثة أطفال أن تحل مشكلة ضعف القراءة في
            الوطن العربي؟ قولوا لأنفسكم كلمتان: ( إن الجبال من الحصى) و ( تصّدق
            ولو بشق تمرة).
          </span>
        </div>
      </Collapse>
    </Wrapper>
  );
};

export default Noistory;
const Wrapper = styled.div`
  background: #ffffff;
  padding: 16px 14px;
  margin: 16px 0;
  position: relative;
  text-align: right;
  h2 {
    font-size: 16px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.85);
    margin: 18px 0;
  }
  h5 {
    font-size: 12px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.85);
    margin: 18px 0;
  }
  ul {
    margin-right: 20px;
    li {
      padding-right: 10px;
      margin-right: 20px;
    }
    li::marker {
      content: "👈";
    }
  }
`;
