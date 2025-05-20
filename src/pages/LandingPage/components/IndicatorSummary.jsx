import React, { useEffect, useState } from "react";
import { useIndicator } from "../../../context/IndicatorContext";
import { economicIndicatorMap } from "../../../data/IntroduceOfIndicators";
import IndicatorChartCard from "../components/IndicatorChartCard";
import { indicatorToIndustryMap } from "../dummies/indicatorToIndustryMap";
import axios from "axios";

export default function IndicatorSummary() {
  const { focusedIndicator } = useIndicator();
  const [data, setData] = useState(null);
  const [ranking, setRanking] = useState([]);
  const [forecastData, setForecastData] = useState([]);

  const meta = focusedIndicator && economicIndicatorMap[focusedIndicator];

  useEffect(() => {
    if (!focusedIndicator) return;

    const fetchSummary = async () => {
      try {
        const latestRes = await axios.get(
          `/api/indicators/latest/${focusedIndicator}`
        );

        const summary = {
          expected: latestRes.data.next,
          actual: latestRes.data.prev,
          unit: latestRes.data.unit || "%",
        };
        setData(summary);

        const res = await axios.get("/api/sensitivities/top");
        const found = res.data.find(
          (item) => item.indicatorCode === focusedIndicator
        );
        setRanking((found?.topStocks || []).slice(0, 3));
      } catch (err) {
        console.error("요약 정보 로딩 실패:", err);
        setRanking([]);
      }
    };

    fetchSummary();
  }, [focusedIndicator]);

  useEffect(() => {
    if (!focusedIndicator) return;

    const fetchForecast = async () => {
      try {
        const res = await axios.get(
          `/api/indicators/${focusedIndicator}/forecast`
        );
        const result = res.data[0];

        const parsed = (result?.value || []).map((item) => ({
          month: item.date,
          actual: item.actual,
          expected: item.expected,
        }));

        setForecastData(parsed);
      } catch (err) {
        console.error("지표 차트 데이터 로딩 실패:", err);
        setForecastData([]);
      }
    };

    fetchForecast();
  }, [focusedIndicator]);

  useEffect(() => {
    if (!focusedIndicator || !meta || !data) return;

    const timer = setTimeout(() => {
      requestAnimationFrame(() => {
        const el = document.getElementById("indicator-summary-section");
        if (el) {
          const header = document.querySelector("header");
          const headerHeight = header?.offsetHeight || 64;
          const y =
            el.getBoundingClientRect().top + window.scrollY - headerHeight - 20;

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
      className="bg-ivory border-1 border-gray-light shadow-lg p-8 flex flex-col gap-6 rounded-3xl"
    >
      <div className="text-3xl font-semibold text-black">
        {meta.name} ({focusedIndicator.replace(/_/g, " ")})
      </div>
      <p className="text-lg">{meta.description}</p>
      <div className="flex flex-col lg:flex-row gap-8 items-stretch">
        <div className="flex-1 flex flex-col gap-6 h-full">
          <div className="text-black">
            <span className="text-xl font-semibold">
              영향을 받는 주요 산업군
            </span>
            <div className="text-md mt-2">
              {(indicatorToIndustryMap[focusedIndicator] || []).map(
                (industry, i) => (
                  <span
                    key={i}
                    className="inline-block px-4 py-2 bg-orange rounded-full text-white font-medium mr-1"
                  >
                    {industry}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-6 h-full">
          <div className="mt-auto flex gap-4">
            {[
              ["예상치", data.expected],
              ["발표치", data.actual],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex-1 bg-orange rounded-2xl py-14 text-ivory relative"
              >
                <div className="absolute top-4 left-4 text-lg font-bold">
                  {label}
                </div>
                <div className="absolute bottom-4 right-3 text-4xl font-bold flex items-center gap-1">
                  {value.toFixed(1)} {data.unit || ""}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-col w-full">
        <div className="font-semibold text-black text-xl">
          영향력이 높은 종목 순위
        </div>
        <ul className="text-lg text-black mt-2">
          {ranking.map((item, i) => (
            <li key={i} className="flex justify-between py-1">
              <span>
                {i + 1}. {item.stockName} ({item.stockTicker})
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

      {forecastData.length > 0 && (
        <IndicatorChartCard indicator={focusedIndicator} data={forecastData} />
      )}
    </div>
  );
}
