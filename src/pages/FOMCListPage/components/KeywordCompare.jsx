import React from "react";

export default function KeywordCompare({ checkedItems }) {
  const keywords = [
    "zasdfasf",
    "asdfasdf",
    "asdf",
    "asdfasdfasdf",
    "asd",
    "asdf",
    "asdfasadfsfasdf",
    "asdf",
    "as",
    "asdfasdf",
    "asdf",
    "zasdfasf",
    "asdfasdf",
    "asdf",
    "asdfasdfasdf",
    "asd",
    "asdf",
    "asdfasadfsfasdf",
    "asdf",
  ];
  return (
    <div className="flex flex-row justify-evenly">
      {checkedItems.map((item, id) => (
        <div className="flex flex-col items-center max-w-1/2" key={id}>
          <div className="font-bold text-lg">{item.title}</div>
          {/* 각 회의록 별 키워드 뭉치 */}
          <div className="p-5 flex flex-row gap-3 flex-wrap h-4/5 overflow-y-auto justify-center ">
            {keywords.map((keyword, idx) => (
              <span key={idx} className="bg-amber-300 rounded-xl px-3 py-1">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
