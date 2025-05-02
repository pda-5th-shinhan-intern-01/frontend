import React from "react";
import ReactApexChart from "react-apexcharts";

const stockMiniData = [
  { x: "2023-05-01", y: 110 },
  { x: "2023-05-02", y: 112 },
  { x: "2023-05-03", y: 108 },
  { x: "2023-05-04", y: 115 },
  { x: "2023-05-05", y: 117 },
  { x: "2023-05-06", y: 113 },
  { x: "2023-05-07", y: 118 },
  { x: "2023-05-08", y: 120 },
];

export default function StockMiniChart({ indicator }) {
  const options = {
    chart: {
      type: "area",
      height: 80,
      toolbar: {
        show: false, // 상단 툴바 제거
      },
      sparkline: {
        enabled: true, // 축, 레이블, 그리드 등 모두 숨김
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    tooltip: {
      x: { format: "MM/dd" },
      y: {
        formatter: (val) => `${val.toFixed(1)}원`,
      },
    },
    // ✅ 아래는 sparkline 켜면 사실상 무시되지만, 혹시를 위해 추가
    xaxis: {
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
      tooltip: { enabled: false },
    },
    yaxis: {
      show: false,
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
  };

  return (
    <div style={{ width: 350 }}>
      <ReactApexChart
        series={[{ name: indicator, data: stockMiniData }]}
        options={options}
        type="area"
        height={80}
      />
    </div>
  );
}
