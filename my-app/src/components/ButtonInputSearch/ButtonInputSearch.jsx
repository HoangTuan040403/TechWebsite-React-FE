import { Button, Input } from "antd";
import React from "react";
import { SearchOutlined} from '@ant-design/icons';
import InputComponent from "../InputComponent/InputComponent";
import Search from "antd/es/transfer/search";

const ButtonInputSearch = (props) => {
    const {size, placeholder, textButton, bordered, backgroundColorInput = '#F8F8FF',
      backgroundColorButton = 'rgb(13, 92, 182)',
      colorButton = '#fff'
    } =props
    return (
      <div style={{display: 'flex'}}>
        <InputComponent
          size={size}
          placeholder={placeholder}      
          prefix={<SearchOutlined/>}
          bordered={bordered}   
          style={{backgroundColor: backgroundColorInput, borderRadius: '8px'}}         
        />      
 
        {/* <Button 
         size={size}   
         style={{background: backgroundColorInput,border: 'none', borderRadius: 0}} 
         icon={<SearchOutlined color={colorButton} style={{color:'#fff'}}/>}
       
         >
          <span style={{color: colorButton}}>{textButton}</span>
        </Button> */}
      </div>
    );
  };
  
export default ButtonInputSearch;