import React from "react";

export default function CompareModal({ checkedItems, setCompareModalOpen }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 w-[600px] max-w-full shadow-xl relative">
        <h2 className="text-lg font-bold mb-4 text-black-md">
          회의 한눈에 보기
        </h2>
        <ul className="space-y-2 text-sm text-black-md">
          {checkedItems.map((item, idx) => (
            <li key={idx}>
              {item.title} ({item.date}) - 금리 {item.interestRate}
            </li>
          ))}
        </ul>
        <button
          onClick={() => setCompareModalOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          x
        </button>
      </div>
    </div>
  );
}
