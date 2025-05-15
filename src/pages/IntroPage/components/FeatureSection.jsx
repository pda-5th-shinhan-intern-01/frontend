import { motion } from "framer-motion";

export default function FeatureSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false, amount: 0.5 }}
      className="min-h-screen flex flex-col justify-center items-center px-6"
    >
      <h2 className="text-2xl md:text-4xl font-semibold text-center">
        HotSignal은 경제지표×섹터, 종목 인사이트를 제공합니다
      </h2>
    </motion.section>
  );
}
