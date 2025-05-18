import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { economicIndicatorMap } from "../../../data/IntroduceOfIndicators";
import IndicatorChangeChart from "../../../components/IndicatorChangeChart";
import Tooltip from "../../../components/Tooltip";
import { introduceService } from "../../../data/IntroduceOfService";
import { TbArrowBigDownFilled, TbArrowBigUpFilled } from "react-icons/tb";
import { stockApi } from "../../../api/stockApi";

export default function IndicatorsForStock({ ticker }) {
  const [isEconomicChartVisible, setIsEconomicChartVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [categories, setCategories] = useState([]);
  const [series, setSeries] = useState([
    { name: "음수", data: [] },
    { name: "양수", data: [] },
  ]);

  useEffect(() => {
    const getSensitivities = async () => {
      try {
        const response = await stockApi.getStockSensitivity(ticker);
        const data = response.data || [];

        const categoryList = data.map(
          (item) => item.indicatorCode || "UNKNOWN"
        );
        const sensitivityList = data.map((item) => item.sensitivity || 0);

        const negatives = sensitivityList.map((v) => (v < 0 ? v : 0));
        const positives = sensitivityList.map((v) => (v > 0 ? v : 0));

        setCategories(categoryList);
        setSeries([
          { name: "음수", data: negatives },
          { name: "양수", data: positives },
        ]);
      } catch (err) {
        console.error("민감도 데이터 조회 실패", err);
      }
    };

    getSensitivities();
  }, [ticker]);

  const options = {
    chart: {
      type: "bar",
      stacked: true,
      events: {
        click: function (_event, _chartContext, config) {
          const index = config.dataPointIndex;
          if (index !== -1 && categories[index]) {
            const selectedLabel = categories[index];
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
    grid: { padding: { top: 0, bottom: 0, left: 0, right: 0 } },
    plotOptions: {
      bar: { borderRadius: 6, horizontal: true, barHeight: "70%" },
    },
    fill: {
      type: "gradient",
      gradient: {
        type: "horizontal",
        shadeIntensity: 0.5,
        opacityFrom: 1,
        opacityTo: 1,
        colorStops: [
          [
            { offset: 0, color: "#00aaf0", opacity: 1 },
            { offset: 100, color: "#00aaf0", opacity: 0.1 },
          ],
          [
            { offset: 0, color: "#fe4700", opacity: 0.1 },
            { offset: 100, color: "#fe4700", opacity: 1 },
          ],
        ],
      },
    },
    colors: ["#00aaf0", "#fe4700"],
    dataLabels: { enabled: false },
    xaxis: {
      labels: {
        style: { fontSize: "12px" },
      },
    },
    yaxis: {
      categories: categories,
      labels: {
        style: { fontSize: "12px" },
      },
    },

    tooltip: {
      custom: function ({ series, dataPointIndex }) {
        const label = categories[dataPointIndex] || "지표";
        const neg = series[0]?.[dataPointIndex] ?? 0;
        const pos = series[1]?.[dataPointIndex] ?? 0;
        const value = pos !== 0 ? pos : neg;

        return `
          <div style="padding: 6px 10px;">
            <div><strong>${label}</strong></div>
            <div>민감도: ${value.toFixed(2)}</div>
          </div>
        `;
      },
    },
    legend: { show: false },
  };

  return (
    <div className="flex w-full gap-8">
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

        {categories.length > 0 ? (
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={350}
          />
        ) : (
          <div className="h-[350px] bg-gray-100 animate-pulse rounded" />
        )}

        <div className="flex items-center gap-4 w-full mt-4">
          <div className="text-sm flex items-center shrink-0">
            지표{" "}
            <span className="text-lg text-red-md">
              <TbArrowBigUpFilled />
            </span>{" "}
            주가{" "}
            <span className="text-lg text-blue-md">
              <TbArrowBigDownFilled />
            </span>
          </div>
          <div className="h-4 rounded grow bg-gradient-to-r from-blue-md via-white to-red-md" />
          <div className="text-sm flex items-center shrink-0">
            지표{" "}
            <span className="text-lg text-red-md">
              <TbArrowBigUpFilled />
            </span>{" "}
            주가{" "}
            <span className="text-lg text-red-md">
              <TbArrowBigUpFilled />
            </span>
          </div>
        </div>
      </div>

      {isEconomicChartVisible && economicIndicatorMap[selected] && (
        <div className="w-1/2">
          <h3 className="text-3xl font-semibold mb-4">
            {selected}
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
