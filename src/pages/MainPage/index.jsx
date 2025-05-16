import React from "react";
import StockInfo from "./components/StockInfo";
import StockChart from "./components/StockChart";
import IndicatorsForStock from "./components/IndicatorsForStock";
import CurrentIndicators from "./components/CurrentIndicators";
import NxtIndicators from "./components/NxtIndicators";

//종목 별 지표 인사이트 페이지
export default function MainPage() {
  return (
    <div className="flex flex-col gap-12">
      {/* 종목 기본 정보 */}
      <div className="">
        <StockInfo ticker="AAPL" />
      </div>
      {/* 주가 차트 */}
      <div className="">
        <StockChart />
      </div>
      {/* 종목 별 지표 그래프 */}
      <div className="mt-20">
        <IndicatorsForStock />
      </div>
      {/* 지표별 주가 변화 */}
      <div className="mt-20">
        <CurrentIndicators />
      </div>
      {/* 미래 지표 이벤트 */}
      <div className="">
        <NxtIndicators />
      </div>
    </div>
  );
}
