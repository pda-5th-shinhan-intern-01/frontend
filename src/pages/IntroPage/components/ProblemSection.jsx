import { motion } from "framer-motion";

export default function ProblemSection() {
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
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ amount: 0.4 }}
      className="flex flex-col justify-center items-center text-center min-h-screen"
    >
      <div className="mb-40">
        <h2 className="text-5xl md:text-4xl font-semibold">
          경제 지표 발표, 그냥 흘려보내고 계신가요?
        </h2>
        <p className="mt-4 md:text-lg leading-relaxed">
          CPI, 고용지표, 금리 발표… 이런 뉴스가 주가에 어떤 영향을 주는지 알고
          계신가요? <br />
          <span>
            "시장의 반응을 미리 예측하고, 더 현명한 투자 결정을 내리세요"
          </span>
        </p>
      </div>

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
    </motion.section>
  );
}
