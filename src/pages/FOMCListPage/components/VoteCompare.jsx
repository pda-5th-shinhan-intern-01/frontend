import React, { useState, useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import { formatFomcTitle } from "./titleFormatter";

export default function VoteCompare({ checkedItems }) {
  const labelList = ["찬성", "반대", "중립"];
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
      custom: function ({ seriesIndex, dataPointIndex }) {
        const targetItem = parsedItems[dataPointIndex];
        if (!targetItem) return '<div style="padding: 6px;">해당 없음</div>';

        let members = [];
        let reason = "";

        if (seriesIndex === 0) {
          members = targetItem.parsed.votes.approve.members;
          reason = targetItem.parsed.votes.approve.reason;
        } else if (seriesIndex === 1) {
          members = targetItem.parsed.votes.oppose.members;
          reason = targetItem.parsed.votes.oppose.reason;
        } else if (seriesIndex === 2) {
          members = targetItem.parsed.votes.abstain.members;
          reason = targetItem.parsed.votes.abstain.reason;
        }

        if (!members || members.length === 0) {
          return '<div style="padding: 6px;">해당 없음</div>';
        }

        return `
            <div style="padding: 8px;">
              <div style="font-weight: bold;">${
                labelList[seriesIndex]
              } 명단</div>
              <hr />
              <ol style="margin: 0; padding: 0 8px;">
                ${members.map((name) => `<li>${name}</li>`).join("")}
              </ol>
              ${
                reason
                  ? `<hr /><div style="margin-top: 4px;">이유: ${reason}</div>`
                  : ""
              }
            </div>
          `;
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
    <div className="overflow-auto h-full w-full flex items-center">
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
