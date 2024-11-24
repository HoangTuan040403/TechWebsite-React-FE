import React, { useEffect, useState } from 'react';
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style';
import InputForm from '../../components/InputForm/InputForm';
import { Image } from 'antd';
import imageLogo from '../../assets/images/logostore.png';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import * as UserService from '../../sevices/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook';
import Loading from '../../components/LoadingComponent/Loading';
import * as message from '../../components/Message/Message';
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux'
import { updateUser } from '../../redux/slides/userSlide';


const SignInPage = () => {
  const [isShowPassWord, setIsShowPassword] = useState(false)
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const mutation = useMutationHooks(
    data => UserService.loginUser(data)
  )
  const { data, isLoading, isSuccess, isError } = mutation

  // useEffect(() => {
  //   if (isSuccess) {
  //     message.success('Đăng nhập thành công');
  //     localStorage.setItem('access_token', JSON.stringify(data?.access_token))
  //     if (data?.access_token) {
  //       const decoded = jwtDecode(data?.access_token)
  //       console.log('decode', decoded)

  //       if (decoded?.id) {
  //         handleGetDetailUser(decoded?.id, data?.access_token)
  //         navigate('/')
  //       }
  //     } else if (isError) {
  //       message.error('Sai thông tin đăng nhập')
  //     }

  //   }
  // }, [isSuccess, isError])
  useEffect(() => {
    if (isSuccess) {
      if (data?.access_token) {
        message.success('Đăng nhập thành công');
        localStorage.setItem('access_token', JSON.stringify(data.access_token));
        const decoded = jwtDecode(data.access_token);
        console.log('decode', decoded);

        if (decoded?.id) {
          handleGetDetailUser(decoded.id, data.access_token);
          navigate('/'); // Điều hướng đến trang chính
        }
      } else {
        // Nếu không có access_token, hiển thị thông báo lỗi
        message.error('Sai thông tin đăng nhập');
      }
    } else if (isError) {
      // Xử lý lỗi từ API
      message.error('Sai thông tin đăng nhập'); // Hoặc một thông điệp phù hợp từ phản hồi lỗi
    }
  }, [isSuccess, isError, data, navigate]);


  const handleGetDetailUser = async (id, token) => {
    const res = await UserService.getDetailUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token }))

  }


  // useEffect(() => {
  //   if (isSuccess) {
  //     message.success('Đăng nhập thành công')
  //     handleSignIn()
  //   } else if (isError) {
  //     message.error('Sai thông tin đăng nhập')
  //   }
  // }, [isSuccess, isError])
  //   useEffect(() => {
  //     if (isSuccess) {
  //         message.success('Đăng nhập thành công');
  //         // Thực hiện các hành động cần thiết sau khi đăng nhập thành công
  //         navigate('/'); // Điều hướng đến trang chính hoặc trang mong muốn
  //         localStorage.setItem('access_token', JSON.stringify(data?.access_token)); // Lưu token nếu cần
  //         // Bạn có thể gọi các hàm khác ở đây như lấy thông tin người dùng
  //     } else if (isError) {
  //         message.error('Sai thông tin đăng nhập'); // Thông báo lỗi rõ ràng
  //     }
  // }, [isSuccess, isError, data, navigate]); // Thêm 'data' và 'navigate' vào mảng phụ thuộc


  //
  const handleNavigateSignUp = () => {
    navigate('/sign-up')
  }

  const handleSignIn = () => {
    mutation.mutate({
      email,
      password
    })

  }

  const handleOnchangeEmail = (value) => {
    setEmail(value)
  }

  const handleOnchangePassword = (value) => {
    setPassword(value)
  }
  return (

    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.53)', height: '100vh' }}>
      <div style={{ width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
        <WrapperContainerLeft>
          <h1>Xin chào</h1>
          <p>Đăng nhập hoặc Tạo tài khoản</p>
          <InputForm style={{ marginBottom: '10px' }} placeholder="abc@gmail.com"
            value={email} onChange={handleOnchangeEmail} />
          <div style={{ position: 'relative' }}>
            <span
              onClick={() => setIsShowPassword(!isShowPassWord)}
              style={{
                zIndex: 10,
                position: 'absolute',
                top: '10px',
                right: '10px'
              }}
            >{
                isShowPassWord ? (
                  <EyeFilled />
                ) : (
                  <EyeInvisibleFilled />
                )
              }
            </span>
            <InputForm placeholder="password" type={isShowPassWord ? "text" : "password"}
              value={password} onChange={handleOnchangePassword} />
          </div>
          {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
          <Loading isPending={mutation.isPending}>
            <ButtonComponent
              disabled={!email.length || !password.length}
              onClick={handleSignIn}

              size={40}
              styleButton={{
                background: 'rgb(255, 57, 69)',
                borderRadius: '4px',
                height: '48px',
                width: '100%',
                margin: '26px 0 10px',
                border: 'none'
              }}
              textButton={'Đăng nhập'}
              styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
            >
            </ButtonComponent>
          </Loading>
          <p><WrapperTextLight>Quên mật khẩu?</WrapperTextLight></p>
          <p>Chưa có tài khoản <WrapperTextLight onClick={handleNavigateSignUp} style={{ cursor: 'pointer' }}>Tạo tài khoản</WrapperTextLight></p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image src={imageLogo} preview={false} alt="image-logo" height="203px" width="203px" />
        </WrapperContainerRight>
      </div>
    </div>
  );
};

export default SignInPage;

