import React from 'react';


import { FaCcPaypal, FaCcMastercard, FaCcVisa, } from "react-icons/fa";
import { FaFacebook, FaInstagram } from "react-icons/fa6";

const FooterComponent = () => {
  return (
    <div className="bg-blue-950 text-white py-10 px-5 shadow-lg border-2">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {/* Về Công Ty */}
        <div>
          <h4 className="font-bold text-lg mb-4">Về Công ty</h4>

          <ul className="space-y-2">
            <li><a href="#" className="hover:text-blue-600">Giới thiệu</a></li>
            <li><a href="#" className="hover:text-blue-600">Tuyển dụng</a></li>
            <li><a href="#" className="hover:text-blue-600">Discount</a></li>
          </ul>
        </div>

        {/* Chính sách */}
        <div>
          <h4 className="font-bold text-lg mb-4">Chính sách</h4>

          <ul className="space-y-2">

            <li><a href="#" className="hover:text-blue-600">Chính sách bảo hành</a></li>
            <li><a href="#" className="hover:text-blue-600">Chính sách giao hàng</a></li>
            <li><a href="#" className="hover:text-blue-600">Chính sách bảo mật</a></li>
          </ul>
        </div>

        {/* Thông tin */}
        <div>
          <h4 className="font-bold text-lg mb-4">Thông tin</h4>

          <ul className="space-y-2">
            <li><a href="#" className="hover:text-blue-600">Hệ thống cửa hàng</a></li>
            <li><a href="#" className="hover:text-blue-600">Hướng dẫn mua hàng</a></li>
            <li><a href="#" className="hover:text-blue-600">Hướng dẫn thanh toán</a></li>
          </ul>
        </div>

        {/* Tổng đài hỗ trợ */}
        <div>
          <h4 className="font-bold text-lg mb-4">Tổng đài hỗ trợ</h4>
          <ul className="space-y-2">
            <li>Mua hàng: <a href="tel:19005301" className="hover:text-blue-600">1900.5301</a></li>
            <li>Bảo hành: <a href="tel:19005325" className="hover:text-blue-600">1900.5325</a></li>
            <li>Khiếu nại: <a href="tel:18006173" className="hover:text-blue-600">1800.6173</a></li>
            <li>Email: <a href="mailto:cskh@company.com" className="hover:text-blue-600">cskh@company.com</a></li>
          </ul>
        </div>

        {/* Kết nối và thanh toán */}
        <div>
          <h4 className="font-bold text-lg mb-4">Kết nối với chúng tôi</h4>
          <div className="flex gap-4 mb-6">
            <a href="#" aria-label="Facebook"><FaFacebook size={24} className="hover:text-blue-600" /></a>
            <a href="#" aria-label="Instagram"><FaInstagram size={24} className="hover:text-pink-500" /></a>
          </div>
          <h4 className="font-bold text-lg mb-2">Cách thức thanh toán</h4>
          <div className="flex gap-4 mt-2">
            <FaCcPaypal size={30} />
            <FaCcMastercard size={30} />
            <FaCcVisa size={30} />
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Công ty ABC. All rights reserved.
      </div>
    </div>



  );
};

export default FooterComponent;
