export const indicatorSummaryData = {
  CORE_CPI: {
    expected: 3.5,
    actual: 3.0,
    industries: ["금융", "에너지"],
    ranking: [
      { stockName: "애플", stockTicker: "AAPL", change: 1.2, price: 349.8 },
      { stockName: "테슬라", stockTicker: "TSLA", change: -0.8, price: 445.24 },
      {
        stockName: "엔비디아",
        stockTicker: "NVDA",
        change: 0.5,
        price: 222.21,
      },
    ],
  },
  CORE_PPI: {
    expected: 2.1,
    actual: 1.8,
    industries: ["제조업", "원자재"],
    ranking: [
      { stockName: "아마존", stockTicker: "AMZN", change: 0.7, price: 143.84 },
      { stockName: "메타", stockTicker: "META", change: -0.2, price: 442.48 },
      {
        stockName: "넷플릭스",
        stockTicker: "NFLX",
        change: 1.1,
        price: 205.55,
      },
    ],
  },
  CORE_PCE: {
    expected: 2.9,
    actual: 2.7,
    industries: ["헬스케어", "소비재"],
    ranking: [
      {
        stockName: "브로드컴",
        stockTicker: "AVGO",
        change: 0.6,
        price: 120.16,
      },
      {
        stockName: "마이크로소프트",
        stockTicker: "MSFT",
        change: -0.3,
        price: 405.44,
      },
      { stockName: "알파벳", stockTicker: "GOOGL", change: 0.9, price: 105.95 },
    ],
  },
  NFP: {
    expected: 210,
    actual: 230,
    industries: ["고용", "서비스업"],
    ranking: [
      { stockName: "AMD", stockTicker: "AMD", change: 1.0, price: 133.03 },
      { stockName: "인텔", stockTicker: "INTC", change: -0.6, price: 279.76 },
      { stockName: "퀄컴", stockTicker: "QCOM", change: 0.3, price: 155.75 },
    ],
  },
  UNEMPLOYMENT: {
    expected: 4.0,
    actual: 4.2,
    industries: ["노동시장"],
    ranking: [
      {
        stockName: "팔란티어",
        stockTicker: "PLTR",
        change: 0.4,
        price: 144.07,
      },
      {
        stockName: "스노우플레이크",
        stockTicker: "SNOW",
        change: -0.7,
        price: 180.34,
      },
      { stockName: "애플", stockTicker: "AAPL", change: 0.6, price: 493.1 },
    ],
  },
  RETAIL_SALES: {
    expected: 1.8,
    actual: 2.1,
    industries: ["유통", "소비재"],
    ranking: [
      { stockName: "테슬라", stockTicker: "TSLA", change: 0.9, price: 301.27 },
      {
        stockName: "엔비디아",
        stockTicker: "NVDA",
        change: -0.4,
        price: 222.28,
      },
      { stockName: "아마존", stockTicker: "AMZN", change: 1.0, price: 242.44 },
    ],
  },
  INDUSTRIAL_PRODUCTION: {
    expected: 1.6,
    actual: 1.4,
    industries: ["산업재", "기계"],
    ranking: [
      { stockName: "보잉", stockTicker: "BA", change: -0.3, price: 198.32 },
      { stockName: "GE", stockTicker: "GE", change: 0.5, price: 124.56 },
      { stockName: "캐터필러", stockTicker: "CAT", change: 1.1, price: 282.74 },
    ],
  },
  GDP: {
    expected: 2.1,
    actual: 2.3,
    industries: ["전체 산업"],
    ranking: [
      {
        stockName: "마이크로소프트",
        stockTicker: "MSFT",
        change: 0.8,
        price: 366.82,
      },
      {
        stockName: "알파벳",
        stockTicker: "GOOGL",
        change: -0.3,
        price: 380.89,
      },
      { stockName: "AMD", stockTicker: "AMD", change: 1.1, price: 159.68 },
    ],
  },
};
