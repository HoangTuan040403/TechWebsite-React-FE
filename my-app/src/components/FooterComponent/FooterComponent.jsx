import React from 'react';

import { Col } from 'antd'
import { WrapperFooter } from './style';

const FooterComponent = () => {
  return (
    <WrapperFooter style={{ display: 'flex', marginTop: '2px' , justifyContent:'space-between', alignItems:'stretch', background:' #f2f2f7'}}>
      <Col span={6}>
        <h2>Footer</h2>

      </Col>
      <Col span={6} >
        <p style={{color:'#444444', fontSize:'16px', fontWeight:'400'}} >Thông tin và chính sách</p>
        
        <ul style={{ lineHeight: '1.8', listStyleType: 'none', paddingLeft: '10px' , fontSize:'12px', color: '#444444'}}>
          <li>Mua hàng và thanh toán Online</li>
          <li>Mua hàng trả góp Online</li>
          <li>Mua hàng trả góp bằng thẻ tín dụng</li>
          <li>Chính sách giao hàng</li>
          <li>Tra điểm Smember</li>
          <li>Xem ưu đãi Smember</li>
          <li>Tra thông tin bảo hành</li>
          <li>Tra cứu hoá đơn điện tử</li>
          <li>Thông tin hoá đơn mua hàng</li>
          <li>Trung tâm bảo hành chính hãng</li>
          <li>Quy định về việc sao lưu dữ liệu</li>
       
        </ul>
      </Col>
      <Col span={6} >
      <p style={{color:'#444444', fontSize:'16px', fontWeight:'400'}} >Thông tin các dịch vụ</p>
      <ul style={{ lineHeight: '1.8', listStyleType: 'none', paddingLeft: '10px' , fontSize:'12px', color: '#444444'}}>
          <li>Bán lẻ điện thoại di động</li>
          <li>Mua bán điện thoại cũ</li>
          <li>Sửa chữa điện thoại</li>
          <li>Dịch vụ dán màn hình bảo vệ cho điện thoại</li>
          <li>Tư vấn và hướng dẫn sử dụng</li>
          <li>Thu cũ đổi mới</li>
          <li>Dịch vụ bảo hành</li>      
        </ul>
      </Col>
      <Col span={6}>
        <h2>Footer</h2>

      </Col>
    </WrapperFooter>



  );
};

export default FooterComponent;
