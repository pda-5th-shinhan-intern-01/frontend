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
      className="bg-ivory p-6 rounded flex flex-col gap-6 rounded-2xl shadow-xl"
    >
      {/* 🔸 제목 한 줄 단독 배치 */}
      <div className="text-2xl font-extrabold text-black">
        {meta.name} ({focusedIndicator})
      </div>

      {/* 🔸 아래 내용은 두 열로 분리 */}
      <div className="flex flex-col lg:flex-row gap-8 items-stretch">
        {/* 왼쪽: 설명 + 수치 */}
        <div className="flex-1 flex flex-col gap-6 h-full">
          <p className="text-lg">{meta.description}</p>

          <div className="mt-auto flex gap-4">
            {[
              ["예상치", data.expected],
              ["발표치", data.actual],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex-1 bg-orange rounded-3xl py-14 text-ivory relative"
              >
                {/* 왼쪽 상단 레이블 */}
                <div className="absolute top-2 left-2 text-lg font-bold">
                  {label}
                </div>

                {/* 오른쪽 하단 수치 값 */}
                <div className="absolute bottom-2 right-2 text-5xl font-bold flex items-center gap-1">
                  {value}% {data.unit || ""}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 오른쪽: 산업군 + 종목 */}
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

      {/* 차트 카드 */}
      {economicEventChartData[focusedIndicator] && (
        <IndicatorChartCard
          indicator={focusedIndicator}
          data={economicEventChartData[focusedIndicator]}
        />
      )}
    </div>
  );
}
