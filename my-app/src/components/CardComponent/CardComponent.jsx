import { Image } from 'antd';
import React from 'react';
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountPriceText, WrapperPriceText, WrapperTextSell } from './style';
import { WrapperReportText } from './style';
import { StarFilled } from '@ant-design/icons';
import logo from '../../assets/images/logo.png';
import topdeal from '../../assets/images/topdeal.png'

const CardComponent = (props) => {
  const { countInStock, description, image, name, price, rating, type, discount, selled } = props
  return (
    <WrapperCardStyle
      hoverable
      headStyle={{ width: '200px', height: '200px' }}
      style={{ width: 240 }}
      bodyStyle={{ padding: '10px' }}
      cover={<img alt="example" src={image} />}
    >
      <div>
        <Image src={topdeal} style={{ width: '89px', height: '20px' }} />
      </div>
      <div>
        <Image src={logo} style={{ width: '89px', height: '20px' }} />
      </div>
      <StyleNameProduct>{name}</StyleNameProduct>
      <WrapperReportText >
        <span style={{ marginRight: '10px' }}>
          <span>{rating}</span> <StarFilled style={{ fontSize: '12px', color: 'orange' }} />
        </span>
        <WrapperTextSell> | Đã bán {selled || 1000}+ </WrapperTextSell>

      </WrapperReportText>
      <WrapperPriceText>
        <span style={{ marginRight: '8px' }}>{price}</span>
        <WrapperDiscountPriceText>
          {discount || 5}%
        </WrapperDiscountPriceText>
      </WrapperPriceText>
    </WrapperCardStyle>
  );
};

export default CardComponent;


