import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchModel from "../SearchModel";
import logo from "../../assets/logo.png";
import logoBlack from "../../assets/logo-black.png";

const navigates = [
  { id: "/main", title: "홈" },
  { id: "/main/sectors", title: "종목섹터" },
  { id: "/main/fomcs", title: "FOMC회의" },
  { id: "/main/heatmap", title: "섹터X경제지표" },
];

export default function Header({ isOrange }) {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleSearch = async () => {
    if (!searchInput.trim()) return;
    setIsLoading(true);

    try {
      const isEnglish = /^[a-zA-Z]+$/.test(searchInput);
      const params = isEnglish
        ? { ticker: searchInput }
        : { name: searchInput };

      const res = await axios.get("/api/stocks", { params });
      setSearchResult(res.data || []);
      setSelectedIndex(0);
    } catch (err) {
      console.error("검색 실패:", err);
      setSearchResult([]);
    } finally {
      setIsLoading(false);
      setIsModalOpen(true);
      setSearchInput("");
    }
  };

  return (
    <div
      className={`w-full h-full transition-colors duration-300 ${
        isOrange ? "bg-orange" : "bg-white shadow-md"
      }`}
    >
      <div className="max-w-[1280px] mx-auto h-16 flex justify-between items-center">
        <Link to="/main" className="flex items-center">
          <img
            src={isOrange ? logo : logoBlack}
            alt="로고"
            className="h-10 w-auto object-contain"
          />
        </Link>

        <div className="flex items-center">
          <div className="relative ml-4">
            <input
              className="w-[225px] bg-gray-light px-4 py-2 rounded-2xl text-sm outline-none"
              placeholder="종목명을 입력하세요"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (!searchInput.trim()) return;

                  if (isModalOpen && searchResult[selectedIndex]) {
                    window.location.href = `/main/sectors/${searchResult[selectedIndex].ticker}`;
                  } else {
                    handleSearch();
                  }
                } else if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setSelectedIndex((prev) =>
                    Math.min(prev + 1, searchResult.length - 1)
                  );
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setSelectedIndex((prev) => Math.max(prev - 1, 0));
                }
              }}
            />

            {isModalOpen && (
              <div className="absolute top-full left-0 mt-1 w-full z-50">
                <SearchModel
                  results={searchResult}
                  isLoading={isLoading}
                  selectedIndex={selectedIndex}
                  onClose={() => {
                    setIsModalOpen(false);
                    setSearchResult([]);
                    setSelectedIndex(-1);
                  }}
                />
              </div>
            )}
          </div>

          {navigates.map((el) => (
            <Link
              to={el.id}
              key={el.id}
              className={`ml-10 transition-colors ${
                isOrange
                  ? "text-white hover:text-black"
                  : "text-black hover:text-orange"
              }`}
            >
              {el.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
