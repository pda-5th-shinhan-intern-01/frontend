import { motion } from "framer-motion";
import chart from "../../../assets/chart.png";

export default function ChartSection() {
  const indicators = [
    "CPI",
    "PPI",
    "Core PCE",
    "NFP",
    "Unemployment Rate",
    "Retail Sales",
    "ISM",
    "Real GDP YoY",
  ];

  const animatedWords = indicators.map((text, i) => {
    const yRange = Math.floor(Math.random() * 20) + 5;
    const rotateRange = Math.floor(Math.random() * 15) + 2;
    const delay = Math.random() * 2.5;

    return (
      <motion.span
        key={i}
        className="inline-block mx-36"
        animate={{
          y: [0, -yRange, 0, yRange, 0],
          rotate: [-rotateRange, 0, rotateRange, 0, -rotateRange],
        }}
        transition={{
          repeat: Infinity,
          duration: 15 + Math.random(),
          delay,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.span>
    );
  });

  return (
    <section className="w-full flex flex-col items-center overflow-hidden">
      <div className="relative w-full h-24 mb-12">
        <svg
          viewBox="0 0 1440 150"
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 100 Q 240 0, 480 100 T 960 100 T 1440 100"
            fill="transparent"
            stroke="#333"
            strokeWidth="1"
          />
        </svg>

        <motion.div
          className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap text-4xl font-extrabold"
          animate={{ x: ["-100%", "0%"] }}
          transition={{
            repeat: Infinity,
            duration: 100,
            ease: "linear",
          }}
        >
          {[...Array(10)].flatMap((_, i) =>
            animatedWords.map((word, j) => (
              <span key={`${i}-${j}`}>{word}</span>
            ))
          )}
        </motion.div>
      </div>

      <motion.div
        className="mt-28 max-w-7xl w-full flex flex-col md:flex-row items-center justify-between px-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <div className="flex-1 text-left">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            경제 지표가 변화하면 주가도 변화합니다.
          </h2>
          <p className="text-base md:text-lg mb-2 leading-relaxed">
            CPI, 고용지표, 금리 발표… <br className="md:hidden" />
            이런 뉴스가 주가에 어떤 영향을 주는지 알고 계신가요?
          </p>
          <p className="text-lg">
            “시장의 반응을 미리 예측하고, 더 현명한 투자 결정을 내리세요”
          </p>
        </div>

        <div className="flex-1 flex justify-center mt-8 md:mt-0">
          <img
            src={chart}
            alt="지표와 S&P500 그래프"
            className="w-[90%] max-w-[400px] h-auto"
          />
        </div>
      </motion.div>
    </section>
  );
}
