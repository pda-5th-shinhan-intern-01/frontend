import React, { useEffect } from "react";

export default function HeatmapControlPanel({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  threshold,
  onThresholdChange,
  normalization,
  onNormalizationChange,
  returnWindow,
  onReturnWindowChange,
}) {
  // 날짜 유효성 검사
  useEffect(() => {
    if (new Date(startDate) > new Date(endDate)) {
      onEndDateChange(startDate);
    }
  }, [startDate, endDate, onEndDateChange]);

  return (
    <div className="flex gap-4 bg-gray-light p-4 rounded-lg flex-wrap">
      {/* 1. 기간 선택 */}
      <div className="flex flex-col justify-between bg-white px-4 py-3 rounded shadow-sm w-[300px] h-[80px]">
        <span className="text-sm font-medium">지표 반응 기간</span>
        <div className="flex gap-2 items-center">
          <input
            type="date"
            value={startDate}
            onChange={(e) => onStartDateChange(e.target.value)}
            className="border px-2 py-1 rounded text-sm w-[120px]"
            max={endDate}
          />
          <span className="">~</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => onEndDateChange(e.target.value)}
            className="border px-2 py-1 rounded text-sm w-[120px]"
            min={startDate}
          />
        </div>
      </div>

      {/* 2. 상관계수 임계값 */}
      <div className="flex flex-col justify-between bg-white px-4 py-3 rounded shadow-sm w-[270px] h-[80px]">
        <span className="text-sm  font-medium">
          상관계수 임계값: {threshold.toFixed(2)}
        </span>
        <div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={threshold}
            onChange={(e) => onThresholdChange(parseFloat(e.target.value))}
            className="w-full"
          />
          <span className="text-xs text-gray-md mt-1 block">
            피어슨 (Pearson) 기준
          </span>
        </div>
      </div>

      {/* 3. 정규화 기준 */}
      <div className="flex flex-col justify-between bg-white px-4 py-3 rounded shadow-sm w-[270px] h-[80px]">
        <span className="text-sm text-gray-md font-medium">정규화 기준</span>
        <div className="flex gap-x-3 gap-y-1 flex-wrap">
          {["z-score", "%Change", "Min-Max", "백분위(percentile)"].map(
            (opt) => (
              <label
                key={opt}
                className="flex items-center gap-1 text-sm cursor-pointer"
              >
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    normalization === opt ? "bg-black" : "bg-gray-light"
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
            )
          )}
        </div>
      </div>

      {/* 4. 수익률 기준 */}
      <div className="flex flex-col justify-between bg-white px-4 py-3 rounded shadow-sm w-[200px] h-[80px]">
        <span className="text-sm font-medium">수익률 기준</span>
        <div className="flex gap-3">
          {["당일", "±1일", "±3일"].map((opt) => (
            <label
              key={opt}
              className="flex items-center gap-1 text-sm cursor-pointer"
            >
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  returnWindow === opt ? "bg-black" : "bg-gray-light"
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
  );
}
