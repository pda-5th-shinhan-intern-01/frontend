import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { economicIndicatorMap } from "../../../data/IntroduceOfIndicators";
import IndicatorChangeChart from "../../../components/IndicatorChangeChart";
import Tooltip from "../../../components/Tooltip";
import { introduceService } from "../../../data/IntroduceOfService";

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

// 데이터를 양수/음수 시리즈로 분리
const rawData = [-1.8, -1.0, -0.6, -0.4, -0.3, 0.3, 0.5, 0.7];
const series = [
  {
    name: "음수",
    data: rawData.map((v) => (v < 0 ? v : 0)),
  },
  {
    name: "양수",
    data: rawData.map((v) => (v > 0 ? v : 0)),
  },
];

export default function IndicatorsForStock() {
  const [isEconomicChartVisible, setIsEconomicChartVisible] = useState(false);
  const [selected, setSelected] = useState();

  const options = {
    chart: {
      type: "bar",
      stacked: true,
      events: {
        click: function (_event, chartContext, config) {
          const index = config.dataPointIndex;
          if (index !== -1 && economicCategories[index]) {
            const selectedLabel = economicCategories[index];
            if (selectedLabel === selected) {
              setIsEconomicChartVisible((prev) => !prev);
            } else {
              setIsEconomicChartVisible(true);
              setSelected(selectedLabel);
            }
          }
        },
      },
    },
    grid: {
      padding: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        horizontal: true,
        barHeight: "70%",
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        type: "horizontal",
        shadeIntensity: 0.5,
        opacityFrom: 1,
        opacityTo: 1,
        colorStops: [
          // 시리즈 1 (음수): 하늘 → 흰색
          [
            {
              offset: 0,
              color: "#00aaf0",
              opacity: 1,
            },
            {
              offset: 100,
              color: "#00aaf0",
              opacity: 0.1,
            },
          ],
          // 시리즈 2 (양수): 흰색 → 오렌지
          [
            {
              offset: 0,
              color: "#fe4700",
              opacity: 0.1,
            },
            {
              offset: 100,
              color: "#fe4700",
              opacity: 1,
            },
          ],
        ],
      },
    },
    colors: ["#00aaf0", "#fe4700"],
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: economicCategories,
      min: -2,
      max: 2,
      tickAmount: 4,
      labels: {
        formatter: (val) => val.toFixed(1),
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
        const label = w.config.yaxis[0].categories[dataPointIndex];
        const neg = series[0][dataPointIndex];
        const pos = series[1][dataPointIndex];
        const value = pos !== 0 ? pos : neg;
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
        <div className="flex w-full justify-between mb-4">
          <h3 className="text-3xl font-semibold flex gap-1 items-center">
            경제 지표별 민감도
            <Tooltip content={introduceService.민감도} />
          </h3>
        </div>
        <div className="h-16 flex-col flex justify-between text-lg">
          <div>
            지표가 변화할 때, 주가가 어떻게 변화했는지를 확인하세요
            <br /> 지표 바를 클릭하면 해당 지표의 변화 추이를 볼 수 있어요
          </div>
        </div>
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={350}
        />
      </div>

      {isEconomicChartVisible && economicIndicatorMap[selected] && (
        <div className="w-1/2">
          <h3 className="text-3xl font-semibold mb-4">
            {selected} 변화
            <span className="ml-2 text-lg text-gray-md">
              {economicIndicatorMap[selected].name}
            </span>
          </h3>
          <div className="text-lg h-16">
            {economicIndicatorMap[selected].description}
          </div>
          <IndicatorChangeChart indicator={selected} />
        </div>
      )}
    </div>
  );
}
