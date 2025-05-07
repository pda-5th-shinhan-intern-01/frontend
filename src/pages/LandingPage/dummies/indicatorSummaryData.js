export const indicatorSummaryData = {
  CPI: {
    expected: 3.5,
    actual: 3.0,
    industries: ["금융", "에너지"],
    ranking: [
      { name: "애플 (AAPL)", change: "+1.2%", price: 349.8 },
      { name: "테슬라 (TSLA)", change: "-0.8%", price: 445.24 },
      { name: "엔비디아 (NVDA)", change: "+0.5%", price: 222.21 },
    ],
  },
  PPI: {
    expected: 2.1,
    actual: 1.8,
    industries: ["제조업", "원자재"],
    ranking: [
      { name: "아마존 (AMZN)", change: "+0.7%", price: 143.84 },
      { name: "메타 (META)", change: "-0.2%", price: 442.48 },
      { name: "넷플릭스 (NFLX)", change: "+1.1%", price: 205.55 },
    ],
  },
  "Core PCE": {
    expected: 2.9,
    actual: 2.7,
    industries: ["헬스케어", "소비재"],
    ranking: [
      { name: "브로드컴 (AVGO)", change: "+0.6%", price: 120.16 },
      { name: "마이크로소프트 (MSFT)", change: "-0.3%", price: 405.44 },
      { name: "알파벳 (GOOGL)", change: "+0.9%", price: 105.95 },
    ],
  },
  NFP: {
    expected: 210,
    actual: 230,
    industries: ["고용", "서비스업"],
    ranking: [
      { name: "AMD (AMD)", change: "+1.0%", price: 133.03 },
      { name: "인텔 (INTC)", change: "-0.6%", price: 279.76 },
      { name: "퀄컴 (QCOM)", change: "+0.3%", price: 155.75 },
    ],
  },
  "Unemployment Rate": {
    expected: 4.0,
    actual: 4.2,
    industries: ["노동시장"],
    ranking: [
      { name: "팔란티어 (PLTR)", change: "+0.4%", price: 144.07 },
      { name: "스노우플레이크 (SNOW)", change: "-0.7%", price: 180.34 },
      { name: "애플 (AAPL)", change: "+0.6%", price: 493.1 },
    ],
  },
  "Retail Sales": {
    expected: 1.8,
    actual: 2.1,
    industries: ["유통", "소비재"],
    ranking: [
      { name: "테슬라 (TSLA)", change: "+0.9%", price: 301.27 },
      { name: "엔비디아 (NVDA)", change: "-0.4%", price: 222.28 },
      { name: "아마존 (AMZN)", change: "+1.0%", price: 242.44 },
    ],
  },
  ISM: {
    expected: 50.5,
    actual: 49.8,
    industries: ["제조업"],
    ranking: [
      { name: "메타 (META)", change: "+0.2%", price: 359.49 },
      { name: "넷플릭스 (NFLX)", change: "-0.5%", price: 467.52 },
      { name: "브로드컴 (AVGO)", change: "+0.7%", price: 164.08 },
    ],
  },
  "Real GDP YoY": {
    expected: 2.1,
    actual: 2.3,
    industries: ["전체 산업"],
    ranking: [
      { name: "마이크로소프트 (MSFT)", change: "+0.8%", price: 366.82 },
      { name: "알파벳 (GOOGL)", change: "-0.3%", price: 380.89 },
      { name: "AMD (AMD)", change: "+1.1%", price: 159.68 },
    ],
  },
};
