import React, { useEffect, useState } from "react";
import { formatNumberForMoney } from "../../../utils/formatNumber";

export default function StockInfo({ ticker }) {
  const [stock, setStock] = useState({
    name: "애플",
    price_kr: 303063,
    price_us: 21068.12345,
    change_amt: 1496,
    change_rate: 0.4,
  });

  const getStockInfo = () => {
    //주식 기본 정보 조회 API 요청
  };

  useEffect(() => {
    // getStockInfo();
  }, [ticker]);
  return (
    <div className="flex w-full items-center gap-2">
      <img
        src={`${import.meta.env.VITE_STOCK_LOGO_URL}${ticker}.png`}
        className="w-20 h-20 rounded-full mr-2 bg-gray-light"
      />
      <div>
        <div className="text-xl font-semibold flex gap-2">
          <p className="">{stock.name}</p>
          <p className="text-gray-md">{ticker}</p>
        </div>
        <div className="flex gap-2 items-end">
          <p className="text-3xl font-semibold">
            {formatNumberForMoney(stock.price_kr)}원
          </p>
          <p className="text-gray-md text-2xl">
            ${formatNumberForMoney(stock.price_us)}
          </p>
          <div
            className={`flex gap-1 items-center text-2xl ${
              stock.change_amt > 0
                ? "text-red-md"
                : stock.change_amt < 0
                ? "text-blue-md"
                : ""
            }`}
          >
            <p>{formatNumberForMoney(stock.change_amt)}원</p>
            <p>({stock.change_rate}%)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
