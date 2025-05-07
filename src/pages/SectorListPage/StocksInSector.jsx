import React from "react";

const techStocks = Array.from({ length: 8 }, (_, idx) => ({
  ticker: "TSLA",
  name: "테슬라 (TSLA)",
  price: "292.03 USD",
  chart: "차트이미지",
  change: "+2.15%",
  volume: "755,656",
  marketCap: "9150.67억 USD",
}));

export default function StocksInSector({ sectorName }) {
  if (!sectorName) return null; // 초기에는 아무것도 안 보여줌

  // 기술 섹터만 지원
  if (sectorName !== "기술") {
    return (
      <div className="p-8 bg-white">
        <h1 className="text-2xl font-bold mb-6">{sectorName} 섹터</h1>
        <p className="">❗️아직 이 섹터의 종목 데이터는 준비 중입니다.</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-white">
      <h1 className="text-2xl font-bold mb-6">{sectorName} 섹터</h1>

      <div className="flex justify-end gap-6 font-semibold mb-2">
        <span>Top Movers (등락률 순)</span>
        <span>Top Volume (거래량 순)</span>
        <span>Top Market Cap (시가총액 순)</span>
      </div>

      <table className="w-full text-left border-t border-gray-300">
        <thead>
          <tr className="text-sm text-gray-600">
            <th className="py-3">&nbsp;</th>
            <th className="py-3">종목명</th>
            <th className="py-3">현재가</th>
            <th className="py-3">차트</th>
            <th className="py-3">등락률</th>
            <th className="py-3">거래량</th>
            <th className="py-3">시가총액</th>
          </tr>
        </thead>
        <tbody>
          {techStocks.map((stock, idx) => (
            <tr key={idx} className="border-t border-gray-200 text-sm">
              <td className="py-4">
                <img
                  src={`${import.meta.env.VITE_STOCK_LOGO_URL}${stock.ticker
                    }.png`}
                  className="w-10 h-10 rounded-full mr-2 bg-gray-light"
                />
              </td>
              <td>{stock.name}</td>
              <td>{stock.price}</td>
              <td>{stock.chart}</td>
              <td className="text-green-600">{stock.change}</td>
              <td>{stock.volume}</td>
              <td>{stock.marketCap}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
