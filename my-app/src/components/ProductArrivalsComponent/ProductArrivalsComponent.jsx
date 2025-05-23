import React, { useEffect, useState } from 'react'
import * as ProductService from '../../sevices/ProductService';
import CardComponent from '../CardComponent/CardComponent';


const ProductArrivalsComponent = () => {
    const [arrivalProducts, setArrivalProducts] = useState([]);
    const fetchProductAllArrivals = async () => {
        try {
            const res = await ProductService.getAllNewArrivals();
            if (res?.status === 'OK') {
                setArrivalProducts(res.data);
            } else {
                console.error('Lỗi khi lấy sản phẩm new arrivals:', res.message);
            }
        } catch (error) {
            console.error('Lỗi fetch sản phẩm new arrivals:', error);
        }
    };

    useEffect(() => {
        fetchProductAllArrivals();
    }, []);
    return (
        <div className="p-4 mt-9 bg-white rounded-lg">
            {/* Danh mục */}
            <div className="mb-6 lg:flex lg:justify-between">
                {/* Tiêu đề */}
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 text-gray-700">
                    Điện thoại mới nhất
                </h2>
            </div>


            {/* Sản phẩm */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {arrivalProducts.map((product) => (
                    <CardComponent
                        key={product._id}
                        id={product._id}
                        countInStock={product.countInStock}
                        description={product.description}
                        image={product.image}
                        name={product.name}
                        price={product.price}
                    />
                ))}
            </div>
        </div>
    )
}

export default ProductArrivalsComponent
