import React from "react";

export default function PolicyDecision({ data }) {
  return (
    <div className="flex flex-col">
      <h2 className="font-semibold mb-3 text-xl">정책 결정</h2>
      {/* 키워드 */}
      {data.keywords && (
        <div className="flex flex-col gap-1 mb-3">
          <div className="flex flex-row gap-3">
            {data.keywords.map((word) => (
              <div className="rounded-md border-1 text-sm py-1 px-2 text-white bg-blue-light">
                {word}
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="p-4 rounded-lg bg-white border border-gray-light flex flex-col">
        {data.ioer && (
          <div className="flex flex-col gap-1">
            <div className="text-gray-md font-semibold">
              - 초과지급준비금 (IOER)
            </div>
            <div className="pl-3">{data.ioer}</div>
          </div>
        )}

        {data.qt_policy && (
          <div className="flex flex-col gap-1">
            <div className="text-gray-md font-semibold">
              - 양적긴축 (QT) 정책
            </div>
            <div className="pl-3">
              <div className="text-black-md">
                <span className="font-bold">· 국채 </span>:{" "}
                {data.qt_policy.treasury}
              </div>{" "}
              <div className="text-black-md">
                <span className="font-bold">· 주택저당증권(MBS) </span>:{" "}
                {data.qt_policy.agency_debt_mbs}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
