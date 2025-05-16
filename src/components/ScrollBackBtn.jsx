import { useIndicator } from "../context/IndicatorContext";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollBackBtn() {
  const { lastClickedY } = useIndicator();

  return (
    <button
      className="font-bold text-sm fixed bottom-5 right-11 p-3 rounded-full shadow-lg"
      onClick={() => {
        const scrollTo = lastClickedY !== null ? lastClickedY : 0;
        window.scrollTo({ top: scrollTo, behavior: "smooth" });
      }}
    >
      TOP
    </button>
  );
}
