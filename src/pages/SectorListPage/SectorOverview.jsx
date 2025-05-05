import React from "react";

const sectors = [
  {
    name: "기술",
    change: "+6.15%",
    description: "소프트웨어, 하드웨어, 반도체, IT 서비스를 포함하는 섹터",
    stocks: ["AAPL", "GOOGL", "MSFT", "AAPL"],
    more: 5,
  },
  {
    name: "금융",
    change: "+3.40%",
    description: "은행, 보험, 자산관리, 금융 서비스를 포함하는 섹터",
    stocks: ["JPM", "BAC", "WFC", "WFC"],
    more: 5,
  },
  {
    name: "헬스케어",
    change: "+5.55%",
    description: "제약, 바이오테크, 의료기기, 의료서비스를 포함하는 섹터",
    stocks: ["JNJ", "PFE", "MRK", "MRK"],
    more: 8,
  },
  {
    name: "에너지",
    change: "+5.55%",
    description: "석유, 가스, 석탄, 신재생 에너지 등을 포함하는 섹터",
    stocks: ["JNJ", "PFE", "MRK", "MRK"],
    more: 8,
  },
  {
    name: "자유소비재",
    change: "+5.55%",
    description: "자동차, 의류, 미디어, 호텔, 레저 등 선택적 소비재 섹터",
    stocks: ["JNJ", "PFE", "MRK", "MRK"],
    more: 8,
  },
  {
    name: "필수소비재",
    change: "+5.55%",
    description: "식품, 음료, 가정용품, 개인용품 등 필수 소비재 섹터",
    stocks: ["JNJ", "PFE", "MRK", "MRK"],
    more: 8,
  },
  {
    name: "커뮤니티",
    change: "+5.55%",
    description: "통신, 미디어, 엔터테인먼트, 소셜 미디어 등을 포함하는 섹터",
    stocks: ["JNJ", "PFE", "MRK", "MRK"],
    more: 8,
  },
  {
    name: "산업재",
    change: "+5.55%",
    description: "항공우주, 방위산업, 건설, 기계, 운송 등을 포함하는 섹터",
    stocks: ["JNJ", "PFE", "MRK", "MRK"],
    more: 8,
  },
  {
    name: "유틸리티",
    change: "+5.55%",
    description: "전기, 가스, 수도, 재생에너지 등 공공 서비스 섹터",
    stocks: ["JNJ", "PFE", "MRK", "MRK"],
    more: 8,
  },
  {
    name: "부동산",
    change: "+5.55%",
    description:
      "부동산 투자 신탁(REITs), 부동산 개발, 관리 등을 포함하는 섹터",
    stocks: ["JNJ", "PFE", "MRK", "MRK"],
    more: 8,
  },
  {
    name: "소재",
    change: "+5.55%",
    description: "화학, 금속, 광업, 종이, 포장재 등을 포함하는 섹터",
    stocks: ["JNJ", "PFE", "MRK", "MRK"],
    more: 8,
  },
];
export default function SectorOverview({ onSelectSector }) {
  return (
    <div className="bg-gray-light p-5">
      <h1 className="text-2xl font-bold mb-4">시장 섹터 분류</h1>
      <p className="mb-8">
        11개 주요 시장 섹터와 각 섹터에 포함된 대표 종목들을 확인하세요.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sectors.map((sector, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow p-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">
                {sector.name}{" "}
                <span className="text-red-md">{sector.change}</span>
              </h2>
              <button
                className="text-sm text-blue-md hover:cursor-pointer"
                onClick={() => onSelectSector(sector.name)}
              >
                종목 보기
              </button>
            </div>
            <p className="text-sm mb-3">{sector.description}</p>
            <div className="flex flex-wrap gap-2">
              {sector.stocks.map((stock, sIdx) => (
                <span
                  key={sIdx}
                  className="bg-gray-light px-3 py-1 text-sm rounded-full"
                >
                  {stock}
                </span>
              ))}
              <span className="bg-gray-light px-3 py-1 text-sm rounded-full">
                +{sector.more}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
