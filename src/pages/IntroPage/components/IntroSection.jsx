import { motion } from "framer-motion";
import logo from "../../../assets/logo.png";

export default function IntroSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ amount: 0.5 }}
      className="items-center flex flex-col justify-center bg-gradient-to-t from-red-md to-orange text-white min-h-screen "
    >
      <div className="flex flex-col justify-center max-w-[1200px] w-full">
        {/* <img src={logo} className="w-140"></img> */}
        <h1 className="text-9xl font-semibold mb-8">HotSignal</h1>
        <h2 className="mt-4 text-lg md:text-3xl font-bold">
          지표를 통해 종목의 Hot Signal을 확인하세요
        </h2>
        <p className="mt-5 text-lg">
          세계 경제 캘린더와 종목별 민감도 분석으로
          <br />한 발 앞선 투자 인사이트를 제공합니다
        </p>
      </div>
    </motion.section>
  );
}
