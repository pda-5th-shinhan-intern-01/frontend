import { topMoversData } from "../dummies/topMoversData";
import { useNavigate } from "react-router-dom";
export default function TopMovers() {
  const navigate = useNavigate();

  return (
    <div className="hidden xl:block fixed top-1/5 right-32 shadow-md rounded-3xl bg-white px-8 py-10 w-[30%] z-50">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-2xl text-black">Top Movers</h3>
        <button
          onClick={() => navigate("sectors")}
          className="text-gray-md hover:cursor-pointer text-sm"
        >
          더보기 &gt;
        </button>
      </div>

      <p className="text-gray-md mb-3 text-lg">
        가장 급변하는 주식을 만나보세요.
      </p>

      <ul className="mt-5 flex flex-col gap-4">
        {topMoversData.map((item, idx) => (
          <li key={idx} className="flex items-center gap-3">
            <img
              src={`${import.meta.env.VITE_STOCK_LOGO_URL}${item.ticker}.png`}
              className="w-12 h-12 bg-gray-light rounded-full"
            />
            <div className="flex-1">
              <div className="font-medium text-black">{item.name}</div>
              <div className="text-gray-md">
                ${item.price.toFixed(2)} ({item.change})
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
