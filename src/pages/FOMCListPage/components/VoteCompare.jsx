import React, { useState, useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import { formatFomcTitle } from "./titleFormatter";

export default function VoteCompare({ checkedItems }) {
  // parsedItems 생성
  const parsedItems = useMemo(() => {
    return checkedItems.map((item) => ({
      ...item,
      parsed: JSON.parse(item.summary),
    }));
  }, [checkedItems]);

  // 투표 결과 시리즈 생성
  const voteSeries = useMemo(() => {
    const approveCounts = parsedItems.map(
      (item) => item.parsed.votes.approve.count || 0
    );
    const opposeCounts = parsedItems.map(
      (item) => item.parsed.votes.oppose.count || 0
    );
    const abstainCounts = parsedItems.map(
      (item) => item.parsed.votes.abstain.count || 0
    );

    return [
      {
        name: "찬성",
        data: approveCounts,
      },
      {
        name: "반대",
        data: opposeCounts,
      },
      {
        name: "중립",
        data: abstainCounts,
      },
    ];
  }, [parsedItems]);

  const chartOptions = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      stackType: "100%",
    },
    colors: ["#00aaf0", "#fe4700", "#4fcb7c"],
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
    },
    xaxis: {
      categories: parsedItems.map((item) => formatFomcTitle(item.date)),
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + "명";
        },
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      offsetX: 40,
      markers: {
        shape: "circle",
        width: 12,
        height: 12,
        radius: 12,
      },
    },
  };

  return (
    <div className="overflow-auto h-full w-full">
      <div id="chart" className="w-full mx-auto">
        <ReactApexChart
          options={chartOptions}
          series={voteSeries}
          type="bar"
          height={280}
        />
      </div>
    </div>
  );
}
