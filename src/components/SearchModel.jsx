import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formatNumberForMoney } from "../utils/formatNumber";

export default function SearchModel({ results, onClose }) {
  const navigate = useNavigate();
  const modalRef = useRef(null);

  const handleSelectResult = (ticker) => {
    navigate(`/main/sectors/${ticker}`);
    onClose();
  };

  // 바깥 클릭 감지
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={modalRef}
      className="bg-white mt-2 p-2 flex flex-col gap-2 rounded-xl shadow-md overflow-auto max-h-90 scrollbar-hide"
    >
      {results.map((item) => (
        <li
          key={item.ticker}
          className="flex items-center gap-3 rounded-xl hover:bg-gray-light p-2 cursor-pointer"
          onClick={() => handleSelectResult(item.ticker)}
        >
          <img
            src={`${import.meta.env.VITE_STOCK_LOGO_URL}${item.ticker}.png`}
            className="w-8 h-8 bg-gray-light rounded-full"
          />
          <div className="flex-1">
            <div className="font-medium text-sm">
              {item.name}
              <span className="ml-1 text-gray-md">{item.ticker}</span>
            </div>
            <div className="flex gap-2 text-sm">
              <div>${formatNumberForMoney(item.price)}</div>
              <div
                className={`${
                  item.change > 0 ? "text-red-md" : "text-blue-md"
                }`}
              >
                ({item.change > 0 ? "+" : ""}
                {item.change.toFixed(2)}%)
              </div>
            </div>
          </div>
        </li>
      ))}
    </div>
  );
}
