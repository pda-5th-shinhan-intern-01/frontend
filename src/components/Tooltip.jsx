import React from "react";
import { IoMdHelpCircle } from "react-icons/io";
export default function Tooltip({ content }) {
  return (
    <span className="relative group" title={content}>
      <IoMdHelpCircle className="text-gray-400 cursor-pointer" />
    </span>
  );
}
