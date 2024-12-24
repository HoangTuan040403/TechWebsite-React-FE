
import React, { useEffect, useRef, useState } from 'react';
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import { WrapperFlash, WrapperProduct, WrapperTypeProduct } from './style';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import slider1 from '../../assets/images/slider1.png';
import slider2 from '../../assets/images/slider2.png';
import slider3 from '../../assets/images/slider3.png';
import CardComponent from '../../components/CardComponent/CardComponent';
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { Image, Row } from 'antd';
import imagesale from '../../assets/images/sale.jpg'
import { FireTwoTone } from '@ant-design/icons';
import FooterComponent from '../../components/FooterComponent/FooterComponent';
import ProductSlider from '../../components/CardSliderComponent/CardSliderComponent';
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../sevices/ProductService';
import { useSelector } from 'react-redux';
import Loading from '../../components/LoadingComponent/Loading';
import { useDebounce } from '../../hooks/useDebounce';



const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search)
  const searchDebounce = useDebounce(searchProduct, 1000)
  const refSearch = useRef()
  const [loading, setLoading] = useState(false)
  const [stateProducts, setStateProducts] = useState([])
  const arr = ['Iphone', 'SamSung', 'Xiaomi', 'Oppo'];

  const fetchProductAll = async (search) => {
    const res = await ProductService.findProduct(search)
    if (search?.length > 0 || refSearch.current) {
      setStateProducts(res?.data)
    } else {
      // setStateProducts(res?.data)
      return res
    }


  }

  useEffect(() => {
    if (refSearch.current) {
      setLoading(true)
      fetchProductAll(searchDebounce)
    }
    refSearch.current = true
    setLoading(false)
  }, [searchDebounce])

  const { isLoading, data: products } = useQuery({
    queryKey: ['product'],
    queryFn: ProductService.getAllProduct,
    fetchProductAll,
    retry: 3, retryDelay: 1000
  });


  useEffect(() => {
    if (products?.data?.length > 0) {
      setStateProducts(products?.data)
    } else {
      setStateProducts(products?.data)
    }
  }, [products])



  return (
    <Loading isPending={isLoading || loading}>

      <div id="container" style={{ backgroundColor: '#efefef', padding: '0 120px', height: '100%', width: '100%', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', marginTop: '100px' }}>
        <SliderComponent arrImages={[slider1, slider2, slider3]} />
        {/* <div style={{ background: '#FF3333', marginTop: '30px', paddingTop: '20px', borderRadius: '10px' }}>
          <h2 style={{ textAlign: 'center', fontSize: '30px', color: '#fff' }}>FLASH SALE ONLINE  <FireTwoTone /></h2>
          <div style={{ marginLeft: '4px' }}>
            <ProductSlider />
          </div>
          <WrapperFlash style={{ marginTop: '20px', background: '#FF3333', paddingBottom: '20px' }}>
            <ButtonComponent textButton="Xem thêm" type="outline" styleButton={{
              color: 'rgb(11, 116, 229)', width: '240px',
              height: '38px', borderRadius: '4px',
              padding: '4px 4px',
            }} />
          </WrapperFlash>
        </div> */}
        <Row style={{ marginTop: '20px' }}>
          <h2>Điện thoại nổ bật</h2>
          <div style={{ padding: '0 120px' }}>
            <WrapperTypeProduct>
              {arr.map((item) => (
                <TypeProduct name={item} key={item} />
              ))}
            </WrapperTypeProduct>

          </div>
        </Row>
        <WrapperProduct style={{ marginTop: '30px' }}>
          {stateProducts?.map((product) => {
            return (
              <CardComponent
                key={product._id}
                countInStock={product.countInStock}
                description={product.description}
                image={product.image}
                name={product.name}
                price={product.price}
                rating={product.rating}
                type={product.type}
                selled={product.selled}
                discount={product.discount}
              />

            )
          })}


        </WrapperProduct>
        <div style={{ width: '100%', display: ' flex', justifyContent: 'center', marginTop: '10px' }}>
          <ButtonComponent textButton="Xem thêm" type="outline" styleButton={{
            color: 'rgb(11, 116, 229)', width: '240px',
            height: '38px', borderRadius: '4px',
            padding: '4px 4px',
          }} />
        </div>
      </div>
      <FooterComponent />
    </Loading>


  );
};

export default HomePage;
