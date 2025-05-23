import React, { useEffect, useRef, useState } from 'react';
import { Badge, Col, Image, Popover } from 'antd'
import { WrapperHeader, WrapperHeaderAccount, WrapperTextHeaderSmall, WrapperContentPopup, WrapperAccountMobile, WrapperMobile, WrapperCartMobile } from './style';
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined, MenuOutlined } from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import imageLogo from '../../assets/images/logostore.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../sevices/UserService'
import { resetUser } from '../../redux/slides/userSlide';
import Loading from '../LoadingComponent/Loading';
import { searchProduct } from '../../redux/slides/productSlide';
import { FaBars, FaRegUser, FaTimes } from "react-icons/fa";
import { FiLogOut, FiShoppingCart } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";


function HeaderComponent({ isHiddenSearch = false, isHiddenCart = false }) {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [userName, setUserName] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const order = useSelector((state) => state.order)
  const [isMobile, setIsMobile] = useState(false)
  const [showPopup, setShowPopup] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);
  const inputRef = useRef(null);

  // Tự động focus khi mở input
  useEffect(() => {
    if (showSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearch]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleNavigateLogin = () => {
    navigate('/sign-in')
  }

  const handleNavigateProfile = () => {
    navigate('/profile-user')
  }

  const handleLogout = async () => {
    setLoading(true)
    await UserService.logoutUser()
    dispatch(resetUser())
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    setUserName(user?.name)
    setUserAvatar(user?.avatar)
    setLoading(false)
  }, [user?.name, user?.avatar])

  const content = (
    <div>
      <WrapperContentPopup onClick={handleNavigateProfile}>Thông tin cá nhân</WrapperContentPopup>
      {user?.isAdmin && (
        <WrapperContentPopup onClick={() => navigate('/system/admin')}>Quản lý hệ thống</WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={handleLogout}>Đăng xuất</WrapperContentPopup>
    </div>
  );

  const onSearch = (e) => {
    setSearch(e.target.value)
    dispatch(searchProduct(e.target.value))
  }

  const mobileMenuContent = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 250 }}>
      {!isHiddenSearch && (
        <ButtonInputSearch
          placeholder="Tìm kiếm..."
          onChange={onSearch}
          size="middle"
        />
      )}
      <WrapperMobile>
        {user?.access_token ? (
          <>
            <div onClick={handleNavigateProfile} style={{ cursor: 'pointer' }}>👤 {userName || user?.email}</div>
            {user?.isAdmin && (
              <div onClick={() => navigate('/system/admin')} style={{ cursor: 'pointer' }}>⚙️ Quản lý hệ thống</div>
            )}
            <div onClick={handleLogout} style={{ cursor: 'pointer' }}>🚪 Đăng xuất</div>
          </>
        ) : (
          <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}><UserOutlined size={10} />  Đăng nhập</div>
        )}
      </WrapperMobile>

      <WrapperMobile>
        {!isHiddenCart && (
          <div onClick={() => navigate('/order')} style={{ cursor: 'pointer' }}>
            <ShoppingCartOutlined size={10} /> Giỏ hàng ({order?.orderItems?.length || 0})
          </div>

        )}
      </WrapperMobile>

    </div>

  )

  return (

    <div className=" shadow-md bg-white border-b-2 border-gray-100 sticky top-0 z-50 ">

      <div className="flex justify-between sm:justify-around items-center px-6 py-4 md:px-12">
        {/* Logo */}
        {/* <div className="text-xl font-bold text-amber-700">K COFFEE</div> */}
        <img
          onClick={() => navigate('/')}
          src={imageLogo}
          preview={false}
          alt="image-logo"
          height="55px"
          width="55px"
        />

        {/* icon on mobile */}
        <div
          className="md:hidden text-2xl cursor-pointer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Navigation links */}
        <div className="hidden md:flex gap-6">
          <Link
            to="/"
            className="text-gray-700 font-medium hover:text-blue-500 transition"
          >
            Trang chủ
          </Link>
          <Link
            href="/page/product"
            className="text-gray-700 font-medium hover:text-blue-500 transition"
          >
            Sản phẩm
          </Link>

          <Link
            href="/page/about"
            className="text-gray-700 font-medium hover:text-blue-500 transition"
          >
            Về chúng tôi
          </Link>
          <Link
            href="/page/contact"
            className="text-gray-700 font-medium hover:text-blue-500 transition"
          >
            Liên hệ
          </Link>
        </div>

        {/* Account  */}
        <div className="hidden md:flex gap-3 items-center">

          {userName ? (
            <div className="relative flex">
              <div className="flex items-center transition-all duration-300 ease-in-out">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Tìm kiếm..."
                  onChange={onSearch}
                  className={`border border-gray-300 rounded-lg px-4 py-2 text-sm transition-all duration-300 ease-in-out
        ${showSearch ? 'w-48 opacity-100 ml-2' : 'w-0 opacity-0 ml-0'}
        focus:outline-none focus:ring-2 focus:ring-blue-100 overflow-hidden`}
                />
                <button
                  onClick={() => setShowSearch(prev => !prev)}
                  aria-label="Toggle search input"
                  className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-blue-100 transition duration-300"
                >
                  <IoSearchOutline size={20} />
                </button>
              </div>

              <div
                onClick={() => setShowPopup(!showPopup)}
                className="text-black  border-amber-900  px-4   cursor-pointer flex  items-center justify-center hover:scale-105 hover:bg-gray-100 transition duration-300 "
              >
                <FaRegUser size={22} className="text-amber-900 mr-1" />

                <div className="mt-1 ">{userName}</div>
              </div>
              <div
                className="text-black  px-4 py-2 cursor-pointer flex  items-center relative hover:scale-105 hover:bg-gray-100 transition duration-300"
              // onClick={() => router.push("/page/cart")}
              >
                <div className="relative">
                  <FiShoppingCart size={22} className="text-amber-900 mr-1" />
                  {cartQuantity > 0 && (
                    <span className="absolute -top-3 -right-1 bg-amber-700 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                      {cartQuantity}
                    </span>
                  )}
                </div>
                <span className="mt-1 ">Giỏ hàng</span>
              </div>


              {showPopup && (
                <div className="absolute top-16  right-0 mt-2 w-48 bg-white border rounded-2xl shadow-lg z-50">
                  <ul className="py-2 text-sm text-gray-700">
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        // router.push("/page/profile");
                        setShowPopup(false);
                      }}
                    >
                      Trang cá nhân
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={handleLogout}
                    >
                      Đăng xuất
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="relative flex items-center gap-3">
              {/* Search Input + Icon */}
              <div className="flex items-center transition-all duration-300 ease-in-out">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Tìm kiếm..."
                  onChange={onSearch}
                  className={`border border-gray-300 rounded-lg px-4 py-2 text-sm transition-all duration-700 ease-in-out
        ${showSearch ? 'w-48 opacity-100 ml-2' : 'w-0 opacity-0 ml-0'}
        focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-hidden`}
                />
                <button
                  onClick={() => setShowSearch(prev => !prev)}
                  aria-label="Toggle search input"
                  className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-blue-100 transition duration-300 "
                >
                  <IoSearchOutline size={20} className='hover:scale-105 ' />
                </button>
              </div>

              {/* Login / User Icon */}
              <Link
                to="/sign-in"
                className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-blue-100 transition duration-300"
              >
                <FaRegUser size={20} className='hover:scale-105 ' />
              </Link>

              {/* Cart Icon */}
              <Link
                to="/order"
                className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-blue-100 transition duration-300"
              >
                <FiShoppingCart size={20} className='hover:scale-105' />
                {/* Badge example, if needed */}
                {/* <span className="absolute -top-1 -right-1 bg-amber-700 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center text-[10px]">
      2
    </span> */}
              </Link>
            </div>

          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-4 right-4 z-50 bg-white shadow-xl rounded-xl px-6 py-6 transition-all duration-300 ease-in-out">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="text-gray-700 font-medium hover:text-blue-500 transition"
            >
              Trang chủ
            </Link>
            <Link
              href="/page/product"
              className="text-gray-700 font-medium hover:text-blue-500 transition"
            >
              Thức uống
            </Link>
            <Link
              href="/page/about"
              className="text-gray-700 font-medium hover:text-blue-500 transition"
            >
              Về chúng tôi
            </Link>
            <Link
              href="/page/contact"
              className="text-gray-700 font-medium hover:text-blue-500 transition"
            >
              Liên hệ
            </Link>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              <IoSearchOutline className="text-gray-400 mr-2" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Tìm kiếm..."
                onChange={onSearch}
                className="w-full outline-none text-sm"
              />
            </div>

            <hr className="border-t border-gray-300 my-2" />


            {userName ? (
              <>
                <div
                  className="relative flex items-center justify-between border border-amber-900 px-4 py-2 rounded-lg w-1/2 hover:bg-amber-100 transition cursor-pointer"
                // onClick={() => router.push("/page/cart")}
                >
                  <div className="flex items-center gap-2">
                    <FiShoppingCart className="text-xl text-amber-900" />
                    <span className="text-black font-medium">Giỏ hàng</span>
                  </div>

                  {cartQuantity > 0 && (
                    <span className="absolute -top-2 -right-2 bg-amber-700 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                      {cartQuantity}
                    </span>
                  )}
                </div>

                <div
                  className="text-left text-black border border-amber-900 px-4 py-2 rounded-lg hover:bg-amber-100 transition duration-500 w-1/2"
                  onClick={() => {
                    // router.push("/page/profile");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <FaRegUser className="text-xl text-amber-900" />
                    <span className="text-black font-medium">
                      Trang cá nhân
                    </span>
                  </div>
                </div>

                <div
                  className="text-left text-black border border-amber-900 px-4 py-2 rounded-lg w-1/2 hover:bg-amber-100"
                  onClick={handleLogout}
                >
                  <div className="flex items-center gap-2">
                    <FiLogOut className="text-xl text-amber-900" />
                    <span className="text-black font-medium">Đăng xuất</span>
                  </div>
                </div>
              </>
            ) : (
              <Link to=""

                className=" text-white text-center px-4 py-2 rounded-lg hover:bg-amber-800 transition bg-background-secondary"
              >
                Tài khoản
              </Link>
            )}
          </div>
        </div>
      )}
      {/* <WrapperHeader gutter={16} style={{ justifyContent: isHiddenSearch && isHiddenCart ? 'space-between' : 'unset' }}>
        <Col span={5}>
          <Image
            onClick={() => navigate('/')}
            src={imageLogo}
            preview={false}
            alt="image-logo"
            height="55px"
            width="55px"
          />
        </Col>

        {!isMobile && !isHiddenSearch && (
          <Col span={13}>
            <ButtonInputSearch
              size="large"
              placeholder="Nhập từ khóa tìm kiếm"
              onChange={onSearch}
            />
          </Col>
        )}

        <Col span={isMobile ? 19 : 6} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '20px' }}>
          {isMobile ? (
            <Popover content={mobileMenuContent} trigger="click" placement="bottomRight">
              <MenuOutlined style={{ fontSize: 24, cursor: 'pointer' }} />
            </Popover>
          ) : (
            <>
              <Loading isPending={loading}>
                <WrapperHeaderAccount>
                  {userAvatar ? (
                    <img src={userAvatar} alt='avatar' style={{
                      height: '40px',
                      width: '40px',
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }} />
                  ) : (
                    <UserOutlined style={{ fontSize: '30px' }} />
                  )}
                  {user?.access_token ? (
                    <Popover content={content} trigger="click">
                      <div style={{ cursor: 'pointer' }}>{userName?.length ? userName : user?.email}</div>
                    </Popover>
                  ) : (
                    <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                      <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                      <CaretDownOutlined />
                    </div>
                  )}
                </WrapperHeaderAccount>
              </Loading>

              {!isHiddenCart && (
                <WrapperHeaderAccount>
                  <div onClick={() => navigate('/order')} style={{ cursor: 'pointer' }}>
                    <Badge count={order?.orderItems?.length} size='small'>
                      <ShoppingCartOutlined style={{ fontSize: '30px', color: 'rgb(130, 134, 158)' }} />
                    </Badge>
                    <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
                  </div>
                </WrapperHeaderAccount>
              )}
            </>
          )}
        </Col>
      </WrapperHeader> */}
    </div>



  );
}

export default HeaderComponent;
