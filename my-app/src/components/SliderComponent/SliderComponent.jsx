
import React from 'react';
import Slider from 'react-slick';
import { Image } from 'antd';

const SliderComponent = ({ arrImages = [] }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };

  return (
    <Slider{...settings}>
      {arrImages.length > 0 ? (
        arrImages.map((image, index) => (
          <div key={index}>
            {/* <Image src={image} alt={`slider-${index}`} /> */}
            <Image src={image} alt="slider" preview={false} width="100%"/>
          </div>
        ))
      ) : (
        <div>No images available</div>
      )}
    </Slider>
  );
};

export default SliderComponent;
