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

  
  const series = yLabels.map((indicator) => ({
    name: indicator,
    data: xLabels.map(() => ({
      x: "",
      y: parseFloat((Math.random() * 2 - 1).toFixed(2)), // -1.0 ~ +1.0
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
        const interpolate = (a, b, t) => Math.round(a + (b - a) * t);

        let r, g, b;
        if (percent < 0.5) {
          const t = percent / 0.5;
          r = interpolate(33, 240, t);
          g = interpolate(102, 240, t);
          b = interpolate(172, 240, t);
        } else {
          const t = (percent - 0.5) / 0.5;
          r = interpolate(240, 178, t);
          g = interpolate(240, 24, t);
          b = interpolate(240, 43, t);
        }

        return `rgb(${r},${g},${b})`;
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
    <div className="p-4 bg-[#F5F5F5] rounded-lg shadow">
      <Chart options={options} series={series} type="heatmap" height={800} />
    </div>
  );
}
