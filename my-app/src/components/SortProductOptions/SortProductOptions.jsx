// components/SortProductOptions/SortProductOptions.jsx
import React from 'react';
import { FaSortAmountDown, FaSortAmountUpAlt } from "react-icons/fa";

const SortProductOptions = ({ sortOrder, setSortOrder }) => {
  return (
    <div className="flex gap-3 my-4 items-center text-sm">
      <span className="font-medium text-gray-700">Sắp xếp theo:</span>

      <div
        className={`cursor-pointer px-3 py-1 rounded-xl border transition duration-200 flex items-center gap-1 ${sortOrder === 'desc'
            ? 'bg-blue-600 text-white border-blue-600 shadow-md'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-100'
          }`}
        onClick={() => setSortOrder('desc')}
      >
        <FaSortAmountDown />
        Giá: Cao → Thấp
      </div>

      <div
        className={`cursor-pointer px-3 py-1 rounded-xl border transition duration-200 flex items-center gap-1 ${sortOrder === 'asc'
            ? 'bg-blue-600 text-white border-blue-600 shadow-md'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-100'
          }`}
        onClick={() => setSortOrder('asc')}
      >
        <FaSortAmountUpAlt />
        Giá: Thấp → Cao
      </div>
    </div>
  );
};

export default SortProductOptions;
