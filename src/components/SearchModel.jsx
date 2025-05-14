import React from "react";
import { useNavigate } from "react-router-dom";

export default function SearchModel({ results, onClose }) {
  const navigate = useNavigate();

  const handleSelectResult = (ticker) => {
    navigate(`/main/sectors/${ticker}`);
    onClose();
  };

  return (
    <div className="bg-white border mt-2 p-2 flex flex-col gap-2 rounded-md">
      {results.map((item) => (
        <li
          key={item.ticker}
          className="flex items-center gap-3 hover:bg-gray-light p-2 cursor-pointer"
          onClick={() => {
            handleSelectResult(item.ticker);
          }}
        >
          <img
            src={`${import.meta.env.VITE_STOCK_LOGO_URL}${item.ticker}.png`}
            className="w-8 h-8 bg-[color:var(--color-gray-light)] rounded-full"
          />
          <div className="flex-1">
            <div className="font-medium text-[color:var(--color-black)]">
              {item.name}
            </div>
            <div className="text-[color:var(--color-gray-md)]">
              ${item.price.toFixed(2)} ({item.change})
            </div>
          </div>
        </li>
      ))}
    </div>
  );
}
