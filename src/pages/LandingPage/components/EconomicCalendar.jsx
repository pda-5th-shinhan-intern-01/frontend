import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoCalendarOutline } from "react-icons/io5";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import CalendarSummaryGrid from "./CalendarSummaryGrid";
import IndicatorDetailTable from "./IndicatorDetailTable";
import axios from "axios";

const days = ["월", "화", "수", "목", "금"];
const today = new Date();

export default function EconomicCalendar() {
  const [selectedDate, setSelectedDate] = useState(today);
  const [calendarData, setCalendarData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

  useEffect(() => {
    axios
      .get("/api/indicators/calendar")
      .then((res) => {
        setCalendarData(res.data || []);
        console.log(res.data);
      })
      .catch((err) => {
        console.error("경제 캘린더 로딩 실패:", err);
      });
  }, []);

  const calculateWeek = (baseDate, fullData) => {
    const base = new Date(baseDate);
    const startOfWeek = new Date(base);
    startOfWeek.setDate(base.getDate() - base.getDay() + 1);

    return [...Array(5)].map((_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      const dateString = date.toISOString().split("T")[0];

      return {
        date: dateString,
        day: days[i],
        events: fullData.filter((ev) => ev.date === dateString),
      };
    });
  };

  useEffect(() => {
    if (calendarData.length === 0) return;
    const week = calculateWeek(selectedDate, calendarData);
    setWeeklyData(week);
  }, [selectedDate, calendarData]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="mb-4 py-12">
      <h2 className="text-3xl font-bold mb-2 text-black">
        놓치면 아쉬운 <span className="text-orange">이번 주 지표</span> 모음
      </h2>

      <div className="mt-8 flex items-center gap-2 relative" ref={calendarRef}>
        <button
          onClick={() => setSelectedDate(new Date())}
          className="text-lg font-semibold cursor-pointer border border-[color:var(--color-gray-light)] px-4 py-2 rounded-xl hover:bg-gray-light"
        >
          오늘
        </button>
        <button
          onClick={() => setShowCalendar((prev) => !prev)}
          className="cursor-pointer p-3 hover:bg-gray-light border border-[color:var(--color-gray-light)] rounded-xl"
          aria-label="날짜 선택"
        >
          <IoCalendarOutline className="text-xl text-gray-md" />
        </button>
        <button
          onClick={() =>
            setSelectedDate(
              (prev) => new Date(prev.setDate(prev.getDate() - 7))
            )
          }
          className="p-2 hover:cursor-pointer"
        >
          <FaChevronLeft className="text-sm text-gray-md" />
        </button>
        <button
          onClick={() =>
            setSelectedDate(
              (prev) => new Date(prev.setDate(prev.getDate() + 7))
            )
          }
          className="p-2 hover:cursor-pointer"
        >
          <FaChevronRight className="text-sm text-gray-md" />
        </button>
        <span className="text-xl text-black font-semibold ml-2">
          {weeklyData.length > 0 &&
            `${new Date(weeklyData[0].date).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })} - ${new Date(
              weeklyData[weeklyData.length - 1].date
            ).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}`}
        </span>

        {showCalendar && (
          <div className="absolute top-full mt-2 w-full max-w-[420px] z-50">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
                setShowCalendar(false);
              }}
              inline
              calendarStartDay={1}
            />
          </div>
        )}
      </div>

      <CalendarSummaryGrid weeklyData={weeklyData} />
      <IndicatorDetailTable weeklyData={weeklyData} />
    </div>
  );
}
