import React from "react";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="h-full flex items-center text-sm bg-gray-light justify-between px-12">
      <div></div>
      <div>신한투자증권 인턴 1조</div>
      <a href="https://github.com/pda-5th-shinhan-intern-01" className="flex">
        <FaGithub className="text-3xl" />
      </a>
    </div>
  );
}
