// components/Pagination.tsx
import React from "react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const pageCount = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <nav>
      <ul className="flex justify-center items-center space-x-2 mt-9">
        <li>
          <button
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &#8592;
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => onPageChange(number)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === number
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() =>
              currentPage < pageCount && onPageChange(currentPage + 1)
            }
            disabled={currentPage === pageCount}
            className="px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &#8594;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
