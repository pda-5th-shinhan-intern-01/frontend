import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoCalendarOutline } from "react-icons/io5";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import CalendarSummaryGrid from "./CalendarSummaryGrid";
import IndicatorDetailTable from "./IndicatorDetailTable";
import { economicCalendarData } from "../dummies/economicCalendarData";

const days = ["월", "화", "수", "목", "금", "토", "일"];
const today = new Date();

export default function EconomicCalendar() {
  const [selectedDate, setSelectedDate] = useState(today);
  const [weeklyData, setWeeklyData] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

  const calculateWeek = (baseDate) => {
    const base = new Date(baseDate);
    const startOfWeek = new Date(base);
    startOfWeek.setDate(base.getDate() - base.getDay() + 1);
    return [...Array(7)].map((_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      const dateString = date.toISOString().split("T")[0];
      return {
        date: dateString,
        day: days[i],
        events: economicCalendarData.filter((ev) => ev.date === dateString),
      };
    });
  };

  useEffect(() => {
    setWeeklyData(calculateWeek(selectedDate));
  }, [selectedDate]);

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
      <h2 className="text-2xl font-bold mb-2 text-black">
        한 눈에 확인하는 주간 지표 캘린더
      </h2>
      <div className="flex items-center gap-2 relative" ref={calendarRef}>
        <button
          onClick={() => setSelectedDate(new Date())}
          className="cursor-pointer text-sm border border-[color:var(--color-gray-light)] px-3 py-2 rounded hover:bg-gray-light"
        >
          오늘
        </button>
        <button
          onClick={() => setShowCalendar((prev) => !prev)}
          className="cursor-pointer p-2 hover:bg-gray-light border border-[color:var(--color-gray-light)] rounded-lg"
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
        <span className="text-black font-medium ml-2">
          {weeklyData.length > 0 &&
            `${new Date(weeklyData[0].date).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })} - ${new Date(weeklyData[6].date).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}`}
        </span>
        {showCalendar && (
          <div className="absolute top-full mt-2 transform z-50">
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
