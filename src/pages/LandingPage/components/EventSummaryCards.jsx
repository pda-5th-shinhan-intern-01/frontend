import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { useIndicator } from "../../../context/IndicatorContext";
import { economicIndicatorMap } from "../../../data/IntroduceOfIndicators";
import HorizontalScroller from "../../../components/HorizontalScroller";
import { FaArrowRight } from "react-icons/fa";

export default function EventSummaryCards() {
  const [events, setEvents] = useState([]);
  const { setFocusedIndicator, focusedIndicator, setLastClickedY } =
    useIndicator();

  useEffect(() => {
    axios
      .get("/api/indicators")
      .then((res) => {
        const now = new Date();

        const sorted = res.data.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );

        const sliced = sorted
          .filter((e) => new Date(e.date) >= now)
          .slice(0, 10);

        const ensured = sliced.length >= 5 ? sliced : sorted.slice(0, 5);
        const mapped = ensured.map((e) => {
          const parsePercent = (val) =>
            typeof val === "string" && val.includes("%")
              ? parseFloat(val.replace("%", ""))
              : val === "" || val == null
              ? null
              : Number(val);

          const prev = parsePercent(e.prevValue);
          const expected = parsePercent(e.expectedValue);

          return {
            key: e.indicator.code,
            name: e.indicator.name,
            datetime: dayjs(e.date).format("YYYY-MM-DD"),
            time: e.time,
            previous: prev,
            expected: expected,
            unit: e.unit,
            diff:
              typeof expected === "number" && typeof prev === "number"
                ? expected - prev
                : null,
          };
        });

        setEvents(mapped);
      })
      .catch((err) => {
        console.error("이벤트 목록 가져오기 실패:", err);
      });

    window.scrollTo(0, 0);
  }, []);

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
    <div className="relative bg-white w-full py-6">
      <h2 className="leading-snug mt-8 text-4xl font-semibold text-black">
        중요한 발표만 쏙쏙
        <br />
        최신 일정, 놓치지 마세요
      </h2>

      <div className="relative mt-10 ">
        <HorizontalScroller scrollOffset={300}>
          {events.map((event, i) => {
            const meta = economicIndicatorMap[event.key];
            return (
              <div
                key={`${event.key}-${event.datetime}`}
                onClick={() => handleClick(event.key)}
                className="relative flex-shrink-0 w-1/3 bg-gray-light rounded-xl py-4 px-6 text-lg cursor-pointer hover:scale-105 duration-300"
              >
                {/* 이벤트명 */}
                <div className="font-semibold text-black">
                  {meta?.name || event.name}
                </div>

                {/* 이벤트 발표일 */}
                <div className="text-[12px] text-gray-md">
                  {event.datetime}{" "}
                  {event.time && <span className="ml-1">{event.time}</span>}
                </div>

                {/* 이벤트 이전치 -> 예상치 */}
                <p className="mt-3 flex items-center text-sm">
                  이전치 <FaArrowRight className="text-xs" /> 예상치
                </p>
                <div className=" text-gray-md">
                  {typeof event.previous === "number"
                    ? event.previous.toFixed(1)
                    : "-"}
                  {event.unit && <span className="ml-1">{event.unit}</span>} →{" "}
                  <span className="font-semibold text-black">
                    {typeof event.expected === "number"
                      ? event.expected.toFixed(1)
                      : "-"}
                    {event.unit && <span className="ml-1">{event.unit}</span>}
                  </span>
                </div>

                <div
                  className={`text-sm font-semibold bg-white flex py-2 px-4 rounded-full justify-center items-center mt-4 ${
                    event.diff > 0
                      ? "text-red-md"
                      : event.diff < 0
                      ? "text-blue-md"
                      : ""
                  }`}
                >
                  {event.diff != null ? `${event.diff.toFixed(1)}% 예상` : "-"}
                </div>
              </div>
            );
          })}
        </HorizontalScroller>
      </div>
    </div>
  );
}
