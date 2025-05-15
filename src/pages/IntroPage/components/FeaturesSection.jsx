import { motion } from "framer-motion";
import calendar from "../../../assets/calendar.png";
import sector from "../../../assets/sector.png";
import heatmap from "../../../assets/heatmap.png";
import fomc from "../../../assets/fomc.png";

const features = [
  {
    title: "경제 이벤트 캘린더",
    description:
      "경제지표 발표 일정과 <br />변화추세, 지표별 주요 섹터, 종목 인사이트",
    image: calendar,
    reverse: false,
  },
  {
    title: "경제지표X종목",
    description:
      "종목별 경제지표에 대한 민감도 분석과 <br />앞으로 나올 지표에 따른 주가 예측",
    image: sector,
    reverse: true,
  },
  {
    title: "경제지표X섹터",
    description:
      "경제지표와 섹터에 대한 히트맵을 통해 <br />섹터와 경제지표의 연관성 확인",
    image: heatmap,
    reverse: false,
  },
  {
    title: "FOMC 회의록",
    description: "FOMC의 주요 발언을 AI로 요약 제공",
    image: fomc,
    reverse: true,
  },
];

const fadeVariant = {
  hiddenLeft: { opacity: 0, x: -50 },
  hiddenRight: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
};

export default function FeaturesSection() {
  return (
    <section className="mx-24 flex flex-col gap-38">
      {features.map((feature, idx) => {
        const isRightAligned = idx === 1 || idx === 3;

        return (
          <div
            key={idx}
            className={`flex flex-col md:flex-row items-center ${
              feature.reverse ? "md:flex-row-reverse" : ""
            } gap-10`}
          >
            <motion.div
              className={`w-full md:w-1/3 flex flex-col ${
                isRightAligned
                  ? "items-end text-right"
                  : "items-start text-left"
              }`}
              initial={feature.reverse ? "hiddenRight" : "hiddenLeft"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4 }}
              variants={fadeVariant}
            >
              <h3 className="text-4xl font-bold">{feature.title}</h3>
              <p
                className="mt-8 text-lg font-bold"
                dangerouslySetInnerHTML={{ __html: feature.description }}
              />
            </motion.div>

            <motion.div
              className={`w-full md:w-2/3 flex ${
                feature.reverse ? "justify-start" : "justify-end"
              }`}
              initial={feature.reverse ? "hiddenLeft" : "hiddenRight"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4 }}
              variants={fadeVariant}
            >
              <img
                src={feature.image}
                alt={feature.title}
                className="max-w-full h-auto"
              />
            </motion.div>
          </div>
        );
      })}
    </section>
  );
}
