import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import StockMiniChart from "../../../components/stockMiniChart";
import { IoIosCalendar } from "react-icons/io";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { currentIndicatorsData } from "../dummies/currentIndicatorData";

export default function CurrentIndicators() {
  const [events, setEvents] = useState([]);
  const [sortedBy, setSorterBy] = useState("민감도순");

  const tryGetCurrEvents = () => {
    // api 호출 함수
  };

  useEffect(() => {
    // tryGetCurrEvents();
    setEvents(currentIndicatorsData);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex-col gap-2 items-end">
          <h3 className="text-3xl font-semibold">최근 지표 이벤트 주가 변화</h3>
          <p className="text-sm mt-4">
            최근 경제지표 발표에서 주가가 얼마나 변동되었는지 확인하세요
          </p>
        </div>
        <div className="flex gap-2 items-end">
          <div
            onClick={() => {
              setSorterBy("민감도순");
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
              setSorterBy("최신순");
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
      <div className="flex gap-2 overflow-x-auto p-2 scrollbar-hide">
        {events.map((event, id) => (
          <div
            key={id}
            className="flex flex-col gap-2 bg-white p-4 rounded-lg min-w-[350px] shadow-lg"
          >
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-semibold">{event.name}</h4>
              <p className="text-sm text-gray-md flex gap-1 items-center">
                <span>
                  <IoIosCalendar />
                </span>
                {event.date}
              </p>
            </div>
            <div>
              <p className="flex items-center text-sm">
                예상치 <FaArrowRight className="text-xs" /> 발표치
              </p>
              <h2 className="flex items-end text-xl  font-semibold">
                <span className="flex items-center text-sm">
                  {event.prevData}% <FaArrowRight className="text-xs" />
                </span>
                {event.currData}%(
                <span
                  className={`${
                    event.currData > event.prevData
                      ? "text-red-md"
                      : event.currData == event.prevData
                      ? ""
                      : "text-blue-md"
                  }`}
                >
                  {event.currData - event.prevData}%
                </span>
                )
              </h2>
            </div>
            {/* 주가 차트를 이벤트 전후 3일을 보여주는 게 나을까, 이벤트 후 일주일을 보여주는 게 나을까 */}
            <div>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-md">주가반응</div>
                {event.chartData[event.chartData.length - 1].y >
                event.chartData[0].y ? (
                  <div className="flex gap-1 items-center text-red-md">
                    <FaArrowTrendUp />
                    {event.chartData[event.chartData.length - 1].y -
                      event.chartData[0].y}
                  </div>
                ) : event.chartData[event.chartData.length - 1].y ==
                  event.chartData[0].y ? (
                  <div className="flex gap-1 items-center">-</div>
                ) : (
                  <div className="flex gap-1 items-center text-blue-md">
                    <FaArrowTrendDown />
                    {event.chartData[event.chartData.length - 1].y -
                      event.chartData[0].y}
                  </div>
                )}
              </div>
              <StockMiniChart
                indicator={event.name}
                chartData={event.chartData}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
