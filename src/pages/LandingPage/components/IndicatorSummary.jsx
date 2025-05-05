import React, { useEffect, useState } from "react";
import { useIndicator } from "../../../context/IndicatorContext";
import { economicIndicatorMap } from "../../../data/IntroduceOfIndicators";
import { indicatorSummaryData } from "../dummies/indicatorSummaryData.js";
import IndicatorChangeChart from "../../../components/IndicatorChangeChart";

export default function IndicatorSummary() {
  const { focusedIndicator } = useIndicator();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (focusedIndicator) {
      setData(indicatorSummaryData[focusedIndicator] || null);
    }
  }, [focusedIndicator]);

  const meta = focusedIndicator && economicIndicatorMap[focusedIndicator];
  const diff =
    data && typeof data.actual === "number" && typeof data.expected === "number"
      ? (data.actual - data.expected).toFixed(1)
      : null;

  if (!focusedIndicator || !meta || !data) return null;

  return (
    <div
      id="indicator-summary-section"
      className="bg-[color:var(--color-gray-light)] p-6 rounded flex flex-col gap-4"
    >
      <div className="flex gap-6">
        <div className="flex-1 flex flex-col gap-4">
          <div className="text-lg font-semibold text-[color:var(--color-black)]">
            {meta.name} ({focusedIndicator})
          </div>
          <p className="text-sm">{meta.description}</p>

          <div className="flex gap-4">
            <div className="flex-1 bg-[color:var(--color-gray-md)] p-3">
              <div className="text-xs mb-1">예상치</div>
              <div className="text-lg font-bold">
                +{data.expected}% {data.unit || ""}
              </div>
            </div>

            <div className="flex-1 bg-[color:var(--color-gray-md)] p-3">
              <div className="text-xs mb-1">발표치</div>
              <div className="text-lg font-bold flex items-center gap-1">
                +{data.actual}% {data.unit || ""}
                {diff !== null && (
                  <span
                    className={`text-sm ml-1 ${
                      parseFloat(diff) > 0
                        ? "text-[color:var(--color-red-md)]"
                        : "text-[color:var(--color-blue-md)]"
                    }`}
                  >
                    ({diff > 0 ? "+" : "-"}
                    {Math.abs(diff)}%p)
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="text-[color:var(--color-black)]">
            <span className="font-semibold">영향을 미치는 주요 산업군</span>
            <div className="text-sm mt-2">
              {data.industries.map((ind, i) => (
                <span
                  key={i}
                  className="inline-block text-[color:var(--color-black)] px-2 py-0.5 border mr-1"
                >
                  {ind}
                </span>
              ))}
            </div>
          </div>

          <div className="font-semibold mt-2 text-[color:var(--color-black)]">
            영향력이 높은 종목 순위
          </div>
          <ul className="text-sm text-[color:var(--color-black)]">
            {data.ranking.map((item, i) => (
              <li key={i} className="flex justify-between py-1">
                <span>
                  {i + 1}. {item.name}
                </span>
                <span>
                  {item.price}{" "}
                  <span
                    className={`ml-1 ${
                      item.change.includes("+")
                        ? "text-[color:var(--color-red-md)]"
                        : "text-[color:var(--color-blue-md)]"
                    }`}
                  >
                    ({item.change})
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-1/2 mt-4 bg-white rounded-xl">
          <IndicatorChangeChart indicator={meta.name} data={data.chartData} />
        </div>
      </div>
    </div>
  );
}
