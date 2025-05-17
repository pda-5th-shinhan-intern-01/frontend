import React from "react";
import Chart from "react-apexcharts";

export default function HeatmapChart() {
  const xLabels = [
    "기술",
    "금융",
    "헬스케어",
    "자유소비재",
    "필수소비재",
    "에너지",
    "산업재",
    "소재",
    "부동산",
    "유틸리티",
    "커뮤니케이션",
  ];

  const yLabels = [
    "CPI",
    "PPI",
    "GDP",
    "실업률",
    "비농업부문 고용지수",
    "Core PCE",
    "소매판매",
    "산업생산",
    "ISM 제조업 PMI",
  ];

  // 더미 데이터: -1 ~ +1 사이 z-score 값
  const series = yLabels.map((indicator) => ({
    name: indicator,
    data: xLabels.map((sector) => ({
      x: sector,
      y: parseFloat((Math.random() * 2 - 1).toFixed(2)),
    })),
  }));

  const options = {
    chart: {
      type: "heatmap",
      toolbar: { show: false },
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ["#000"],
      },
    },
    xaxis: {
      type: "category",
      categories: xLabels,
      labels: {
        rotate: -45,
        style: { fontSize: "15px" },
      },
    },
    yaxis: {
      labels: {
        style: { fontSize: "15px" },
      },
    },
    colors: [
      ({ value }) => {
        const clamp = Math.max(-1, Math.min(1, value));
        const percent = (clamp + 1) / 2;

        const blue = [0, 170, 240];   // #00AAF0
        const red = [254, 71, 0];     // #FE4700

        let r, g, b;

        if (percent < 0.5) {
          const t = percent / 0.5;
          r = Math.round(blue[0] + (255 - blue[0]) * t);
          g = Math.round(blue[1] + (255 - blue[1]) * t);
          b = Math.round(blue[2] + (255 - blue[2]) * t);
        } else {
          const t = (percent - 0.5) / 0.5;
          r = Math.round(255 + (red[0] - 255) * t);
          g = Math.round(255 + (red[1] - 255) * t);
          b = Math.round(255 + (red[2] - 255) * t);
        }

        return `rgb(${r}, ${g}, ${b})`;
      },
    ],
    plotOptions: {
      heatmap: {
        colorScale: {
          min: -1,
          max: 1,
        },
        shadeIntensity: 0.5,
        radius: 4,
      },
    },
    legend: {
      show: false,
    },
    tooltip: {
      y: {
        formatter: (val) => val.toFixed(2),
      },
    },
  };

  return (
    <div className="p-6 bg-[#F5F5F5] rounded-xl shadow-lg w-full max-w-screen-xl mx-auto">
      
      <Chart options={options} series={series} type="heatmap" height={800} />
    </div>
  );
}
