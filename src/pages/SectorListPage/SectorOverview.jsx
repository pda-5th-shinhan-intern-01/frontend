import React, { useEffect, useState } from "react";
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
import { sectorApi } from "../../api/sectorApi";

const sectors = [
  {
    sectorName: "기술",
    description: "소프트웨어, 하드웨어, 반도체, IT 서비스를 포함하는 섹터",
    stocks: ["AAPL", "MSFT", "NVDA", "ORCL"],
  },
  {
    sectorName: "금융",
    description: "은행, 보험, 자산관리, 금융 서비스를 포함하는 섹터",
    stocks: ["JPM", "BAC", "WFC", "BRK.B"],
  },
  {
    sectorName: "헬스케어",
    description: "제약, 바이오테크, 의료기기, 의료서비스를 포함하는 섹터",
    stocks: ["LLY", "JNJ", "UNH", "ABBV"],
  },
  {
    sectorName: "에너지",
    description: "석유, 가스, 석탄, 신재생 에너지 등을 포함하는 섹터",
    stocks: ["XOM", "CVX", "COP", "WMB"],
  },
  {
    sectorName: "자유소비재",
    description: "자동차, 의류, 미디어, 호텔, 레저 등 선택적 소비재 섹터",
    stocks: ["AMZN", "TSLA", "HD", "MCD"],
  },
  {
    sectorName: "필수소비재",
    description: "식품, 음료, 가정용품, 개인용품 등 필수 소비재 섹터",
    stocks: ["WMT", "COST", "KO", "PEP"],
  },
  {
    sectorName: "커뮤니티",
    description: "통신, 미디어, 엔터테인먼트, 소셜 미디어 등을 포함하는 섹터",
    stocks: ["META", "GOOG", "NFLX", "TMUS"],
  },
  {
    sectorName: "산업재",
    description: "항공우주, 방위산업, 건설, 기계, 운송 등을 포함하는 섹터",
    stocks: ["GE", "UBER", "RTX", "DE"],
  },
  {
    sectorName: "유틸리티",
    description: "전기, 가스, 수도, 재생에너지 등 공공 서비스 섹터",
    stocks: ["NEE", "SO", "DUK", "CEG"],
  },
  {
    sectorName: "부동산",
    description:
      "부동산 투자 신탁(REITs), 부동산 개발, 관리 등을 포함하는 섹터",
    stocks: ["AMT", "PLD", "WELL", "EQIX"],
  },
  {
    sectorName: "소재",
    description: "화학, 금속, 광업, 종이, 포장재 등을 포함하는 섹터",
    stocks: ["LIN", "SHW", "ECL", "NEM"],
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

const dummySectorChangeRates = [
  { sectorName: "기술", sectorChangeRate: 4.27 },
  { sectorName: "금융", sectorChangeRate: -0.15 },
  { sectorName: "헬스케어", sectorChangeRate: -0.15 },
  { sectorName: "에너지", sectorChangeRate: -0.15 },
  { sectorName: "자유소비재", sectorChangeRate: -0.15 },
  { sectorName: "필수소비재", sectorChangeRate: -0.15 },
  { sectorName: "커뮤니티", sectorChangeRate: -0.15 },
  { sectorName: "유틸리티", sectorChangeRate: -0.15 },
  { sectorName: "부동산", sectorChangeRate: -0.15 },
  { sectorName: "산업재", sectorChangeRate: -0.15 },
  { sectorName: "소재", sectorChangeRate: 4.27 },
];

export default function SectorOverview({ onSelectSector }) {
  const [changeRates, setChangeRates] = useState(dummySectorChangeRates);

  // useEffect(() => {
  //   async function fetchSectorRates() {
  //     try {
  //       const res = await fetch("/api/sectors");
  //       if (!res.ok) throw new Error("API 실패");
  //       const data = await res.json();
  //       setChangeRates(data);
  //       console.log("data", data);
  //     } catch (e) {
  //       console.warn("API 연결 실패, 더미데이터 사용 중");
  //       setChangeRates(dummySectorChangeRates);
  //     }
  //   }
  //   fetchSectorRates();
  // }, []);

  useEffect(() => {
    sectorApi.getSectorList().then((res) => {
      setChangeRates(res.data);
    });
  }, []);

  return (
    <div>
      <h1 className="text-5xl font-bold mb-3">Sectors</h1>
      <p className="text-lg text-black  mb-6 mt-4">
        11개 핵심 시장 섹터와 그 속을 이끄는 대표 종목들, 시장을 움직이는
        주역들을 지금 만나보세요!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sectors.map((sector, idx) => {
          const colIndex = idx % 4;
          const isOffsetCard = colIndex === 1 || colIndex === 3;
          const rowIndex = Math.floor(idx / 4);

          const bgColor = rowIndex === 1 ? "#FFF9E7" : "#FF8341";
          const textColor = rowIndex === 1 ? "#000" : "#FFF";

          const matching = changeRates.find(
            (item) => item.sectorName === sector.sectorName
          );
          const changeRate = matching?.sectorChangeRate ?? 0;
          const isNegative = changeRate < 0;
          const changeBgColor = isNegative ? "#DBEAFE" : "#FEE2E2";
          const changeTextColor = isNegative ? "#2563EB" : "#DC2626";

          const imageSrc = sectorImages[sector.sectorName] || sector_tech;

          return (
            <div
              key={idx}
              className="hover:scale-105 duration-300 rounded-2xl shadow p-6 hover:cursor-pointer flex flex-col justify-between"
              onClick={() => onSelectSector(sector.sectorName)}
              style={{
                position: "relative",
                top: isOffsetCard ? "60px" : "0",
                backgroundColor: bgColor,
                color: textColor,
              }}
            >
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="mb-2 flex justify-between">
                    <h2 className="text-3xl font-semibold mb-2">
                      {sector.sectorName}
                    </h2>
                    <div
                      className="text-lg flex justify-center items-center px-4 rounded-full font-semibold"
                      style={{
                        backgroundColor: changeBgColor,
                        color: changeTextColor,
                      }}
                    >
                      {changeRate > 0 ? "+" : ""}
                      {changeRate.toFixed(2)}%
                    </div>
                  </div>
                  <p className="text-md mb-3 mt-4">{sector.description}</p>
                </div>

                <div className="flex flex-col items-center">
                  <img
                    src={imageSrc}
                    alt={`${sector.sectorName} 이미지`}
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
                        style={{ backgroundColor: "#FE4700", color: "#fff" }}
                      >
                        {stock}
                      </span>
                    ))}
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
