import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import { registerLocale } from "react-datepicker";

registerLocale("ko", ko);

export default function CustomDateInput({ value, onChange, placeholder }) {
  return (
    <DatePicker
      selected={value}
      onChange={onChange}
      dateFormat="yyyy-MM-dd"
      locale="ko"
      placeholderText={placeholder}
      className="w-40 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm text-center focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400"
    />
  );
}
