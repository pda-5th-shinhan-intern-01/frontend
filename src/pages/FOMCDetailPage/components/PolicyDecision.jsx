import React from "react";

export default function PolicyDecision({ data }) {
  return (
    <div className="flex flex-col">
      <h2 className="font-semibold mb-3 text-2xl">정책 결정</h2>
      {/* 키워드 */}
      {data.keywords && (
        <div className="flex flex-col gap-1 mb-3">
          <div className="flex flex-row gap-3">
            {data.keywords.map((word, id) => (
              <div
                key={id}
                className="rounded-full border-1 text-sm py-1 px-4 text-white bg-orange"
              >
                {word}
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="p-8 rounded-2xl bg-white border shadow-md border-gray-light flex flex-col gap-3">
        {data.ioer && (
          <div className="flex flex-col gap-1">
            <div className="text-orange font-semibold">
              초과지급준비금 (IOER)
            </div>
            <div className="text-lg">{data.ioer}</div>
          </div>
        )}

        {data.qt_policy && (
          <div className="flex flex-col gap-1">
            <div className="text-orange font-semibold">양적긴축 (QT) 정책</div>
            <div className="pl-2 text-lg">
              <div className="">
                <span className="">· 국채</span>: {data.qt_policy.treasury}
              </div>{" "}
              <div className="">
                <span className="">· 주택저당증권(MBS)</span>:{" "}
                {data.qt_policy.agency_debt_mbs}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
