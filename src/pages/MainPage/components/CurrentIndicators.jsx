import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import StockMiniChart from "../../../components/StockMiniChart";
import { IoIosCalendar } from "react-icons/io";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { currentIndicatorsData } from "../dummies/currentIndicatorData";
import HorizontalScroller from "../../../components/HorizontalScroller";
import { stockApi } from "../../../api/stockApi";

export default function CurrentIndicators({ ticker }) {
  const [events, setEvents] = useState([]);
  const [sortedBy, setSortedBy] = useState("민감도순");

  const tryGetCurrEvents = async () => {
    const response = await stockApi.getStockChangeWithSesitivity(ticker);
    console.log(response.data);
    const parsed = response.data.map((item) => ({
      name: item.indicatorCode,
      date: new Date(item.date)
        .toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replaceAll(". ", "년 ")
        .replace(".", "일"),
      prevData: item.prev.toFixed(2),
      currData: item.actual.toFixed(2),
      chartData: item.price.map((p) => ({
        x: p.date,
        y: p.close,
      })),
    }));

    setEvents(parsed);
  };

  useEffect(() => {
    tryGetCurrEvents();
    // setEvents(currentIndicatorsData);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex-col gap-2 items-end">
          <h3 className="text-3xl font-semibold">
            최근 지표 이벤트에 대한 주가 변화
          </h3>
          <p className="text-lg mt-4">
            최근 경제지표 발표에서 주가가 얼마나 변동되었는지 확인하세요
          </p>
        </div>
        <div className="flex gap-2 items-end">
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
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-2xl font-semibold">{event.name}</h4>
              <p className="text-sm flex gap-1 items-center">{event.date}</p>
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
                  {(event.currData - event.prevData).toFixed(2)}%
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
                  <div className="flex gap-1 text-2xl items-center justify-center text-red-md">
                    <FaArrowTrendUp />
                    {(
                      event.chartData[event.chartData.length - 1].y -
                      event.chartData[0].y
                    ).toFixed(2)}
                  </div>
                ) : event.chartData[event.chartData.length - 1].y ==
                  event.chartData[0].y ? (
                  <div className="flex gap-1 items-center">-</div>
                ) : (
                  <div className="flex gap-1 items-center text-blue-md text-2xl">
                    <FaArrowTrendDown />
                    {(
                      event.chartData[event.chartData.length - 1].y -
                      event.chartData[0].y
                    ).toFixed(2)}
                  </div>
                )}
              </div>

              <StockMiniChart chartData={event.chartData} />
            </div>
          </div>
        ))}
      </HorizontalScroller>
    </div>
  );
}
