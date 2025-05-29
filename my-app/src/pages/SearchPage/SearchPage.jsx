
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import * as ProductService from '../../sevices/ProductService';
import Container from '../../components/Container/Container';
import ProductList from '../../components/ProductList/ProductList';
import Loading from '../../components/LoadingComponent/Loading';

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get('keyword');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchSearchResults = async () => {
        setLoading(true);
        try {
            const res = await ProductService.findProduct(keyword);
            setProducts(res?.data || []);
        } catch (error) {
            console.error('Lỗi khi tìm sản phẩm:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (keyword) {
            fetchSearchResults();
        }
    }, [keyword]);

    return (
        <Container>
            <Loading isPending={loading}>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Kết quả tìm kiếm cho: "{keyword}"
                </h2>
                <ProductList products={products} />
                {products.length === 0 && !loading && (
                    <p className="text-gray-500 mt-4">Không tìm thấy sản phẩm nào.</p>
                )}
            </Loading>
        </Container>
    );
};

export default SearchPage;
