import React, { useState } from "react";
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

  const compareIdxList = ["키워드 비교", "투표 결과", "수치 비교"];

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
        className="relative bg-white rounded-2xl p-8 w-11/12 h-2/3 bottom-[15vh] max-w-full shadow-xl flex flex-col gap-4 items-center overflow-hidden"
      >
        <div className="flex-col w-full">
          <div className="flex flex-row justify-between w-full items-center">
            <h2 className="text-2xl font-bold">회의 한눈에 보기</h2>
            <button
              onClick={() => setCompareModalOpen(false)}
              className="text-gray-500 hover:"
            >
              <MdOutlineCancel className="w-7 h-7" />
            </button>
          </div>

          {/* 상단 비교 타입 버튼 */}
          <div className="flex flex-row gap-2 w-full mt-4">
            {compareIdxList.map((item, id) => (
              <button
                className={`px-4 py-2 rounded-full ${
                  compareIdx === id ? "bg-red-md text-white" : "bg-gray-light"
                }`}
                key={id}
                onClick={() => {
                  setCompareIdx(id);
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full flex-1 overflow-y-auto pr-1 items-center">
          {compareIdx === 0 && <KeywordCompare checkedItems={checkedItems} />}
          {compareIdx === 1 && <VoteCompare checkedItems={checkedItems} />}
          {compareIdx === 2 && <NumberCompare checkedItems={checkedItems} />}
        </div>
      </motion.div>
    </div>
  );
}
