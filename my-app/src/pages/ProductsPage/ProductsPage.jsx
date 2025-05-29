import React, { useEffect, useState } from 'react';
import * as ProductService from '../../sevices/ProductService';
import Container from '../../components/Container/Container';
import ProductList from '../../components/ProductList/ProductList';
import Loading from '../../components/LoadingComponent/Loading';
import BackToTopButton from '../../components/BackToTopComponent/BackToTopComponent';
import LoadMoreButton from '../../components/LoadmoreButton/LoadmoreButton';
import Category from '../../components/Category/Category';
import Breadcrumb from '../../components/Breadcrum/Breadcrumb';
import SortProductOptions from '../../components/SortProductOptions/SortProductOptions';



const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState('default'); // 'asc' | 'desc' | 'default'
  const sortProducts = (products, order) => {
    if (order === 'asc') {
      return [...products].sort((a, b) => a.price - b.price);
    } else if (order === 'desc') {
      return [...products].sort((a, b) => b.price - a.price);
    }
    return products;
  };



  useEffect(() => {
    const updateItemsPerPage = () => {
      const newItems = window.innerWidth < 640 ? 6 : 10;
      setItemsPerPage(newItems);
      setVisibleCount(newItems);
    };
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);


  useEffect(() => {
    setVisibleCount(itemsPerPage);
  }, [itemsPerPage]);

  useEffect(() => {
    const fetchAllProduct = async () => {
      setLoading(true);
      try {
        const res = await ProductService.getAllProduct();
        setProducts(res?.data || []);
      } catch (error) {
        console.error('Lỗi không hiển thị sản phẩm:', error);
      }
      setLoading(false);
    };

    fetchAllProduct();
  }, []);



  return (
    <Container>
      <Loading isPending={loading}>
        <Breadcrumb current="Điện thoại" />

        <div className='bg-white rounded-md p-4 mt-1'>
          <Category />
          <SortProductOptions sortOrder={sortOrder} setSortOrder={setSortOrder} />
          {/* Product List */}
          <ProductList products={sortProducts(products, sortOrder).slice(0, visibleCount)} />
          {/* Load More Button */}
          <LoadMoreButton
            visibleCount={visibleCount}
            itemsPerPage={itemsPerPage}
            setVisibleCount={setVisibleCount}
            totalItems={products.length}
          />

          <BackToTopButton />
        </div>
      </Loading>

    </Container>
  );
};

export default ProductsPage;
