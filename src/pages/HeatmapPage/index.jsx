import React, { useState, useEffect } from "react";
import HeatmapControlPanel from "./HeatmapControlPanel";
import Heatmap from "./Heatmap";

export default function HeatmapPage() {
  const [returnWindow, setReturnWindow] = useState(1);

  return (
    <div>
      <div className="flex justify-between items-end w-full">
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold mb-4"> 섹터 X 경제 지표</h1>
          <h3 className="text-lg mb-6">
            시장을 흔드는 9가지 경제 지표와 11개 섹터의 치열한 상관관계, 그
            판도를 히트맵 하나에 담아냈습니다!
          </h3>
        </div>
        <div className=" mb-6">
          <HeatmapControlPanel
            returnWindow={returnWindow}
            onReturnWindowChange={setReturnWindow}
          />
        </div>
      </div>

      <Heatmap returnWindow={returnWindow} />
    </div>
  );
}
