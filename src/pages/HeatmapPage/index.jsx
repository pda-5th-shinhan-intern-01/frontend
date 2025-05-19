import React, { useState, useEffect } from "react";
import HeatmapControlPanel from "./HeatmapControlPanel";
import Heatmap from "./Heatmap";
import useHeatmapData from "../../hooks/useHeatmapData";
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
    <div className="flex-col w-full">
      <h1 className="text-4xl font-bold mb-4"> 섹터 X 경제 지표</h1>
      <h3 className="text-lg text-black  mb-6 mt-4">
        시장을 흔드는 9가지 경제 지표와 11개 섹터의 치열한 상관관계, 그 판도를
        히트맵 하나에 담아냈습니다!
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
