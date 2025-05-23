import React, { useState, useEffect } from "react";
import { IoIosArrowUp } from "react-icons/io";

const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Hiện nút khi cuộn xuống
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Cuộn lên đầu
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (

        isVisible && (
            <button
                onClick={scrollToTop}
                className="fixed bottom-10 right-20 px-4 py-2 text-sm rounded-lg bg-blue-600 text-white cursor-pointer shadow-md z-[1000] flex flex-col items-center justify-center  hover:bg-blue-700 transition"
            >
                <IoIosArrowUp className="text-xl" />
                <span className="text-xs">Back</span>
            </button>

        )

    );
};

export default BackToTopButton;
