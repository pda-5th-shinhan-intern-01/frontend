import React, { useEffect } from "react";

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
      <div className="flex gap-15 flex-wrap justify-center bg-[#F5F5F5] p-6 rounded-2xl w-[1200px] shadow-md">
        
        <div className="flex flex-col justify-between bg-white px-6 py-4 rounded-xl  w-[320px] h-[100px] shadow-sm">
          <span className="text-lx font-bold text-[#FE4700]">지표 반응 기간</span>
          <div className="flex gap-3 items-center">
            <input
              type="date"
              value={startDate}
              onChange={(e) => onStartDateChange(e.target.value)}
              className="border-2 border-[#FE4700] px-3 py-1.5 rounded-md text-base w-[120px] focus:outline-[#FE4700]"
              max={endDate}
            />
            <span className="text-base text-gray-600">~</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => onEndDateChange(e.target.value)}
              className="border-2 border-[#FE4700] px-3 py-1.5 rounded-md text-base w-[120px] focus:outline-[#FE4700]"
              min={startDate}
            />
          </div>
        </div>

        
        <div className="flex flex-col justify-between bg-white px-6 py-4 rounded-xl w-[280px] h-[100px] shadow-sm">
          <span className="text-base font-bold text-[#FE4700]">정규화 기준</span>
          <div className="flex gap-x-4 gap-y-2 flex-wrap">
            {["z-score"].map((opt) => (
              <label key={opt} className="flex items-center gap-2 text-base cursor-pointer">
                <span
                  className={`w-4 h-4 rounded-full border-2 transition-all duration-150 ${
                    normalization === opt
                      ? "bg-[#FE4700] border-[#FE4700]"
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

        
        <div className="flex flex-col justify-between bg-white px-6 py-4 rounded-xl w-[280px] h-[100px] shadow-sm">
          <span className="text-base font-bold text-[#FE4700]">수익률 기준</span>
          <div className="flex gap-4">
            {["당일", "±1일", "±3일"].map((opt) => (
              <label key={opt} className="flex items-center gap-2 text-base cursor-pointer">
                <span
                  className={`w-4 h-4 rounded-full border-2 transition-all duration-150 ${
                    returnWindow === opt
                      ? "bg-[#FE4700] border-[#FE4700]"
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
