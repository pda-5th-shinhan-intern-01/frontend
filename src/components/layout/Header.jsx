import React, { useState } from "react";
import { Link } from "react-router-dom";

const navigates = [
  { id: "/main", title: "홈" },
  { id: "/main/sectors", title: "종목섹터" },
  { id: "/main/fomcs", title: "FOMC회의" },
  { id: "/main/introduce-indicators", title: "경제지표 알아보기" },
  { id: "/main/heatmap", title: "섹터X경제지표" },
];

export default function Header() {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    //검색
    console.log(searchInput);
    setSearchInput("");
  };

  return (
    <div className="text-sm flex justify-between items-center h-full px-12 bg-white shadow-md z-10">
      {/* 로고 */}
      <Link to="/main" className="">
        로고
      </Link>
      {/* 네비게이션바 */}
      <div className="flex items-center gap-4">
        {navigates.map((el) => (
          <Link to={el.id} key={el.id}>
            {el.title}
          </Link>
        ))}
        <input
          className="bg-gray-light px-4 py-2 rounded-2xl text-sm"
          placeholder="종목명을 입력하세요"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(); // 원하는 함수 호출
            }
          }}
        />
      </div>
      <div></div>
    </div>
  );
}
