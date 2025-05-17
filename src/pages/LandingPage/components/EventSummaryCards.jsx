import { useEffect, useState } from "react";
import { useIndicator } from "../../../context/IndicatorContext";
import { economicIndicatorMap } from "../../../data/IntroduceOfIndicators";
import economicEventsData from "../dummies/economicEventsData";

export default function EventSummaryCards() {
  const [events, setEvents] = useState([]);
  const { setFocusedIndicator, focusedIndicator, setLastClickedY } =
    useIndicator();

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
          const headerHeight = 50;
          const y =
            el.getBoundingClientRect().top + window.scrollY - headerHeight;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [focusedIndicator]);

  const handleClick = (eventKey) => {
    const currentY = window.scrollY;

    if (focusedIndicator === eventKey) {
      setFocusedIndicator(null);
      setTimeout(() => {
        setLastClickedY(currentY);
        setFocusedIndicator(eventKey);
      }, 0);
    } else {
      setLastClickedY(currentY);
      setFocusedIndicator(eventKey);
    }
  };

  return (
    <div className="bg-white w-full py-6">
      <h2 className="leading-snug mt-14 text-4xl font-semibold text-black">
        중요한 발표만 쏙쏙
        <br />
        다음 일정, 놓치지 마세요
      </h2>

      <div className="mt-8 flex overflow-x-auto gap-4 scrollbar-hide">
        {events.map((event, i) => {
          const meta = economicIndicatorMap[event.key];

          return (
            <div
              key={i}
              onClick={() => handleClick(event.key)}
              className="relative flex-shrink-0 w-1/4 bg-gray-light rounded-xl py-4 px-6 text-lg cursor-pointer hover:bg-white"
            >
              <div className="font-semibold text-black">
                {meta?.name || event.key}
              </div>

              <div className="text-[12px] text-gray-md">{event.datetime}</div>

              <div className="mt-3 text-gray-md">
                {event.previous}
                {event.unit && (
                  <span className="ml-1">{event.unit}</span>
                )} →{" "}
                <span className="font-semibold text-black">
                  {event.expected}
                  {event.unit && <span className="ml-1">{event.unit}</span>}
                </span>
              </div>

              <div
                className={`font-semibold mt-1 ${
                  parseFloat(event.diff) >= 0 ? "text-red-md" : "text-blue-md"
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
