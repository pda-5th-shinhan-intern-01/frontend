import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { economicIndicatorMap } from "../../../data/IntroduceOfIndicators";

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
  const [selected, setSelected] = useState();

  const options = {
    chart: {
      type: "bar",
      height: 300,
      events: {
        //바 클릭 시 호출
        click: function (_event, chartContext, config) {
          const index = config.dataPointIndex;
          if (index !== -1) {
            const selectedLabel = economicCategories[index];
            if (selectedLabel == selected) {
              if (isEconomicChartVisible) {
                setIsEconomicChartVisible(false);
              } else setIsEconomicChartVisible(true);
            } else {
              setIsEconomicChartVisible(true);
              setSelected(selectedLabel);
            }
          }
        },
      },
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
    <div className="flex w-full gap-4">
      <div className="w-full">
        <div className="flex w-full justify-between">
          <h3 className="text-lg font-semibold">경제 지표별 민감도</h3>
          <div className="text-xs bg-gray-light py-1 px-4 rounded-lg">
            민감도순
          </div>
        </div>

        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={350}
        />
      </div>
      {isEconomicChartVisible ? (
        <div className="w-1/2">
          <h3 className="text-lg font-semibold mb-2">
            {economicIndicatorMap[selected].name}({selected}) 변화 추세
          </h3>
          <p className="text-sm">
            {economicIndicatorMap[selected].description}
          </p>
        </div>
      ) : null}
    </div>
  );
}
