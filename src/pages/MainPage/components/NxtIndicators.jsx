import React, { useState, useEffect } from "react";
import { nxtIndicatorsData } from "../dummies/nxtIndicatorData";
import { FaArrowRight } from "react-icons/fa";
import Tooltip from "../../../components/Tooltip";
import { introduceService } from "../../../data/IntroduceOfService";
import HorizontalScroller from "../../../components/HorizontalScroller";
import { TbArrowBigDownFilled, TbArrowBigUpFilled } from "react-icons/tb";

function getPerformanceLabel(score) {
  if (score >= 1.0)
    return { label: "매우 긍정적 영향", className: "text-red-md" };
  if (score >= 0.5)
    return { label: "긍정적 영향", className: "text-orange-500" };
  if (score > -0.5) return { label: "영향 미미", className: "text-gray-md" };
  if (score >= -1.0) return { label: "부정적 영향", className: "text-blue-md" };
  return { label: "매우 부정적 영향", className: "text-blue-800" };
}

export default function NxtIndicators() {
  const [sortedBy, setSortedBy] = useState("예상 영향도순");
  const [events, setEvents] = useState([]);

  const tryGetNxtEvents = () => {
    // api 호출 함수
  };

  useEffect(() => {
    // tryGetNxtEvents();
    setEvents(nxtIndicatorsData);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex-col gap-2 items-end">
          <h3 className="text-3xl font-semibold">
            예정된 지표 이벤트에 대한 주가 변화
          </h3>
          <p className="text-lg mt-4">
            최근 경제지표 발표에서 주가가 얼마나 변동되었는지 확인하세요
          </p>
        </div>
        <div className="flex gap-2 items-end">
          <div
            onClick={() => {
              setSortedBy("예상 영향도순");
            }}
            className={`flex items-center text-xs font-semibold py-2 px-4 rounded-full cursor-pointer ${
              sortedBy == "예상 영향도순"
                ? "bg-red-md text-white"
                : "bg-gray-light text-black"
            }`}
          >
            예상 영향도순
          </div>
          <div
            onClick={() => {
              setSortedBy("민감도순");
            }}
            className={`flex items-center text-xs font-semibold py-2 px-4 rounded-full cursor-pointer ${
              sortedBy == "민감도순"
                ? "bg-red-md text-white"
                : "bg-gray-light text-black"
            }`}
          >
            민감도순
          </div>
          <div
            onClick={() => {
              setSortedBy("최신순");
            }}
            className={`flex items-center text-xs font-semibold py-2 px-4 rounded-full cursor-pointer ${
              sortedBy == "최신순"
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
            className="hover:scale-102 duration-300 flex flex-col gap-2 bg-gray-light p-6 rounded-2xl min-w-[350px]"
          >
            {/* 헤더 */}
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-2xl font-semibold">{event.name}</h4>
              <p className="text-sm text-gray-md flex gap-1 items-center">
                {event.date}
              </p>
            </div>
            {/* 이전치 -> 예상치 */}
            <div className="flex justify-between items-center">
              <div>
                <p className="flex items-center text-sm">
                  이전치 <FaArrowRight className="text-xs" /> 예상치
                </p>
                <h2 className="flex items-end text-lg font-semibold gap-1">
                  <span className="flex items-center text-sm">
                    {event.prevData}% <FaArrowRight className="text-xs" />
                  </span>
                  {event.nxtData}%
                  <span
                    className={`${
                      event.nxtData > event.prevData
                        ? "text-red-md"
                        : event.nxtData == event.prevData
                        ? ""
                        : "text-blue-md"
                    }`}
                  >
                    ({event.nxtData - event.prevData}%)
                  </span>
                </h2>
              </div>

              <div className="flex bg-white h-16 w-16 rounded-full items-center justify-center text-4xl">
                {event.beta * (event.nxtData - event.prevData) > 0 ? (
                  <div className="text-red-md">
                    <TbArrowBigUpFilled />
                  </div>
                ) : event.beta * (event.nxtData - event.prevData) == 0 ? (
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
                {event.beta} x {event.nxtData - event.prevData}% =
                <span
                  className={`text-lg ${
                    event.beta * (event.nxtData - event.prevData) > 0
                      ? "text-red-md"
                      : event.beta * (event.nxtData - event.prevData) == 0
                      ? ""
                      : "text-blue-md"
                  }`}
                >
                  {event.beta * (event.nxtData - event.prevData)}
                </span>
              </h2>
            </div>

            {/* 정성적 평가 */}
            <div
              className={`text-sm font-semibold bg-white flex py-2 px-4 rounded-full justify-center items-center mt-4 ${
                getPerformanceLabel(
                  event.beta * (event.nxtData - event.prevData)
                ).className
              }`}
            >
              {
                getPerformanceLabel(
                  event.beta * (event.nxtData - event.prevData)
                ).label
              }
            </div>
          </div>
        ))}
      </HorizontalScroller>
    </div>
  );
}
