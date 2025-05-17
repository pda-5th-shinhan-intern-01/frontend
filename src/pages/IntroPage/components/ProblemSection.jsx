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
    const yRange = Math.floor(Math.random() * 5) + 10; // 🔽 작게 흔들림
    const rotateRange = Math.floor(Math.random() * 5) + 10; // 🔽 회전도 작게
    const delay = Math.random() * 1.5; // 🔽 빠른 템포

    return (
      <motion.span
        key={i}
        className="inline-block mx-24"
        animate={{
          y: [0, -yRange, 0, yRange, 0],
          rotate: [-rotateRange, 0, rotateRange, 0, -rotateRange],
        }}
        transition={{
          repeat: Infinity,
          duration: 10, // 🔽 부드러운 반복
          delay,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.span>
    );
  });

  return (
    <section className="w-full">
      <motion.div
        className="flex flex-col justify-between items-center text-center max-h-[800px] w-full overflow-x-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        viewport={{ amount: 0.4 }}
      >
        {/* 상단 문구 */}
        <div className="mb-40 mt-80">
          <h2 className="text-5xl md:text-5xl font-semibold">
            경제 지표 발표, 그냥 흘려보내고 계신가요?
          </h2>
          <p className="mt-8 md:text-lg leading-relaxed">
            CPI, 고용지표, 금리 발표… 이런 뉴스가 나올 때마다 놓치고 있지는
            않나요? <br />
            <div className="text-red-md font-semibold text-xl mt-4">
              "경제 지표 이벤트에 대한 시장의 반응을 미리 예측하고, 더 현명한
              투자 결정을 내리세요"
            </div>
          </p>
        </div>

        <div className="relative w-full h-100 overflow-hidden">
          <motion.div
            className="absolute top-[-80px] left-0 w-full h-[150%] z-0"
            animate={{ y: [0, 24, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              viewBox="0 0 1440 250"
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              <path
                d="M 0 120 Q 180 60, 360 120 T 720 120 T 1080 120 T 1440 120 V 250 H 0 Z"
                fill="#DAF4FF"
              />
            </svg>
          </motion.div>

          <motion.div
            className="absolute top-[72%] -translate-y-1/2 whitespace-nowrap text-4xl font-extrabold"
            animate={{ x: ["-100%", "0%"] }}
            transition={{
              repeat: Infinity,
              duration: 300,
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
      </motion.div>
    </section>
  );
}
