
import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import CardComponent from '../CardComponent/CardComponent';
import SliderComponent from '../SliderComponent/SliderComponent';
import { SliderItem, SliderWrapper } from './style';
import CardFlashComponent from '../CardFlashComponent/CardFlashComponent';

const products = [
  {
    id: 1,
    name: 'Product 1',
    image: "https://salt.tikicdn.com/cache/750x750/ts/product/dd/2b/a6/fefd132c5ba9b5629c0119f57549e5d4.png.webp",
    price: '$100',
  },
  {
    id: 2,
    name: 'Product 2',
    image:  "https://salt.tikicdn.com/cache/750x750/ts/product/dd/2b/a6/fefd132c5ba9b5629c0119f57549e5d4.png.webp" ,
    price: '$200',
  },
  {
    id: 3,
    name: 'Product 3',
    image: "https://salt.tikicdn.com/cache/750x750/ts/product/dd/2b/a6/fefd132c5ba9b5629c0119f57549e5d4.png.webp",
    price: '$300',
  },
  {
    id: 4,
    name: 'Product 4',
    image: "https://salt.tikicdn.com/cache/750x750/ts/product/dd/2b/a6/fefd132c5ba9b5629c0119f57549e5d4.png.webp",
    price: '$400',
  },
  {
    id: 5,
    name: 'Product 5',
    image: "https://salt.tikicdn.com/cache/750x750/ts/product/dd/2b/a6/fefd132c5ba9b5629c0119f57549e5d4.png.webp",
    price: '$500',
  },
  // Add more products as needed
];

const ProductSlider = () => {
  const settings = {
    dots: false, // Hiển thị các dấu chấm điều hướng
    infinite: true, // Vòng lặp vô tận
    speed: 500, // Tốc độ chuyển slide
    slidesToShow: 5, // Hiển thị 4 sản phẩm trên mỗi slide
    slidesToScroll: 1, // Cuộn 1 sản phẩm mỗi lần
    autoplay: true, // Tự động cuộn
    autoplaySpeed: 3000, // Tốc độ cuộn tự động (ms)
    
  };

  return (
    <SliderWrapper>
    <Slider {...settings} >
      {products.map(product => (
         <SliderItem key={product.id}>
         <CardFlashComponent product={product} />
       </SliderItem>
      ))}
    </Slider>
    </SliderWrapper>
  );
};

export default ProductSlider;
