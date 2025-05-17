import React from "react";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";

export default function VoteCompare({ checkedItems }) {
  // checkedItems의 투표결과 조회 api 변할때마다 다시 그려져야함.

  const [state, setState] = useState({
    series: [
      {
        name: "찬성",
        data: [44, 55, 41],
      },
      {
        name: "반대",
        data: [53, 32, 33],
      },
      {
        name: "중립",
        data: [12, 17, 11],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        stackType: "100%",
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      //   title: {
      //     text: "100% Stacked Bar",
      //   },
      xaxis: {
        categories: checkedItems.map((item) => item.title),
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + "K";
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        offsetX: 40,
      },
    },
  });

  return (
    <div className="overflow-auto">
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="bar"
          height={250}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}
