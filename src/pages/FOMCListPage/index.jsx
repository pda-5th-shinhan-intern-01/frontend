import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCaretUp, FaCaretDown, FaChevronDown } from "react-icons/fa";
import { MdHorizontalRule, MdOutlineCancel } from "react-icons/md";
import CustomDateInput from "../../components/CustomDatePicker";
import PaginationBtn from "../../components/PaginationBtn";
import dummy from "./dummies/dummy.json";
import CompareModal from "./components/CompareModal";

// FOMC 목록 페이지
export default function FOMCListPage() {
  const interestRateMap = ["인하", "동결", "인상"];
  const navigate = useNavigate();

  const [selectedRateIndex, setSelectedRateIndex] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc"); // desc, asc
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [searchDate, setSearchDate] = useState(false);

  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const [compareModalOpen, setCompareModalOpen] = useState(false);

  // 필터링 로직
  const filteredData = useMemo(() => {
    const filtered = dummy.filter((item) => {
      const matchRate =
        selectedRateIndex !== null
          ? item.interestRate === interestRateMap[selectedRateIndex]
          : true;
      const matchStart = startDate ? item.date >= startDate : true;
      const matchEnd = endDate ? item.date <= endDate : true;
      return matchRate && matchStart && matchEnd;
    });
    setSearchDate(false);

    return filtered.sort((a, b) =>
      sortOrder === "asc"
        ? a.date.localeCompare(b.date)
        : b.date.localeCompare(a.date)
    );
  }, [selectedRateIndex, searchDate, sortOrder]);

  // 페이지네이션
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  // 비교하기
  const toggleChecked = (item) => {
    setCheckedItems((prev) => {
      const isChecked = prev?.includes(item);
      if (isChecked) {
        return prev.filter((i) => i !== item);
      } else {
        return [...prev, item];
      }
    });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [sortOrder, selectedRateIndex, startDate, endDate]);

  return (
    <div className="flex flex-col gap-3 p-4">
      <div className="font-bold text-xl text-black-md">FOMC 회의</div>
      <div className="bg-gray-light px-5 py-3 text-black-md text-sm">
        FOMC(연방공개시장위원회)는 미국 연준의 통화정책을 최종 결정하는 기구로,
        매 정례회의에서 기준금리를 인상·동결·인하합니다.
        <br />
        이렇게 발표되는 금리 결정은 은행 대출, 채권·주식 시장, 기업·가계의
        자금조달 비용 등에 즉각적인 영향을 미칩니다.
      </div>

      <div className="flex justify-between items-center">
        {/* 기간 -> 수정하고 공통 컴포넌트로 빼기 */}
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="text-black-md px-4 py-2 text-sm font-medium border border-gray-light rounded-md shadow-sm focus:outline-none focus:ring-0 text-center"
          />
          <span>~</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="text-black-md px-4 py-2 text-sm font-medium border border-gray-light rounded-md shadow-sm focus:outline-none focus:ring-0 text-center"
          />
          <div
            onClick={() => setSearchDate(true)}
            className="text-black-md text-sm border border-gray-light px-2 py-1 rounded-2xl cursor-pointer hover:bg-gray-hover"
          >
            조회{" "}
          </div>
          <div
            onClick={() => {
              setStartDate("");
              setEndDate("");
              setSearchDate(true);
            }}
            className="text-black-md text-sm border border-gray-light px-2 py-1 rounded-2xl cursor-pointer hover:bg-gray-hover"
          >
            초기화{" "}
          </div>
        </div>

        <div className="flex flex-row gap-2">
          {/* 정렬 드롭다운 */}
          <div className="text-left">
            <div>
              <button
                type="button"
                className="inline-flex justify-between w-40 rounded-md border border-gray-light shadow-sm px-4 py-2 bg-white text-sm font-medium text-black-md hover:bg-gray-50"
                onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
              >
                {sortOrder === "desc" ? "최신순" : "오래된 순"}
                <FaChevronDown />
              </button>
            </div>

            {sortDropdownOpen && (
              <div className="absolute z-10 mt-2 w-40 rounded-md ring-1 ring-gray-light shadow-lg bg-white">
                <div className="py-1 text-sm ">
                  <div
                    className="px-4 py-2 hover:bg-gray-hover cursor-pointer text-black-md"
                    onClick={() => {
                      setSortOrder("desc");
                      setSortDropdownOpen(false);
                    }}
                  >
                    최신순
                  </div>
                  <div
                    className="px-4 py-2 hover:bg-gray-hover cursor-pointer text-black-md"
                    onClick={() => {
                      setSortOrder("asc");
                      setSortDropdownOpen(false);
                    }}
                  >
                    오래된 순
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 금리 드롭다운 */}

          <div className="text-left">
            <div>
              <button
                type="button"
                className="inline-flex justify-between w-40 rounded-md border border-gray-light shadow-sm px-4 py-2 bg-white text-sm  hover:bg-gray-hover text-black-md"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {selectedRateIndex !== null
                  ? `금리 ${interestRateMap[selectedRateIndex]}`
                  : "금리 전체"}
                <FaChevronDown />
              </button>
            </div>

            {dropdownOpen && (
              <div className="absolute z-10 mt-2 w-40 rounded-md ring-1 ring-gray-light shadow-lg bg-white">
                <div className="py-1 text-sm ">
                  <div
                    className="px-4 py-2 hover:bg-gray-hover cursor-pointer text-black-md"
                    onClick={() => {
                      setSelectedRateIndex(null);
                      setDropdownOpen(false);
                    }}
                  >
                    전체
                  </div>
                  {interestRateMap.map((rate, idx) => (
                    <div
                      key={idx}
                      className="px-4 py-2 hover:bg-gray-hover cursor-pointer text-black-md"
                      onClick={() => {
                        setSelectedRateIndex(idx);
                        setDropdownOpen(false);
                      }}
                    >
                      금리 {rate}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* 회의록 리스트 */}
      <table className="w-full table-fixed">
        <colgroup>
          <col className="w-4/6" />
          <col className="w-1/6" />
          <col className="w-1/6" />
        </colgroup>

        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center py-4 text-gray-md ">
                해당 조건의 회의가 없습니다.
              </td>
            </tr>
          ) : (
            paginatedData.map((data, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-hover cursor-pointer transition-colors duration-300"
              >
                <td className="py-5 px-4">
                  <div className="flex items-center gap-5">
                    <input
                      type="checkbox"
                      checked={checkedItems?.includes(data)}
                      onChange={() => toggleChecked(data)}
                      className="mt-1 accent-gray-500"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      disabled={checkedItems.length >= 3}
                    />
                    <div onClick={() => navigate(`${idx}`)} className="w-full">
                      <div className="text-black-md">{data.title}</div>
                      <div className="text-sm text-gray-md">
                        ❤️‍🔥 : 경제 전망에 대한 불확실성 증가, 연준은 물가와 고용
                        목표 모두를 주시
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-5 text-black-md">{data.date}</td>
                <td className="py-5 flex justify-center">
                  {data.interestRate === "인상" ? (
                    <FaCaretUp className="text-red-md" />
                  ) : data.interestRate === "인하" ? (
                    <FaCaretDown className="text-blue-md" />
                  ) : (
                    <MdHorizontalRule className="w-3" />
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* 비교하기 버튼 */}
      {checkedItems?.length >= 1 && (
        <div
          className={`z-30 bg-gray-light flex flex-row justify-between px-16 py-1 fixed left-0 bottom-4 w-full rounded-lg shadow-lg
          transition-all duration-300 ease-in-out transform
          ${
            checkedItems.length >= 1
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-0 pointer-events-none"
          }
        `}
        >
          <div className="flex flex-row gap-5">
            {checkedItems?.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-row gap-2 items-center px-5 text-sm "
              >
                {item.title}{" "}
                <MdOutlineCancel
                  className="cursor-pointer text-lg"
                  onClick={() => toggleChecked(item)}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-row gap-4">
            <button className="text-sm" onClick={() => setCheckedItems([])}>
              전체취소
            </button>
            <button
              className="border border-gray-light bg-white px-6 py-2 rounded-md shadow-lg text-sm hover:bg-gray-hover"
              onClick={() => setCompareModalOpen(true)}
            >
              비교하기 ({checkedItems.length}개)
            </button>
          </div>
        </div>
      )}

      {compareModalOpen && checkedItems.length >= 1 && (
        <CompareModal
          checkedItems={checkedItems}
          setCompareModalOpen={setCompareModalOpen}
          setCheckedItems={setCheckedItems}
        />
      )}

      {/* 페이지네이션 버튼 */}
      <PaginationBtn
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
