import React, { useState, useEffect } from "react";
import { formatNumberForMoney } from "../../utils/formatNumber";
import Treemap from "./Treemap";
import { useNavigate } from "react-router-dom";
import { sectorApi } from "../../api/sectorApi";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function StocksInSector({ sector }) {
  const [sectorData, setSectorData] = useState(null);
  const [viewMode, setViewMode] = useState("TREEMAP");
  const navigate = useNavigate();

  useEffect(() => {
    setSectorData(null); // sector 바뀔 때 초기화
    sectorApi.getStocksBySector(sector).then((res) => {
      setSectorData(res.data);
    });
  }, [sector]);

  // ✅ 로딩 중엔 전체 레이아웃 대신 Spinner만 표시
  if (!sectorData) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="mt-20 bg-white">
      <div className="flex w-full justify-between items-end">
        <div className="mb-6">
          <h2 className="text-4xl font-semibold">
            {sectorData.sectorName}{" "}
            <span className="font-semibold text-orange">
              {sectorData.sectorENname}
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
                viewMode === "TREEMAP" ? "bg-orange text-white" : "text-black"
              }`}
            >
              TreeMap
            </button>
            <button
              onClick={() => setViewMode("LIST")}
              className={`px-4 py-1 rounded-full transition-all ${
                viewMode === "LIST" ? "bg-orange text-white" : "text-black"
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
                      src={`${import.meta.env.VITE_STOCK_LOGO_URL}${
                        stock.ticker
                      }.png`}
                      className="w-10 h-10 rounded-full mr-2 bg-gray-light ml-4"
                      alt={stock.ticker}
                    />
                  </td>
                  <td className="truncate">
                    {stock.name}{" "}
                    <span className="text-gray-md">{stock.ticker}</span>
                  </td>
                  <td>{formatNumberForMoney(stock.price)}원</td>
                  <td className={isPositive ? "text-red-md" : "text-blue-md"}>
                    {stock.changeRate.toFixed(2)}%
                  </td>
                  <td className="truncate">
                    {formatNumberForMoney(stock.volume)}주
                  </td>
                  <td className="truncate">
                    {formatNumberForMoney(stock.marketCap / 100000000)}억원
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <Treemap sectorData={sectorData} />
      )}
    </div>
  );
}
