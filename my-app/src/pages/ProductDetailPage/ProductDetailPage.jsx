import React from 'react';
import ProductDetailComponent from '../../components/ProductDetailComponent/ProductDetailComponent';
import { useParams } from 'react-router-dom';
import Container from '../../components/Container/Container';

const ProductDetailPage = () => {
  const { id } = useParams()
  return (


    <Container>
      <h2>Trang chủ - Chi tiết sản phẩm</h2>
      <ProductDetailComponent idProduct={id} />
    </Container>

  );
};

export default ProductDetailPage;
