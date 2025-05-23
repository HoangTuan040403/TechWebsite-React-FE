import { Col, Row, Image, InputNumber, Button, Rate } from 'antd';
import React, { useState } from 'react';
import ImageProductSmall from '../../assets/images/ip15pmsmall.webp'
import { WrapperBtnQualityProduct, WrapperImageCol, WrapperImageProductSmall, WrapperInputNumber, WrapperNameProduct, WrapperPriceProduct, WrapperQualityProduct, WrapperTextPrice, WrapperTextSell } from './style';
import { StarFilled, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import * as ProductService from '../../sevices/ProductService'
import { useQuery } from '@tanstack/react-query';
import Loading from '../LoadingComponent/Loading';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addOrderProduct } from '../../redux/slides/orderSlide';
import { convertPrice } from '../../utils';
import { IoStar } from 'react-icons/io5';


const ProductDetailComponent = ({ idProduct }) => {
  const [numProduct, setNumProduct] = useState(1)
  const navigate = useNavigate();
  const location = useLocation()
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const onChange = (value) => {
    setNumProduct(Number(value))
  }

  const fetchGetDetailsProduct = async (id) => {
    if (!id) return null;
    try {
      const res = await ProductService.getDetailsProduct(id);
      return res.data; // Đảm bảo API trả về đúng cấu trúc
    } catch (error) {
      console.error('Error fetching product details:', error);
      return null;
    }
  };


  const handleChangeCount = (type) => {
    if (type === 'increase') {
      setNumProduct(numProduct + 1)

    } else {
      setNumProduct(numProduct - 1)
    }
  }




  const { isLoading, data: productDetails } = useQuery({
    queryKey: ['product-details', idProduct],
    queryFn: () => fetchGetDetailsProduct(idProduct),
    enabled: !!idProduct, // Chỉ chạy khi `idProduct` tồn tại
  });


  const handleAddOrderProduct = () => {
    if (!user?.id) {
      navigate('/sign-in', { state: location?.pathname })
    } else {
      //   {
      //     name: { type: String, reuqired: true },
      //     amount: { type: Number, required: true },
      //     image: { type: String, required: true },
      //     price: { type: Number, required: true },
      //     product: {
      //         type: mongoose.Schema.Types.ObjectId,
      //         ref: 'Product',
      //         required: true,
      //     },
      // },
      dispatch(addOrderProduct({
        orderItem: {
          name: productDetails?.name,
          amount: numProduct,
          image: productDetails?.image,
          price: productDetails?.price,
          product: productDetails?._id
        }
      }))
    }
  }



  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-7xl mx-auto">
      {isLoading ? (
        <div className="text-center py-10 text-lg font-semibold text-gray-500">Đang tải...</div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Image section */}
          <div className="lg:w-1/2 flex flex-col gap-4">
            <img
              src={productDetails?.image}
              alt="image product"
              preview={false}
              width={400}
              height={400}
              className="rounded-lg  object-cover"
            />

            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, index) => (
                <Image
                  key={index}
                  src={productDetails?.image}
                  alt={`image small ${index}`}
                  preview={false}
                  className="rounded-md object-cover h-20 w-full"
                />
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="lg:w-1/2 space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">{productDetails?.name}</h2>

            {/* Rating */}
            <div className="flex items-center text-yellow-400 space-x-2">
              {[...Array(5)].map((_, index) => (
                <IoStar key={index} className={`${index < productDetails?.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
              ))}
              <span className="text-gray-600 text-sm">| Đã bán 400</span>
            </div>

            {/* Price */}
            <div className="text-3xl font-bold text-red-500">
              {productDetails?.price?.toLocaleString('vi-VN')} đ
            </div>

            {/* Quantity selector */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-700">Số lượng</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleChangeCount('decrease')}
                  className="w-9 h-9 flex items-center justify-center border rounded-md hover:bg-gray-100"
                >
                  <MinusOutlined />
                </button>
                <input
                  type="number"
                  min={1}
                  value={numProduct}
                  onChange={onChange}
                  className="w-12 text-center border rounded-md py-1"
                />
                <button
                  onClick={() => handleChangeCount('increase')}
                  className="w-9 h-9 flex items-center justify-center border rounded-md hover:bg-gray-100"
                >
                  <PlusOutlined />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-red-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-600 transition">
                Mua ngay
              </button>
              <button
                onClick={handleAddOrderProduct}
                className="bg-white text-blue-600 font-bold py-3 px-6 border border-blue-600 rounded-lg hover:bg-blue-50 transition"
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailComponent;
