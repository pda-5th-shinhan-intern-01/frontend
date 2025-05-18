import React from "react";
import ReactApexChart from "react-apexcharts";
import { useState, useMemo } from "react";

export default function NumberCompare({ checkedItems, selectedSubOptions }) {
  // parsedItems 생성
  const parsedItems = useMemo(() => {
    return checkedItems.map((item) => ({
      ...item,
      parsed: JSON.parse(item.summary),
    }));
  }, [checkedItems]);

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
      <div id="chart" className="mx-auto h-2/3">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="line"
          height={300}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}
