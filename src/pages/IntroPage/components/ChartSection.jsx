import { motion } from "framer-motion";
import chart from "../../../assets/chart.png";

export default function ChartSection() {
  return (
    <section className="w-full flex flex-col items-center justify-center overflow-hidden bg-green-light min-h-[600px]">
      <motion.div
        className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between px-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        viewport={{ amount: 0.4 }}
      >
        <div className="flex-1 text-left">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            경제 지표가 변화하면{" "}
            <span className="text-green">주가도 변화합니다.</span>
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
