import React, { useState } from "react";
import HeatmapControlPanel from "./HeatmapControlPanel";
import Heatmap from "./Heatmap";

export default function HeatmapPage() {
  const [threshold, setThreshold] = useState(0.3);
  const [normalization, setNormalization] = useState("z-score");
  const [returnWindow, setReturnWindow] = useState("±1일");
  const [startDate, setStartDate] = useState("2024-03-10");
  const [endDate, setEndDate] = useState("2025-03-09");

  return (
    <div className="p-6">
      <h1 className="font-bold text-4xl mb-2"> 섹터 X 경제 지표</h1>
      <h3 className="text-xl mb-6 mt-4">
        9가지 주요 경제 지표와 11개 시장 섹터 간의 상관관계를 나타낸 히트맵입니다.
      </h3>

      <HeatmapControlPanel
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        threshold={threshold}
        onThresholdChange={setThreshold}
        normalization={normalization}
        onNormalizationChange={setNormalization}
        returnWindow={returnWindow}
        onReturnWindowChange={setReturnWindow}
      />
      <div className="mt-5">
        <Heatmap />
      </div>
    </div>
  );
}
