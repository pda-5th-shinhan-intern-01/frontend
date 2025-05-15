import { motion } from "framer-motion";

export default function ProblemSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ amount: 0.4 }}
      className="min-h-screen flex flex-col justify-center items-center text-center px-6 gap-1"
    >
      <h2 className="text-2xl md:text-4xl font-semibold">
        경제 지표 발표, 그냥 흘려보내고 계신가요?
      </h2>
      <p className="mt-4 md:text-lg leading-relaxed">
        CPI, 고용지표, 금리 발표… 이런 뉴스가 주가에 어떤 영향을 주는지 알고
        계신가요? <br />
        <span>
          "시장의 반응을 미리 예측하고, 더 현명한 투자 결정을 내리세요"
        </span>
      </p>
    </motion.section>
  );
}
