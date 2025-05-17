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
      <div className="flex gap-10 flex-wrap justify-center bg-[#F5F5F5] p-8 rounded-2xl w-[1200px] shadow-md">
        {/* 1. 지표 반응 기간 */}
        <div className="flex flex-col justify-between bg-white px-6 py-5 rounded-xl w-[430px] h-[130px] shadow-sm relative">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-[#FE4700]">
              지표 반응 기간
            </span>

            {/* 물음표 아이콘 + 툴팁 */}
            <div className="relative group cursor-pointer">
              <div className="w-5 h-5 bg-[#FE4700] text-white text-sm font-bold rounded-full flex items-center justify-center">
                ?
              </div>
              <div className="absolute bottom-[-120px] left-1/2 -translate-x-1/2 w-[300px] bg-white text-sm text-gray-700 p-3 rounded-xl border border-[#FE4700] shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                선택한 기간 동안 발표된 경제지표만을 기준으로 섹터별 반응
                데이터를 분석합니다.
                <br />
                기간을 좁힐수록 최신 이슈에 집중된 분석이 가능합니다.
              </div>
            </div>
          </div>

          <div className="flex gap-3 items-center mt-2">
            <input
              type="date"
              value={startDate}
              onChange={(e) => onStartDateChange(e.target.value)}
              className="border-2 border-[#FE4700] px-3 py-2 rounded-md text-lg w-[180px] focus:outline-[#FE4700]"
              max={endDate}
            />
            <span className="text-lg text-gray-600">~</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => onEndDateChange(e.target.value)}
              className="border-2 border-[#FE4700] px-3 py-2 rounded-md text-lg w-[180px] focus:outline-[#FE4700]"
              min={startDate}
            />
          </div>
        </div>

        {/* 2. 정규화 기준 */}
        <div className="flex flex-col justify-between bg-white px-6 py-5 rounded-xl w-[280px] h-[130px] shadow-sm relative">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-[#FE4700]">
              정규화 기준
            </span>

            {/* 물음표 아이콘 + 툴팁 */}
            <div className="relative group cursor-pointer">
              <div className="w-5 h-5 bg-[#FE4700] text-white text-sm font-bold rounded-full flex items-center justify-center">
                ?
              </div>
              <div className="absolute bottom-[-110px] left-1/2 -translate-x-1/2 w-[280px] bg-white text-sm text-gray-700 p-3 rounded-xl border border-[#FE4700] shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                각 지표 발표 전후 수익률의 평균과 표준편차를 기준으로
                정규화(z-score)하여
                <br />
                절대 수익률 차이가 아닌 상대적인 반응 강도를 객관적으로 분석할
                수 있도록 했습니다.
              </div>
            </div>
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

        {/* 3. 수익률 기준 */}
        <div className="flex flex-col justify-between bg-white px-6 py-5 rounded-xl w-[280px] h-[130px] shadow-sm relative">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-[#FE4700]">
              수익률 기준
            </span>

            {/* 물음표 아이콘 + 툴팁 */}
            <div className="relative group cursor-pointer">
              <div className="w-5 h-5 bg-[#FE4700] text-white text-sm font-bold rounded-full flex items-center justify-center">
                ?
              </div>
              <div className="absolute bottom-[-120px] left-1/2 -translate-x-1/2 w-[280px] bg-white text-sm text-gray-700 p-3 rounded-xl border border-[#FE4700] shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                각 지표 발표일 전후 몇 일간의 종목 수익률 평균을 기준으로 반응을
                계산합니다.
                <br />
                '당일'은 발표일 기준, '±1일'은 발표일 전후 하루 평균, '±3일'은
                전후 3일 평균을 의미합니다.
              </div>
            </div>
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
