import React, { Fragment, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { routes } from './routes'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import { isJsonString } from './utils'
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from 'react-redux'
import * as UserService from './sevices/UserService'
import { updateUser } from './redux/slides/userSlide'
import axios from 'axios'
import Loading from './components/LoadingComponent/Loading'
import { isPending } from '@reduxjs/toolkit'




function App() {

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    setIsLoading(true);
  
    const { storageData, decoded } = handleDecoded();
    
    // Kiểm tra nếu người dùng đã đăng nhập (có token và decoded id)
    if (decoded?.id) {
      handleGetDetailUser(decoded?.id, storageData);
    } else {
      // Nếu chưa đăng nhập, chỉ log hoặc xử lý khác nếu cần
      console.log('Chưa đăng nhập');
    }
  
    setIsLoading(false);
  }, []);
  

  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token')
    let decoded = {}
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData)
      decoded = jwtDecode(storageData)
    }
    return { decoded, storageData }
  }

  UserService.axiosJWT.interceptors.request.use(async (config) => {
    const currentTime = new Date()
    const { decoded } = handleDecoded()
    if(decoded?.exp < currentTime.getTime() / 1000){
      const data = await UserService.refreshToken()
      config.headers['token'] = `Bearer ${data?.access_token}`
    }
    return config;
  }, (err) => {
    return Promise.reject(err)
  })

  // const handleGetDetailUser = async (id, token) => {
  //   const res = await UserService.getDetailUser(id, token)
  //   dispatch(updateUser({ ...res?.data, access_token: token }))
    
  // }


  const handleGetDetailUser = async (id, token) => {
    if (!id || !token) {
      console.error('Missing id or token. Skipping API call.');
      return;
    }
    console.log('Fetching user details with ID:', id, 'and token:', token);
  
    try {
      const res = await UserService.getDetailUser(id, token);
      dispatch(updateUser({ ...res?.data, access_token: token }));
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  }
  




  return (
   
    <div >
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page
            const ischeckAuth = !route.isPrivate || user.isAdmin
            const Layout = route.isShowHeader ? DefaultComponent : Fragment
            return (
              <Route key={route.path} path={route.path} element={
                <Layout>
                  <Page />
                </Layout>
              } />
            )
          })}
        </Routes>
      </Router>

    </div>
   
  );
}

export default App;
