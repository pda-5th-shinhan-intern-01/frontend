import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { seriesData, seriesDataLinear } from "../dummies/stockChartData";
import { formatNumberForMoney } from "../../../utils/formatNumber";
import { economicEvents } from "../dummies/economicEventData";

// 날짜별 그룹핑
const groupedEvents = economicEvents.reduce((acc, event) => {
  const key = new Date(event.date).getTime();
  if (!acc[key]) acc[key] = [];
  acc[key].push(event);
  return acc;
}, {});

// 날짜별 마커 생성
const eventMarkers = Object.entries(groupedEvents).map(
  ([timestamp, events]) => ({
    x: Number(timestamp),
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
        whiteSpace: "pre-line", // 줄바꿈 허용
      },
      text: events.map((e) => e.label).join("\n"), // 라벨 여러 줄로 표시
    },
  })
);

export default function StockChart() {
  // TODO: 차트 API 연동 추가
  // TODO: 날짜 형식 수정(백엔드에서 날짜 형태 확인 후)
  // TODO: 이벤트 마커 개선

  //색상 계산
  const seriesDataWithColor = seriesDataLinear.map((volumeData) => {
    const priceData = seriesData.find((d) => d.x === volumeData.x);
    if (!priceData) return volumeData; // 방어 로직

    const [open, , , close] = priceData.y;
    const color =
      close > open
        ? "##fe4700" // 상승: 빨강
        : close < open
        ? "##00aaf0" // 하락: 파랑
        : "#999999"; // 보합: 회색

    return { ...volumeData, color };
  });

  //차트 설정
  const [state, setState] = useState({
    series: [
      {
        data: seriesData,
      },
    ],
    options: {
      annotations: {
        xaxis: eventMarkers,
      },
      chart: {
        type: "candlestick",
        height: 290,
        id: "candles",
        toolbar: {
          autoSelected: "pan",
          show: false,
        },
        zoom: {
          enabled: true,
        },
      },
      plotOptions: {
        candlestick: {
          colors: {
            upward: "#fe4700",
            downward: "#00aaf0",
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
          const timestamp =
            w.globals.initialSeries[seriesIndex].data[dataPointIndex].x;

          const matchedEvents = economicEvents.filter(
            (e) => new Date(e.date).getTime() === timestamp
          );

          const eventsHtml = matchedEvents
            .map(
              (e) =>
                `<div><strong>📌 ${e.label}</strong>: ${e.description}</div>`
            )
            .join("");

          return `
            <div style="padding: 4px 8px; font-size: 12px; line-height: 1.6; color: #333;">
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
              ${eventsHtml ? `<hr style="margin: 4px 0;">${eventsHtml}` : ""}
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
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          const volume = series[seriesIndex][dataPointIndex];
          const timestamp =
            w.globals.initialSeries[seriesIndex].data[dataPointIndex].x;

          const dateStr = new Date(timestamp).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          return `
            <div style="padding: 6px 10px; font-size: 12px; line-height: 1.6; color: #333;">
              <div><strong>거래량</strong>: ${formatNumberForMoney(
                volume
              )}주</div>
              <div><strong>날짜</strong>: ${dateStr}</div>
            </div>
          `;
        },
      },
      chart: {
        height: 160,
        type: "bar",
        brush: {
          enabled: false,
          target: "candles",
        },
        toolbar: {
          autoSelected: "pan",
          show: false,
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
                color: "#00aaf0",
              },
              {
                from: 1,
                to: 10000,
                color: "#fe4700",
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
      </div>
    </div>
  );
}
