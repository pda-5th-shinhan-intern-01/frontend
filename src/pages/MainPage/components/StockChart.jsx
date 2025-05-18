import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { formatNumberForMoney } from "../../../utils/formatNumber";
import { economicEvents } from "../dummies/economicEventData";
import { stockApi } from "../../../api/stockApi";

// ✅ eventMarkers → timestamp 기준
const eventMarkers = economicEvents.map((event) => ({
  x: new Date(event.date).getTime(),
  marker: {
    size: 6,
    fillColor: "#fe4700",
    strokeColor: "#fff",
    strokeWidth: 2,
    shape: "circle",
  },
  label: {
    borderColor: "#fe4700",
    offsetY: 0,
    style: {
      color: "#fff",
      background: "#fe4700",
      fontSize: "10px",
      whiteSpace: "pre-line",
    },
    text: event.label,
  },
}));

function transformStockData(rawData) {
  if (!rawData || rawData.length === 0)
    return {
      seriesData: [],
      seriesDataWithColor: [],
    };

  return {
    seriesData: rawData.map((item) => ({
      x: new Date(item.date).getTime(),
      y: [item.open, item.high, item.low, item.close],
    })),
    seriesDataWithColor: rawData.map((item) => ({
      x: new Date(item.date).getTime(),
      y: item.volume,
      fillColor: item.close >= item.open ? "#fe4700" : "#00aaf0",
    })),
  };
}

export default function StockChart({ ticker }) {
  const [chartData, setChartData] = useState(null);
  const [state, setState] = useState(null);

  useEffect(() => {
    const getChartData = async () => {
      try {
        const response = await stockApi.getStockChart(ticker);
        setChartData(response.data);
      } catch (error) {
        console.error("차트데이터 조회 실패", error);
      }
    };
    getChartData();
  }, [ticker]);

  useEffect(() => {
    if (!chartData) return;

    const { seriesData, seriesDataWithColor } = transformStockData(chartData);

    const yValues = seriesData.flatMap((d) => d.y);
    const volumeY = seriesDataWithColor.map((d) => d.y);

    const minY = Math.min(...yValues);
    const maxY = Math.max(...yValues);
    const minVolume = Math.min(...volumeY);
    const maxVolume = Math.max(...volumeY);

    // ✅ 초기 보여줄 범위 (2025년 1월~4월)
    const initialMin = new Date("2025-01-01").getTime();
    const initialMax = new Date("2025-04-01").getTime();

    setState({
      series: [{ data: seriesData }],
      options: {
        chart: {
          id: "candles",
          type: "candlestick",
          zoom: { enabled: true, type: "x", autoScaleYaxis: true },
          toolbar: {
            show: true,
            tools: {
              pan: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              reset: true,
            },
          },
        },
        annotations: { xaxis: eventMarkers },
        plotOptions: {
          candlestick: {
            colors: { upward: "#fe4700", downward: "#00aaf0" },
          },
        },
        xaxis: {
          type: "datetime",
          min: initialMin,
          max: initialMax,
          labels: {
            format: "yyyy-MM",
            style: { fontSize: "11px" },
            datetimeUTC: false,
          },
          tooltip: { enabled: true },
        },
        yaxis: {
          min: minY,
          max: maxY,
          tickAmount: 5,
        },
        tooltip: {
          shared: true,
          custom: ({ seriesIndex, dataPointIndex, w }) => {
            const ohlc =
              w.globals.initialSeries[seriesIndex].data[dataPointIndex].y;
            const x =
              w.globals.initialSeries[seriesIndex].data[dataPointIndex].x;
            const matchedEvents = economicEvents.filter(
              (e) => new Date(e.date).getTime() === x
            );
            const eventsHtml = matchedEvents
              .map(
                (e) =>
                  `<div><strong>📌 ${e.label}</strong>: ${e.description}</div>`
              )
              .join("");

            return `
              <div style="padding: 4px 8px; font-size: 12px;">
                <div><strong>시가</strong> ${formatNumberForMoney(
                  ohlc[0]
                )}원</div>
                <div><strong>고가</strong> ${formatNumberForMoney(
                  ohlc[1]
                )}원</div>
                <div><strong>저가</strong> ${formatNumberForMoney(
                  ohlc[2]
                )}원</div>
                <div><strong>종가</strong> ${formatNumberForMoney(
                  ohlc[3]
                )}원</div>
                ${eventsHtml ? `<hr style="margin: 4px 0;">${eventsHtml}` : ""}
              </div>
            `;
          },
        },
      },
      seriesBar: [{ name: "volume", data: seriesDataWithColor }],
      optionsBar: {
        chart: {
          height: 160,
          type: "bar",
          brush: { enabled: false, target: "candles" },
          toolbar: { show: false },
          zoom: { enabled: true, type: "x" },
        },
        xaxis: {
          type: "datetime",
          min: initialMin,
          max: initialMax,
          labels: {
            format: "yyyy-MM",
            style: { fontSize: "11px" },
          },
        },
        yaxis: {
          min: minVolume,
          max: maxVolume,
          labels: { show: true },
        },
        dataLabels: { enabled: false },
        plotOptions: {
          bar: {
            columnWidth: "80%",
            colors: {
              ranges: [
                { from: -1000, to: 0, color: "#00aaf0" },
                { from: 1, to: 100000, color: "#fe4700" },
              ],
            },
          },
        },
        tooltip: {
          custom: ({ series, seriesIndex, dataPointIndex, w }) => {
            const volume = series[seriesIndex][dataPointIndex];
            const x =
              w.globals.initialSeries[seriesIndex].data[dataPointIndex].x;
            const dateStr = new Date(x).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });

            return `
              <div style="padding: 6px 10px; font-size: 12px;">
                <div><strong>거래량</strong>: ${formatNumberForMoney(
                  volume
                )}주</div>
                <div><strong>날짜</strong>: ${dateStr}</div>
              </div>
            `;
          },
        },
        stroke: { width: 0 },
      },
    });
  }, [chartData]);

  return (
    <div className="w-full">
      <div className="chart-box">
        {!state ? (
          <div className="w-full h-[500px] bg-gray-200 rounded-md animate-pulse" />
        ) : (
          <>
            <div id="chart-candlestick">
              <ReactApexChart
                options={state.options}
                series={state.series}
                type="candlestick"
                height={350}
              />
            </div>
            <div id="chart-bar">
              <ReactApexChart
                options={state.optionsBar}
                series={state.seriesBar}
                type="bar"
                height={150}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
