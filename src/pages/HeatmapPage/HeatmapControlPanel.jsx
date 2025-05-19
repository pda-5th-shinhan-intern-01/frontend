import React, { useEffect } from "react";
import Tooltip from "../../components/Tooltip";

export default function HeatmapControlPanel({
  returnWindow,
  onReturnWindowChange,
}) {
  const returnWindowLabel = ["당일", "±1일", "±3일"];

  return (
    <div className="w-full flex justify-end">
      <div className="flex w-full justify-center rounded-2xl">
        {/* 수익률 기준 */}
        <div className="flex flex-row items-end bg-white rounded-xl w-full relative">
          <div className="flex items-center gap-2">
            <span className="text-2xl">
              <Tooltip
                content={
                  "각 지표 발표일 전후 몇 일간의 종목 수익률 평균을 기준으로 반응을 계산합니다. '당일'은 발표일 기준, '±1일'은 발표일 전후 하루 평균, '±3일'은 전후 3일 평균을 의미합니다."
                }
              />
            </span>
            <span className="text-xl font-semibold">수익률 기준</span>
          </div>

          <div className="flex gap-4 mt-2 ml-10">
            {[0, 1, 2].map((opt) => (
              <label
                key={opt}
                className="flex items-center gap-2 text-lg cursor-pointer"
              >
                <span
                  className={`w-4 h-4 rounded-full border-2 transition-all duration-150 ${
                    returnWindow === opt
                      ? "bg-red-md border-red-md"
                      : "border-gray-300 bg-white"
                  }`}
                ></span>
                <span>{returnWindowLabel[opt]}</span>
                <input
                  type="radio"
                  name="returnWindow"
                  value={opt}
                  checked={returnWindow === opt}
                  onChange={() => onReturnWindowChange(opt)}
                  className="hidden"
                />
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
