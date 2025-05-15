import { motion } from "framer-motion";
import logo from "../../../assets/logo.png";

export default function IntroSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ amount: 0.5 }}
      className="bg-black text-white min-h-screen flex flex-col justify-center items-center text-center px-4"
    >
      <img src={logo} className="w-140"></img>
      <h2 className="mt-4 text-lg md:text-3xl font-bold">
        지표를 통해 종목의 Hot Signal을 확인하세요!
      </h2>
      <p className="mt-5 text-lg">
        세계 경제 캘린더와 종목별 민감도 분석으로
        <br />한 발 앞선 투자 인사이트를 제공합니다
      </p>
    </motion.section>
  );
}
