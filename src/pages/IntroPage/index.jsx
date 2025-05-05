import React from "react";

//초반 인트로 페이지
export default function IntroPage() {
  return (
    <div>
      IntroPage
      <div className="fixed bottom-[-50%] left-1/2 -translate-x-1/2 z-[-1] pointer-events-none overflow-hidden">
        <img
          src="vite.svg"
          alt="React logo"
          className="w-full h-[800px] opacity-10 animate-spin-slow"
        />
      </div>
    </div>
  );
}
