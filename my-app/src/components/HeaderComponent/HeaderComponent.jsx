import React, { useEffect, useState } from 'react';
import { Badge, Col, Image, Popover } from 'antd'
import { WrapperHeader, WrapperHeaderAccount, WrapperTextHeaderSmall, WrapperContentPopup } from './style';
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import imageLogo from '../../assets/images/logostore.png';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../sevices/UserService'
import { resetUser } from '../../redux/slides/userSlide';
import Loading from '../LoadingComponent/Loading';




function HeaderComponent({ isHiddenSearch = false, isHiddenCart = false }) {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [userName, setUserName] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [loading, setLoading] = useState(false)
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
  return (
    <div>
      <WrapperHeader gutter={16} style={{ justifyContent: isHiddenSearch && isHiddenCart ? 'space-between' : 'unset' }}>
        <Col span={5}>
          <Image src={imageLogo} preview={false} alt="image-logo" height="55px" width="55px" />
        </Col>
        {!isHiddenSearch && (
          <Col span={13}>
            <ButtonInputSearch
              size="large"
              textButton="Tìm kiếm"
              placeholder="Nhập từ khóa tìm kiếm" />
          </Col>
        )}
        <Col span={6} style={{ display: 'flex', gap: '20px' }}>
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
                <>

                  <Popover content={content} trigger="click" >
                    <div style={{ cursor: 'pointer' }}>{userName?.length ? userName : user?.email}</div>
                  </Popover>
                </>
              ) : (
                <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                  <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                  <CaretDownOutlined />
                </div>

              )
              }


            </WrapperHeaderAccount>
          </Loading>
          {!isHiddenCart && (
            <div>
              <Badge count={4} size='small'>
                <ShoppingCartOutlined style={{ fontSize: '30px', color: 'rgb(130, 134, 158)' }} />
              </Badge>
              <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
            </div>
          )}

        </Col>
      </WrapperHeader>
    </div>
  );
}

export default HeaderComponent;


