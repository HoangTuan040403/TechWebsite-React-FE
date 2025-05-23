import React, { useEffect, useRef, useState } from 'react';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import slider1 from '../../assets/images/slider1.png';
import slider2 from '../../assets/images/slider2.png';
import slider3 from '../../assets/images/slider3.png';
import banner1 from '../../assets/images/bannerip16.png';
import banner2 from '../../assets/images/iphone-16_overview.png';
import banner3 from '../../assets/images/m55-6990-right-banner.png';
import CardComponent from '../../components/CardComponent/CardComponent';
import FooterComponent from '../../components/FooterComponent/FooterComponent';
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../sevices/ProductService';
import * as CategoryService from '../../sevices/CategoryService';
import { useSelector } from 'react-redux';
import Loading from '../../components/LoadingComponent/Loading';
import { useDebounce } from '../../hooks/useDebounce';
import Container from '../../components/Container/Container';
import ProductArrivalsComponent from '../../components/ProductArrivalsComponent/ProductArrivalsComponent';
import BackToTopButton from '../../components/BackToTopComponent/BackToTopComponent';


const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 500);
  const refSearch = useRef();
  const [loading, setLoading] = useState(false);
  const [stateProducts, setStateProducts] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + itemsPerPage);
  };

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(4);
        setVisibleCount(4);
      } else {
        setItemsPerPage(5);
        setVisibleCount(5);
      }
    };
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, [stateProducts.length]);

  const fetchProductAll = async (search) => {
    const res = await ProductService.findProduct(search);
    if (search?.length > 0 || refSearch.current) {
      setStateProducts(res?.data);
    } else {
      return res;
    }
  };

  useEffect(() => {
    if (refSearch.current) {
      setLoading(true);
      fetchProductAll(searchDebounce);
    }
    refSearch.current = true;
    setLoading(false);
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

  const { isLoading, data: products } = useQuery({
    queryKey: ['product'],
    queryFn: ProductService.getAllProduct,
    fetchProductAll,
    retry: 3,
    retryDelay: 1000,
  });

  useEffect(() => {
    setStateProducts(products?.data || []);
  }, [products]);

  return (
    <Loading isPending={isLoading || loading}>
      <Container>
        {/* <div className=" h-full mt-2">
          <SliderComponent arrImages={[slider1, slider2, slider3]} />
        </div> */}
        <div className="flex gap-4 lg:h-[350px] md:h-[200px] mt-2">
          <div className="w-full lg:w-3/4 border-gray-100 shadow-lg border">

            <SliderComponent arrImages={[slider1, slider2, slider3]} />
          </div>
          <div className="hidden lg:flex lg:flex-col justify-between h-full w-1/4">
            {[banner1, banner2, banner3].map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`thumb-${i}`}
                className="rounded-lg h-[32%] w-full object-cover shadow-md"
              />
            ))}
          </div>
        </div>
        <ProductArrivalsComponent />
        <div className="p-4 mt-9 bg-white rounded-lg">
          {/* Danh mục */}
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
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {stateProducts.slice(0, visibleCount).map((product) => (
              <CardComponent
                key={product._id}
                id={product._id}
                countInStock={product.countInStock}
                description={product.description}
                image={product.image}
                name={product.name}
                price={product.price}
              />
            ))}
          </div>

        </div>
        <BackToTopButton />

        {visibleCount < stateProducts.length && (
          <div className="flex justify-center mt-6">
            <button
              onClick={handleLoadMore}
              className="w-full sm:w-[240px] h-[38px] px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-600
           hover:text-white transition-colors duration-200 text-sm font-medium mb-4"
            >
              Xem thêm
            </button>
          </div>
        )}
      </Container>
      <FooterComponent />
    </Loading>
  );
};

export default HomePage;
