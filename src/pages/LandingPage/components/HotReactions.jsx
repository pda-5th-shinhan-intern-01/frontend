import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import LoadingSpinner from "../../../components/LoadingSpinner";
import axios from "axios";

export default function HotReactions() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/sensitivities/top")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Hot Reactions API 실패:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (data.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % data.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [data]);

  const current = data[index];
  const phrase = current?.phrase || current?.indicatorName || "";

  const stocks = useMemo(
    () => (current?.topStocks || []).slice(0, 6),
    [current]
  );

  const handleSelectResult = (ticker) => {
    navigate(`/main/sectors/${ticker}`);
  };

  return (
    <div className="hidden xl:block fixed top-[19%] right-32 shadow-md rounded-3xl bg-white px-6 py-6 w-[30%] z-0">
      <div className="flex justify-between items-center mb-2 px-2">
        <h3 className="font-semibold text-3xl text-black">Hot Reactions</h3>
        <button
          onClick={() => navigate("sectors")}
          className="text-gray-md hover:cursor-pointer text-md"
        >
          더보기 &gt;
        </button>
      </div>

      {isLoading ? (
        <LoadingSpinner height="h-[452px]" />
      ) : (
        <>
          <AnimatePresence mode="wait">
            <motion.p
              key={phrase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="font-semibold text-red-md mt-2 mb-4 text-xl px-2"
            >
              {phrase}
            </motion.p>
          </AnimatePresence>

          <ul className="mt-5 flex flex-col gap-1">
            <AnimatePresence mode="wait">
              {stocks.map((item, idx) => (
                <motion.li
                  key={`${current?.indicatorId}-${item.stockTicker}`}
                  layout
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25, delay: idx * 0.05 }}
                  className="rounded-2xl flex items-center px-2 py-2 hover:bg-orange/10 cursor-pointer"
                  onClick={() => handleSelectResult(item.stockTicker)}
                >
                  <img
                    loading="lazy"
                    src={`${import.meta.env.VITE_STOCK_LOGO_URL}${
                      item.stockTicker
                    }.png`}
                    alt={item.stockTicker}
                    className="w-12 h-12 bg-gray-light rounded-full mr-3"
                  />
                  <div className="flex-1 flex justify-between items-start">
                    <div className="flex flex-col">
                      <span className="font-medium text-black">
                        {item.stockName}
                      </span>
                      <span className="text-sm text-gray-md">
                        {item.stockTicker}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-md">
                        ${item.stockPrice.toFixed(2)}
                      </span>{" "}
                      <span
                        className={`ml-1 ${
                          item.stockChange > 0 ? "text-red-md" : "text-blue-md"
                        }`}
                      >
                        ({item.stockChange > 0 ? "+" : ""}
                        {item.stockChange.toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </>
      )}
    </div>
  );
}
