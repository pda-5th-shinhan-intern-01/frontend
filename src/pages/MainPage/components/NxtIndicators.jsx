import React, { useState, useEffect } from "react";
import { nxtIndicatorsData } from "../dummies/nxtIndicatorData";
import { IoIosCalendar } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";

export default function NxtIndicators() {
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
        <div className="flex gap-2 items-end">
          <h3 className="text-lg font-semibold">지표별 주가 변화</h3>
          <p className="text-sm">
            최근 경제지표 발표에서 주가가 얼마나 변동되었는지 확인하세요
          </p>
        </div>
        <div className="flex gap-2 items-end">
          <div className="flex items-center text-xs bg-gray-light py-1 px-4 rounded-lg">
            예상 영향도순
          </div>
          <div className="flex items-center text-xs bg-gray-light py-1 px-4 rounded-lg">
            민감도순
          </div>
          <div className="flex items-center text-xs bg-gray-light py-1 px-4 rounded-lg">
            최신순
          </div>
        </div>
      </div>
      {/* 카드 목록 */}
      <div className="flex gap-2 overflow-x-auto p-2">
        {events.map((event, id) => (
          <div
            key={id}
            className="flex flex-col gap-2 bg-white p-4 rounded-lg min-w-[350px] shadow-lg"
          >
            {/* 헤더 */}
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-semibold">{event.name}</h4>
              <p className="text-sm text-gray-md flex gap-1 items-center">
                <span>
                  <IoIosCalendar />
                </span>
                {event.date}
              </p>
            </div>
            {/* 이전치 -> 예상치 */}
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
            {/* 베타x변화율=예상 퍼포먼스 점수 */}
            <div>
              <p className="flex items-center text-sm">
                민감도 x 변화율 = 예상 퍼포먼스 점수
              </p>
              <h2 className="flex items-end text-sm font-semibold gap-1">
                {event.beta} x {event.nxtData - event.prevData} =
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
          </div>
        ))}
      </div>
    </div>
  );
}
