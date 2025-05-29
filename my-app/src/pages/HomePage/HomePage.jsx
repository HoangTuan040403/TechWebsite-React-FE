// pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDebounce } from '../../hooks/useDebounce';
import * as ProductService from '../../sevices/ProductService';
import * as CategoryService from '../../sevices/CategoryService';
import Container from '../../components/Container/Container';
import ProductArrivalsComponent from '../../components/ProductArrivalsComponent/ProductArrivalsComponent';
import BackToTopButton from '../../components/BackToTopComponent/BackToTopComponent';
import ProductList from '../../components/ProductList/ProductList';
import BannerHome from '../../components/BannerHome/BannerHome';
import Loading from '../../components/LoadingComponent/Loading';
import LoadMoreButton from '../../components/LoadmoreButton/LoadmoreButton';


const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 500);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [categoryProducts, setCategoryProducts] = useState([]);
  useEffect(() => {
    const updateItemsPerPage = () => {
      const newItems = window.innerWidth < 640 ? 4 : 5;
      setItemsPerPage(newItems);
      setVisibleCount(newItems);
    };
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await ProductService.findProduct(searchDebounce);
        setProducts(res?.data || []);
        setVisibleCount(window.innerWidth < 640 ? 4 : 5);
      } catch (error) {
        console.error('Lỗi khi fetch sản phẩm:', error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [searchDebounce]);



  const fetchAllCategoryProduct = async () => {
    const res = await CategoryService.getAllCategory();
    if (res?.status === 'OK') {
      setCategoryProducts(res?.data);
    }
  };

  useEffect(() => {
    fetchAllCategoryProduct();
  }, []);


  return (
    <Container>
      <BannerHome />
      <ProductArrivalsComponent />
      <Loading isPending={loading}>
        <div className="p-4 mt-9 bg-white rounded-lg">
          <div className="mb-6 lg:flex lg:justify-between">
            {/* Tiêu đề */}
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-3 text-gray-700">
              Điện thoại nổi bật
            </h2>

            {/* Danh mục - responsive flex hoặc scroll */}
            <div className="flex flex-wrap gap-3 items-center overflow-x-auto sm:overflow-visible">
              {categoryProducts.map((category) => (
                <div
                  key={category._id}
                  className="whitespace-nowrap px-4 py-2 bg-gray-100 hover:bg-blue-100 text-gray-800 rounded-md cursor-pointer text-sm border transition-colors duration-200"
                >
                  {category.name}
                </div>
              ))}
              {/* Nút xem tất cả */}
              <div className="whitespace-nowrap px-4 py-2 bg-gray-100 hover:bg-blue-100 text-gray-800 rounded-md cursor-pointer text-sm border transition-colors duration-200">
                Xem tất cả
              </div>
            </div>
          </div>
          <ProductList products={products.slice(0, visibleCount)} />
          <LoadMoreButton
            visibleCount={visibleCount}
            itemsPerPage={itemsPerPage}
            setVisibleCount={setVisibleCount}
            totalItems={products.length}
          />
        </div>
      </Loading>
      <BackToTopButton />
    </Container>
  );
};

export default HomePage;
