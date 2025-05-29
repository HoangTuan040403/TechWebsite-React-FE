import React from 'react'
import SliderComponent from '../SliderComponent/SliderComponent'
import slider1 from '../../assets/images/slider1.png';
import slider2 from '../../assets/images/slider2.png';
import slider3 from '../../assets/images/slider3.png';
import banner1 from '../../assets/images/bannerip16.png';
import banner2 from '../../assets/images/iphone-16_overview.png';
import banner3 from '../../assets/images/m55-6990-right-banner.png';

const BannerHome = () => {
    return (
        <div className="flex gap-4 lg:h-[350px] md:h-[200px] mt-2">
            <div className="w-full lg:w-3/4 border-gray-100 shadow-lg border">

                <SliderComponent arrImages={[slider1, slider2, slider3]} />
            </div>
            <div className="hidden lg:flex lg:flex-col justify-between h-full w-1/4">
                {[banner1, banner2, banner3].map((img, i) => (
                    <img
                        key={i}
                        src={img}
                        alt={`thumb-${i}`}
                        className="rounded-lg h-[32%] w-full object-cover shadow-md"
                    />
                ))}
            </div>
        </div>
    )
}

export default BannerHome
