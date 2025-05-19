import React, { useEffect, useState } from "react";
import axios from "axios";
import { useIndicator } from "../../../context/IndicatorContext";
import { economicIndicatorMap } from "../../../data/IntroduceOfIndicators";
import { economicEventChartData } from "../dummies/economicEventChartData";
import IndicatorChartCard from "./IndicatorChartCard";

export default function IndicatorSummary() {
  const { focusedIndicator } = useIndicator();
  const [data, setData] = useState(null);
  const [ranking, setRanking] = useState([]);

  const meta = focusedIndicator && economicIndicatorMap[focusedIndicator];

  useEffect(() => {
    if (!focusedIndicator) return;

    const fetchSummary = async () => {
      try {
        const summary = {
          expected: 3.5,
          actual: 3.2,
          unit: "%",
          industries: ["기술", "소비재"],
        };
        setData(summary);

        const res = await axios.get("/api/sensitivities/top", {});

        const found = res.data.find(
          (item) => item.indicatorCode === focusedIndicator
        );

        setRanking((found?.topStocks || []).slice(0, 3));
      } catch (err) {
        console.error("민감도 종목 데이터 로딩 실패:", err);
        setRanking([]);
      }
    };

    fetchSummary();
  }, [focusedIndicator]);

  useEffect(() => {
    if (!focusedIndicator || !meta || !data) return;

    const timer = setTimeout(() => {
      requestAnimationFrame(() => {
        const el = document.getElementById("indicator-summary-section");
        if (el) {
          const headerHeight = 50;
          const y =
            el.getBoundingClientRect().top + window.scrollY - headerHeight;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [focusedIndicator, meta, data]);

  if (!focusedIndicator || !meta || !data) return null;

  return (
    <div
      id="indicator-summary-section"
      className="bg-ivory p-6 rounded flex flex-col gap-6 rounded-2xl shadow-xl"
    >
      <div className="text-2xl font-extrabold text-black">
        {meta.name} ({focusedIndicator.replace(/_/g, " ")})
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-stretch">
        <div className="flex-1 flex flex-col gap-6 h-full">
          <p className="text-xl">{meta.description}</p>

          <div className="mt-auto flex gap-4">
            {[
              ["예상치", data.expected],
              ["발표치", data.actual],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex-1 bg-orange rounded-3xl py-14 text-ivory relative"
              >
                <div className="absolute top-4 left-4 text-lg font-bold">
                  {label}
                </div>
                <div className="absolute bottom-4 right-3 text-4xl font-bold flex items-center gap-1">
                  {value} {data.unit || ""}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-6 h-full">
          <div className="text-black">
            <span className="text-xl font-semibold">
              영향을 받는 주요 산업군
            </span>
            <div className="text-md mt-4">
              {data.industries.map((ind, i) => (
                <span
                  key={i}
                  className="inline-block px-4 py-2 bg-white rounded-2xl shadow font-medium mr-1"
                >
                  {ind}
                </span>
              ))}
            </div>
          </div>

          <div className="font-semibold text-black text-xl">
            영향력이 높은 종목 순위
          </div>
          <ul className="text-lg text-black">
            {ranking.map((item, i) => (
              <li key={i} className="flex justify-between py-1">
                <span>
                  {i + 1}. {item.stockName}
                </span>
                <span>
                  ${item.stockPrice?.toFixed(2)}
                  <span
                    className={`ml-1 ${
                      item.stockChange > 0 ? "text-red-md" : "text-blue-md"
                    }`}
                  >
                    ({item.stockChange > 0 ? "+" : ""}
                    {item.stockChange?.toFixed(2)}%)
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
