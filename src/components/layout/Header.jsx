import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchModel from "../SearchModel";
import logo from "../../assets/logo.png";
import logoBlack from "../../assets/logo-black.png";

// 더미 종목 데이터
const dummyStocks = [
  {
    name: "마이크로소프트",
    ticker: "MSFT",
    price: 412.56,
    change: 3.57,
    volume: 18000000,
    marketCap: 280,
  },
  {
    name: "애플",
    ticker: "AAPL",
    price: 191.12,
    change: 1.54,
    volume: 22000000,
    marketCap: 270,
  },
  {
    name: "엔비디아",
    ticker: "NVDA",
    price: 927.35,
    change: 6.74,
    volume: 30000000,
    marketCap: 160,
  },
  {
    name: "브로드컴",
    ticker: "AVGO",
    price: 1342.78,
    change: -1.27,
    volume: 6500000,
    marketCap: 50,
  },
  {
    name: "오라클",
    ticker: "ORCL",
    price: 121.49,
    change: 5.21,
    volume: 9000000,
    marketCap: 38,
  },
  {
    name: "IBM",
    ticker: "IBM",
    price: 168.23,
    change: 1.55,
    volume: 7000000,
    marketCap: 12,
  },
  {
    name: "액센츄어 A",
    ticker: "ACN",
    price: 297.84,
    change: -2.12,
    volume: 8000000,
    marketCap: 22,
  },
  {
    name: "시스코",
    ticker: "CSCO",
    price: 48.71,
    change: 4.48,
    volume: 17000000,
    marketCap: 21,
  },
  {
    name: "어도비",
    ticker: "ADBE",
    price: 512.67,
    change: 2.19,
    volume: 6200000,
    marketCap: 27,
  },
  {
    name: "AMD",
    ticker: "AMD",
    price: 152.33,
    change: -3.21,
    volume: 35000000,
    marketCap: 19,
  },
];

// 네비게이션 메뉴
const navigates = [
  { id: "/main", title: "홈" },
  { id: "/main/sectors", title: "종목섹터" },
  { id: "/main/fomcs", title: "FOMC회의" },
  { id: "/main/heatmap", title: "섹터X경제지표" },
];

export default function Header() {
  const location = useLocation();
  const isMainPage = location.pathname === "/main";

  const [isTop, setIsTop] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY < 10);
    };

    if (isMainPage) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setIsTop(false);
    }
  }, [isMainPage]);

  const isOrange = isMainPage && isTop;

  return (
    <div
      className={`w-full h-full transition-colors duration-500 ${
        isOrange ? "bg-orange" : "bg-white shadow-md"
      }`}
    >
      <div className="max-w-[1280px] mx-auto h-16 flex justify-between items-center transition-all duration-500">
        <Link to="/main" className="flex items-center">
          <img
            src={isOrange ? logo : logoBlack}
            alt="로고"
            className="h-10 w-auto object-contain transition-all duration-300"
          />
        </Link>

        <div className="flex items-center">
          <input
            className="bg-gray-light px-4 py-2 rounded-2xl text-sm outline-none"
            placeholder="종목명을 입력하세요"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSearchInput("");
                setSearchResult(dummyStocks);
                setIsModalOpen(true);
              }
            }}
          />

          {navigates.map((el) => (
            <Link
              to={el.id}
              key={el.id}
              className={`ml-10 transition-colors duration-500 ${
                isOrange ? "text-white" : "text-black"
              }`}
            >
              {el.title}
            </Link>
          ))}

          {isModalOpen && (
            <div className="relative">
              <div className="absolute top-full left-0 mt-1 w-full z-50">
                <SearchModel
                  results={searchResult}
                  onClose={() => setIsModalOpen(false)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
