import styled from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    justify-content: flex-start;
   // border-bottom: 1px solid red;
    //height: 44px;
`

export const WrapperButtonMore = styled(ButtonComponent)`
    &:hover{
        color: #fff;
        background: rgb(13, 92, 182);
    }
    width: 100%;
    text-align: center;
`

export const WrapperProduct = styled.div`
    display: flex;
    justify-content: center;
    marginTop: 20px;
    gap:15px; 
    flex-wrap: wrap
`

export const WrapperFlash = styled.div`
    display: flex;
    justify-content: center;
    marginTop: 20px;
    gap:15px; 
    flex-wrap: wrap;
`