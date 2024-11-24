import React from 'react';
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent';
import CardComponent from '../../components/CardComponent/CardComponent';
import { Col, Pagination, Row } from 'antd';
import { WrapperNavbar, WrapperProduct, WrapperProducts } from './style';

const TypeProductPage = () => {
  const onChange = () => {}
  return (
    <div style={{padding: '0 120px', background: '#efefef',}}>
    <Row style={{ flexWrap:'nowrap', paddingTop: '10px'}}>
        <WrapperNavbar span={4} >
      <NavbarComponent/>
      </WrapperNavbar>
      <WrapperProducts span={20}>
      <CardComponent/>
      <CardComponent/>
      <CardComponent/>
      <CardComponent/>
      <CardComponent/>
      <CardComponent/>
      <CardComponent/>
      </WrapperProducts>  
    </Row>
    <Pagination showSizeChanger onChange={onChange} defaultCurrent={3} total={500} style={{textAlign: 'center', marginTop: '20px'}}/>
    </div>
    
  );
};

export default TypeProductPage;
