import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { sectorApi } from "../../api/sectorApi";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function Heatmap({ returnWindow }) {
  const returnWindowLabel = ["day", "1d", "3d"];
  const [matrix, setMatrix] = useState();

  useEffect(() => {
    sectorApi
      .getHeatmapData(`${returnWindowLabel[returnWindow]}`)
      .then((res) => {
        setMatrix(res.data.matrix);
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
    //"INDUSTRIAL_PRODUCTION",
    "NFP",
    "RETAIL_SALES",
    "UNEMPLOYMENT",
  ];

  if (!matrix) return <LoadingSpinner />;
  const series = yLabels.map((indicator, i) => ({
    name: indicator,
    data: xLabels.map((sector, j) => ({
      x: sector,
      y: Number(matrix[i][j].toFixed(2)),
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
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        radius: 4,
        colorScale: {
          min: -1,
          max: 1,
          ranges: [
            { from: -1.0, to: -0.4, color: "#00aaf0" },
            { from: -0.4, to: -0.3, color: "#4fc3f7" },
            { from: -0.3, to: -0.25, color: "#81d4fa" },
            { from: -0.25, to: -0.2, color: "#b3e5fc" },
            { from: -0.2, to: -0.1, color: "#e1f5fe" },
            { from: -0.1, to: 0.0, color: "#ffffff" },
            { from: 0.0, to: 0.1, color: "#ffe5e0" },
            { from: 0.1, to: 0.2, color: "#ffc1b3" },
            { from: 0.2, to: 0.3, color: "#ff9980" },
            { from: 0.3, to: 0.4, color: "#ff7052" },
            { from: 0.4, to: 0.5, color: "#ff4726" },
            { from: 0.5, to: 1.0, color: "#fe4700" },
          ],
        },
      },
    },

    legend: { show: false },
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
