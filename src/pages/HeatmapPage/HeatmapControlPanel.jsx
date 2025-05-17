import React, { useEffect } from "react";
import Tooltip from "../../components/Tooltip";

export default function HeatmapControlPanel({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  normalization,
  onNormalizationChange,
  returnWindow,
  onReturnWindowChange,
}) {
  useEffect(() => {
    if (new Date(startDate) > new Date(endDate)) {
      onEndDateChange(startDate);
    }
  }, [startDate, endDate, onEndDateChange]);

  return (
    <div className="w-full flex justify-center">
      <div className="flex gap-10 justify-center bg-gray-light p-8 rounded-2xl w-full shadow-md">
        {/* 1. 지표 반응 기간 */}
        <div className="flex flex-col justify-between bg-white px-6 py-5 rounded-xl w-full h-[130px] relative">
          <div className="flex items-center gap-2 text-xl font-semibold">
            지표 반응 기간
            <span className="text-2xl">
              <Tooltip
                content={
                  "선택한 기간 동안 발표된 경제지표만을 기준으로 섹터별 반응 데이터를 분석합니다. 기간을 좁힐수록 최신 이슈에 집중된 분석이 가능합니다."
                }
              />
            </span>
          </div>

          <div className="flex gap-3 items-center mt-2">
            <input
              type="date"
              value={startDate}
              onChange={(e) => onStartDateChange(e.target.value)}
              className="border-2 border-red-md px-3 py-2 rounded-md text-lg w-[180px] focus:outline-red-md"
              max={endDate}
            />
            <span className="text-lg text-gray-600">~</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => onEndDateChange(e.target.value)}
              className="border-2 border-red-md px-3 py-2 rounded-md text-lg w-[180px] focus:outline-red-md"
              min={startDate}
            />
          </div>
        </div>

        {/* 2. 정규화 기준 */}
        <div className="w-full flex flex-col justify-between bg-white px-6 py-5 rounded-xl h-[130px] shadow-sm relative">
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold">정규화 기준</span>
            <span className="text-2xl">
              <Tooltip
                content={
                  " 각 지표 발표 전후 수익률의 평균과 표준편차를 기준으로 정규화(z-score)하여 절대 수익률 차이가 아닌 상대적인 반응 강도를 객관적으로 분석할 수 있도록 했습니다."
                }
              />
            </span>
          </div>

          <div className="flex gap-x-4 gap-y-2 flex-wrap mt-2">
            {["z-score"].map((opt) => (
              <label
                key={opt}
                className="flex items-center gap-2 text-lg cursor-pointer"
              >
                <span
                  className={`w-4 h-4 rounded-full border-2 transition-all duration-150 ${
                    normalization === opt
                      ? "bg-red-md border-red-md"
                      : "border-gray-300 bg-white"
                  }`}
                ></span>
                <span>{opt}</span>
                <input
                  type="radio"
                  name="normalization"
                  value={opt}
                  checked={normalization === opt}
                  onChange={() => onNormalizationChange(opt)}
                  className="hidden"
                />
              </label>
            ))}
          </div>
        </div>

        {/* 3. 수익률 기준 */}
        <div className="flex flex-col justify-between bg-white px-6 py-5 rounded-xl w-full h-[130px] shadow-sm relative">
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold">수익률 기준</span>
            <span className="text-2xl">
              <Tooltip
                content={
                  "각 지표 발표일 전후 몇 일간의 종목 수익률 평균을 기준으로 반응을 계산합니다. '당일'은 발표일 기준, '±1일'은 발표일 전후 하루 평균, '±3일'은 전후 3일 평균을 의미합니다."
                }
              />
            </span>
          </div>

          <div className="flex gap-4 mt-2">
            {["당일", "±1일", "±3일"].map((opt) => (
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
                <span>{opt}</span>
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
