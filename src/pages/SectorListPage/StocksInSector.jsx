import React, { useState, useEffect } from "react";
import { formatNumberForMoney } from "../../utils/formatNumber";
import TechTreemap from "./Treemap";
import { useNavigate } from "react-router-dom";

const dummyStocks = [
  {
    name: "마이크로소프트",
    ticker: "MSFT",
    price: 412.56,
    change: 3.57,
    volume: 18000000,
    marketCap: 280,
  },
  {
    name: "애플",
    ticker: "AAPL",
    price: 191.12,
    change: 1.54,
    volume: 22000000,
    marketCap: 270,
  },
  {
    name: "엔비디아",
    ticker: "NVDA",
    price: 927.35,
    change: 6.74,
    volume: 30000000,
    marketCap: 160,
  },
  {
    name: "브로드컴",
    ticker: "AVGO",
    price: 1342.78,
    change: -1.27,
    volume: 6500000,
    marketCap: 50,
  },
  {
    name: "오라클",
    ticker: "ORCL",
    price: 121.49,
    change: 5.21,
    volume: 9000000,
    marketCap: 38,
  },
  {
    name: "IBM",
    ticker: "IBM",
    price: 168.23,
    change: 1.55,
    volume: 7000000,
    marketCap: 12,
  },
  {
    name: "액센츄어 A",
    ticker: "ACN",
    price: 297.84,
    change: -2.12,
    volume: 8000000,
    marketCap: 22,
  },
  {
    name: "시스코",
    ticker: "CSCO",
    price: 48.71,
    change: 4.48,
    volume: 17000000,
    marketCap: 21,
  },
  {
    name: "어도비",
    ticker: "ADBE",
    price: 512.67,
    change: 2.19,
    volume: 6200000,
    marketCap: 27,
  },
  {
    name: "AMD",
    ticker: "AMD",
    price: 152.33,
    change: -3.21,
    volume: 35000000,
    marketCap: 19,
  },
];

export default function StocksInSector({ sector }) {
  const [viewMode, setViewMode] = useState("LIST");
  const [stocks, setStocks] = useState(dummyStocks);
  const naviagte = useNavigate();

  const getStocks = () => {
    //종목 리스트 요청 api 호출
  };

  useEffect(() => {
    getStocks();
  }, [sector]);

  return (
    <div className="p-8 bg-white">
      {/* ✅ 상단 섹터 타이틀 */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          기술 <span className="font-normal text-gray-500">Technology</span>
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          소프트웨어, 하드웨어, 반도체, IT 서비스 등을 포함하는 섹터
        </p>
      </div>

      {/* ✅ 토글 버튼 */}
      <div className="flex justify-end items-center mb-6">
        <div className="flex bg-gray-300 rounded-full p-1">
          <button
            onClick={() => setViewMode("LIST")}
            className={`px-4 py-1 rounded-full transition-all ${
              viewMode === "LIST" ? "bg-white text-black shadow" : "text-black"
            }`}
          >
            LIST
          </button>
          <button
            onClick={() => setViewMode("TREEMAP")}
            className={`px-4 py-1 rounded-full transition-all ${
              viewMode === "TREEMAP"
                ? "bg-white text-black shadow"
                : "text-black"
            }`}
          >
            TreeMap
          </button>
        </div>
      </div>

      {/* ✅ 컨텐츠 영역 */}
      {viewMode === "LIST" ? (
        <table className="w-full text-left border-t border-gray-300 table-fixed">
          <thead>
            <tr className="text-sm text-gray-600">
              <th className="w-[10%] py-3"></th>
              <th className="w-[25%] py-3">종목명</th>
              <th className="w-[15%] py-3">현재가</th>
              <th className="w-[15%] py-3">등락률</th>
              <th className="w-[20%] py-3">거래량</th>
              <th className="w-[10%] py-3">시가총액</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock, idx) => (
              <tr
                key={idx}
                className="border-t border-gray-200 text-sm"
                onClick={() => {
                  naviagte(`./${stock.ticker}`);
                }}
              >
                <td className="py-4">
                  <img
                    src={`${import.meta.env.VITE_STOCK_LOGO_URL}${
                      stock.ticker
                    }.png`}
                    className="w-10 h-10 rounded-full mr-2 bg-gray-light"
                    alt={stock.ticker}
                  />
                </td>
                <td className="truncate">{stock.name}</td>
                <td>{formatNumberForMoney(stock.price)}원</td>
                <td className="text-green-600">
                  {formatNumberForMoney(stock.change)}%
                </td>
                <td className="truncate">
                  {formatNumberForMoney(stock.volume)}
                </td>
                <td className="truncate">
                  {formatNumberForMoney(stock.marketCap)}억원
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <TechTreemap stocks={stocks} />
      )}
    </div>
  );
}
