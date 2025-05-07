import React from "react";
import ReactApexChart from "react-apexcharts";
import { economicIndicatorMap } from "../../../data/IntroduceOfIndicators";

export default function IndicatorChartCard({ indicator, data }) {
  const categories = data.map((item) => item.month);
  const expectedSeries = data.map((item) => item.expected);
  const actualSeries = data.map((item) => item.actual);

  const chartOptions = {
    chart: { type: "bar", height: 300 },
    plotOptions: {
      bar: { horizontal: false, columnWidth: "75%", endingShape: "rounded" },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories,
      labels: { rotate: -45 },
    },
    yaxis: {
      labels: {
        formatter: (val) => `${val}%`,
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `${val}%`,
      },
    },
    colors: ["#0046FF", "#D9D9D9"],
  };

  const chartSeries = [
    { name: "예상치", data: expectedSeries },
    { name: "발표치", data: actualSeries },
  ];

  return (
    <div className="bg-white mt-4 rounded shadow p-4">
      <h3 className="text-sm font-semibold mb-2">
        {economicIndicatorMap[indicator]?.name || indicator} 월별 발표치 vs
        예상치
      </h3>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={300}
      />
    </div>
  );
}
