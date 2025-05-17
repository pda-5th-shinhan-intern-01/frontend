import React from "react";
import ReactApexChart from "react-apexcharts";

const dates = [
  { x: "2023-01-15", y: 3.2 },
  { x: "2023-02-15", y: 3.4 },
  { x: "2023-03-15", y: 3.6 },
  { x: "2023-04-15", y: 3.5 },
  { x: "2023-05-15", y: 3.3 },
  { x: "2023-06-15", y: 3.1 },
  { x: "2023-07-15", y: 3.0 },
  { x: "2023-08-15", y: 3.2 },
  { x: "2023-09-15", y: 3.4 },
  { x: "2023-10-15", y: 3.6 },
  { x: "2023-11-15", y: 3.8 },
  { x: "2023-12-15", y: 4.0 },
];

export default function IndicatorChangeChart({ indicator }) {
  //TODO: 나중에 자체적으로 변화율 데이터 요청 API 만들기
  const [state, setState] = React.useState({
    series: [
      {
        name: "XYZ MOTORS",
        data: dates,
      },
    ],
    options: {
      chart: {
        type: "area",
        stacked: false,
        height: 350,
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true,
        },
        toolbar: {
          autoSelected: "zoom",
        },
      },
      colors: ["#FF8341"], // <- 여기에 색상 추가
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0,
          opacityTo: 0,
          stops: [0, 90, 100],
        },
      },
      yaxis: {
        labels: {
          formatter: (val) => `${val.toFixed(1)}%`,
        },
        title: {
          text: indicator,
        },
      },
      tooltip: {
        x: {
          format: "yyyy년 MM월",
        },
        y: {
          formatter: (val) => `${val.toFixed(1)}%`,
        },
      },
      xaxis: {
        type: "datetime",
      },
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="area"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}
