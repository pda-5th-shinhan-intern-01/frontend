import React, { useEffect, useState } from "react";
import { formatNumberForMoney } from "../../../utils/formatNumber";
import { stockApi } from "../../../api/stockApi";

export default function StockInfo({ ticker }) {
  const [stock, setStock] = useState({
    name: "애플",
    ticker: "AAPL",
    currentPrice: 303063,
    changeRate: 0.4,
    marketCap: 10101,
    volume: 10101,
    sector: {
      name: "기술",
      changeRate: 0.12,
    },
  });

  const getStockInfo = async () => {
    try {
      const response = await stockApi.getStockInfo(ticker);
      setStock(response.data[0]);
    } catch (error) {
      console.error("종목 기본 정보 조회 실패", error);
    }
  };

  useEffect(() => {
    getStockInfo();
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
            ${formatNumberForMoney(stock.currentPrice)}
          </p>
          {/* <p className="text-gray-md text-2xl">
            ${formatNumberForMoney(stock.price_us)}
          </p> */}
          <div
            className={`flex gap-1 items-center text-2xl ${
              stock.changeRate > 0
                ? "text-red-md"
                : stock.changeRate < 0
                ? "text-blue-md"
                : ""
            }`}
          >
            {/* <p>{formatNumberForMoney(stock.change_amt)}원</p> */}
            <p>({stock.changeRate}%)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
