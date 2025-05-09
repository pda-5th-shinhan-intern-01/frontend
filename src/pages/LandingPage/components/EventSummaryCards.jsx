import React, { useEffect, useState } from "react";
import { useIndicator } from "../../../context/IndicatorContext";
import { economicIndicatorMap } from "../../../data/IntroduceOfIndicators";
import economicEventsData from "../dummies/economicEventsData";

export default function EventSummaryCards() {
  const [events, setEvents] = useState([]);
  const { setFocusedIndicator, focusedIndicator } = useIndicator();

  useEffect(() => {
    setEvents(economicEventsData);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!focusedIndicator) return;

    const timer = setTimeout(() => {
      requestAnimationFrame(() => {
        const el = document.getElementById("indicator-summary-section");
        if (el) {
          const headerHeight = 80;
          const y =
            el.getBoundingClientRect().top + window.scrollY - headerHeight;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [focusedIndicator]);

  return (
    <div className="p-4 bg-white w-full">
      <h2 className="text-lg font-semibold mb-4 text-[color:var(--color-black)]">
        다가오는 경제 이벤트
      </h2>

      <div className="flex overflow-x-auto gap-4 scrollbar-hide">
        {events.map((event, i) => {
          const meta = economicIndicatorMap[event.key];

          return (
            <div
              key={i}
              onClick={() => {
                if (focusedIndicator === event.key) {
                  setFocusedIndicator(null);
                  setTimeout(() => {
                    setFocusedIndicator(event.key);
                  }, 0);
                } else {
                  setFocusedIndicator(event.key);
                }
              }}
              className="relative flex-shrink-0 w-1/4 bg-[color:var(--color-gray-light)] rounded p-4 text-sm cursor-pointer hover:bg-gray-300"
            >
              <div className="font-semibold text-[color:var(--color-black)]">
                {meta?.name || event.key}
              </div>

              <div className="text-[11px] text-[color:var(--color-gray-md)]">
                {event.datetime}
              </div>

              <div className="mt-3 text-[color:var(--color-gray-md)]">
                {event.previous}
                {event.unit && (
                  <span className="ml-1">{event.unit}</span>
                )} →{" "}
                <span className="font-semibold text-[color:var(--color-black)]">
                  {event.expected}
                  {event.unit && <span className="ml-1">{event.unit}</span>}
                </span>
              </div>

              <div
                className={`font-semibold mt-1 ${
                  parseFloat(event.diff) >= 0
                    ? "text-[color:var(--color-red-md)]"
                    : "text-[color:var(--color-blue-md)]"
                }`}
              >
                {event.diff} 예상
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
