import React from 'react';


import { FaCcPaypal, FaCcMastercard, FaCcVisa, } from "react-icons/fa";
import { FaFacebook, FaInstagram } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const FooterComponent = () => {
  return (
    <div className="bg-blue-950 text-white py-10 px-5 shadow-lg border-2 mt-4">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {/* Về Công Ty */}
        <div>
          <h4 className="font-bold text-lg mb-4">Về Công ty</h4>

          <div className="space-y-2">
            <div>
              <Link to="/about" className="hover:text-blue-600" title="Giới thiệu công ty">
                Giới thiệu
              </Link>
            </div>
            <div>
              <Link to="/careers" className="hover:text-blue-600" title="Tuyển dụng tại công ty">
                Tuyển dụng
              </Link>
            </div>
            <div>
              <Link to="/discounts" className="hover:text-blue-600" title="Ưu đãi khuyến mãi">
                Discount
              </Link>
            </div>
          </div>

        </div>

        {/* Chính sách */}
        <div>
          <h4 className="font-bold text-lg mb-4">Chính sách</h4>


          <div className="space-y-2">
            <div>
              <Link to="/about" className="hover:text-blue-600" title="Chính sách bảo hành công ty">
                Chính sách bảo hành
              </Link>
            </div>
            <div>
              <Link to="/careers" className="hover:text-blue-600" title="Chính sách giao hàng công ty">
                Chính sách giao hàng
              </Link>
            </div>
            <div>
              <Link to="/discounts" className="hover:text-blue-600" title="Chính sách bảo mật">
                Chính sách bảo mật
              </Link>
            </div>
          </div>

        </div>

        {/* Thông tin */}
        <div>
          <h4 className="font-bold text-lg mb-4">Thông tin</h4>


          <div className="space-y-2">
            <div>
              <Link to="/about" className="hover:text-blue-600" title="Hệ thống cửa hàng">
                Hệ thống cửa hàng
              </Link>
            </div>
            <div>
              <Link to="/careers" className="hover:text-blue-600" title="Hướng dẫn mua hàng">
                Hướng dẫn mua hàng
              </Link>
            </div>
            <div>
              <Link to="/discounts" className="hover:text-blue-600" title="Hướng dẫn thanh toán">
                Hướng dẫn thanh toán
              </Link>
            </div>
          </div>
        </div>

        {/* Tổng đài hỗ trợ */}
        <div>
          <h4 className="font-bold text-lg mb-4">Tổng đài hỗ trợ</h4>
          <div className="space-y-2">
            <div>
              Mua hàng:{' '}
              <a
                href="tel:19005301"
                className="hover:text-blue-600"
                title="Gọi để mua hàng"
              >
                1900.5301
              </a>
            </div>
            <div>
              Bảo hành:{' '}
              <a
                href="tel:19005325"
                className="hover:text-blue-600"
                title="Gọi hỗ trợ bảo hành"
              >
                1900.5325
              </a>
            </div>
            <div>
              Khiếu nại:{' '}
              <a
                href="tel:18006173"
                className="hover:text-blue-600"
                title="Gọi để khiếu nại"
              >
                1800.6173
              </a>
            </div>
            <div>
              Email:{' '}
              <a
                href="mailto:cskh@company.com"
                className="hover:text-blue-600"
                title="Gửi email cho bộ phận CSKH"
              >
                cskh@company.com
              </a>
            </div>
          </div>

        </div>

        {/* Kết nối và thanh toán */}
        <div>
          <h4 className="font-bold text-lg mb-4">Kết nối với chúng tôi</h4>
          <div className="flex gap-4 mb-6">
            <Link to="#" aria-label="Facebook"><FaFacebook size={24} className="hover:text-blue-600" /></Link>
            <Link to="#" aria-label="Instagram"><FaInstagram size={24} className="hover:text-pink-500" /></Link>
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
