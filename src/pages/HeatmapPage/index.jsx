import React, { useState, useEffect } from "react";
import HeatmapControlPanel from "./HeatmapControlPanel";
import Heatmap from "./Heatmap";
import useHeatmapData from "../../hooks/useHeatmapData";
import { dummyRawData } from "./dummyRawData";
import { sectorApi } from "../../api/sectorApi";

export default function HeatmapPage() {
  const [returnWindow, setReturnWindow] = useState(1);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <div className="flex-col w-full">
          {" "}
          <h1 className="text-4xl font-bold mb-4"> 섹터 X 경제 지표</h1>
          <h3 className="text-lg text-black  mb-6 mt-4">
            시장을 흔드는 9가지 경제 지표와 11개 섹터의 치열한 상관관계, 그
            판도를 히트맵 하나에 담아냈습니다!
          </h3>
        </div>
        <HeatmapControlPanel
          returnWindow={returnWindow}
          onReturnWindowChange={setReturnWindow}
        />
      </div>
      {/* <div className="mt-5"> */}
      <Heatmap returnWindow={returnWindow} />
    </div>
  );
}
