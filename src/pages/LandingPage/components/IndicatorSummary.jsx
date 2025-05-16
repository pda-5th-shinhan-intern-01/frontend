import React, { useEffect, useState } from "react";
import { useIndicator } from "../../../context/IndicatorContext";
import { economicIndicatorMap } from "../../../data/IntroduceOfIndicators";
import { indicatorSummaryData } from "../dummies/indicatorSummaryData";
import { economicEventChartData } from "../dummies/economicEventChartData";
import IndicatorChartCard from "./IndicatorChartCard";

export default function IndicatorSummary() {
  const { focusedIndicator } = useIndicator();
  const [data, setData] = useState(null);

  const meta = focusedIndicator && economicIndicatorMap[focusedIndicator];

  useEffect(() => {
    if (focusedIndicator) {
      setData(indicatorSummaryData[focusedIndicator] || null);
    }
  }, [focusedIndicator]);

  useEffect(() => {
    if (!data) return;
    const el = document.getElementById("indicator-summary-section");
    if (el) {
      const offset = 50;
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      setTimeout(() => {
        window.scrollTo({ top: y, behavior: "smooth" });
      }, 50);
    }
  }, [data]);

  if (!focusedIndicator || !meta || !data) return null;

  return (
    <div
      id="indicator-summary-section"
      className="bg-ivory p-6 rounded flex flex-col gap-4 rounded-2xl shadow-xl"
    >
      <div className="flex flex-col lg:flex-row gap-8 items-stretch">
        <div className="flex-1 flex flex-col gap-6 h-full">
          <div>
            <div className="text-2xl font-extrabold text-black">
              {meta.name} ({focusedIndicator})
            </div>
            <p className="text-lg mt-5">{meta.description}</p>
          </div>

          <div className="mt-auto flex gap-4">
            {[
              ["예상치", data.expected],
              ["발표치", data.actual],
            ].map(([label, value], i) => (
              <div
                key={label}
                className="flex-1 bg-orange rounded-3xl px-3 py-6 text-ivory"
              >
                <div className="text-xl font-bold mb-1">{label}</div>
                <div className="text-3xl font-bold flex items-center gap-1">
                  {value}% {data.unit || ""}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-6 h-full">
          <div className="text-black">
            <span className="text-lg font-semibold">
              영향을 미치는 주요 산업군
            </span>
            <div className="text-md mt-2">
              {data.industries.map((ind, i) => (
                <span key={i} className="inline-block px-2 py-0.5 border mr-1">
                  {ind}
                </span>
              ))}
            </div>
          </div>

          <div className="font-semibold text-black text-lg">
            영향력이 높은 종목 순위
          </div>
          <ul className="text-lg text-black">
            {data.ranking.map((item, i) => (
              <li key={i} className="flex justify-between py-1">
                <span>
                  {i + 1}. {item.name}
                </span>
                <span>
                  {item.price}
                  <span
                    className={`ml-1 ${
                      item.change.includes("+") ? "text-red-md" : "text-blue-md"
                    }`}
                  >
                    ({item.change})
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {economicEventChartData[focusedIndicator] && (
        <IndicatorChartCard
          indicator={focusedIndicator}
          data={economicEventChartData[focusedIndicator]}
        />
      )}
    </div>
  );
}
