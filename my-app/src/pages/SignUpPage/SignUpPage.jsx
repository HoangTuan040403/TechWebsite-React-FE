import React, { useEffect, useState } from 'react';
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style';
import InputForm from '../../components/InputForm/InputForm';
import { Image } from 'antd';
import imageLogo from '../../assets/images/logostore.png';
import { useNavigate } from 'react-router-dom';
import { EyeInvisibleFilled, EyeFilled } from '@ant-design/icons';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import * as UserService from '../../sevices/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook';
import Loading from '../../components/LoadingComponent/Loading';
import * as message from '../../components/Message/Message';



const SignUpPage = () => {
  const navigate = useNavigate()

  const [isShowPassWord, setIsShowPassword] = useState(false)
  const [isShowConfirmPassWord, setIsShowConfirmPassword] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleOnchangeEmail = (value) => {
    setEmail(value)
  }

  const mutation = useMutationHooks(
    data => UserService.signupUser(data)
  )


  const { data, isLoading, isSuccess, isError } = mutation

  // useEffect(() => {
  //   if (isSuccess) {
  //     message.success()
  //     // handleSignIn()
  //   } else {
  //     message.error()
  //   }
  
  // }, [isSuccess, isError])

  useEffect(() => {
    if (isSuccess ) {
        message.success('Đăng ký thành công!'); // Thông báo thành công
        handleSignIn(); // Nếu bạn muốn tự động đăng nhập người dùng sau khi đăng ký
    } else if (isError ) {
        message.error('Đăng ký không thành công. Vui lòng kiểm tra lại thông tin.'); // Thông báo lỗi rõ ràng
    }
}, [isSuccess, isError]);


  const handleOnchangePassword = (value) => {
    setPassword(value)
  }

  const handleOnchangeConfirmPassword = (value) => {
    setConfirmPassword(value)
  }

  const handleSignIn = () => {
    navigate('/sign-in')
  }

  const handleSignUp = () => {
    mutation.mutate({
      email,
      password,
      confirmPassword
    })
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.53)', height: '100vh' }}>
      <div style={{ width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
        <WrapperContainerLeft>
          <h1>Xin chào!</h1>
          <p style={{ fontSize: '12px' }}>Vui lòng nhập đủ thông tin để tạo tài khoản</p>
          <InputForm style={{ marginBottom: '10px' }} placeholder="abc@gmail.com" value={email} onChange={handleOnchangeEmail} />
          <div style={{ position: 'relative', marginBottom: '10px' }}>
            <span
              onClick={() => setIsShowPassword(!isShowPassWord)}
              style={{
                zIndex: 10,
                position: 'absolute',
                top: '6px',
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
          <div style={{ position: 'relative' }}>
            <span
              onClick={() => setIsShowConfirmPassword(!isShowConfirmPassWord)}
              style={{
                zIndex: 10,
                position: 'absolute',
                top: '6px',
                right: '10px'
              }}
            >{
                isShowConfirmPassWord ? (
                  <EyeFilled />
                ) : (
                  <EyeInvisibleFilled />
                )
              }
            </span>
            <InputForm placeholder="Confirmpassword" type={isShowConfirmPassWord ? "text" : "password"}
              value={confirmPassword} onChange={handleOnchangeConfirmPassword} />
          </div>
          {data?.status === 'ERR' && <span>{data?.message}</span>}
          <Loading isPending={mutation.isPending}>
            <ButtonComponent
              disabled={!email.length || !password.length || !confirmPassword.length}
              onClick={handleSignUp}
              size={40}
              styleButton={{
                background: 'rgb(255, 57, 69)',
                borderRadius: '4px',
                height: '48px',
                width: '100%',
                margin: '26px 0 10px',
                border: 'none'
              }}
              textButton={'Đăng ký'}
              styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
            ></ButtonComponent>
          </Loading>
          <p>Bạn đã có tài khoản <WrapperTextLight onClick={handleSignIn} style={{ cursor: 'pointer' }}>Đăng nhập</WrapperTextLight></p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image src={imageLogo} preview={false} alt="image-logo" height="203px" width="203px" />

        </WrapperContainerRight>
      </div>
    </div>
  );
};

export default SignUpPage;

