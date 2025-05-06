import React, { useState } from "react";
import { topMoversData } from "../dummies/topMoversData";
import { useNavigate } from "react-router-dom";

export default function TopMovers() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("actual");
  const data = topMoversData[activeTab];

  return (
    <div className="bg-white p-4 w-full text-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-lg text-[color:var(--color-black)]">
          Top Movers
        </h3>
        <button
          onClick={() => {
            navigate("sectors");
          }}
          className="text-[color:var(--color-gray-md)] hover:cursor-pointer text-xs"
        >
          더보기 &gt;
        </button>
      </div>

      <p className="text-[color:var(--color-gray-md)] mb-3 text-sm">
        가장 급변하는 주식을 만나보세요.
      </p>

      <div className="flex gap-2 mb-3">
        <button
          className={`px-3 py-1 rounded border hover:cursor-pointer ${
            activeTab === "actual"
              ? "bg-[color:var(--color-black)] text-white"
              : "text-[color:var(--color-black)]"
          }`}
          onClick={() => setActiveTab("actual")}
        >
          실제 등락
        </button>
        <button
          className={`px-3 py-1 rounded border hover:cursor-pointer ${
            activeTab === "expected"
              ? "bg-[color:var(--color-black)] text-white"
              : "text-[color:var(--color-black)]"
          }`}
          onClick={() => setActiveTab("expected")}
        >
          예상 퍼포먼스
        </button>
      </div>

      <ul className="flex flex-col gap-4">
        {data.map((item, idx) => (
          <li key={idx} className="flex items-center gap-3">
            <img
              src={`${import.meta.env.VITE_STOCK_LOGO_URL}${item.ticker}.png`}
              className="w-12 h-12 bg-[color:var(--color-gray-light)] rounded-full"
            />
            <div className="flex-1">
              <div className="font-medium text-[color:var(--color-black)]">
                {item.name}
              </div>
              <div className="text-[color:var(--color-gray-md)]">
                ${item.price.toFixed(2)} ({item.change})
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
