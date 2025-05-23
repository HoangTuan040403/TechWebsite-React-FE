import React, { useState } from 'react';
import Slider from 'react-slick';
import { Image } from 'antd';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const PrevArrow = ({ onClick, isHover }) => (
  <div
    onClick={onClick}
    className={`
      absolute top-1/2 left-3 transform -translate-y-1/2 z-10
      w-10 h-10 flex items-center justify-center rounded-full
      bg-black/60 text-white cursor-pointer shadow-lg
      transition-opacity duration-300
      ${isHover ? 'opacity-100' : 'opacity-0'}
    `}
  >
    <FaChevronLeft />
  </div>
);

const NextArrow = ({ onClick, isHover }) => (
  <div
    onClick={onClick}
    className={`
      absolute top-1/2 right-3 transform -translate-y-1/2 z-10
      w-10 h-10 flex items-center justify-center rounded-full
      bg-black/60 text-white cursor-pointer shadow-lg
      transition-opacity duration-300
      ${isHover ? 'opacity-100' : 'opacity-0'}
    `}
  >
    <FaChevronRight />
  </div>
);

const SliderComponent = ({ arrImages = [] }) => {
  const [isHover, setIsHover] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow: <PrevArrow isHover={isHover} />,
    nextArrow: <NextArrow isHover={isHover} />,
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* <Slider {...settings}>
        {arrImages.length > 0 ? (
          arrImages.map((image, index) => (
            // <div key={index}>
            //   <img src={image} alt="slider" preview={false} className='w-full ' />
            // </div>
            <div key={index} className="aspect-auto aspect-h-9">
              <img
                src={image}
                alt={`slider-${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))
        ) : (
          <div>No images available</div>
        )}
      </Slider> */}

      <Slider

        {...settings}
        className="overflow-hidden "
      >
        {arrImages.length > 0 ? (
          arrImages.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`slider-${index}`}
                className="w-full lg:h-[350px]  object-cover rounded-md "
              />
            </div>
          ))
        ) : (
          <div className="text-center py-10">No images available</div>
        )}
      </Slider>
    </div>


  );
};

export default SliderComponent;
