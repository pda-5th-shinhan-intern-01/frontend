import { motion } from "framer-motion";

export default function FeatureSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false, amount: 0.5 }}
      className="min-h-[500px] flex flex-col justify-center items-center px-6 w-full max-w-[1200px]"
    >
      <h2 className="text-2xl md:text-5xl font-semibold text-center">
        HotSignal에서 확인하는{" "}
        <span className="highlight-underline">
          경제지표<span className="text-orange">×</span>섹터, 종목
        </span>{" "}
        인사이트
      </h2>
    </motion.section>
  );
}
