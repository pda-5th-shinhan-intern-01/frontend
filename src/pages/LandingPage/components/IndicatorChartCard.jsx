import ReactApexChart from "react-apexcharts";
import { economicIndicatorMap } from "../../../data/IntroduceOfIndicators";

export default function IndicatorChartCard({ indicator, data }) {
  const { name = indicator } = economicIndicatorMap[indicator] || {};

  const categories = data.map((item) => {
    const date = new Date(item.month);
    const year = String(date.getFullYear()).slice(2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${year}.${month}`;
  });

  const expectedSeries = data.map((item) => item.expected);
  const actualSeries = data.map((item) => item.actual);

  const chartOptions = {
    chart: {
      type: "bar",
      height: 250,
    },
    plotOptions: {
      bar: {
        columnWidth: "75%",
        endingShape: "rounded",
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories,
      labels: { rotate: -45 },
    },
    yaxis: {
      labels: {
        formatter: (val) => `${val.toFixed(1)}%`,
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `${val}%`,
      },
    },
    colors: ["#00aaf0", " #f5f5f5"],
  };

  const chartSeries = [
    { name: "예상치", data: expectedSeries },
    { name: "발표치", data: actualSeries },
  ];

  return (
    <div className="bg-white mt-4 rounded shadow p-4">
      <h3 className="text-sm font-semibold mb-2">
        {name} 월별 발표치 vs 예상치
      </h3>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={250}
      />
    </div>
  );
}
