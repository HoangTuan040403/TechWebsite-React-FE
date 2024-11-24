import { Image } from 'antd';
import React from 'react';
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountPriceText, WrapperPriceText, WrapperTextSell} from './style';
import { WrapperReportText } from './style';
import { StarFilled } from '@ant-design/icons';
import logo from '../../assets/images/logo.png';
import topdeal from '../../assets/images/topdeal.png'

const CardFlashComponent = () => {
  return (
    <WrapperCardStyle
    hoverable
    headStyle={{width: '200px', height:'200px'}}
    style={{ width: 230 }}
    bodyStyle={{padding:'10px' }}
    cover={<img alt="example" src="https://salt.tikicdn.com/cache/750x750/ts/product/dd/2b/a6/fefd132c5ba9b5629c0119f57549e5d4.png.webp" />}
    >
    <div>
    <Image src={topdeal} style={{width:'89px', height:'20px'}}/>
    </div>
    <div>
    <Image src={logo} style={{width:'89px', height:'20px'}}/>
    </div>
    <StyleNameProduct>Iphone</StyleNameProduct>
    <WrapperReportText >
      <span style={{marginRight: '10px'}}>
      <span>4.5</span> <StarFilled style={{fontSize:'12px', color:'orange'}} />
      </span>
      <WrapperTextSell> | Đã bán 1000</WrapperTextSell>
      
      </WrapperReportText>
      <WrapperPriceText>
        10.000.000 đ
        <WrapperDiscountPriceText>
          -5%
        </WrapperDiscountPriceText>
        </WrapperPriceText>
  </WrapperCardStyle>
  );
};

export default CardFlashComponent;


