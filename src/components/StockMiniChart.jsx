import React from "react";
import ReactApexChart from "react-apexcharts";

export default function StockMiniChart({ indicator, chartData }) {
  const middleIndex = Math.floor(chartData.length / 2);
  const middlePoint = chartData[middleIndex];

  const xValue =
    typeof middlePoint.x === "string"
      ? new Date(middlePoint.x).getTime()
      : middlePoint.x;

  const series = [
    {
      name: indicator,
      data: chartData.map((d) => ({
        x: typeof d.x === "string" ? new Date(d.x).getTime() : d.x,
        y: d.y,
      })),
    },
  ];

  const options = {
    chart: {
      type: "area",
      height: 80,
      toolbar: { show: false },
      sparkline: { enabled: false }, // 🔥 annotations 허용
    },
    annotations: {
      points: [
        {
          x: xValue,
          y: middlePoint.y,
          marker: {
            size: 6,
            fillColor: "#ff8341",
            strokeColor: "#fff",
            strokeWidth: 2,
            shape: "circle",
          },
          label: {
            text: `이벤트 발생`, // 🔥 중간값 텍스트 추가
            borderColor: "#ff8341",
            offsetY: -10,
            style: {
              background: "#ff8341",
              color: "#fff",
              fontSize: "10px",
            },
          },
        },
      ],
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
      enabled: true, // 🔥 hover 시 데이터 표시
      x: { format: "MM/dd" },
      y: {
        formatter: (val) => `${val.toFixed(1)}원`,
      },
    },
    xaxis: {
      type: "datetime",
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
    <div className="w-0.5">
      <ReactApexChart
        series={series}
        options={options}
        type="area"
        height={80}
        width={300}
      />
    </div>
  );
}
