
import React from 'react';

const LoadMoreButton = ({ visibleCount, itemsPerPage, setVisibleCount, totalItems }) => {
    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + itemsPerPage);
    };

    if (visibleCount >= totalItems) return null;

    return (
        <div className="flex justify-center mt-6">
            <button
                onClick={handleLoadMore}
                className="w-full sm:w-[240px] h-[38px] px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white transition-colors duration-200 text-sm font-medium "
            >
                Xem thêm
            </button>
        </div>
    );
};

export default LoadMoreButton;
