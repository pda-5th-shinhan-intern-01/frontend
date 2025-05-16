import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import KeywordCompare from "./KeywordCompare";
import NumberCompare from "./NumberCompare";
import VoteCompare from "./VoteCompare";

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
    2: ["기준 금리", "ioer", "qt 정책"],
  };
  const handleSubOptionToggle = (id) => {
    setSelectedSubOptions((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="fixed inset-0 z-10 flex items-end justify-center bg-black/60">
      <div className="bg-white rounded-4xl p-6 w-10/12 h-3/5 bottom-20 max-w-full shadow-xl relative flex flex-col gap-3">
        <h2 className="text-lg font-bold text-black-md">회의 한눈에 보기</h2>

        {/* 비교 옵션 버튼 */}
        <div className="flex flex-row gap-2">
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

        {/* 세부 비교 옵션 버튼 */}
        <div className="flex flex-row gap-2 flex-wrap">
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

        {/* 키워드 비교 */}
        {compareIdx == 0 && <KeywordCompare checkedItems={checkedItems} />}

        {/* 투표결과 비교 */}
        {compareIdx == 1 && <VoteCompare checkedItems={checkedItems} />}

        {/* 수치 비교 */}
        {compareIdx == 2 && (
          <NumberCompare
            checkedItems={checkedItems}
            selectedSubOptions={selectedSubOptions}
          />
        )}

        <button
          onClick={() => {
            setCompareModalOpen(false);
            setCheckedItems([]);
          }}
          className="absolute top-3 right-3 text-gray-500 hover:text-black-md"
        >
          <MdOutlineCancel className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
