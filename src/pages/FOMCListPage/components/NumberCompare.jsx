import React from "react";
import ReactApexChart from "react-apexcharts";
import { useState } from "react";

export default function NumberCompare({ checkedItems, selectedSubOptions }) {
  console.log("check", selectedSubOptions);
  const [state, setState] = useState({
    series: [
      {
        name: "기준금리",
        data: [10, 40, 50],
      },
      {
        name: "ioer",
        data: [54, 51, 30],
      },
      {
        name: "qt 정책",
        data: [10, 20, 30],
      },
    ],
    options: {
      chart: {
        height: 250,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      //   title: {
      //     text: "Product Trends by Month",
      //     align: "left",
      //   },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: checkedItems.map((item) => item.title),
      },
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="line"
          height={250}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}
