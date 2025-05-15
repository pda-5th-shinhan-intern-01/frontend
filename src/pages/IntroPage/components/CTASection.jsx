import { useNavigate } from "react-router-dom";

export default function CTASection() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen px-6 text-center flex flex-col justify-center items-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-black">
        HotSignal에서 경제지표의 신호를 확인해보세요
      </h2>

      <button
        className="mt-5 cursor-pointer text-xl bg-gray-light text-black-md font-bold px-6 py-4 hover:bg-white transition"
        onClick={() => {
          navigate("/main");
        }}
      >
        지금 시작하기
      </button>
    </div>
  );
}
