import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { sectorApi } from "../../api/sectorApi";

export default function Heatmap({ returnWindow }) {
  const returnWindowLabel = ["day", "1d", "3d"];
  const [matrix, setMatrix] = useState();
  useEffect(() => {
    sectorApi
      .getHeatmapData(`${returnWindowLabel[returnWindow]}`)
      .then((res) => {
        setMatrix(res.data.matrix);
        console.log(res.data);
      });
  }, [returnWindow]);

  const xLabels = [
    "금융",
    "기술",
    "부동산",
    "산업재",
    "소재",
    "에너지",
    "유틸리티",
    "자유소비재",
    "커뮤니케이션",
    "필수소비재",
    "헬스케어",
  ];

  const yLabels = [
    "CORE_CPI",
    "CORE_PCE",
    "CORE_PPI",
    "GDP",
    "INDUSTRIAL_PRODUCTION",
    "NFP",
    "RETAIL_SALES",
    "UNEMPLOYMENT",
  ];

  if (!matrix) return null;
  const series = yLabels.map((indicator, i) => ({
    name: indicator,
    data: xLabels.map((sector, j) => ({
      x: sector,
      y: parseFloat(matrix[i][j].toFixed(2)),
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
      position: "top",
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
        if (value <= -0.5) return "#00aaf0";
        if (value <= -0.4) return "#4fc3f7";
        if (value <= -0.3) return "#81d4fa";
        if (value <= -0.2) return "#b3e5fc";
        if (value <= -0.1) return "#e1f5fe";
        if (value <= 0.0) return "#ffffff";
        if (value <= 0.1) return "#ffe5e0";
        if (value <= 0.2) return "#ffc1b3";
        if (value <= 0.3) return "#ff9980";
        if (value <= 0.4) return "#ff7052";
        if (value <= 0.5) return "#ff4726";
        return "#fe4700";
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
    <div className="p-6 bg-gray-light rounded-2xl shadow-md w-full max-w-screen-xl mx-auto">
      <Chart options={options} series={series} type="heatmap" height={800} />
    </div>
  );
}
