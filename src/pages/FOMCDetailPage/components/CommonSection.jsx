import React from "react";

export default function CommonSection({ title, data, label }) {
  return (
    <div className="flex flex-col">
      <h2 className="font-semibold mb-3 text-2xl">{title}</h2>
      {/* 키워드 */}
      {data.keywords && (
        <div className="flex flex-col gap-1 mb-3">
          <div className="flex flex-row gap-3">
            {data.keywords.map((word, id) => (
              <div
                key={id}
                className="rounded-full text-sm py-1 px-4 bg-orange text-white"
              >
                {word}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="p-8 rounded-2xl bg-white border shadow-md border-gray-light flex flex-col gap-3">
        {Object.entries(data).map(([key, value]) => {
          return (
            value &&
            key !== "keywords" && (
              <div key={key} className="flex flex-col gap-1">
                <div className="font-semibold text-orange">{label[key]}</div>
                <div className="text-lg">{value}</div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}
