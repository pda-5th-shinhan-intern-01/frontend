/**
 * 1. 날짜 필터링
 * 2. 섹터 별 수익률 벡터 생성
 * 3. 선택한 정규화 방식 적용
 * 4. 피어슨 상관계수 계산
 * 5. 최종 히트맵 행렬 반환환
 */

import { useMemo } from "react";

// 피어슨 상관계수 계산
function pearson(x, y) {
  if (!x.length || !y.length || x.length !== y.length) return 0;
  const n = x.length;
  const meanX = x.reduce((a, b) => a + b, 0) / n;
  const meanY = y.reduce((a, b) => a + b, 0) / n;
  const num = x.reduce((sum, xi, i) => sum + (xi - meanX) * (y[i] - meanY), 0);
  const denX = Math.sqrt(x.reduce((sum, xi) => sum + (xi - meanX) ** 2, 0));
  const denY = Math.sqrt(y.reduce((sum, yi) => sum + (yi - meanY) ** 2, 0));
  return denX && denY ? num / (denX * denY) : 0;
}

// 수익률 계산
function getReturn(prices, date, window) {
  const base = new Date(date);
  const dateStr = (offset) => {
    const d = new Date(base);
    d.setDate(d.getDate() + offset);
    return d.toISOString().split("T")[0];
  };

  const before = prices[dateStr(-1)];
  const after = prices[dateStr(1)];
  const now = prices[dateStr(0)];

  if (window === "당일" && before != null && now != null) {
    return (now - before) / before;
  }
  if (window === "±1일" && before != null && after != null) {
    return (after - before) / before;
  }
  if (window === "±3일") {
    const b = prices[dateStr(-3)];
    const a = prices[dateStr(3)];
    if (b != null && a != null) return (a - b) / b;
  }
  return null;
}

// 정규화
function normalize(values, method) {
  if (!values || values.length === 0) return [];

  if (method === "z-score") {
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const std = Math.sqrt(
      values.reduce((sum, v) => sum + (v - mean) ** 2, 0) / values.length
    );
    if (std === 0) return values.map(() => 0);
    return values.map((v) => (v - mean) / std);
  }

  if (method === "Min-Max") {
    const min = Math.min(...values);
    const max = Math.max(...values);
    if (min === max) return values.map(() => 0.5);
    return values.map((v) => (v - min) / (max - min));
  }

  if (method === "percentile") {
    const sorted = [...values].sort((a, b) => a - b);
    return values.map((v) => sorted.indexOf(v) / (values.length - 1));
  }

  return values; // 그대로 반환 (%Change or 기타)
}

// 커스텀 훅
export default function useHeatmapData({
  rawData,
  startDate,
  endDate,
  normalization = "z-score",
  returnWindow = "±1일",
  useDeltaKey = "deltaRate",
}) {
  return useMemo(() => {
    if (!rawData || !rawData.eventDates || !rawData.sectorPrices) return [];

    const indicators = [...new Set(rawData.eventDates.map((e) => e.indicator))];
    const sectors = Object.keys(rawData.sectorPrices);

    const matrix = [];

    for (const indicator of indicators) {
      const events = rawData.eventDates.filter(
        (e) =>
          e.indicator === indicator &&
          e.date >= startDate &&
          e.date <= endDate &&
          typeof e[useDeltaKey] === "number"
      );

      if (events.length < 2) {
        matrix.push(sectors.map(() => 0)); // 최소 2개 이상 없으면 계산 무의미
        continue;
      }

      const deltas = normalize(
        events.map((e) => e[useDeltaKey]),
        normalization
      );

      const row = sectors.map((sector) => {
        const prices = rawData.sectorPrices[sector];
        const returns = normalize(
          events.map((e) => getReturn(prices, e.date, returnWindow)),
          normalization
        );
        return pearson(deltas, returns);
      });

      matrix.push(row);
    }

    return matrix; // shape: [indicator][sector]
  }, [rawData, startDate, endDate, normalization, returnWindow, useDeltaKey]);
}
