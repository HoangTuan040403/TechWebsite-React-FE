import styled from "styled-components";
import { Col, Image, InputNumber } from 'antd';


export const WrapperImageProductSmall= styled(Image)`
    height: 64px;
    width: 64px;
`

export const WrapperImageCol= styled(Col)`
    flex-basis: unset;
    display: flex;
`

export const WrapperNameProduct = styled.h1`
    margin: 0px 0px 4px;
    color: rgb(36, 36, 36);
    font-size: 24px;
    font-weight: 300;
    line-height: 32px;
    word-break: break-word;

`

export const WrapperTextSell = styled.span`
    font-size: 14px;
    line-height: 24px;
    color: rgb(120, 120, 120);
`

export const WrapperPriceProduct = styled.div`
    color: rgb(250, 250, 250);
    border-radius: 4px;
`

export const WrapperTextPrice = styled.h1`
    color: rgb(255, 66, 78);
    font-size: 24px;
    line-height: 40px;
    margin-right: 8px;
    font-weight: 500;
    padding: 10px;
    margin-top: 10px;
`

export const WrapperQualityProduct = styled.h1`
    display: flex;
    gap: 4px;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100px;
`

export const WrapperBtnQualityProduct = styled.span`

`

export const WrapperInputNumber = styled(InputNumber)`
        width: 60px;
        border-top: none;
        border-bottom: none;
        &.ant-input-number-handler-wrap {
            display: none;
        }
    
`