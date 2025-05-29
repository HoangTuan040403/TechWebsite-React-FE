import React, { useEffect, useState } from 'react'
import * as CategoryService from '../../sevices/CategoryService';

const Category = () => {
    const [categories, setCategories] = useState([]);


    useEffect(() => {
        const fetchAllCategory = async () => {

            try {
                const cate = await CategoryService.getAllCategory();
                setCategories(cate?.data || []);
            } catch (error) {
                console.error('Lỗi không hiển thị danh mục:', error);
            }

        };

        fetchAllCategory();
    }, []);
    return (
        <div className="overflow-x-auto">
            <div className="flex gap-3 my-4 w-max px-2">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className="min-w-[96px] h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:border-blue-400 transition duration-200"
                    >
                        <img
                            className="h-8 w-16 object-contain"
                            src={category.image}
                            alt={category.name || `Category ${index}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Category
