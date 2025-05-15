import React, { useState, useEffect } from "react";
import HeatmapControlPanel from "./HeatmapControlPanel";
import Heatmap from "./Heatmap";
import useHeatmapData from "../../hooks/useHeatMapData";
import { dummyRawData } from "./dummyRawData";

export default function HeatmapPage() {
  const [returnWindow, setReturnWindow] = useState("±1일");
  const [startDate, setStartDate] = useState("2024-03-10");
  const [endDate, setEndDate] = useState("2025-03-09");
  const [rawData, setRawData] = useState();

  useEffect(() => {
    getHeatmapRawData();
    setRawData(dummyRawData);
  }, []);

  const getHeatmapRawData = async () => {
    //히트맵 계산을 위한 rawData api 호출
  };

  const heatmapData = useHeatmapData({
    rawData,
    startDate,
    endDate,
    returnWindow,
    useDeltaKey: "deltaRate",
  });

  return (
    <div className="p-6">
      <h1 className="font-bold text-xl mb-2">경제 지표와 섹터 상관관계 분석</h1>
      <h3 className="mb-6">
        미국 주요 경제 지표와 11개 시장 섹터 간의 상관관계를 시각화한
        히트맵입니다.
      </h3>

      <HeatmapControlPanel
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        returnWindow={returnWindow}
        onReturnWindowChange={setReturnWindow}
      />
      <div className="mt-5">
        <Heatmap heatmapData={heatmapData} />
      </div>
    </div>
  );
}
