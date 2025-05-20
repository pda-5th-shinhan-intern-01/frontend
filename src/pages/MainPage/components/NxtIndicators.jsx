import React, { useState, useEffect } from "react";
import { nxtIndicatorsData } from "../dummies/nxtIndicatorData";
import { FaArrowRight } from "react-icons/fa";
import Tooltip from "../../../components/Tooltip";
import { introduceService } from "../../../data/IntroduceOfService";
import HorizontalScroller from "../../../components/HorizontalScroller";
import { TbArrowBigDownFilled, TbArrowBigUpFilled } from "react-icons/tb";
import { stockApi } from "../../../api/stockApi";
import { formatNumberForMoney } from "../../../utils/formatNumber";
import dayjs from "dayjs";

function getPerformanceLabel(score) {
  if (score >= 1.0)
    return { label: "매우 긍정적 영향", className: "text-red-md" };
  if (score >= 0.5)
    return { label: "긍정적 영향", className: "text-orange-500" };
  if (score > -0.5) return { label: "영향 미미", className: "text-gray-md" };
  if (score >= -1.0) return { label: "부정적 영향", className: "text-blue-md" };
  return { label: "매우 부정적 영향", className: "text-blue-800" };
}

export default function NxtIndicators({ ticker }) {
  const [sortedBy, setSortedBy] = useState("performance");
  const [events, setEvents] = useState([]);

  const tryGetNxtEvents = async () => {
    try {
      const response = await stockApi.getStockWithNxtEvents(ticker, sortedBy);
      setEvents(response.data);
    } catch (error) {
      console.error("미래 지표 이벤트 조회 실패", error);
    }
  };

  useEffect(() => {
    tryGetNxtEvents();
  }, [sortedBy]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex-col gap-2 items-end">
          <h3 className="text-3xl font-semibold">
            예정된 지표 이벤트에 대한 주가 변화
          </h3>
          <p className="text-lg mt-4">
            예정된 경제지표 발표에 대해 주가가 어떻게 변화할 지 예상해보세요
          </p>
        </div>
        <div className="flex gap-2 items-end">
          <div
            onClick={() => {
              setSortedBy("performance");
            }}
            className={`flex items-center text-xs font-semibold py-2 px-4 rounded-full cursor-pointer ${
              sortedBy == "performance"
                ? "bg-red-md text-white"
                : "bg-gray-light text-black"
            }`}
          >
            예상 영향도순
          </div>
          <div
            onClick={() => {
              setSortedBy("score");
            }}
            className={`flex items-center text-xs font-semibold py-2 px-4 rounded-full cursor-pointer ${
              sortedBy == "score"
                ? "bg-red-md text-white"
                : "bg-gray-light text-black"
            }`}
          >
            민감도순
          </div>
          <div
            onClick={() => {
              setSortedBy("closet");
            }}
            className={`flex items-center text-xs font-semibold py-2 px-4 rounded-full cursor-pointer ${
              sortedBy == "closet"
                ? "bg-red-md text-white"
                : "bg-gray-light text-black"
            }`}
          >
            최신순
          </div>
        </div>
      </div>
      {/* 카드 목록 */}
      <HorizontalScroller>
        {events.map((event, id) => (
          <div
            key={id}
            className="hover:scale-102 duration-300 flex flex-col gap-2 bg-gray-light p-6 py-4 rounded-2xl min-w-[350px]"
          >
            {/* 헤더 */}
            <div className="flex-col mb-4">
              <p className="text-sm text-gray-md flex gap-1 items-start justify-end">
                {dayjs(`${event.date}T${event.time}`).format(
                  "YYYY년 MM월 DD일 HH:mm:ss"
                )}
              </p>
              <h4 className="text-2xl font-semibold">{event.indicatorCode}</h4>
            </div>
            {/* 이전치 -> 예상치 */}
            <div className="flex justify-between items-center">
              <div>
                <p className="flex items-center text-sm">
                  이전치 <FaArrowRight className="text-xs" /> 예상치
                </p>
                <h2 className="flex items-end text-lg font-semibold gap-1">
                  <span className="flex items-center text-sm">
                    {formatNumberForMoney(event.prev)}
                    {event.unit} <FaArrowRight className="text-xs" />
                  </span>
                  {formatNumberForMoney(event.forecast)}
                  {event.unit}
                  <span
                    className={`${
                      event.delta > 0
                        ? "text-red-md"
                        : event.delta == 0
                        ? ""
                        : "text-blue-md"
                    }`}
                  >
                    (
                    <span>{formatNumberForMoney(event.delta) > 0 && "+"} </span>
                    {formatNumberForMoney(event.delta)}
                    {event.unit})
                  </span>
                </h2>
              </div>

              <div className="flex bg-white h-16 w-16 rounded-full items-center justify-center text-4xl">
                {event.performance > 0 ? (
                  <div className="text-red-md">
                    <TbArrowBigUpFilled />
                  </div>
                ) : event.performance == 0 ? (
                  "-"
                ) : (
                  <div className="text-blue-md">
                    <TbArrowBigDownFilled />
                  </div>
                )}
              </div>
            </div>

            {/* 베타x변화율=예상 퍼포먼스 점수 */}
            <div>
              <p className="flex items-center text-sm">
                민감도 x 변화율 = 예상 퍼포먼스 점수
                <span className="text-lg">
                  <Tooltip content={introduceService.예상퍼포먼스} />
                </span>
              </p>
              <h2 className="flex items-end text-sm font-semibold gap-1">
                {formatNumberForMoney(event.score)} x{" "}
                {formatNumberForMoney(event.delta)}% =
                <span
                  className={`text-lg ${
                    event.performance > 0
                      ? "text-red-md"
                      : event.performance == 0
                      ? ""
                      : "text-blue-md"
                  }`}
                >
                  <span>
                    {formatNumberForMoney(event.performance) > 0 && "+"}
                  </span>
                  {formatNumberForMoney(event.performance)}
                </span>
              </h2>
            </div>

            {/* 정성적 평가 */}
            <div
              className={`text-sm font-semibold bg-white flex py-2 px-4 rounded-full justify-center items-center mt-4 ${
                getPerformanceLabel(event.performance).className
              }`}
            >
              {getPerformanceLabel(event.performance).label}
            </div>
          </div>
        ))}
      </HorizontalScroller>
    </div>
  );
}
