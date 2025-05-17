import React, { useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function HorizontalScroller({ children, scrollOffset = 400 }) {
  const scrollRef = useRef();
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, clientWidth, scrollWidth } = el;
    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  const scrollByOffset = (offset) => {
    scrollRef.current?.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {showLeft && (
        <button
          onClick={() => scrollByOffset(-scrollOffset)}
          className="absolute left-[-2%] top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full text-xl p-3 z-10"
        >
          <FaArrowLeft />
        </button>
      )}
      {showRight && (
        <button
          onClick={() => scrollByOffset(scrollOffset)}
          className="absolute right-[-2%] top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full text-xl p-3 z-10"
        >
          <FaArrowRight />
        </button>
      )}

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto scrollbar-hide"
      >
        {children}
      </div>
    </div>
  );
}
