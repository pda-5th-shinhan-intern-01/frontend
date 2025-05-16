import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function CTASection() {
  const navigate = useNavigate();
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ amount: 0.5 }}
      className="w-full items-center flex flex-col justify-center bg-gradient-to-t from-red-md to-orange text-white min-h-screen "
    >
      <div className="bg-gradient-to-t from-red-md to-orange text-white min-h-screen px-6 text-center flex flex-col justify-center items-center">
        <h2 className="text-2xl md:text-6xl font-bold my-12">
          HotSignal에서 경제지표의 신호를 확인해보세요
        </h2>

        <button
          className="hover:shadow-lg mt-5 cursor-pointer text-xl bg-white rounded-full text-red-md font-bold px-6 py-4 hover:bg-white transition"
          onClick={() => {
            navigate("/main");
          }}
        >
          지금 시작하기
        </button>
      </div>
    </motion.section>
  );
}
