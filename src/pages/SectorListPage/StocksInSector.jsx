import React, { useState, useEffect } from "react";
import { formatNumberForMoney } from "../../utils/formatNumber";
import TechTreemap from "./Treemap";
import { useNavigate } from "react-router-dom";

const dummyStocks = {
  sectorName: "기술",
  sectorENname: "Technology",
  sectorChangeRate: 4.27,
  sectorDescription: "소프트웨어, 하드웨어, 반도체, IT 서비스 등을 포함하는 섹터",
  stocks: [
    {
      name: "마이크로소프트",
      ticker: "MSFT",
      price: 412.56,
      changeRate: +3.57,
      volume: 18000000,
      marketCap: 2800000000000,
    },
    {
      name: "애플",
      ticker: "AAPL",
      price: 191.12,
      changeRate: +1.54,
      volume: 22000000,
      marketCap: 2700000000000,
    },
    {
      name: "엔비디아",
      ticker: "NVDA",
      price: 927.35,
      changeRate: +6.74,
      volume: 30000000,
      marketCap: 1600000000000,
    },
    {
      name: "브로드컴",
      ticker: "AVGO",
      price: 1342.78,
      changeRate: -1.27,
      volume: 6500000,
      marketCap: 500000000000,
    },
    {
      name: "오라클",
      ticker: "ORCL",
      price: 121.49,
      changeRate: +5.21,
      volume: 9000000,
      marketCap: 380000000000,
    },
    {
      name: "IBM",
      ticker: "IBM",
      price: 168.23,
      changeRate: +1.55,
      volume: 7000000,
      marketCap: 120000000000,
    },
    {
      name: "액센츄어 A",
      ticker: "ACN",
      price: 297.84,
      changeRate: -2.12,
      volume: 8000000,
      marketCap: 220000000000,
    },
    {
      name: "시스코",
      ticker: "CSCO",
      price: 48.71,
      changeRate: +4.48,
      volume: 17000000,
      marketCap: 210000000000,
    },
    {
      name: "어도비",
      ticker: "ADBE",
      price: 512.67,
      changeRate: +2.19,
      volume: 6200000,
      marketCap: 270000000000,
    },
    {
      name: "AMD",
      ticker: "AMD",
      price: 152.33,
      changeRate: -3.21,
      volume: 35000000,
      marketCap: 190000000000,
    },
  ],
};

export default function StocksInSector({ sector }) {
  const [sectorData, setSectorData] = useState(dummyStocks); // 초기값 dummyStocks
  const [viewMode, setViewMode] = useState("TREEMAP");
  const navigate = useNavigate();

  async function fetchSectorData(sectorName) {
    try {
      const response = await fetch(`/api/sector?name=${sectorName}`);
      if (!response.ok) throw new Error("API 호출 실패");
      const data = await response.json();
      setSectorData(data);
    } catch (error) {
      console.warn("API 호출 실패, 더미데이터 유지", error);
      // 실패 시 기존 dummyStocks 유지
    }
  }

  useEffect(() => {
    if (sector) {
      fetchSectorData(sector);
    }
  }, [sector]);

  return (
    <div className="mt-40 bg-white">
      <div className="flex w-full justify-between items-end">
        <div className="mb-6">
          <h2 className="text-4xl font-semibold">
            {sectorData.sectorName}{" "}
            <span className="font-semibold text-orange">
              {sectorData.sectorENname || "Technology"}
            </span>
          </h2>
          <p className="text-lg mt-4">{sectorData.sectorDescription}</p>
        </div>

        {/* 토글 버튼 */}
        <div className="flex justify-end items-center mb-6">
          <div className="flex bg-gray-light rounded-full p-1">
            <button
              onClick={() => setViewMode("TREEMAP")}
              className={`px-4 py-1 rounded-full transition-all ${
                viewMode === "TREEMAP" ? "bg-red-md text-white" : "text-black"
              }`}
            >
              TreeMap
            </button>
            <button
              onClick={() => setViewMode("LIST")}
              className={`px-4 py-1 rounded-full transition-all ${
                viewMode === "LIST" ? "bg-red-md text-white" : "text-black"
              }`}
            >
              LIST
            </button>
          </div>
        </div>
      </div>

      {viewMode === "LIST" ? (
        <table className="w-full text-left border-t border-gray-light table-fixed">
          <thead>
            <tr className="text-sm text-gray-md">
              <th className="w-[10%] py-3"></th>
              <th className="w-[25%] py-3">종목명</th>
              <th className="w-[15%] py-3">현재가</th>
              <th className="w-[15%] py-3">등락률</th>
              <th className="w-[20%] py-3">거래량</th>
              <th className="w-[10%] py-3">시가총액</th>
            </tr>
          </thead>
          <tbody>
            {sectorData.stocks.map((stock, idx) => {
              const isPositive = stock.changeRate >= 0;
              return (
                <tr
                  key={idx}
                  className="border-t border-gray-light cursor-pointer hover:bg-gray-light"
                  onClick={() => navigate(`./${stock.ticker}`)}
                >
                  <td className="py-4">
                    <img
                      src={`${import.meta.env.VITE_STOCK_LOGO_URL}${stock.ticker}.png`}
                      className="w-10 h-10 rounded-full mr-2 bg-gray-light ml-4"
                      alt={stock.ticker}
                    />
                  </td>
                  <td className="truncate">{stock.name} <span className="text-gray-md">{stock.ticker}</span></td>
                  <td>{formatNumberForMoney(stock.price)}원</td>
                  <td className={isPositive ? "text-red-md" : "text-blue-md"}>
                    {stock.changeRate.toFixed(2)}%
                  </td>
                  <td className="truncate">{formatNumberForMoney(stock.volume)}주</td>
                  <td className="truncate">
                    {formatNumberForMoney(stock.marketCap / 100000000)}억원
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <TechTreemap sector={sectorData.sectorName} stocks={sectorData.stocks} />
      )}
    </div>
  );
}
