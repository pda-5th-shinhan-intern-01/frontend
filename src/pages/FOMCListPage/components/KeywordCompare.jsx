import React, { useState, useMemo } from "react";
import { formatFomcTitle } from "./titleFormatter";

export default function KeywordCompare({ checkedItems }) {
  const [selectedSubOptions, setSelectedSubOptions] = useState([0, 1, 2]);
  const [activeKeyword, setActiveKeyword] = useState(null);

  const colorPalette = [
    // 🧡 오렌지 계열
    "#FFE0C7", // 밝은 살구
    "#FFCBA4", // 크림 오렌지

    // 💛 노랑 계열
    "#FFF5BA", // 연한 레몬 크림
    "#FDFD96", // 파스텔 옐로우

    // 💙 하늘색 계열
    "#CFEFFF", // 아주 연한 하늘색
    "#A7D8FF", // 스카이블루

    // 🔵 파랑 계열
    "#B0C4DE", // 라이트 스틸 블루
    "#9BB1F9", // 연한 인디고 블루
  ];

  // 이것도 일단 apexchart랑 똑같이 주석 색 만들었는데.. 넘 정신없어서 어케할지.. 추천받아요
  const legendItems = [
    { label: "경제 여건 평가", color: "#ff8341", id: 0 },
    { label: "통화 정책 결정", color: "#ff8341", id: 1 },
    { label: "향후 정책 전망", color: "#ff8341", id: 2 },
  ];

  const handleSubOptionToggle = (id) => {
    setSelectedSubOptions((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // parsedItems 생성
  const parsedItems = useMemo(() => {
    return checkedItems.map((item) => ({
      ...item,
      parsed: JSON.parse(item.summary),
    }));
  }, [checkedItems]);

  // 키워드 색상 관리
  const { keywordColorMap, keywordCountMap } = useMemo(() => {
    const map = {};
    const count = {};
    let colorIndex = 0;

    parsedItems.forEach(({ parsed }) => {
      [0, 1, 2].forEach((optionId) => {
        const keywords =
          optionId === 0
            ? parsed?.economic_conditions?.keywords || []
            : optionId === 1
            ? parsed?.policy_decision?.keywords || []
            : parsed?.future_guidance?.keywords || [];

        keywords.forEach((kw) => {
          count[kw] = (count[kw] || 0) + 1;
        });
      });
    });

    Object.keys(count).forEach((kw) => {
      if (count[kw] > 1) {
        map[kw] = colorPalette[colorIndex % colorPalette.length];
        colorIndex++;
      }
    });

    return { keywordColorMap: map, keywordCountMap: count };
  }, [parsedItems]);

  // 키워드 필터링 함수
  const getKeywordsByOption = (parsedSummary, id) => {
    switch (id) {
      case 0:
        return parsedSummary?.economic_conditions?.keywords || [];
      case 1:
        return parsedSummary?.policy_decision?.keywords || [];
      case 2:
        return parsedSummary?.future_guidance?.keywords || [];
      default:
        return [];
    }
  };

  return (
    <div className="flex flex-col items-center h-full">
      {/* 키워드 영역 (스크롤) */}
      <div className="flex-1 items-center overflow-y-auto w-full flex flex-row justify-evenly gap-6 px-4">
        {parsedItems.map((item, id) => {
          const combinedKeywords = selectedSubOptions
            .map((optionId) => getKeywordsByOption(item.parsed, optionId))
            .flat();

          return (
            <div
              key={id}
              className="flex flex-col items-center w-full max-w-[45%]"
            >
              <div className="font-semibold text-lg mb-2 text-center">
                {formatFomcTitle(item.date)}
              </div>
              <div className="text-sm text-gray-md">{item.title}</div>

              <div className="p-4 flex flex-wrap gap-2 overflow-y-auto max-h-52 justify-center">
                {combinedKeywords.map((keyword, idx) => {
                  const isShared = keywordCountMap[keyword] > 1;
                  const bgColor = isShared ? keywordColorMap[keyword] : "#fff";
                  const isActive = activeKeyword === keyword;

                  return (
                    <span
                      key={idx}
                      className={`rounded-full px-3 py-1 text-sm text-black cursor-pointer  ${
                        isActive ? "bg-gray-light " : "bg-white"
                      }`}
                      style={{ backgroundColor: bgColor }}
                      onClick={() =>
                        setActiveKeyword((prev) =>
                          prev === keyword ? null : keyword
                        )
                      }
                    >
                      {keyword}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* 하단 고정 옵션 버튼 */}
      <div className="w-full py-4 px-6 flex flex-row gap-4 flex-wrap justify-center border-t border-gray-200 bg-white">
        {legendItems.map(({ label, color, id }) => {
          const isActive = selectedSubOptions.includes(id);
          return (
            <div
              key={id}
              onClick={() => handleSubOptionToggle(id)}
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: isActive ? color : "#e5e7eb",
                }}
              />
              <span
                className={`text-sm ${
                  isActive ? "text-black font-medium" : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
