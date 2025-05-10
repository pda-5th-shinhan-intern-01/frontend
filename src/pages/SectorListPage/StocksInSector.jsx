import React, { useState } from "react";
import TechTreemap from "./Treemap";

const techStocks = Array.from({ length: 8 }, (_, idx) => ({
  ticker: "TSLA",
  name: "테슬라 (TSLA)",
  price: "292.03 USD",
  change: "+2.15%",
  volume: "755,656",
  marketCap: "9150.67억 USD",
}));

export default function StocksInSector({ sectorName }) {
  const [viewMode, setViewMode] = useState("LIST");

  if (!sectorName) return null;

  if (sectorName !== "기술") {
    return (
      <div className="p-8 bg-white">
        <h1 className="text-2xl font-bold mb-6">{sectorName}</h1>
        <p>❗️아직 이 섹터의 종목 데이터는 준비 중입니다.</p>
      </div>
    );
  }

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
            className={`px-4 py-1 rounded-full transition-all ${viewMode === "LIST"
              ? "bg-white text-black shadow"
              : "text-black"
              }`}
          >
            LIST
          </button>
          <button
            onClick={() => setViewMode("TREEMAP")}
            className={`px-4 py-1 rounded-full transition-all ${viewMode === "TREEMAP"
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
            {techStocks.map((stock, idx) => (
              <tr key={idx} className="border-t border-gray-200 text-sm">
                <td className="py-4">
                  <img
                    src={`${import.meta.env.VITE_STOCK_LOGO_URL}${stock.ticker}.png`}
                    className="w-10 h-10 rounded-full mr-2 bg-gray-light"
                    alt={stock.ticker}
                  />
                </td>
                <td className="truncate">{stock.name}</td>
                <td>{stock.price}</td>
                <td className="text-green-600">{stock.change}</td>
                <td className="truncate">{stock.volume}</td>
                <td className="truncate">{stock.marketCap}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <TechTreemap />
      )}
    </div>
  );
}
