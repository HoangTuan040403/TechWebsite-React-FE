import { Button, Input } from "antd";
import React from "react";
import { SearchOutlined } from '@ant-design/icons';
import InputComponent from "../InputComponent/InputComponent";
import Search from "antd/es/transfer/search";

const ButtonInputSearch = (props) => {
  const { size, placeholder, textButton, bordered, backgroundColorInput = '#F8F8FF',

  } = props
  return (
    <div style={{ display: 'flex' }}>
      <InputComponent
        size={size}
        placeholder={placeholder}
        prefix={<SearchOutlined />}
        bordered={bordered}
        style={{ backgroundColor: backgroundColorInput, borderRadius: '8px' }}
        {...props}
      />


    </div>
  );
};

export default ButtonInputSearch;