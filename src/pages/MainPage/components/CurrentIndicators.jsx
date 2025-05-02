import React from "react";
import { FaArrowRight } from "react-icons/fa";
import StockMiniChart from "../../../components/stockMiniChart";
export default function CurrentIndicators() {
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-2 items-end">
          <h3 className="text-lg font-semibold">지표별 주가 변화</h3>
          <p className="text-sm">
            최근 경제지표 발표에서 주가가 얼마나 변동되었는지 확인하세요
          </p>
        </div>
        <div className="flex gap-2 items-end">
          <div className="flex items-center text-xs bg-gray-light py-1 px-4 rounded-lg">
            민감도순
          </div>
          <div className="flex items-center text-xs bg-gray-light py-1 px-4 rounded-lg">
            최신순
          </div>
        </div>
      </div>
      {/* 카드 목록 */}
      <div>
        <div className="flex flex-col gap-2 bg-gray-light w-[350px]">
          <div className="flex justify-between">
            <h4>CPI</h4>
            <p>2023년 10월 10일</p>
          </div>
          <div>
            <p className="flex items-center">
              이전치 <FaArrowRight className="text-xs" /> 발표치
            </p>
            <h2 className="flex items-end text-xl  font-semibold">
              <span className="flex items-center text-sm">
                +2.5% <FaArrowRight className="text-xs" />
              </span>
              +3.0%(+2.5%)
            </h2>
          </div>

          <div>
            <StockMiniChart indicator={"AAPL"} />
          </div>
        </div>
      </div>
    </div>
  );
}
