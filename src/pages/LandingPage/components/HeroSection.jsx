import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroImage from "../../../assets/hero-image.png"; // 이미지 경로
const phrases = [
  "반응하는 이유를 보여주는",
  "눈치 빠른 투자 감각",
  "예민하게 감지하는 시그널",
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-w-screen scrollbar-hide left-1/2 right-1/2 -translate-x-1/2 bg-gradient-to-b from-orange to-red-md pt-16 py-42 overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center px-6 md:px-20">
        <div className="text-white max-w-2xl text-center md:text-left z-10">
          <AnimatePresence mode="wait">
            <motion.h1
              key={phrases[index]}
              className="text-3xl md:text-6xl font-semibold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {phrases[index]}
            </motion.h1>
          </AnimatePresence>

          <div className="mt-6.5 text-xl md:text-3xl font-bold">핫 시그널</div>
        </div>

        <div className="hidden md:block w-[300px] h-[200px]" />

        {/* 오른쪽 하단 이미지 (Top Movers 왼쪽으로 보이게 배치) */}
        <img
          src={heroImage}
          alt="Hero Visual"
          className="absolute right-6 bottom-6 md:right-[43%] w-40 md:w-25 lg:w-58 object-contain pointer-events-none"
        />
      </div>
    </section>
  );
}
