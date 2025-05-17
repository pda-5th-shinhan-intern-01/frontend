import React from "react";
import sector_tech from "../../assets/sector_tech.png";
import sector_finance from "../../assets/sector_finance.png";
import sector_healthcare from "../../assets/sector_healthcare.png";
import sector_energy from "../../assets/sector_energy.png";
import sector_consumer_discretionary from "../../assets/sector_consumer_discretionary.png";
import sector_consumer_staples from "../../assets/sector_consumer_staples.png";
import sector_communication from "../../assets/sector_communication.png";
import sector_industrials from "../../assets/sector_industrials.png";
import sector_utilities from "../../assets/sector_utilities.png";
import sector_real_estate from "../../assets/sector_real_estate.png";
import sector_materials from "../../assets/sector_materials.png";

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
    change: "-5.55%",
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



const sectorImages = {
  기술: sector_tech,
  금융: sector_finance,
  헬스케어: sector_healthcare,
  에너지: sector_energy,
  자유소비재: sector_consumer_discretionary,
  필수소비재: sector_consumer_staples,
  커뮤니티: sector_communication,
  산업재: sector_industrials,
  유틸리티: sector_utilities,
  부동산: sector_real_estate,
  소재: sector_materials,
};

export default function SectorOverview({ onSelectSector }) {
  return (
    <div className="p-5">
      <h1 className="text-5xl font-bold mb-3">Sectors</h1>
      <p className="text-xl text-[#00AAF0] font-semibold mb-6">
      11개 핵심 시장 섹터와 그 속을 이끄는 대표 종목들, 시장을 움직이는 주역들을 지금 만나보세요!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {sectors.map((sector, idx) => {
          const colIndex = idx % 4;
          const isOffsetCard = colIndex === 1 || colIndex === 3;
          const rowIndex = Math.floor(idx / 4);

          let bgColor = "#fff";
          if (rowIndex === 0) bgColor = "#FF8341";
          else if (rowIndex === 1) bgColor = "#F6FDEC";
          else if (rowIndex === 2) bgColor = "#FF8341";

          const textColor = rowIndex === 1 ? "#FE4700" : "#F6FDEC";
          const stockBgColor = "#FE4700";
          const moreClolr = "#FE4700";

          const isNegative = sector.change.startsWith("-");
          const changeBgColor = isNegative ? "#DBEAFE" : "#FEE2E2";
          const changeTextColor = isNegative ? "#2563EB" : "#DC2626";

          // 이미지 매핑
          const imageSrc = sectorImages[sector.name] || sector_tech;

          return (
            <div
  key={idx}
  className="rounded-xl shadow px-10 py-6 hover:cursor-pointer mb-3 flex flex-col justify-between"
  onClick={() => onSelectSector(sector.name)}
  style={{
    height: "480px",
    position: "relative",
    top: isOffsetCard ? "60px" : "0",
    backgroundColor: bgColor,
    color: textColor,
  }}
>
  {/* 카드 콘텐츠 전체를 감싸는 wrapper */}
  <div className="flex flex-col h-full justify-between">
    <div>
      <div className="mb-2">
        <h2 className="text-3xl font-semibold mb-2">{sector.name}</h2>
        <div
          style={{
            backgroundColor: changeBgColor,
            color: changeTextColor,
            display: "inline-block",
            padding: "4px 12px",
            borderRadius: "9999px",
            fontWeight: "600",
            fontSize: "1.125rem",
            userSelect: "none",
            minWidth: "60px",
            textAlign: "center",
          }}
        >
          {sector.change}
        </div>
      </div>

      <p className="text-md mb-3 mt-4">{sector.description}</p>
    </div>

    <div className="flex flex-col items-center">
    <img
  src={imageSrc}
  alt={`${sector.name} 이미지`}
  className="mb-5"
  style={{
    width: "180px",
    height: "180px",
    objectFit: "contain",
  }}
/>


      <div className="flex flex-wrap justify-center gap-2">
        {sector.stocks.map((stock, sIdx) => (
          <span
            key={sIdx}
            className="px-3 py-1 text-sm rounded-full"
            style={{ backgroundColor: stockBgColor, color: "#fff" }}
          >
            {stock}
          </span>
        ))}
        <span
          className="px-3 py-1 text-sm rounded-full"
          style={{ backgroundColor: moreClolr, color: "#fff" }}
        >
          +{sector.more}
        </span>
      </div>
    </div>
  </div>
</div>

          );
        })}
      </div>
    </div>
  );
}
