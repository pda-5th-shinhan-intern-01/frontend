import React from "react";

// 연속 색상 보간 함수 (blue → gray → red)
function getGradientColor(value) {
  const clamp = Math.max(-1, Math.min(1, value));
  const percent = (clamp + 1) / 2;

  const red = [178, 24, 43];
  const gray = [240, 240, 240];
  const blue = [33, 102, 172];

  let r, g, b;
  if (percent < 0.5) {
    const ratio = percent / 0.5;
    r = blue[0] + ratio * (gray[0] - blue[0]);
    g = blue[1] + ratio * (gray[1] - blue[1]);
    b = blue[2] + ratio * (gray[2] - blue[2]);
  } else {
    const ratio = (percent - 0.5) / 0.5;
    r = gray[0] + ratio * (red[0] - gray[0]);
    g = gray[1] + ratio * (red[1] - gray[1]);
    b = gray[2] + ratio * (red[2] - gray[2]);
  }

  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
}

export default function Heatmap() {
  const yLabels = [
    "CPI",
    "PPI",
    "GDP",
    "실업률",
    "비농업부문 고용지수",
    "Core PCE",
    "소매판매",
    "산업생산",
    "ISM 제조업 PMI",
  ];

  const xLabels = [
    "기술",
    "금융",
    "헬스케어",
    "자유소비재",
    "필수소비재",
    "에너지",
    "산업재",
    "소재",
    "부동산",
    "유틸리티",
    "커뮤니케이션",
  ];

  const dummyData = yLabels.map(() =>
    xLabels.map(() => parseFloat((Math.random() * 2 - 1).toFixed(2)))
  );

  return (
    <div className="p-4 bg-gray-light rounded-lg">
      <div className="flex">
        {/* Y축 + 타이틀 */}
        <div className="grid grid-rows-[40px_repeat(9,52px)] w-40 mr-4">
          <div className="text-sm font-semibold text-center p-2 bg-gray-light">
            경제지표 \ 섹터
          </div>
          {yLabels.map((label, idx) => (
            <div
              key={idx}
              className="rounded text-sm text-center flex items-center justify-center border border-gray-md bg-white"
            >
              {label}
            </div>
          ))}
        </div>

        {/* X축 + 데이터 */}
        <div className="flex-1">
          {/* X축 섹터명 */}
          <div className="grid grid-cols-11 gap-1 mb-1 h-[40px]">
            {xLabels.map((sector, idx) => (
              <div
                key={idx}
                className="rounded text-sm font-medium text-center flex items-center justify-center border border-gray-md bg-white"
              >
                {sector}
              </div>
            ))}
          </div>

          {/* 히트맵 셀 */}
          <div className="grid grid-rows-9 gap-1">
            {dummyData.map((row, rowIdx) => (
              <div key={rowIdx} className="grid grid-cols-11 gap-1 h-[48px]">
                {row.map((value, colIdx) => (
                  <div
                    key={colIdx}
                    className="text-sm font-medium text-center flex items-center justify-center rounded"
                    style={{
                      backgroundColor: getGradientColor(value),
                      color: Math.abs(value) > 0.75 ? "white" : "black",
                    }}
                  >
                    {value.toFixed(2)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 연속 색상 범례 */}
      <div className="mt-6">
        <div className="w-full max-w-2xl h-4 bg-gradient-to-r from-blue-700 via-gray-200 to-red-700 rounded mx-auto" />
        <div className="flex justify-between max-w-2xl mx-auto text-xs text-gray-600 mt-1">
          <span>강한 음의 상관관계</span>
          <span>약한 음의 상관관계</span>
          <span>무상관</span>
          <span>약한 양의 상관관계</span>
          <span>강한 양의 상관관계</span>
        </div>
      </div>
    </div>
  );
}