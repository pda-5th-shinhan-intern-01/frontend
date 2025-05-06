import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
const dummy = [
  {
    title: "2024년 5월 FOMC 회의록",
    date: "2024-05-01",
    interestRate: "동결",
  },
  {
    title: "2024년 6월 FOMC 회의록",
    date: "2024-06-12",
    interestRate: "인상",
  },
  {
    title: "2024년 7월 FOMC 회의록",
    date: "2024-07-31",
    interestRate: "인상",
  },
  {
    title: "2024년 9월 FOMC 회의록",
    date: "2024-09-18",
    interestRate: "동결",
  },
  {
    title: "2024년 11월 FOMC 회의록",
    date: "2024-11-06",
    interestRate: "인하",
  },
  {
    title: "2024년 12월 FOMC 회의록",
    date: "2024-12-18",
    interestRate: "동결",
  },
  {
    title: "2025년 1월 FOMC 회의록",
    date: "2025-01-29",
    interestRate: "인하",
  },
  {
    title: "2025년 3월 FOMC 회의록",
    date: "2025-03-19",
    interestRate: "동결",
  },
  {
    title: "2025년 5월 FOMC 회의록",
    date: "2025-05-01",
    interestRate: "인상",
  },
];

// FOMC 목록 페이지
export default function FOMCListPage() {
  const interestRateMap = ["인하", "동결", "인상"];
  const navigate = useNavigate();

  const [selectedRateIndex, setSelectedRateIndex] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // 필터링 로직
  const filteredData = useMemo(() => {
    return dummy.filter((item) => {
      const matchRate =
        selectedRateIndex !== null
          ? item.interestRate === interestRateMap[selectedRateIndex]
          : true;
      const matchStart = startDate ? item.date >= startDate : true;
      const matchEnd = endDate ? item.date <= endDate : true;
      return matchRate && matchStart && matchEnd;
    });
  }, [selectedRateIndex, startDate, endDate]);

  return (
    <div className="flex flex-col gap-3 p-4">
      <div className="font-bold text-xl">FOMC 회의</div>
      <div className="bg-gray-light p-3">
        FOMC(연방공개시장위원회)는 미국 연준의 통화정책을 최종 결정하는 기구로,
        매 정례회의에서 기준금리를 인상·동결·인하합니다.
        <br />
        이렇게 발표되는 금리 결정은 은행 대출, 채권·주식 시장, 기업·가계의
        자금조달 비용 등에 즉각적인 영향을 미칩니다.
      </div>

      <div className="flex justify-between items-center">
        {/* 기간 */}
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border px-2 py-1 rounded"
          />
          <span>~</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border px-2 py-1 rounded"
          />
        </div>

        {/* 금리 필터 버튼 */}
        <div className="flex gap-2">
          {interestRateMap.map((item, idx) => (
            <button
              key={idx}
              onClick={() =>
                setSelectedRateIndex(selectedRateIndex === idx ? null : idx)
              }
              className={`border px-3 py-1 rounded ${
                selectedRateIndex === idx ? "bg-gray-light" : "bg-white"
              }`}
            >
              금리 {item}
            </button>
          ))}
        </div>
      </div>

      {/* 회의록 리스트 */}
      <table className="w-full table-fixed">
        <colgroup>
          <col className="w-4/6" />
          <col className="w-1/6" />
          <col className="w-1/6" />
        </colgroup>
        <thead>
          <tr>
            <th className="text-left font-normal py-5">회의록 제목</th>
            <th className="text-left font-normal py-5">회의 날짜</th>
            <th className="text-right font-normal py-5">금리</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center py-4 text-gray-md">
                해당 조건의 회의가 없습니다.
              </td>
            </tr>
          ) : (
            filteredData.map((data, idx) => (
              <tr key={idx} onClick={() => navigate(`${idx}`)}>
                <td className="py-5">{data.title}</td>
                <td className="py-5">{data.date}</td>
                <td className="py-5 text-right">{data.interestRate}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
