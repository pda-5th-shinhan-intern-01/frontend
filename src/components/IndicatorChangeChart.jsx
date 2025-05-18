import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { eventApi } from "../api/eventApi";

export default function IndicatorChangeChart({ indicator }) {
  const [state, setState] = useState(null);

  useEffect(() => {
    const getIndicatorChart = async () => {
      try {
        const response = await eventApi.getEventChart(indicator);
        const rawData = response.data || [];

        const transformedData = rawData.map((item) => ({
          x: new Date(item.date).getTime(),
          y: item.value,
        }));

        setState({
          series: [
            {
              name: indicator,
              data: transformedData,
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
            colors: ["#FF8341"],
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
                formatter: (val) => `${val.toFixed(2)}`,
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
                formatter: (val) => `${val.toFixed(2)}%`,
              },
            },
            xaxis: {
              type: "datetime",
            },
          },
        });
      } catch (error) {
        console.error("지표 차트 조회 실패", error);
      }
    };

    getIndicatorChart();
  }, [indicator]);

  return (
    <div>
      {state ? (
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="area"
          height={350}
        />
      ) : (
        <div className="h-[350px] bg-gray-100 animate-pulse rounded" />
      )}
    </div>
  );
}
