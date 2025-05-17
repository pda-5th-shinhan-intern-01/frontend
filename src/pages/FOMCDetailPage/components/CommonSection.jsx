import React from "react";

export default function CommonSection({ title, data, label }) {
  return (
    <div className="flex flex-col">
      <h2 className="font-semibold mb-3 text-xl">{title}</h2>
      {/* 키워드 */}
      {data.keywords && (
        <div className="flex flex-col gap-1 mb-3">
          <div className="flex flex-row gap-3">
            {data.keywords.map((word) => (
              <div className="rounded-md  text-sm py-1 px-2 bg-blue-light text-white">
                {word}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="p-4 rounded-lg bg-white border border-gray-light flex flex-col gap-3">
        {Object.entries(data).map(([key, value]) => {
          return (
            value &&
            key !== "keywords" && (
              <div key={key} className="flex flex-col gap-1">
                <div className="text-gray-md font-semibold">- {label[key]}</div>
                <div className="pl-3">{value}</div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}
