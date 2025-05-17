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
      <h3 className="text-xl text-[#00AAF0] mb-6 mt-4">
      시장을 흔드는 9가지 경제 지표와 11개 섹터의 치열한 상관관계, 그 판도를 히트맵 하나에 담아냈습니다!
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
