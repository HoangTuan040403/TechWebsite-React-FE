import { Image } from 'antd';
import React from 'react';
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountPriceText, WrapperPriceText, WrapperTextSell } from './style';
import { WrapperReportText } from './style';
import { StarFilled } from '@ant-design/icons';
import logo from '../../assets/images/logo.png';
import topdeal from '../../assets/images/topdeal.png'
import { useNavigate } from 'react-router-dom'
import { convertPrice } from '../../utils';

const CardComponent = (props) => {
  const { countInStock, description, image, name, price, id } = props
  const navigate = useNavigate()
  const handleDetailProduct = (id) => {
    navigate(`/product-details/${id}`)
  }
  return (
    // <WrapperCardStyle
    //   hoverable
    //   // headStyle={{ width: '200px', height: '200px' }}
    //   style={{ width: 240 }}
    //   bodyStyle={{ padding: '10px' }}
    //   cover={<img alt="example" src={image} />}
    //   onClick={() => handleDetailProduct(id)}
    // >
    //   <div>
    //     <Image src={topdeal} style={{ width: '89px', height: '20px' }} />
    //   </div>
    //   <div>
    //     <Image src={logo} style={{ width: '89px', height: '20px' }} />
    //   </div>
    //   <StyleNameProduct>{name}</StyleNameProduct>
    //   <WrapperReportText >
    //     <span style={{ marginRight: '10px' }}>
    //       {/* <span>{rating}</span> <StarFilled style={{ fontSize: '12px', color: 'orange' }} /> */}
    //     </span>


    //   </WrapperReportText>
    //   <WrapperPriceText>
    //     <span style={{ marginRight: '8px' }}>{convertPrice(price)} </span>
    //     {/* <WrapperDiscountPriceText>
    //       {discount || 5}%
    //     </WrapperDiscountPriceText> */}
    //   </WrapperPriceText>
    // </WrapperCardStyle>

    <>
      {/* Card sản phẩm */}
      <div className=" bg-white border border-gray-100 rounded-md p-4 shadow-lg hover:shadow-xl transition-all duration-300  ">
        {/* Image */}
        <div className="w-full aspect-square overflow-hidden  flex justify-center mb-3">
          <img
            src={image}
            alt={name || "Sản phẩm"}
            className="max-w-[90%] max-h-[90%] object-contain transition-transform duration-300 "
            onClick={() => handleDetailProduct(id)}
          />
        </div>


        {/* Product Name */}
        <div className="text-sm sm:text-base font-medium  uppercase tracking-wide line-clamp-2">
          {name}
        </div>

        {/* Price */}
        <div className="mt-2 ">
          <p className="text-red-600 font-semibold text-base sm:text-lg">
            {price.toLocaleString()}đ
          </p>
        </div>
        <div className="mt-2 ">
          <p className="text-red-600 font-semibold text-base sm:text-lg">
            {price.toLocaleString()}đ
          </p>
        </div>
        <div className="mt-2 ">
          <p className="text-red-600 font-semibold text-base sm:text-lg">
            {price.toLocaleString()}đ
          </p>
        </div>
      </div>







    </>
  );
};

export default CardComponent;


