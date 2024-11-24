import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeaderAdminUser = styled.h1`
    color: #000;
    font-size: 14px;
`

export const WrapperUploadFile = styled(Upload)`
    & .antd-upload.antd-upload-select.antd-upload-select-picture-card {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }

    & .ant-upload-list-item-container{
        display: none;
    }

   
`