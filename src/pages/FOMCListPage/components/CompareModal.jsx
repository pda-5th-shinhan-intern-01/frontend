import React, { useEffect, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import KeywordCompare from "./KeywordCompare";
import NumberCompare from "./NumberCompare";
import VoteCompare from "./VoteCompare";
import { motion } from "framer-motion";

export default function CompareModal({
  checkedItems,
  setCompareModalOpen,
  setCheckedItems,
}) {
  const [compareIdx, setCompareIdx] = useState(0);
  const [selectedSubOptions, setSelectedSubOptions] = useState([0, 1, 2]);

  const compareIdxList = ["키워드 비교", "투표 결과", "수치 비교"];
  const subOptionMap = {
    0: ["경제 여건 평가", "통화 정책 결정", "향후 정책 전망"],
    // 2: ["기준 금리", "ioer", "qt 정책"],
  };
  const handleSubOptionToggle = (id) => {
    setSelectedSubOptions((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };
  //   useEffect(() => {
  //     if (checkedItems.length == 0) {
  //       console.log("close");
  //       setCompareModalOpen(false);
  //     }
  //   }, [checkedItems]);

  return (
    <div className="fixed inset-0 z-10 flex items-end justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-black/50"
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
        className="relative bg-white rounded-2xl p-10 w-11/12 h-2/3 bottom-[15vh] max-w-full shadow-xl flex flex-col gap-4 items-center overflow-hidden"
      >
        <div className="flex flex-row justify-between w-full items-center">
          <h2 className="text-2xl font-bold text-black-md">회의 한눈에 보기</h2>
          <button
            onClick={() => setCompareModalOpen(false)}
            className="text-gray-500 hover:text-black-md"
          >
            <MdOutlineCancel className="w-7 h-7" />
          </button>
        </div>

        {/* 상단 비교 타입 버튼 */}
        <div className="flex flex-row gap-2 w-full">
          {compareIdxList.map((item, id) => (
            <button
              className={`border px-3 rounded-lg ${
                compareIdx === id ? "bg-gray-light" : "bg-white"
              }`}
              key={id}
              onClick={() => {
                setCompareIdx(id);
                setSelectedSubOptions([0, 1, 2]);
              }}
            >
              {item}
            </button>
          ))}
        </div>

        {/* ✅ 비교 내용 스크롤 영역 */}
        <div className="w-full flex-1 overflow-y-auto pr-1">
          {compareIdx === 0 && (
            <KeywordCompare
              checkedItems={checkedItems}
              selectedSubOptions={selectedSubOptions}
            />
          )}
          {compareIdx === 1 && <VoteCompare checkedItems={checkedItems} />}
          {compareIdx === 2 && (
            <NumberCompare
              checkedItems={checkedItems}
              selectedSubOptions={selectedSubOptions}
            />
          )}
        </div>

        {/* 상세 옵션 버튼*/}
        <div className="flex flex-row gap-2 flex-wrap  pt-3 ">
          {subOptionMap[compareIdx]?.map((item, id) => (
            <button
              key={id}
              onClick={() => handleSubOptionToggle(id)}
              className={`border px-3 rounded-lg ${
                selectedSubOptions.includes(id) ? "bg-gray-light" : "bg-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
