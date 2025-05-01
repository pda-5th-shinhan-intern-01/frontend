import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const economicCategories = [
  "CPI",
  "PPI",
  "Core PCE",
  "NFP",
  "Unemployment Rate",
  "Retail Sales",
  "ISM",
  "Real GDP YoY",
];

const series = [
  {
    name: "민감도",
    data: [-1.8, -1.0, -0.6, -0.4, -0.3, 0.3, 0.5, 0.7],
  },
];

export default function IndicatorsForStock() {
  const [isEconomicChartVisible, setIsEconomicChartVisible] = useState(false);

  const options = {
    chart: {
      type: "bar",
      height: 300,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "70%",
        colors: {
          ranges: [
            {
              from: -Infinity,
              to: 0,
              color: "#3083f6",
            },
            {
              from: 0.00001,
              to: Infinity,
              color: "#f14452",
            },
          ],
        },
      },
    },
    dataLabels: {
      enabled: true,
    },
    xaxis: {
      categories: economicCategories,
      min: -2,
      max: 2,
      tickAmount: 4,
      labels: {
        formatter: (val) => val.toFixed(1),
      },
      title: {
        text: "민감도",
      },
    },
    yaxis: {
      categories: economicCategories,
      labels: {
        show: true,
        style: {
          fontSize: "12px",
        },
      },
    },
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const value = series[seriesIndex][dataPointIndex];
        const label = w.config.yaxis[0].categories[dataPointIndex];
        return `
              <div style="padding: 6px 10px;">
                <div><strong>${label}</strong></div>
                <div>민감도: ${value.toFixed(2)}</div>
              </div>
            `;
      },
    },
  };

  return (
    <div className="flex w-full">
      <div className="w-full">
        <h3 style={{ marginBottom: "10px" }}>경제 지표 민감도</h3>
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={350}
        />
      </div>
      {isEconomicChartVisible ? (
        <div className="w-full bg-gray-md"></div>
      ) : null}
    </div>
  );
}
