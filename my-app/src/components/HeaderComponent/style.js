import { Row } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
    padding: 10px 120px;
    background-color: rgb(255,255,255);
    align-items: center;
    gap: 16px;
    flex-wrap: nowrap;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 0;
    left: 0;
    width: 101%;
    z-index: 1000;
    
  
`

export const WrapperTextHeader = styled.span`
    font-size: 28px;
    color: rgb(130, 134, 158);
    font-weight" bold;
    text-align: left
`

export const WrapperHeaderAccount = styled.div`
    display: flex;
    align-items: center;
    color: rgb(130, 134, 158);
    gap: 10px;
    font-size: 14px
    
`

export const WrapperTextHeaderSmall = styled.span`
    color: rgb(130, 134, 158);
    font-size: 14px;
    wihte-space: nowrap
`
export const WrapperContentPopup = styled.p`
    cursor: pointer;
    &:hover {
    color: rgb(26, 148, 255);
    }
`
