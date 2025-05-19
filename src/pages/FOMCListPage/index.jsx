import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCaretUp, FaCaretDown, FaChevronDown } from "react-icons/fa";
import { MdHorizontalRule, MdOutlineCancel } from "react-icons/md";
import CustomDateInput from "../../components/CustomDatePicker";
import PaginationBtn from "../../components/PaginationBtn";
import CompareModal from "./components/CompareModal";
import { motion, AnimatePresence } from "framer-motion";
import { fomcApi } from "../../api/fomcApi";
import { formatFomcTitle } from "./components/titleFormatter";
import miniLogo from "../../assets/miniLogo.png";

// FOMC 목록 페이지
export default function FOMCListPage() {
  const interestRateMap = ["Lower", "Freeze", "Raise"];
  const interestRateLabelMap = {
    Lower: "인하",
    Freeze: "동결",
    Raise: "인상",
  };
  const navigate = useNavigate();

  const [selectedRateIndex, setSelectedRateIndex] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc"); // desc, asc
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [searchDate, setSearchDate] = useState(false);
  const [fomcList, setFomcList] = useState([]);

  const ITEMS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const [compareModalOpen, setCompareModalOpen] = useState(false);

  // 전체 리스트 호출 api
  useEffect(() => {
    fomcApi.getFomcList().then((res) => {
      setFomcList(res.data);
    });
  }, []);

  // 검색 버튼 누를때
  useEffect(() => {
    if (searchDate) {
      setSearchDate(false);
    }
  }, [searchDate]);

  // 필터링 로직
  const filteredData = useMemo(() => {
    const filtered = fomcList.filter((item) => {
      const matchRate =
        selectedRateIndex !== null
          ? item.policyBias === interestRateMap[selectedRateIndex]
          : true;
      const matchStart = startDate ? item.date >= startDate : true;
      const matchEnd = endDate ? item.date <= endDate : true;
      return matchRate && matchStart && matchEnd;
    });

    return filtered.sort((a, b) =>
      sortOrder === "asc"
        ? a.date.localeCompare(b.date)
        : b.date.localeCompare(a.date)
    );
  }, [fomcList, selectedRateIndex, sortOrder, startDate, endDate]);

  // 페이지네이션
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  //비교하기
  const toggleChecked = (item) => {
    setCheckedItems((prev) => {
      const isChecked = prev.includes(item);
      const newItems = isChecked
        ? prev.filter((i) => i !== item)
        : [...prev, item];

      if (newItems.length === 0) {
        setCompareModalOpen(false);
      }

      return newItems;
    });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [sortOrder, selectedRateIndex, startDate, endDate]);

  return (
    <div className="flex flex-col">
      <div className="text-4xl font-bold">FOMC 회의</div>
      <div className="text-lg text-black  mb-6 mt-4">
        FOMC(연방공개시장위원회)는 미국 연준의 통화정책을 최종 결정하는 기구로,
        매 정례회의에서 기준금리를 인상·동결·인하합니다.
        <br />
        이렇게 발표되는 금리 결정은 은행 대출, 채권·주식 시장, 기업·가계의
        자금조달 비용 등에 즉각적인 영향을 미칩니다.
      </div>

      <div className="flex justify-between items-center mt-3">
        {/* 기간 -> 수정하고 공통 컴포넌트로 빼기 */}
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="cursor-pointer px-4 py-2 text-sm font-medium border border-gray-light rounded-md shadow-sm focus:outline-none focus:ring-0 text-center"
          />
          <span>~</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="cursor-pointer px-4 py-2 text-sm font-medium border border-gray-light rounded-md shadow-sm focus:outline-none focus:ring-0 text-center"
          />
          <div
            onClick={() => setSearchDate(true)}
            className="text-sm border-light bg-red-md w-[72px] flex justify-center text-white px-4 py-2 rounded-full cursor-pointer hover:bg-orange"
          >
            조회
          </div>
          <div
            onClick={() => {
              setStartDate("");
              setEndDate("");
              setSearchDate(true);
            }}
            className="text-sm border-light bg-gray-light w-[72px] flex justify-center text-black px-4 py-2 rounded-full cursor-pointer hover:bg-gray-300"
          >
            초기화{" "}
          </div>
        </div>

        <div className="flex flex-row gap-2 ">
          {/* 정렬 드롭다운 */}
          <div className="text-left">
            <div>
              <button
                type="button"
                className="cursor-pointer inline-flex justify-between items-center w-40 rounded-md border border-gray-light shadow-sm px-4 py-2 bg-white text-sm font-medium  hover:bg-gray-50"
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
                    className="px-4 py-2 hover:bg-gray-hover cursor-pointer "
                    onClick={() => {
                      setSortOrder("desc");
                      setSortDropdownOpen(false);
                    }}
                  >
                    최신순
                  </div>
                  <div
                    className="px-4 py-2 hover:bg-gray-hover cursor-pointer "
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
                className="cursor-pointer items-center inline-flex justify-between w-40 rounded-md border border-gray-light shadow-sm px-4 py-2 bg-white text-sm  hover:bg-gray-hover "
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {selectedRateIndex !== null
                  ? `금리 ${
                      interestRateLabelMap[interestRateMap[selectedRateIndex]]
                    }`
                  : "금리 전체"}
                <FaChevronDown />
              </button>
            </div>

            {dropdownOpen && (
              <div className="absolute z-10 mt-2 w-40 rounded-md ring-1 ring-gray-light shadow-lg bg-white">
                <div className="py-1 text-sm ">
                  <div
                    className="px-4 py-2 hover:bg-gray-hover cursor-pointer "
                    onClick={() => {
                      setSelectedRateIndex(null);
                      setDropdownOpen(false);
                    }}
                  >
                    전체
                  </div>

                  {interestRateMap.map((code, idx) => (
                    <div
                      key={code}
                      className="px-4 py-2 hover:bg-gray-hover cursor-pointer"
                      onClick={() => {
                        setSelectedRateIndex(idx);
                        setDropdownOpen(false);
                      }}
                    >
                      금리 {interestRateLabelMap[code]}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* 회의록 리스트 */}
      <div className="w-full mt-4 flex flex-col gap-2">
        {filteredData.length === 0 ? (
          <div className="text-center py-4 text-gray-md border-t border-b border-gray-md">
            해당 조건의 회의가 없습니다.
          </div>
        ) : (
          paginatedData.map((data, idx) => (
            <div
              key={idx}
              className="flex border border-gray-light rounded-2xl hover:bg-gray-hover cursor-pointer transition-colors duration-300 py-6 px-4"
            >
              {/* 첫 번째 컬럼: 체크박스 + 타이틀 */}
              <div className="flex w-4/6 items-start gap-5">
                <input
                  type="checkbox"
                  checked={checkedItems?.includes(data)}
                  onChange={() => toggleChecked(data)}
                  className="mt-1 accent-red-md cursor-pointer"
                  onClick={(e) => e.stopPropagation()}
                  disabled={checkedItems.length >= 3}
                />
                <div
                  onClick={() =>
                    navigate(`${data.id}`, {
                      state: {
                        start: fomcList[0].id,
                        end: fomcList[fomcList.length - 1].id,
                      },
                    })
                  }
                  className="w-full"
                >
                  <div>
                    <span className="text-gray-md mr-2">
                      [{formatFomcTitle(data.date)}]
                    </span>
                    {data.title}
                  </div>
                </div>
              </div>

              {/* 두 번째 컬럼: 날짜 */}
              <div className="flex items-center w-1/6">{data.date}</div>

              {/* 세 번째 컬럼: policyBias 아이콘 */}
              <div className="flex items-center justify-end w-1/6 mr-4">
                {data.policyBias === "Raise" ? (
                  <FaCaretUp className="text-red-md text-2xl" />
                ) : data.policyBias === "Lower" ? (
                  <FaCaretDown className="text-blue-md text-2xl" />
                ) : (
                  <MdHorizontalRule className="w-4" />
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* 비교하기 버튼 */}
      <AnimatePresence>
        {checkedItems?.length >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="z-30 bg-orange flex flex-row flex-wrap justify-between px-10 py-3
        fixed  bottom-[4vh] w-11/12 left-1/2 -translate-x-1/2 rounded-2xl shadow-lg text-white"
          >
            <div className="flex flex-row gap-5 flex-wrap">
              <AnimatePresence initial={false}>
                {checkedItems?.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="flex flex-row gap-2 items-center px-5 text-md"
                  >
                    {formatFomcTitle(item.date)}
                    <MdOutlineCancel
                      className="cursor-pointer text-lg"
                      onClick={() => toggleChecked(item)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="flex flex-row gap-10 flex-wrap">
              <button
                className="text-md text-ivory cursor-pointer"
                onClick={() => {
                  setCheckedItems([]);
                  setCompareModalOpen(false);
                }}
              >
                전체취소
              </button>
              <button
                className="border border-gray-light bg-white px-3 py-1 rounded-md shadow-lg text-md hover:bg-gray-hover cursor-pointer text-orange"
                onClick={() => setCompareModalOpen(true)}
              >
                비교하기 ({checkedItems.length}개)
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
