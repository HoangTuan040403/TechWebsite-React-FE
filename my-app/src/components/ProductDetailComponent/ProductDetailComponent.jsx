import { Col, Row, Image, InputNumber, Button } from 'antd';
import React from 'react';
import ImageProduct from '../../assets/images/ip15pm.webp'
import ImageProductSmall from '../../assets/images/ip15pmsmall.webp'
import { WrapperBtnQualityProduct, WrapperImageCol, WrapperImageProductSmall, WrapperInputNumber, WrapperNameProduct, WrapperPriceProduct, WrapperQualityProduct, WrapperTextPrice, WrapperTextSell } from './style';
import { StarFilled, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import ButtonComponent from '../ButtonComponent/ButtonComponent';


const ProductDetailComponent = () => {
  const onChange = () => { }
  return (
    <Row style={{ padding: '16px', background: '#fff' }}>
      <Col span={10}>
        <Image src={ImageProduct} alt="image product" preview={false} />
        <Row style={{ paddingTop: '10px' }}>
          <WrapperImageCol span={4}>
            <WrapperImageProductSmall src={ImageProductSmall} alt="image small" preview={false} />
          </WrapperImageCol>
          <WrapperImageCol span={4}>
            <WrapperImageProductSmall src={ImageProductSmall} alt="image small" preview={false} />
          </WrapperImageCol>
          <WrapperImageCol span={4}>
            <WrapperImageProductSmall src={ImageProductSmall} alt="image small" preview={false} />
          </WrapperImageCol>
          <WrapperImageCol span={4}>
            <WrapperImageProductSmall src={ImageProductSmall} alt="image small" preview={false} />
          </WrapperImageCol>
          <WrapperImageCol span={4}>
            <WrapperImageProductSmall src={ImageProductSmall} alt="image small" preview={false} />
          </WrapperImageCol>
          <WrapperImageCol span={4}>
            <WrapperImageProductSmall src={ImageProductSmall} alt="image small" preview={false} />
          </WrapperImageCol>

        </Row>
      </Col>
      <Col span={14}>
        <WrapperNameProduct>Iphone 15 ProMax</WrapperNameProduct>
        <StarFilled style={{ color: 'rgb(253, 216, 54)', fontSize: '16px' }} />
        <StarFilled style={{ color: 'rgb(253, 216, 54)', fontSize: '16px' }} />
        <StarFilled style={{ color: 'rgb(253, 216, 54)', fontSize: '16px' }} />
        <StarFilled style={{ color: 'rgb(253, 216, 54)', fontSize: '16px' }} />
        <StarFilled style={{ color: 'rgb(253, 216, 54)', fontSize: '16px' }} />
        <WrapperTextSell>| Đã bán 400</WrapperTextSell>
        <div>
          <WrapperPriceProduct>
            <WrapperTextPrice>15.000.000đ</WrapperTextPrice>
          </WrapperPriceProduct>

        </div>
        <div>
          <div>Số lượng</div>
          <WrapperQualityProduct>
            <WrapperBtnQualityProduct>
              <MinusOutlined style={{ color: '#000', fontSize: '20px' }} />
            </WrapperBtnQualityProduct>
            <WrapperInputNumber defaultValue={3} onChange={onChange} />
            <WrapperBtnQualityProduct>
              <PlusOutlined style={{ color: '#000', fontSize: '20px' }} />
            </WrapperBtnQualityProduct>
          </WrapperQualityProduct>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>

          <Button
            size={20}
            style={{
              background: 'rgb(255, 57, 69)',
              borderRadius: '4px',
              height: '48px',
              width: '220px',
            }}
          >
            <span style={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}>Mua ngay</span>
          </Button>
          <Button
            size={20}
            style={{
              background: 'rgb(255, 255, 255)',
              border: '1px solid rgb(13, 92, 182)',
              borderRadius:'4px',
              height: '48px',
              width: '220px',
            }}           
          >
            <span style={{ color: 'rgb(13, 92, 182)', fontSize: '15px', fontWeight: '700' }}>Thêm vào giỏ hàng</span>
          </Button>
        </div>
      </Col>



    </Row>
  );
};

export default ProductDetailComponent;
