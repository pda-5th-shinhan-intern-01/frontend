import { useIndicator } from "../context/IndicatorContext";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollBackBtn() {
  const { lastClickedY } = useIndicator();

  return (
    <button
      className="fixed bottom-24 right-11 p-5 rounded-full shadow-lg"
      onClick={() => {
        const scrollTo = lastClickedY !== null ? lastClickedY : 0;
        window.scrollTo({ top: scrollTo, behavior: "smooth" });
      }}
    >
      <FaArrowUp />
    </button>
  );
}
