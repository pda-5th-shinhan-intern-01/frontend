import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";

export default function Votes({ data }) {
  const labelList = ["찬성", "반대", "중립"];

  const chartOptions = useMemo(
    () => ({
      chart: {
        type: "bar",
        height: 0,
        stacked: true,
        stackType: "100%",
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      colors: ["#fe4700", "#00aaf0", "#f6fdec"],
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      xaxis: {
        categories: [1],
      },
      tooltip: {
        custom: function ({ series, seriesIndex }) {
          let members = [];
          let reason = "";

          if (seriesIndex === 0) {
            members = data.approve.members;
            reason = data.approve.reason;
          } else if (seriesIndex === 1) {
            members = data.oppose.members;
            reason = data.oppose.reason;
          } else if (seriesIndex === 2) {
            members = data.abstain.members;
            reason = data.abstain.reason;
          }

          if (!members || members.length === 0) {
            return '<div style="padding: 6px;">해당 없음</div>';
          }

          return `
          <div style="padding: 8px;">
            <div>${labelList[seriesIndex]} 명단</div>
            <hr />
            <ol style="margin: 0; padding: 0 8px;">
              ${members.map((name) => `<li>${name}</li>`).join("")}
            </ol>
            ${
              reason
                ? `<hr /><div style="margin-top: 4px;">이유 : ${reason}</div>`
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
        position: "top",
        horizontalAlign: "left",
        offsetX: 40,
      },
    }),
    [data]
  );

  const series = useMemo(
    () => [
      {
        name: "찬성",
        data: [data.approve.count],
      },
      {
        name: "반대",
        data: [data.oppose.count],
      },
      {
        name: "중립",
        data: [data.abstain.count],
      },
    ],
    [data]
  );

  return (
    <div className="flex flex-col">
      <h2 className="font-semibold mb-3 text-2xl">투표 결과</h2>
      <div className="p-4 rounded-lg bg-white border border-gray-light flex flex-col">
        <div id="chart">
          <ReactApexChart
            options={chartOptions}
            series={series}
            type="bar"
            height={150}
          />
        </div>
      </div>
    </div>
  );
}
