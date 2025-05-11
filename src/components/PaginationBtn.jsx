import React from "react";

export default function PaginationBtn({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="relative flex justify-center mt-4 gap-2">
      {Array.from({ length: totalPages }, (_, idx) => {
        const pageNum = idx + 1;
        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`w-7 h-7 rounded text-sm ${
              currentPage === pageNum
                ? "bg-gray-hover"
                : "border border-gray-light text-gray-md"
            }`}
          >
            {pageNum}
          </button>
        );
      })}
    </div>
  );
}
