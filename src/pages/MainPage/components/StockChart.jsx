import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { seriesData, seriesDataLinear } from "../dummies/stockChartData";
import { formatNumberForMoney } from "../../../utils/formatNumber";

export default function StockChart() {
  //색상 계산
  const seriesDataWithColor = seriesDataLinear.map((volumeData) => {
    const priceData = seriesData.find((d) => d.x === volumeData.x);
    if (!priceData) return volumeData; // 방어 로직

    const [open, , , close] = priceData.y;
    const color =
      close > open
        ? "##f14452" // 상승: 빨강
        : close < open
        ? "##3083f6" // 하락: 파랑
        : "#999999"; // 보합: 회색

    return { ...volumeData, color };
  });
  const [state, setState] = useState({
    series: [
      {
        data: seriesData,
      },
    ],
    options: {
      chart: {
        type: "candlestick",
        height: 290,
        id: "candles",
        toolbar: {
          autoSelected: "pan",
          show: true,
        },
        zoom: {
          enabled: true,
        },
      },
      plotOptions: {
        candlestick: {
          colors: {
            upward: "#f14452",
            downward: "#3083f6",
          },
        },
      },
      xaxis: {
        type: "datetime",
      },
      tooltip: {
        shared: true,
        custom: function ({ seriesIndex, dataPointIndex, w }) {
          const ohlc =
            w.globals.initialSeries[seriesIndex].data[dataPointIndex].y;
          return `
            <div style="
                padding: 4px 8px;
                font-size: 12px;
                line-height: 1.6;
                color: #333;
              ">
                <div><strong style="margin-right:4px">시가</strong> ${formatNumberForMoney(
                  ohlc[0]
                )}원</div>
                <div><strong style="margin-right:4px">고가</strong> ${formatNumberForMoney(
                  ohlc[1]
                )}원</div>
                <div><strong style="margin-right:4px">저가</strong> ${formatNumberForMoney(
                  ohlc[2]
                )}원</div>
                <div><strong style="margin-right:4px">종가</strong> ${formatNumberForMoney(
                  ohlc[3]
                )}원</div>
              </div>
          `;
        },
      },
    },
    seriesBar: [
      {
        name: "volume",
        data: seriesDataWithColor,
      },
    ],
    optionsBar: {
      chart: {
        height: 160,
        type: "bar",
        brush: {
          enabled: false,
          target: "candles",
        },
        selection: {
          enabled: true,
          xaxis: {
            min: new Date("2023-01-01").getTime(),
            max: new Date("2023-01-20").getTime(),
          },
          fill: {
            color: "#ccc",
            opacity: 0.4,
          },
          stroke: {
            color: "#bbb",
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      plotOptions: {
        bar: {
          columnWidth: "80%",
          colors: {
            ranges: [
              {
                from: -1000,
                to: 0,
                color: "#3083f6",
              },
              {
                from: 1,
                to: 10000,
                color: "#f14452",
              },
            ],
          },
        },
      },
      stroke: {
        width: 0,
      },
      xaxis: {
        type: "datetime",
        axisBorder: {
          offsetX: 13,
        },
      },
      yaxis: {
        labels: {
          show: true,
        },
      },
    },
  });

  return (
    <div className="w-full">
      <div className="chart-box">
        <div id="chart-candlestick">
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="candlestick"
            height={290}
          />
        </div>
        <div id="chart-bar">
          <ReactApexChart
            options={state.optionsBar}
            series={state.seriesBar}
            type="bar"
            height={160}
          />
        </div>
      </div>
    </div>
  );
}
