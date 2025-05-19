import { motion } from "framer-motion";
import calendar from "../../../assets/calendar.png";
import sector from "../../../assets/sector.png";
import heatmap from "../../../assets/heatmap.png";
import fomc from "../../../assets/fomc.png";
import stockIcon from "../../../assets/icons/stock.png"
import calendarIcon from "../../../assets/icons/calendar.jpg";
import sector_finance from "../../../assets/sector_finance.png";
import ImageSlider from "../../../components/ImageSlider";
import fomcIcon from "../../../assets/icons/fomc.png";
import linelinechart from "../../../assets/linelinechart.png"

const features = [
  {
    title: "경제 이벤트 캘린더",
    subtitle: "경제 이벤트를 한눈에!",
    description:
      "경제 지표 이벤트 및 FOMC 발표 일정을 확인하고 각 경제 지표 이벤트 별 예상치와 영향력을 볼 수 있어요. ",
    image: calendar,
    icon: calendarIcon,
    reverse: false,
  },
  {
    title: "경제지표X종목",
    subtitle: "지표가 종목에 미치는 영향은?",
    description:
      "지표가 발표되기 전 후로 주가가 어떻게 변화되는 지 확인하세요. 지표가 변화하면 주가는 어떻게 변동될까요?",
    image: sector,
    icon: stockIcon,
    reverse: true,
  },
  {
    title: "경제지표X섹터",
    subtitle: "지표가 섹터에 미치는 영향 포착!",
    description:
      "경제 지표와 섹터에 대한 히트맵을 확인하세요. 각각의 지표가 섹터에 미치는 영향을 한눈에 확인할 수 있어요.",
    image: heatmap,
    icon: sector_finance,
    reverse: false,
  },
  {
    title: "FOMC 회의록",
    subtitle: "기준 금리가 오를까요?",
    description:
      "FOMC 회의록을 분석한 요약을 제공해요. 여러 FOMC 회의록을 한 눈에 비교해보세요.",
    image: fomc,
    icon: fomcIcon,
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
    <section className="w-full py-20 max-w-[1200px] gap-38 flex flex-col justify-center items-center px-6">
      {features.map((feature, idx) => {
        const isRightAligned = false;

        return (
          <div
            key={idx}
            className={`flex flex-col w-full items-center md:flex-row ${
              feature.reverse ? "md:flex-row-reverse" : ""
            } gap-12`}
          >
            <motion.div
              className={` w-1/3 flex flex-col h-[500px] justify-between py-4 ${
                isRightAligned
                  ? "items-end text-right"
                  : "items-start text-left"
              }`}
              initial={feature.reverse ? "hiddenRight" : "hiddenLeft"}
              whileInView="visible"
              viewport={{ amount: 0.4 }}
              transition={{ duration: 0.4 }}
              variants={fadeVariant}
            >
              <div className="mt-8">
                <h5 className="font-semibold text-orange text-xl mb-4">
                  {feature.subtitle}
                </h5>
                <h3 className="text-4xl font-bold">{feature.title}</h3>
                <p className="mt-12 text-lg">{feature.description}</p>
              </div>
              <div className="flex w-full justify-end">
                <img className="h-48" src={feature.icon} />
              </div>
            </motion.div>

            <motion.div
              className={`w-2/3 flex h-[500px]  ${
                feature.reverse ? "justify-start" : "justify-end"
              }`}
              initial={feature.reverse ? "hiddenLeft" : "hiddenRight"}
              whileInView="visible"
              viewport={{ amount: 0.4 }}
              transition={{ duration: 0.4 }}
              variants={fadeVariant}
            >
              <img src={feature.image} />
            </motion.div>
          </div>
        );
      })}
    </section>
  );
}
