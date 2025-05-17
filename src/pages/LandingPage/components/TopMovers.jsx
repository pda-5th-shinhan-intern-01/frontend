import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { topMoversData } from "../dummies/topMoversData";

const indicatorKeys = Object.keys(topMoversData);

export default function TopMovers() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  // 🔁 지표 변경 로직
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % indicatorKeys.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const currentKey = indicatorKeys[index];
  const { phrase } = topMoversData[currentKey];

  const stocks = useMemo(() => topMoversData[currentKey].stocks, [currentKey]);

  return (
    <div className="hidden xl:block fixed top-1/5 right-32 shadow-md rounded-3xl bg-white px-8 py-8 w-[30%] z-50">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-3xl text-black">Top Movers</h3>
        <button
          onClick={() => navigate("sectors")}
          className="text-gray-md hover:cursor-pointer text-md"
        >
          더보기 &gt;
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={phrase}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="font-semibold text-red-md mt-2 mb-8 text-xl"
        >
          {phrase}
        </motion.p>
      </AnimatePresence>

      <ul className="mt-5 flex flex-col gap-4">
        <AnimatePresence mode="wait">
          {stocks.map((item, idx) => (
            <motion.li
              key={item.ticker}
              layout
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25, delay: idx * 0.05 }}
              className="flex items-center gap-3"
            >
              <img
                loading="lazy"
                src={`${import.meta.env.VITE_STOCK_LOGO_URL}${item.ticker}.png`}
                alt={item.ticker}
                className="w-12 h-12 bg-gray-light rounded-full"
              />
              <div className="flex-1 flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="font-medium text-black">{item.name}</span>
                  <span className="text-sm text-gray-md">{item.ticker}</span>
                </div>
                <div className="text-right text-sm">
                  <span className="text-gray-md">${item.price.toFixed(2)}</span>{" "}
                  <span
                    className={`ml-1 ${
                      item.change.includes("+") ? "text-red-md" : "text-blue-md"
                    }`}
                  >
                    ({item.change})
                  </span>
                </div>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
